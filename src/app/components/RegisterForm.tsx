import Link from "next/link";
import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-customYellow hover:bg-hoverYellow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        <Link
          className="inline-block align-baseline font-bold text-sm text-white hover:text-customYellow"
          href={{
            pathname: "/login",
          }}
        >
          Already Account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
