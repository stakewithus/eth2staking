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
docker run -it --rm -v $(pwd)/.swu/validator_keys:/app/validator_keys ethereum/staking-deposit-cli --non_interactive new-mnemonic --num_validators=1 --keystore_password=$token --execution_address=$1 --mnemonic_language=english --chain=prater

# 4. Copy .swu over to ab path for validator client
echo "Copying keys and deposit.json to validator client path..."
sudo mv $(pwd)/.swu ../

#5. Remove eth-staking-deposit github repo
echo "Removing staking-deposit-cli repo.."
cd .. && sudo rm -rf staking-deposit-cli
