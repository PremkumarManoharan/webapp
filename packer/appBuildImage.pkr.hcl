packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0, < 2.0.0"
    }
  }
}

source "googlecompute" "webapp-source" {
  project_id          = var.source.project_id
  source_image_family = var.source.source_image_family
  ssh_username        = var.source.ssh_username
  zone                = var.source.zone
  image_family        = var.source.image_family
}

build {
  sources = var.sources
  provisioner "file" {
    source      = var.file-provisioner-build-file.source
    destination = var.file-provisioner-build-file.destination
  }
  provisioner "file" {
    source      = var.file-provisioner-ops-agent-config.source
    destination = var.file-provisioner-ops-agent-config.destination
  }

  provisioner "shell" {
    scripts = var.shell-provisioner.scripts
  }
}
