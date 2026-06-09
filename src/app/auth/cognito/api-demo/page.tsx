"use client";

import { useState } from "react";
import { getCurrentSession } from "@/lib/cognito/client";
import { notFound } from "next/navigation";

export default function CognitoApiDemoPage() {
    notFound();
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callProtectedAPI = async () => {
        setLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            const session = await getCurrentSession();
            if (!session) {
                throw new Error("Not authenticated");
            }

            const res = await fetch("/api/cognito/protected", {
                headers: {
                    Authorization: `Bearer ${session.idToken}`,
                },
            });

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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-6">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Cognito API Demo</h1>
                    <p className="text-gray-600">
                        Trang này demo cách gọi protected API routes với Cognito JWT token
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
                            <li>API route được bảo vệ bằng JWT token từ Cognito</li>
                            <li>Token được gửi trong Authorization header</li>
                            <li>Server-side verify và decode JWT để lấy user info</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <a
                            href="/auth/cognito/profile"
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
