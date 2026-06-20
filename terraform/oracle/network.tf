resource "oci_core_vcn" "cv_reviewer_vcn" {
  compartment_id = var.tenancy_ocid
  cidr_block     = "10.0.0.0/16"
  display_name   = "cv-reviewer-vcn"
  dns_label      = "cvreviewer"
}

resource "oci_core_internet_gateway" "igw" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.cv_reviewer_vcn.id
  display_name   = "cv-reviewer-igw"
  enabled        = true
}

resource "oci_core_route_table" "rt" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.cv_reviewer_vcn.id
  display_name   = "cv-reviewer-rt"

  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.igw.id
  }
}

resource "oci_core_security_list" "sl" {
  compartment_id = var.tenancy_ocid
  vcn_id         = oci_core_vcn.cv_reviewer_vcn.id
  display_name   = "cv-reviewer-sl"

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }
}

resource "oci_core_subnet" "subnet" {
  compartment_id    = var.tenancy_ocid
  vcn_id            = oci_core_vcn.cv_reviewer_vcn.id
  cidr_block        = "10.0.0.0/24"
  display_name      = "cv-reviewer-subnet"
  dns_label         = "cvsubnet"
  route_table_id    = oci_core_route_table.rt.id
  security_list_ids = [oci_core_security_list.sl.id]
}
