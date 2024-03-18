
variable "source" {
  type = object({
    project_id          = string
    source_image_family = string
    ssh_username        = string
    zone                = string
    image_family        = string
  })
}

variable "sources" {
  type = list(string)
}

variable "shell-provisioner" {
  type = object({
    scripts = list(string)
  })
}
variable "file-provisioner-build-file" {
  type = object({
    source      = string
    destination = string
  })
}

variable "file-provisioner-ops-agent-config" {
  type = object({
    source      = string
    destination = string
  })
}
