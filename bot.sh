#!/bin/bash
until node .
do
    git pull
    chmod u+x ./bot.sh
    sleep 1
done