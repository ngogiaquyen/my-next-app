// app/auth/signin/page.tsx
'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    if (res?.ok) router.push("/");
    else alert("Sai email hoặc mật khẩu!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-4xl font-bold text-yellow-300 mb-8 text-center">Đăng Nhập</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 mb-4 bg-gray-700 rounded-lg text-white" />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 mb-6 bg-gray-700 rounded-lg text-white" />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg">Đăng Nhập</button>
        <p className="text-center mt-6 text-gray-400">
          Chưa có tài khoản? <a href="/auth/signup" className="text-yellow-400 hover:underline font-bold">Đăng ký ngay</a>
        </p>
      </form>
    </div>
  );
}