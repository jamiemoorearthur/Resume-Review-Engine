terraform {
  # Remote backend — stores state in Azure Blob so it's shared and not just on your machine.
  # Fill in storage_account_name after running: terraform output storage_account_name
  # Then run: terraform init -migrate-state
  backend "azurerm" {
    resource_group_name  = "cvreviewer-rg"
    storage_account_name = "FILL_IN_FROM_TERRAFORM_OUTPUT"
    container_name       = "tfstate"
    key                  = "cv-reviewer.terraform.tfstate"
    use_azuread_auth     = true
  }
}
