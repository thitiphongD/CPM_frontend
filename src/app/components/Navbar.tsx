"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className="flex items-center text-white space-x-10">
      <h1 className="text-3xl font-bold text-customYellow">CPM</h1>
      <div className="flex items-center space-x-4">
        <Link
          className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300"
          href={{
            pathname: "/",
          }}
        >
          Home
        </Link>
        <Link
          className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300"
          href={{
            pathname: "/login",
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
