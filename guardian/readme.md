All guardian services will be deployed to GKE cluster via Heml chart & Terraform. If any change in deployment such as configmap or port please change in below repos
- https://github.com/Tymlez/tymlez-charts
- https://github.com/Tymlez/guardian-terraform


To deploy these charts along with guardian terraform using below sample config via terraform workspace variables


```
custom_helm_repository = "oci://australia-southeast1-docker.pkg.dev/[tymlez-private-gcp-project]/helm-charts"
custom_helm_charts     = ["guardian-tymlez-service", "tymlez-guardian-extensions"]
custom_helm_version    = "0.1.0"
custom_helm_values_yaml = {

  guardian-tymlez-service = {
    nr_api_key            = "[NR_API_KEY]",
    guardian_release_name = "guardian"
    configmap = {
      data = {
        GUARDIAN_TYMLEZ_API_KEY = "RSA encryption key"
        ENV_NAME                = "DEV"
        CLIENT_NAME             = "Tymlez"
      }
    }
    secrets = {
      data = {
        encryption_secret_key = "RSA encryption key"
      }
    }
    image = {
      repository = "asia.gcr.io/[tymlez-private-gcp-project]/tymlez-guardian-service"
      tag        = "latest"
    }
  }
  tymlez-guardian-extensions = {
    nr_api_key            = "NR_API_KEY",
    guardian_release_name = "guardian"
    configmap = {
      data = {
        ENV_NAME    = "DEV"
        CLIENT_NAME = "Tymlez"
      }
    }
    secrets = {
      data = {
        ipfs_encryption_key = "RSA encryption key"
      }
    }
    image = {
      repository = "asia.gcr.io/[tymlez-private-gcp-project]/tymlez-guardian-extensions"
      tag        = "latest"
    }
  }
}
custom_helm_ingresses = {
  enable       = true
  service_path = "/tymlez(/|$)(.*)"
  service_port = 3010
  service_name = "guardian-tymlez-service"
}
custom_helm_repository_username = "_json_key"
custom_helm_repository_password = "json credentials have permission to access antifact repositories"


```

After deployment, the service will be exposed via ingress. Please note that ingress have IP address protection enabled so we need to allow NAT ipaddress in the whitelist

```
ingress_whitelisted_ips=[nats ipaddress, vpn ipaddress, other whitelisted ipaddress]

```