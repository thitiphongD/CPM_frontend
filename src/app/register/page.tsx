"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RegisterForm } from "../interfaces/auth";

const RegisterPage = () => {
  const router = useRouter();

  const [register, setRegister] = useState<RegisterForm>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, confirmPassword } = register;

    if (password !== confirmPassword) {
      alert("password not match");
    }
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
              value={register.username}
              onChange={(e) => setRegister({ ...register, username: e.target.value })} 
              required
              className="w-96 placeholder-[#7c7c7c] p-2"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Password</p>
            <input
              type="password"
              placeholder="Enter password"
              value={register.password}
              onChange={(e) => setRegister({ ...register, password: e.target.value })} 
              required
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Confirm Password</p>
            <input
              type="password"
              placeholder="Enter confirm password"
              value={register.confirmPassword}
              onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })} 
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

export default RegisterPage;
