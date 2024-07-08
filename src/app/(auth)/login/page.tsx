import LoginForm from "@/app/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-96">
      <p className="text-4xl">Welcome</p>
      <p className="text-[#7c7c7c]">Login to your account</p>
      <br />
      <LoginForm />
      <br />
      <p className="text-[#7c7c7c] all-center">
        Don&apos;t have an account?
        <span className="ml-2 text-white underline">
          <Link href="/register">Register Now</Link>
        </span>
      </p>
      <br />
    </div>
  );
};

export default LoginPage;
