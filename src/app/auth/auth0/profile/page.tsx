"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Auth0ProfilePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
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
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/auth0/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Auth0 Profile</h1>
          <a
            href="/api/auth0/logout"
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Đăng xuất
          </a>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center space-x-6">
            {user.picture && (
              <Image
                src={user.picture}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name || "User"}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              {user.nickname && (
                <p className="text-sm text-gray-500">@{user.nickname}</p>
              )}
            </div>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="text-gray-900">{user.sub}</span>
              </div>
              {user.email_verified !== undefined && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email Verified:</span>
                  <span className={user.email_verified ? "text-green-600" : "text-red-600"}>
                    {user.email_verified ? "Yes" : "No"}
                  </span>
                </div>
              )}
              {user.updated_at && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <span className="text-gray-900">
                    {new Date(user.updated_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Raw User Data:</h3>
            <pre className="overflow-auto text-xs text-gray-600">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          <div className="mt-6 flex space-x-4">
            <a
              href="/auth/auth0/api-demo"
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
