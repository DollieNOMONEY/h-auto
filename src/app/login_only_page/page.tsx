"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, redirect to your admin page
      router.push("/"); 
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001135] text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#001f5c] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Owner Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]"
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-bold text-black bg-[#daab35] rounded-md hover:bg-[#f3cd4d] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}