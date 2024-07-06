"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PortfolioPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("username");
    router.push("/")
  };
  
  return (
    <div>
      <h1>PortfolioPage</h1>
      <button onClick={logout}>Remove Username</button>
    </div>
  );
};
export default PortfolioPage;
