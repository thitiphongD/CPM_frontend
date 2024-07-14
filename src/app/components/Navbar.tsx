"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";

const Navbar = () => {
  const { isAuth, logoutAuth } = useAuth();
  const router = useRouter();
  const username = isAuth.username;
  
  const handleLogout = () => {
    logoutAuth();
    router.push("/");
  };

  return (
    <nav className="flex-center-between gap-10 border-b border-[#343434] py-4 px-40">
      <div className="flex-center gap-4">
        <h1 className="text-3xl font-bold text-customYellow">CPM</h1>
        <Link
          className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
          href="/"
        >
          Home
        </Link>
      </div>
      <div className="flex-center gap-4">
        {isAuth ? (
          <div className="flex-center gap-4">
            <Link
              className="inline-flex flex-col items-center default font-bold text-sm "
              href="/portfolio"
            >
              Portfolio
            </Link>
            <button
              className="font-bold text-sm default"
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
          <Link className="font-bold text-sm default" href="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
