"use client";

import Link from "next/link";

export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Authentication Demo
          </h1>
          <p className="text-xl text-gray-600">
            Demo Authentication với Auth0 và AWS Cognito trên Next.js 16
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Auth0 Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-6 flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Auth0</h2>
                <p className="text-sm text-gray-500">OAuth2 / OpenID Connect</p>
              </div>
            </div>

            <p className="mb-6 text-gray-600">
              Auth0 là một identity platform phổ biến với nhiều tính năng như Social Login,
              Multi-factor Authentication, và User Management.
            </p>

            <div className="mb-6 space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Session-based authentication
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Social login support
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Built-in token refresh
              </div>
            </div>

            <Link
              href="/auth/auth0/login"
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Thử Auth0
            </Link>
          </div>

          {/* Cognito Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-6 flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100">
                <svg
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AWS Cognito</h2>
                <p className="text-sm text-gray-500">AWS Managed Service</p>
              </div>
            </div>

            <p className="mb-6 text-gray-600">
              AWS Cognito là dịch vụ authentication được quản lý bởi AWS, tích hợp tốt với
              các dịch vụ AWS khác và hỗ trợ JWT tokens.
            </p>

            <div className="mb-6 space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                JWT token-based
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                AWS ecosystem integration
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                User pool management
              </div>
            </div>

            <Link
              href="/auth/cognito/login"
              className="block w-full rounded-lg bg-orange-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-700"
            >
              Thử Cognito
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Tính năng Demo</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Auth0 Features:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>Login/Logout với Auth0</li>
                <li>User profile page</li>
                <li>Protected API routes</li>
                <li>Session management</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Cognito Features:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>Sign up/Sign in</li>
                <li>User profile với JWT</li>
                <li>Protected API với Bearer token</li>
                <li>Token management</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
