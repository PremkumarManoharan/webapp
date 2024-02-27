#!/bin/bash
sudo useradd -r -s /usr/sbin/nologin -U csye6225
sudo chown -R csye6225:csye6225 /opt/app
sudo chmod -R u=rwx,go= /opt/app
