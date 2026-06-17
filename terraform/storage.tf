resource "azurerm_storage_account" "sa" {
  name                = local.sa_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  account_tier             = "Standard"
  account_replication_type = var.storage_replication_type

  min_tls_version = "TLS1_2"

  tags = var.tags
}

# tfstate container — for migrating to remote backend later
resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_id    = azurerm_storage_account.sa.id
  container_access_type = "private"
}

# File Share for ChromaDB — persists the vector database between deployments
resource "azurerm_storage_share" "chromadb" {
  name               = "chromadb"
  storage_account_id = azurerm_storage_account.sa.id
  quota              = 5
}
