"use client";
import React from "react";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import Loading from "../components/ui/Loading";
import { fetcherPOST } from "../utils/fetcher";
import { useAuth } from "../auth/AuthProvider";

const PortfolioPage: React.FC = () => {
  const { isAuth } = useAuth();

  const {
    data: portfolioData,
    error,
    isLoading,
  } = useSWR(
    isAuth.username ? `http://localhost:8080/portfolio/${isAuth.username}` : null,
    fetcherPOST
  );

  if (error) return <div>Failed to load portfolio</div>;

  return (
    <div className="lg:px-40">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <CryptoCard data={portfolioData} username={isAuth.username} />
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
