
source = {
  project_id          = "csye-6225-dev-413816"
  source_image_family = "centos-stream-8"
  ssh_username        = "centos"
  zone                = "us-east1-b"
  image_family        = "csye6225-webapp"
}

sources = ["sources.googlecompute.webapp-source"]


file-provisioner-build-file = {
  source      = "build.zip"
  destination = "/tmp/build.zip"
}
file-provisioner-ops-agent-config = {
  source      = "ops-agent-config.yaml"
  destination = "/etc/google-cloud-ops-agent/config.yaml"
}


shell-provisioner = {
  scripts = [
    "packer/scripts/update-packages.sh",
    "packer/scripts/install-required-packages.sh",
    "packer/scripts/copy-unzip-webapp-src.sh",
    "packer/scripts/install-dependencies.sh",
    "packer/scripts/create-csye6225-user.sh",
    "packer/scripts/install-ops-agent.sh",
    "packer/scripts/setup-systemd.sh"
  ]
}
