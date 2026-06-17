output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "container_app_url" {
  value       = "https://${azurerm_container_app.app.latest_revision_fqdn}"
  description = "Public URL of the deployed CV Reviewer API"
}

output "key_vault_name" {
  value = azurerm_key_vault.kv.name
}

output "storage_account_name" {
  value = azurerm_storage_account.sa.name
}
