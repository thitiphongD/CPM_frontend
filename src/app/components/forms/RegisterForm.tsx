"use client";
import React from "react";
import { ZodErrors } from "../ZodErrors";
import { useFormState } from "react-dom";
import { registerUserAction } from "../actions/auth.action";

const INITIAL_STATE = {
  data: null,
};
const RegisterForm = () => {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

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
          placeholder="Enter password"
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
        />
        <ZodErrors error={formState?.zodErrors?.password} />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Confirm Password</p>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
        />
        <ZodErrors error={formState?.zodErrors?.confirmPassword} />
      </div>
      <button className="primary w-96" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
