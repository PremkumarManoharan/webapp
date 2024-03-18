#!/bin/bash

sudo cp /opt/app/ops-agent-config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
