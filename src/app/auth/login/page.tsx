'use client';

import { useState } from "react";
import Image from "next/image";
import { Box, InputCustom, InputPassWordCustom } from "../../components/Form";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      router.push("/miu-cute");
    } else {
      alert("Login thất bại");
    }
  }

  return (
    <div className="bg-[#e5eaf3] flex min-h-screen w-screen items-center justify-center">
      <main className="mx-auto flex flex-col gap-8">
        <Box className="bg-[#e5eaf3] w-sm lg:w-md flex flex-col gap-6 rounded-lg border border-solid p-4 md:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image aria-hidden src="/assets/images/icon-logo.png" alt="Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold">Welcome</h1>
            <p className="text-center text-gray-600">Login with your email and password</p>
          </div>

          <div className="flex flex-col gap-4">
            <InputCustom icon={faEnvelope} name="email" type="email" placeholder="Email" value={email} changeValue={setEmail} autoComplete={""} positionIcon="right" />
            <InputPassWordCustom placeholder="Password" value={password} changeValue={setPassword} />
            <button
              onClick={handleLogin}
              className="rounded bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
            >
              Login
            </button>
          </div>
        </Box>
      </main>
    </div>
  );
}
