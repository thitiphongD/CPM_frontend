"use client";

import React from "react";
import { ZodErrors } from "../ZodErrors";
import { useFormState } from "react-dom";
import { loginUserAction } from "../actions/auth.action";

const INITIAL_STATE = {
  data: null,
};

const LoginForm = () => {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  console.log(formState);

  return (
    <form action={formAction}>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Username</p>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
          className="w-96 placeholder-[#7c7c7c] p-2"
        />
        <ZodErrors error={formState?.zodErrors?.username} />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
        />
        <ZodErrors error={formState?.zodErrors?.password} />
      </div>
      <button className="primary w-96" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
