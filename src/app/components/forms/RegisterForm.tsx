"use client";
import React, { ChangeEvent, useCallback, useRef, FormEvent } from "react";
import { FormRegister } from "@/app/interfaces/auth";
import { useRouter } from "next/navigation";
import { registerService } from "@/app/services/auth.service";

const RegisterForm = () => {
  const router = useRouter();
  const formRef = useRef<FormRegister>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formRef.current[name as keyof FormRegister] = value;
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await registerService(formRef.current);
        if (res.ok) {
          alert("Registration successful");
          router.push("/login");
        } else {
          const error = await res.json();
          alert(error.error);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [router],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Username</p>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="w-96 placeholder-[#7c7c7c] p-2"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Password</p>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Confirm Password</p>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
          onChange={handleChange}
        />
      </div>
      <button className="primary w-96" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
