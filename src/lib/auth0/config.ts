/**
 * Auth0 Configuration
 *
 * Cần set các biến môi trường sau trong .env.local:
 *
 * AUTH0_SECRET='use [openssl rand -hex 32] to generate'
 * AUTH0_BASE_URL='http://localhost:3000' hoặc production URL
 * AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
 * AUTH0_CLIENT_ID='your-client-id'
 * AUTH0_CLIENT_SECRET='your-client-secret'
 */

export const auth0Config = {
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL || process.env.VERCEL_URL || "http://localhost:3000",
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: "/api/auth0/callback",
    postLogoutRedirect: "/",
  },
};
