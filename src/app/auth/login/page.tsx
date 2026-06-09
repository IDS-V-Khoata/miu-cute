'use client';

import { useState } from "react";
import Image from "next/image";
import { Box, InputCustom, InputPassWordCustom } from "../../components/Form";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log(email);
  }
  const handleEmailChange = (value: string) => {
    setEmail(value);
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  }
  return (
    <div className="bg-[#e5eaf3] flex min-h-screen w-screen items-center justify-center">
      <main className="mx-auto flex flex-col gap-8">
        <Box className="bg-[#e5eaf3] w-md flex flex-col gap-6 rounded-lg border border-solid p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image aria-hidden src="/assets/images/icon-logo.png" alt="Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold">Welcome</h1>
            <p className="text-center text-gray-600">Login with your email and password</p>
          </div>

          <div className="flex flex-col gap-4">
            <InputCustom icon={faEnvelope} name="email" type="email" placeholder="Email" value={email} changeValue={(e) => handleEmailChange(e)} autoComplete={""} positionIcon="right" />
            <InputPassWordCustom placeholder="Password" value={password} changeValue={(e) => handlePasswordChange(e)} />
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
