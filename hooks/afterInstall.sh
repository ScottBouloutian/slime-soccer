#!/bin/bash

# Install client dependencies and build
(
    cd ./client
    yarn
    yarn build
)

# Install server dependencies
(
    cd ./server
    yarn --production
)
