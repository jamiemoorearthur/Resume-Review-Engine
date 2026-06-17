resource "random_string" "sfx" {
  length  = 5
  upper   = false
  special = false
}

locals {
  name_base = lower(replace(var.project_name, "-", ""))

  rg_name   = "${local.name_base}-rg"
  acr_name  = "${local.name_base}acr${random_string.sfx.result}"
  sa_name   = "${local.name_base}sa${random_string.sfx.result}"
  kv_name   = "${local.name_base}-kv-${random_string.sfx.result}"
  law_name  = "${local.name_base}-law"
  cae_name  = "${local.name_base}-cae"
  ca_name   = "${local.name_base}-app"
}
