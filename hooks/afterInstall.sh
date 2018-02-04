#!/bin/bash
cd /webapps/slime-soccer

# Use correct version of Node
. ~/.nvm/nvm.sh
nvm use

# Install client dependencies
(
    cd client
    npm install
    npm run build
)

# Install server dependencies
(
    cd server
    npm install
)
