"use client";
import React, { useEffect, useState } from "react";
import { CoinData } from "../interfaces/coin";
import DetailCoin from "../components/DetailCoin";
import CryptoForm from "../components/forms/CryptoForm";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import Loading from "../components/ui/Loading";

enum Display {
  TABLE,
  DETAIL,
  FORM,
}

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  return response.json();
};

const PortfolioPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [displayState, setDisplayState] = useState<Display>(Display.TABLE);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const {
    data: portfolioData,
    error,
    isValidating,
    mutate,
  } = useSWR(
    username ? `http://localhost:8080/portfolio/${username}` : null,
    fetcher,
  );
  
  const handleCoinClick = (coin: CoinData) => {
    setDisplayState(Display.DETAIL);
    setSelectedCoin(coin);
  };

  const handleClose = () => {
    setDisplayState(Display.TABLE);
    setSelectedCoin(null);
  };

  const handleFormOpen = () => {
    setDisplayState(Display.FORM);
  };

  const handleFormClose = () => {
    setDisplayState(Display.TABLE);
    mutate();
  };

  if (error) return <div>Failed to load portfolio</div>;

  return (
    <div className="px-40">
      {isValidating ? (
        <Loading />
      ) : (
        <>
          {displayState === Display.TABLE && (
            <>
              <button className="primary mt-4" onClick={handleFormOpen}>
                Add
              </button>
              {/* <CryptoCard data={portfolioData?.data} /> */}
            </>
          )}
          {displayState === Display.DETAIL && selectedCoin && (
            <DetailCoin coinData={selectedCoin} onBack={handleClose} />
          )}

          {displayState === Display.FORM && (
            <CryptoForm data={portfolioData} onBack={handleFormClose} refresh={mutate} />
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
