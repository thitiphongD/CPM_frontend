"use client";
import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-white text-4xl font-bold mb-6 text-center">
        Crypto Portfolio Manager
      </h2>
      <div className="bg-[#232323] border p-8 rounded w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
