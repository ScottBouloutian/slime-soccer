#!/bin/bash
cd /webapps/slime-soccer

# Send SIGINT to server process
pidFile="./server/app.pid";
if [ -f $pidFile ]; then
    pkill --signal SIGINT --pidfile $pidFile
fi
