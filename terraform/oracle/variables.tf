variable "tenancy_ocid" {}
variable "user_ocid" {}
variable "fingerprint" {}
variable "private_key_path" {}

variable "region" {
  default = "uk-london-1"
}

variable "ssh_public_key_path" {
  default = "~/.ssh/oracle_vm.pub"
}
