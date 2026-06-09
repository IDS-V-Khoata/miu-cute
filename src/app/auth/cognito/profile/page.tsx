"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentSession, signOut, getCurrentUser } from "@/lib/cognito/client";

export default function CognitoProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const session = await getCurrentSession();
        if (!session) {
          router.push("/auth/cognito/login");
          return;
        }

        // Decode JWT token để lấy user info (trong production nên verify token)
        try {
          const payload = JSON.parse(atob(session.idToken.split(".")[1]));
          setUserInfo({
            sub: payload.sub,
            email: payload.email,
            email_verified: payload.email_verified,
            username: payload["cognito:username"] || payload.preferred_username,
            ...payload,
          });
        } catch {
          setUserInfo({
            idToken: session.idToken.substring(0, 50) + "...",
            accessToken: session.accessToken.substring(0, 50) + "...",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user info");
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [router]);

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("cognito_id_token");
    localStorage.removeItem("cognito_access_token");
    router.push("/auth/cognito/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
          <h1 className="mb-2 text-xl font-bold text-red-800">Lỗi</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Cognito Profile</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {userInfo?.username || userInfo?.email || "User"}
            </h2>
            {userInfo?.email && (
              <p className="text-gray-600">{userInfo.email}</p>
            )}
          </div>

          <div className="mb-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
            <div className="space-y-3">
              {userInfo?.sub && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">User ID:</span>
                  <span className="text-gray-900">{userInfo.sub}</span>
                </div>
              )}
              {userInfo?.email_verified !== undefined && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email Verified:</span>
                  <span className={userInfo.email_verified ? "text-green-600" : "text-red-600"}>
                    {userInfo.email_verified ? "Yes" : "No"}
                  </span>
                </div>
              )}
              {userInfo?.username && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Username:</span>
                  <span className="text-gray-900">{userInfo.username}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Raw User Data:</h3>
            <pre className="overflow-auto text-xs text-gray-600">
              {JSON.stringify(userInfo, null, 2)}
            </pre>
          </div>

          <div className="mt-6 flex space-x-4">
            <a
              href="/auth/cognito/api-demo"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Xem API Demo
            </a>
            <a
              href="/"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Về trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
