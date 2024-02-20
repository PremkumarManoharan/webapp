#!/bin/bash

sudo cp /opt/app/csye6225app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable csye6225app
