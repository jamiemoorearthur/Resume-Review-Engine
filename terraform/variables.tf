variable "project_name" {
  description = "Base name for all resources"
  type        = string
  default     = "cv-reviewer"
}

variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "West Europe"
}

variable "tags" {
  description = "Common tags applied to all resources"
  type        = map(string)
  default = {
    environment = "Dev"
    project     = "cv-reviewer"
    owner       = "seyi"
  }
}

# ACR
variable "acr_sku" {
  description = "SKU for Azure Container Registry (Basic, Standard, Premium)"
  type        = string
  default     = "Basic"
}

# Key Vault
variable "kv_sku" {
  description = "SKU for Azure Key Vault (standard or premium)"
  type        = string
  default     = "standard"
}

# Storage
variable "storage_replication_type" {
  description = "Replication type for the storage account (LRS, GRS, RAGRS)"
  type        = string
  default     = "LRS"
}

# Container App
variable "image_tag" {
  description = "Docker image tag to deploy (defaults to latest)"
  type        = string
  default     = "latest"
}

variable "container_cpu" {
  description = "CPU allocation for the Container App (in cores)"
  type        = number
  default     = 0.5
}

variable "container_memory" {
  description = "Memory allocation for the Container App"
  type        = string
  default     = "1Gi"
}

# Secrets — passed in at apply time, never hardcoded
variable "openai_api_key" {
  description = "OpenAI API key injected into pods at runtime"
  type        = string
  sensitive   = true
}

variable "langfuse_public_key" {
  description = "Langfuse public key for observability"
  type        = string
  sensitive   = true
  default     = ""
}

variable "langfuse_secret_key" {
  description = "Langfuse secret key for observability"
  type        = string
  sensitive   = true
  default     = ""
}

# Azure credentials
variable "subscription_id" {
  description = "Azure Subscription ID used by Terraform"
  type        = string
}

variable "tenant_id" {
  description = "Azure Tenant ID used by Terraform"
  type        = string
}
