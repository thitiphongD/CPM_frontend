"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import Loading from "../components/ui/Loading";
import { fetcherPOST } from "../utils/fetcher";

const PortfolioPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const {
    data: portfolioData,
    error,
    isLoading,
  } = useSWR(
    username ? `http://localhost:8080/portfolio/${username}` : null,
    fetcherPOST
  );

  if (error) return <div>Failed to load portfolio</div>;

  return (
    <div className="lg:px-40">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <CryptoCard data={portfolioData} username={username} />
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
