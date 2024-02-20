packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">=1"
    }
  }
}



variable "PG_USER" {
  type = string
}
variable "PG_PASSWORD" {
  type = string

}
variable "PG_DB" {
  type = string
}
variable "PG_HOST" {
  type = string
}


source "googlecompute" "webapp-source" {
  project_id          = "csye-6225-dev-413816"
  source_image_family = "centos-stream-8"
  ssh_username        = "centos"
  zone                = "us-east1-b"
  image_family        = "csye6225-webapp"
}

build {
  sources = ["sources.googlecompute.webapp-source"]
  provisioner "file" {
    source      = "build.zip"
    destination = "/tmp/build.zip"
  }

  provisioner "shell" {
    scripts = [
      "packer/scripts/update-packages.sh",
      "packer/scripts/install-required-packages.sh",
      "packer/scripts/install-database.sh",
      "packer/scripts/start-setup-database.sh",
      "packer/scripts/copy-unzip-webapp-src.sh",
      "packer/scripts/create-env-file.sh",
      "packer/scripts/install-dependencies.sh",
      "packer/scripts/create-csye6225-user.sh",
      "packer/scripts/setup-systemd.sh"
    ]
    environment_vars = [
      "PG_USER=${var.PG_USER}",
      "PG_PASSWORD=${var.PG_PASSWORD}",
      "PG_DB=${var.PG_DB}",
      "PG_HOST=${var.PG_HOST}"
    ]
  }
}
