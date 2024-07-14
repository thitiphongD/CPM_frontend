"use client";
import React, { useState } from "react";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import CoinNotFound from "../components/CoinNotFound";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/ui/Loading";
import { getPortfolioService } from "../services/user.service";
import { ErrorType } from "../interfaces/auth";

const PortfolioPage: React.FC = () => {
  const { isAuth } = useAuth();
  const username = isAuth.username;
  const [notFound, setNotFound] = useState<boolean>(false);

  const {
    data: portfolioData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    username ? ["http://localhost:8080/portfolio", username] : null,
    ([url, username]) => getPortfolioService(url, username),
    {
      onError: (err) => {
        if (err.message === ErrorType.COIN_NOT_FOUND) {
          setNotFound(true);
        }
      },
    }
  );

  return (
    <>
      {isLoading && <Loading />}
      <div className="lg:px-40">
        <div>
          {!notFound ? (
            <CryptoCard data={portfolioData} username={username} mutate={mutate} showDelete={true} />
          ) : (
            <CoinNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
