#!/bin/bash
cd /webapps/slime-soccer

# Use correct version of Node
. ~/.nvm/nvm.sh
nvm use

# Start the server
node ./server/index &
