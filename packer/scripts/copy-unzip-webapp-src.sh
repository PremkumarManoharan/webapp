#!/bin/bash

sudo mkdir /opt/app
sudo chown -R centos:centos /opt/app
cd /opt/app || exit
pwd
cp /tmp/build.zip .
unzip build.zip 
ls
