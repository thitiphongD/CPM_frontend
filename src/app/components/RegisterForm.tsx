"use client";
import React, { useState } from "react";
import { RegisterType } from "../interfaces/auth";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [register, setRegister] = useState<RegisterType>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, confirmPassword } = register;

    if (password !== confirmPassword) {
      alert("password not match");
    }
    
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Username</p>
        <input
          type="text"
          placeholder="Enter your username"
          value={register.username}
          onChange={(e) =>
            setRegister({ ...register, username: e.target.value })
          }
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
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
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
          onChange={(e) =>
            setRegister({ ...register, confirmPassword: e.target.value })
          }
          required
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
        />
      </div>
      <button className="primary w-96" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
