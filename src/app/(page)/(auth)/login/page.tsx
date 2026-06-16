'use client';

import { useState } from "react";
import Image from "next/image";
import { Box, InputCustom, InputPassWordCustom } from "@/app/components/Form";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { MdOutlineLogin } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLogin, setIsLogin] = useState(true);

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
        {
          isLogin ? (
            <Box className="bg-[#e5eaf3] w-sm lg:w-md flex flex-col gap-6 rounded-lg border border-solid p-4 md:p-6 lg:p-8 shadow-2xl transition-all duration-300 ease-in-out">
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
                  className="rounded bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer flex items-center justify-center gap-1"
                >
                  <MdOutlineLogin size={18} />
                  <span>Login</span>
                </button>
                <div className="flex justify-end gap-1">
                  <p className="text-gray-600">Don't have an account? </p>
                  <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:text-blue-700 cursor-pointer">Sign up</button>
                </div>
              </div>
            </Box>
          ) : (
            <Box className="bg-[#e5eaf3] w-sm lg:w-md flex flex-col gap-4 rounded-lg border border-solid p-4 md:p-6 lg:p-8 shadow-2xl transition-all duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out">
                <Image aria-hidden src="/assets/images/icon-logo.png" alt="Logo" width={60} height={60} />
                <h1 className="text-4xl font-bold">Welcome</h1>
                <p className="text-center text-gray-600">Sign up with your email and password</p>
              </div>
              <div className="flex flex-col gap-4">
                <InputCustom icon={faEnvelope} name="email" type="email" placeholder="Email" value={""} changeValue={setEmail} autoComplete={""} positionIcon="right" />
                <InputPassWordCustom placeholder="Password" value={""} changeValue={setPassword} />
                <InputPassWordCustom placeholder="Confirm Password" value={""} changeValue={setPassword} />
                <button
                  onClick={handleLogin}
                  className="cursor-pointer rounded bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center gap-1"
                >
                  <BiLogInCircle size={18} />
                  <span>Sig Up</span>
                </button>
                <div className="flex gap-1 items-center justify-end">
                  <p className="text-center text-gray-600">Already have an account? </p>
                  <button onClick={() => setIsLogin(true)} className="cursor-pointer text-blue-600 hover:text-blue-700">Login</button>
                </div>
              </div>
            </Box>
          )
        }
      </main>
    </div>
  );
}
