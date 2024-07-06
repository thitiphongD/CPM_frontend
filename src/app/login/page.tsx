"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="all-center pt-10">
      <div className="w-96">
        <p className="text-4xl">Welcome</p>
        <p className="text-[#7c7c7c]">Login to your account</p>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Username</p>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-96 placeholder-[#7c7c7c] p-2"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            />
          </div>
          <button className="primary w-96" type="submit">
            Login
          </button>
        </form>
        <br />
        <p className="text-[#7c7c7c] all-center">
          Don&apos;t have an account?
          <span className="ml-2 text-white underline">
            <Link href="/register">Register Now</Link>
          </span>
        </p>
        <br />
      </div>
    </div>
  );
};

export default LoginPage;
