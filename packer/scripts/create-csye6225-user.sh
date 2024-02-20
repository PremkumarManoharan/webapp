#!/bin/bash
sudo useradd -r -s /usr/sbin/nologin -U csye6225
sudo chmod +x /opt/app/server.js
sudo chown -R csye6225:csye6225 /opt/app
