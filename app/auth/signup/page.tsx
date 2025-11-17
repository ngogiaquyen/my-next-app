// app/auth/signup/page.tsx
'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (res.ok) {
      alert("Đăng ký thành công! Đang chuyển đến đăng nhập...");
      router.push("/auth/signin");
    } else {
      alert("Email đã tồn tại hoặc lỗi server!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-4xl font-bold text-yellow-300 mb-8 text-center">Đăng Ký</h2>
        <input type="text" placeholder="Tên hiển thị (tùy chọn)" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 mb-4 bg-gray-700 rounded-lg text-white" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 mb-4 bg-gray-700 rounded-lg text-white" />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 mb-6 bg-gray-700 rounded-lg text-white" />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg">Đăng Ký</button>
      </form>
    </div>
  );
}