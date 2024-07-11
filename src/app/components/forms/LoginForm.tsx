"use client";

import React, { ChangeEvent, useCallback, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FormLogin } from "@/app/interfaces/auth";
import { useAuth } from "@/app/auth/useAuth";
import { loginService } from "@/app/services/auth.service";

const LoginForm = () => {
  const { loginAuth } = useAuth();
  const router = useRouter();
  const formRef = useRef<FormLogin>({ username: "", password: "" });
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formRef.current[name as keyof FormLogin] = value;
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await loginService(formRef.current);
        if (res.status === 401) {
          alert("Username or password incorrect");
        }
        if (res.ok) {
          loginAuth(formRef.current.username);
          router.push("/portfolio");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [loginAuth, router],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Username</p>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          className="w-96 placeholder-[#7c7c7c] p-2"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Password</p>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
          onChange={handleChange}
        />
      </div>
      <button className="primary w-96" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
