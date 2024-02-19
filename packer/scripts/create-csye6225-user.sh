#!/bin/bash
sudo useradd -r -s /usr/sbin/nologin -U csye6225
sudo chmod +x ~/app/server.js
sudo chown -R csye6225:csye6225 ~/app
