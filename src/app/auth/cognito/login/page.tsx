"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/cognito/client";
import { cognitoConfig } from "@/lib/cognito/config";

export default function CognitoLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Cognito config is set
    if (!cognitoConfig.userPoolId || !cognitoConfig.clientId) {
      setConfigError(
        "Cognito chưa được cấu hình. Vui lòng thêm các biến môi trường sau vào .env.local:\n" +
        "NEXT_PUBLIC_COGNITO_REGION=us-east-1\n" +
        "NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx\n" +
        "NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id"
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const result = await signUp(formData.username, formData.password, formData.email);
        if (result.success) {
          setSuccess("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
          setTimeout(() => {
            setIsSignUp(false);
            setFormData({ ...formData, password: "" });
          }, 2000);
        } else {
          setError(result.error || "Đăng ký thất bại");
        }
      } else {
        const result = await signIn(formData.username, formData.password);
        if (result.success && result.tokens) {
          // Lưu tokens vào localStorage (trong production nên dùng httpOnly cookies)
          if (result.tokens.idToken) {
            localStorage.setItem("cognito_id_token", result.tokens.idToken);
            localStorage.setItem("cognito_access_token", result.tokens.accessToken || "");
          }
          setSuccess("Đăng nhập thành công!");
          setTimeout(() => {
            router.push("/auth/cognito/profile");
          }, 1000);
        } else {
          setError(result.error || "Đăng nhập thất bại");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  if (configError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg border border-amber-300 bg-amber-50 p-8 shadow-lg">
          <div className="mb-4 text-center">
            <h1 className="mb-2 text-2xl font-bold text-amber-900">Cấu hình chưa hoàn tất</h1>
            <p className="text-amber-800">AWS Cognito chưa được cấu hình</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">Vui lòng thêm vào .env.local:</p>
            <pre className="overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-800">
              {configError}
            </pre>
          </div>
          <div className="mt-4 text-center">
            <a
              href="/auth"
              className="text-blue-600 hover:underline"
            >
              ← Về trang Auth Demo
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {isSignUp ? "Đăng ký với Cognito" : "Đăng nhập với Cognito"}
          </h1>
          <p className="text-gray-600">AWS Cognito Authentication</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập username"
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required={isSignUp}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nhập email"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Đang xử lý..." : isSignUp ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isSignUp ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <a
            href="/auth/auth0/login"
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Thử Auth0 thay thế
          </a>
        </div>
      </div>
    </div>
  );
}
