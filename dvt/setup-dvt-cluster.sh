#!/bin/sh

#Create the DVT cluster
docker run --rm -v "$(pwd):/opt/charon" obolnetwork/charon:v0.15.0 create cluster --network=goerli --name="dvt-cluster" --withdrawal-addresses="$1" --fee-recipient-addresses="$1" --nodes 4 --threshold 3
