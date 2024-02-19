#!/bin/bash

cd ~ || exit
mkdir app
cd app || exit
pwd
cp /tmp/build.zip .
unzip build.zip 
ls
