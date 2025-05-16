"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        router.push("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left */}
      <div className="w-[544px] bg-gradient-to-b from-[#DFF1FF] via-[#EFF5D1] to-[#FFFAA2] p-8 relative">
        <div className="absolute top-[141px] left-[203px] w-[200px] h-[200px]">
          <Image
            src="/image/image_3-removebg-preview.png"
            alt="logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <h2 className="absolute text-center font-semibold italic text-[40px] text-[#5C4538] top-[376px] left-[73px] w-[398px] h-[118px]">
          Hong! Meow! Welcome
        </h2>
        <p className="absolute text-center font-normal text-[24px] text-[#5C4538] top-[512px] left-[133px] w-[277px] h-[69px]">
          The room management system is ready.
        </p>
      </div>

      {/* Right */}
      <div className="flex-1 relative flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="relative w-[450px] flex flex-col items-center"
        >
          <p className="absolute top-[253px] text-center font-light text-[26px] text-[#5C4538] w-[449px]">
            Dear staff,
            <br />
            enter your password here!
          </p>

          {/* Username */}
          <div className="absolute top-[414px] w-full h-[50px] bg-[#F4F8F7] flex items-center px-4 rounded border border-gray-300">
            <Image
              src="/image/username-icon.png"
              alt="user"
              width={24}
              height={24}
            />
            <input
              id="username"
              type="text"
              required
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="ml-3 w-full bg-transparent outline-none text-[16px]"
            />
          </div>

          {/* Password */}
          <div className="absolute top-[494px] w-full h-[50px] bg-[#F4F8F7] flex items-center px-4 rounded border border-gray-300">
            <Image
              src="/image/lock-icon.png"
              alt="lock"
              width={24}
              height={24}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="ml-3 flex-1 bg-transparent outline-none text-[16px]"
            />
            <Image
              src={
                showPassword ? "/image/eye-open.png" : "/image/eye-closed.png"
              }
              alt="toggle"
              width={24}
              height={24}
              className="cursor-pointer ml-2"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="absolute top-[574px] w-[306px] h-[60px] bg-[#89D3FF] hover:bg-[#6fc3f0] text-white font-bold uppercase rounded-full transition"
          >
            Login
          </button>

          {/* Error */}
          {error && (
            <p className="absolute top-[644px] text-red-600 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
