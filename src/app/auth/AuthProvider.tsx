"use client";
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsAuth(!!username);
    setIsLoaded(true);
  }, []);

  const loginAuth = (username: string) => {
    localStorage.setItem("username", username);
    setIsAuth(true);
  };

  const logoutAuth = () => {
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, isLoaded, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
