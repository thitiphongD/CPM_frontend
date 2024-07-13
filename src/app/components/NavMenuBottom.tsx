"use client";
import { mdiChartPie, mdiHome, mdiLogin, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavMenuBottom = () => {
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
    <div className="flex items-center justify-around border-t text-[#7c7c7c] border-[#343434] mt-10 fixed bottom-0 w-full px-10 lg:px-40 py-4 bg-[#1c1c1c]">
      <div className="text-center">
        <Link className="inline-flex flex-col items-center" href="/">
          <Icon path={mdiHome} size={1} />
          Home
        </Link>
      </div>
      {isAuth ? (
        <>
          <div className="text-center">
            <Link
              className="inline-flex flex-col items-center"
              href="/portfolio"
            >
              <Icon path={mdiChartPie} size={1} />
              Portfolio
            </Link>
          </div>
          <div className="text-center">
            <button
              className="inline-flex flex-col items-center"
              onClick={handleLogout}
            >
              <Icon path={mdiLogout} size={1} />
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <Link className="inline-flex flex-col items-center" href="/login">
            <Icon path={mdiLogin} size={1} />
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavMenuBottom;
