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
variable "file-provisioner" {
  type = object({
    source      = string
    destination = string
  })
}
