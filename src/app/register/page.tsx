"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("register in with:", username, password, confirmPassword);
  };

  return (
    <div className="all-center pt-10">
      <div className="w-96">
        <p className="text-4xl">Get start</p>
        <p className="text-[#7c7c7c]">Create a new account</p>
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Confirm Password</p>
            <input
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            />
          </div>
          <button className="primary w-96" type="submit">
            Register
          </button>
        </form>
        <br />
        <p className="text-[#7c7c7c] all-center">
          Have an account?
          <span className="ml-2 text-white underline">
            <Link href="/login">Login Now</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
