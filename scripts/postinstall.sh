#!/bin/bash

# Install client dependencies
(
    cd src/client
    yarn
)

# Install server dependencies
(
    cd src/server
    yarn
)
