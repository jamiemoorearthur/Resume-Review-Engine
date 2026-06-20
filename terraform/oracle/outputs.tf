output "vm_public_ip" {
  value       = oci_core_instance.cv_reviewer.public_ip
  description = "Public IP of the CV Reviewer VM — use this to SSH in and point your frontend to"
}
