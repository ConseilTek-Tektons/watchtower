# Authentication

Watchtower supports standards-based enterprise identity without vendor-specific code.

## OIDC

Set OIDC_ISSUER, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, and the requested scopes. Okta, Microsoft Entra ID, Duo, Keycloak, Auth0, and other conformant providers can be used directly. Configure the callback as https://YOUR_HOST/api/auth/callback/enterprise-sso.

Group or role claims are mapped through OIDC_ROLE_CLAIM and src/config/rbac.ts. Reject untrusted claims at the identity provider and use short sessions plus step-up authentication for sensitive actions.

## SAML

The application consumes OIDC. The included Keycloak realm demonstrates a broker that accepts SAML from the enterprise provider and issues OIDC to Watchtower. The same pattern works with a managed broker. Validate signatures, audience, recipient, time conditions, encryption requirements, and group release before production.

Demo credentials are development-only. Keep AUTH_DEMO_MODE=false in production and store secrets in AWS Secrets Manager or Azure Key Vault.
