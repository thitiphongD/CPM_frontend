"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const Navbar:React.FC = () => {
  const { isAuth, logoutAuth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutAuth();
    router.push("/");
  };

  const username = localStorage.getItem("username");

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
            <button
              className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className="all-center w-12 h-12 border border-[#7c7c7c] rounded-full">
              <span className="text-xl font-bold text-white">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
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
