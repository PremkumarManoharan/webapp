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
    source      = var.file-provisioner.source
    destination = var.file-provisioner.destination
  }

  provisioner "shell" {
    scripts = var.shell-provisioner.scripts
    environment_vars = [
      "PG_USER=${var.PG_USER}",
      "PG_PASSWORD=${var.PG_PASSWORD}",
      "PG_DB=${var.PG_DB}",
      "PG_HOST=${var.PG_HOST}"
    ]
  }
}
