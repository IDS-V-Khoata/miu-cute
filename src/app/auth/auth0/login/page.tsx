"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth0LoginPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/auth/auth0/profile");
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
          <h1 className="mb-2 text-xl font-bold text-red-800">Lỗi đăng nhập</h1>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Đăng nhập với Auth0</h1>
          <p className="text-gray-600">Chọn phương thức đăng nhập</p>
        </div>

        <div className="space-y-4">
          <a
            href="/api/auth0/login"
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Đăng nhập với Auth0
          </a>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>

          <a
            href="/auth/cognito/login"
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Thử Cognito thay thế
          </a>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Authentication với Next.js 16</p>
        </div>
      </div>
    </div>
  );
}
