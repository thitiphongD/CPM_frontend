import RegisterForm from "@/app/components/forms/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="all-center pt-10">
      <div className="w-96">
        <p className="text-4xl">Get start</p>
        <p className="text-[#7c7c7c]">Create a new account</p>
        <br />
        <RegisterForm />
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
