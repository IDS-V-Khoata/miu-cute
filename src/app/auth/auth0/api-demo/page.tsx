"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function Auth0ApiDemoPage() {
  const { user } = useUser();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callProtectedAPI = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const res = await fetch("/api/auth0/protected");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "API call failed");
      }

      setApiResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg">Bạn cần đăng nhập để xem trang này</p>
          <a
            href="/auth/auth0/login"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Auth0 API Demo</h1>
          <p className="text-gray-600">
            Trang này demo cách gọi protected API routes với Auth0 authentication
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6">
            <button
              onClick={callProtectedAPI}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Đang gọi API..." : "Gọi Protected API"}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
              <strong>Lỗi:</strong> {error}
            </div>
          )}

          {apiResponse && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">API Response:</h3>
              <pre className="overflow-auto text-sm text-gray-700">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Giải thích:</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>API route được bảo vệ bằng Auth0 session</li>
              <li>Cookie được gửi tự động với mỗi request</li>
              <li>Server-side có thể verify session và lấy user info</li>
            </ul>
          </div>

          <div className="mt-6">
            <a
              href="/auth/auth0/profile"
              className="text-blue-600 hover:underline"
            >
              ← Về Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
