data "azurerm_client_config" "current" {}

# Wait 30 seconds after RBAC assignments before the Container App tries to use them.
# Azure RBAC can take a moment to propagate globally.
resource "time_sleep" "rbac_propagation" {
  depends_on      = [azurerm_role_assignment.app_acr_pull]
  create_duration = "30s"
}

# Container App managed identity can pull images from ACR
resource "azurerm_role_assignment" "app_acr_pull" {
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}

# Container App managed identity can read secrets from Key Vault
resource "azurerm_role_assignment" "app_kv_secrets_user" {
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  role_definition_name = "Key Vault Secrets User"
  scope                = azurerm_key_vault.kv.id
}

# Your own account (deployer) can manage Key Vault secrets
resource "azurerm_role_assignment" "deployer_kv_secrets_officer" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}
