"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setAuth(true);
    }
  }, [setAuth]);

  const logout = () => {
    localStorage.removeItem("username");
    setAuth(false);
    router.push("/");
  };

  console.log("auth", auth);

  return (
    <nav className="flex-center gap-10 border-b border-[#343434] p-4">
    <div className="flex-center gap-2">
      <h1 className="text-3xl font-bold text-customYellow">CPM</h1>
    </div>
    <div className="flex-center gap-4">
      <Link
        className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
        href="/"
      >
        Home
      </Link>

      {auth ? (
        <button
          className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <Link
          className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
          href="/login"
        >
          Login
        </Link>
      )}
    </div>
  </nav>
  );
};

export default Navbar;
