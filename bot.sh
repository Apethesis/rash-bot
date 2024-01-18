#!/bin/bash
until node .
do
    git pull
    sleep 1
done