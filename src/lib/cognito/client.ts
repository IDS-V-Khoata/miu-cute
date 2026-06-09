"use client";

import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { cognitoConfig } from "./config";

// Lazy initialize Cognito User Pool
let userPoolInstance: CognitoUserPool | null = null;

function getUserPool(): CognitoUserPool {
  if (!userPoolInstance) {
    if (!cognitoConfig.userPoolId || !cognitoConfig.clientId) {
      throw new Error(
        "Cognito configuration missing. Please set NEXT_PUBLIC_COGNITO_USER_POOL_ID and NEXT_PUBLIC_COGNITO_CLIENT_ID in .env.local"
      );
    }
    userPoolInstance = new CognitoUserPool({
      UserPoolId: cognitoConfig.userPoolId,
      ClientId: cognitoConfig.clientId,
    });
  }
  return userPoolInstance;
}

// Export getter function instead of direct instance to avoid initialization on module load
export function getUserPoolInstance(): CognitoUserPool {
  return getUserPool();
}

// For backward compatibility, but will throw error if config is missing
export const userPool = (() => {
  try {
    return getUserPool();
  } catch {
    // Return a dummy object that will fail gracefully when used
    return null as any;
  }
})();

export interface CognitoAuthResult {
  success: boolean;
  user?: CognitoUser;
  error?: string;
  tokens?: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
}

export async function signIn(username: string, password: string): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    try {
      const pool = getUserPool();
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: pool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            success: true,
            user: cognitoUser,
            tokens: {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
            },
          });
        },
        onFailure: (err) => {
          resolve({
            success: false,
            error: err.message || "Authentication failed",
          });
        },
      });
    } catch (err) {
      resolve({
        success: false,
        error: err instanceof Error ? err.message : "Configuration error",
      });
    }
  });
}

export async function signUp(
  username: string,
  password: string,
  email: string,
  attributes?: Record<string, string>
): Promise<CognitoAuthResult> {
  return new Promise((resolve) => {
    try {
      const pool = getUserPool();
      const attributeList = [
        {
          Name: "email",
          Value: email,
        },
        ...Object.entries(attributes || {}).map(([key, value]) => ({
          Name: key,
          Value: value,
        })),
      ];

      pool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        resolve({
          success: false,
          error: err.message || "Sign up failed",
        });
        return;
      }

        if (result) {
          resolve({
            success: true,
            user: result.user,
          });
        } else {
          resolve({
            success: false,
            error: "Sign up failed",
          });
        }
      });
    } catch (err) {
      resolve({
        success: false,
        error: err instanceof Error ? err.message : "Configuration error",
      });
    }
  });
}

export function signOut(): void {
  try {
    const pool = getUserPool();
    const cognitoUser = pool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  } catch (err) {
    console.error("Sign out error:", err);
  }
}

export function getCurrentUser(): CognitoUser | null {
  try {
    const pool = getUserPool();
    return pool.getCurrentUser();
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}

export async function getCurrentSession(): Promise<{
  accessToken: string;
  idToken: string;
} | null> {
  return new Promise((resolve) => {
    try {
      const pool = getUserPool();
      const cognitoUser = pool.getCurrentUser();
    if (!cognitoUser) {
      resolve(null);
      return;
    }

      cognitoUser.getSession((err: Error | null, session: any) => {
        if (err || !session) {
          resolve(null);
          return;
        }

        resolve({
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
        });
      });
    } catch (err) {
      console.error("Get session error:", err);
      resolve(null);
    }
  });
}
