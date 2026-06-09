/**
 * AWS Cognito Configuration
 *
 * Cần set các biến môi trường sau trong .env.local:
 *
 * NEXT_PUBLIC_COGNITO_REGION='us-east-1'
 * NEXT_PUBLIC_COGNITO_USER_POOL_ID='us-east-1_xxxxxxxxx'
 * NEXT_PUBLIC_COGNITO_CLIENT_ID='your-client-id'
 * COGNITO_CLIENT_SECRET='your-client-secret' (nếu dùng confidential client)
 */

export const cognitoConfig = {
  region: process.env.NEXT_PUBLIC_COGNITO_REGION || "us-east-1",
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN, // Optional: custom domain
};
