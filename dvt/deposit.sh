#!/bin/bash

#Remove any deposit json file in data folder
echo "Removing any deposit.json files.."
cd ../deposit/data && rm -rf *

#Copy deposit json file into data folder
echo $(pwd)
cd ../../ && echo $(pwd) && cd dvt/.charon/cluster/node0 && echo $(pwd) && cp -rf deposit* ../../../../deposit/data/
echo "done"

#Run docker-compose up to execute deposit 32 eth
cd ../../../../deposit && docker-compose up

