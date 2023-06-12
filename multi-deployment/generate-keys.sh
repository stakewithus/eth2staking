#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

# 1. git clone eth-staking-deposit
git clone https://github.com/ethereum/staking-deposit-cli.git

# 2. build docker-image
cd staking-deposit-cli && make build_docker

# 3. Random generate password and push to text file
mkdir -p $(pwd)/.swu/validator_keys && openssl rand -base64 10 >> $(pwd)/.swu/validator_keys/keystore_password.txt

# 3. Generate keys and deposit.json
token=$(cat "$(pwd)/.swu/validator_keys/keystore_password.txt")
docker run -it --rm -v $(pwd)/.swu/validator_keys:/app/validator_keys ethereum/staking-deposit-cli --non_interactive new-mnemonic --num_validators=3 --keystore_password=$token --execution_address=$1 --mnemonic_language=english --chain=prater

# 4. Copy .swu over to ab path for validator client
echo "Copying keys and deposit.json to validator client path..."
sudo mv $(pwd)/.swu ../
num=0
for f in ../.swu/validator_keys/keystore-*.json; do
  echo "Moving keys into different node folders"
  mkdir -p ../.swu/node$num
  cp "${f}" ../.swu/node$num
  cp ../.swu/validator_keys/*.txt ../.swu/node$num
  num=$((num+1))
done

#5.

for f in ../.swu/validator_keys/keystore-*.json; do
  echo "Adding keys into web3signer yaml file - $f"
  printf '%s\n' "${f}"
  echo -e "type: \"file-keystore\"\nkeyType: \"BLS\"\nkeystoreFile: \"${f}\"\nkeystorePasswordFile: \"keystore_password.txt\"\n---\n" | tee -a ../.swu/validator_keys/web3signer.yaml
done

#6. Remove eth-staking-deposit github repo
echo "Removing staking-deposit-cli repo.."
cd .. && sudo rm -rf staking-deposit-cli
