#!/bin/bash

sudo cp /home/centos/app/csye6225app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable csye6225app
