"use client";
import React from "react";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import { useAuth } from "../auth/AuthProvider";
import { fetchUser } from "../utils/fetcher";
import Loading from "../components/ui/Loading";

const PortfolioPage: React.FC = () => {
  const { isAuth } = useAuth();
  const username = isAuth.username;

  const {
    data: portfolioData,
    error,
    isLoading,
  } = useSWR(
    username ? ["http://localhost:8080/portfolio", username] : null,
    ([url, username]) => fetchUser(url, username)
  );

  if (error) return <div>Failed to load portfolio</div>;
  if (isLoading) return <Loading />;
  
  return (
    <div className="lg:px-40">
      <div>
        <CryptoCard data={portfolioData} username={username} />
      </div>
    </div>
  );
};

export default PortfolioPage;
