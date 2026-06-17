data "azurerm_client_config" "current" {}

# Wait 30 seconds after RBAC assignments before pods try to use them.
# Azure RBAC can take a moment to propagate globally.
resource "time_sleep" "rbac_propagation" {
  depends_on      = [azurerm_role_assignment.aks_acr_pull]
  create_duration = "30s"
}

# AKS kubelet identity can pull images from ACR — no admin credentials needed
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}

# Key Vault Secrets Provider addon identity can read secrets from Key Vault
# This is the identity used by the CSI driver to mount secrets into pods
resource "azurerm_role_assignment" "aks_kv_secrets_user" {
  principal_id         = azurerm_kubernetes_cluster.aks.key_vault_secrets_provider[0].secret_identity[0].object_id
  role_definition_name = "Key Vault Secrets User"
  scope                = azurerm_key_vault.kv.id
}

# Your own account (deployer) can manage Key Vault secrets
resource "azurerm_role_assignment" "deployer_kv_secrets_officer" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}
