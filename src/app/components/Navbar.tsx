"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { isAuth, logoutAuth } = useAuth();
  const router = useRouter();

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
          <button
            className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
            onClick={handleLogout}
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
