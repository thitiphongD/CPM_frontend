import React, { useState } from "react";
import { LoginType } from "../interfaces/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [login, setLogin] = useState<LoginType>({
    username: "",
    password: "",
  });
  const { loginAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = login;
    console.log("Logging in with:", username, password);

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login successful", data);
        loginAuth(username);
        router.push("/portfolio")
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
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
          required
          className="w-96 placeholder-[#7c7c7c] p-2"
        />
      </div>
      <div className="mb-4">
        <p className="text-[#7c7c7c]">Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          required
          className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
        />
      </div>
      <button className="primary w-96" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
