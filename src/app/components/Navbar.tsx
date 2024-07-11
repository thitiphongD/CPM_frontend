"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const { isAuth, logoutAuth } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [isAuth]);

  const handleLogout = () => {
    logoutAuth();
    router.push("/");
  };

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
        {isAuth ? (
          <div className="flex-center gap-4">
            <div className="all-center w-12 h-12 border border-[#7c7c7c] rounded-full">
              <Link className="text-xl font-bold text-white" href="/portfolio">
                {username?.charAt(0).toUpperCase()}
              </Link>
            </div>
            <button
              className="font-bold text-sm default"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link className="font-bold text-sm default" href="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
