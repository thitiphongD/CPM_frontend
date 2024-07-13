"use client";
import React, { useEffect, useState } from "react";
import { CoinData } from "../interfaces/coin";
import DetailCoin from "../components/DetailCoin";
import CryptoForm from "../components/forms/CryptoForm";
import useSWR from "swr";
import CryptoCard from "../components/CryptoCard";
import Loading from "../components/ui/Loading";
import { fetcherPOST } from "../utils/fetcher";

enum Display {
  TABLE,
  DETAIL,
  FORM,
}

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
    isLoading,
    // mutate,
  } = useSWR(
    username ? `http://localhost:8080/portfolio/${username}` : null,
    fetcherPOST
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
    // mutate();
  };

  if (error) return <div>Failed to load portfolio</div>;

  return (
    <div className="lg:px-40">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {displayState === Display.TABLE && (
            <>
              <CryptoCard data={portfolioData} username={username} />
            </>
          )}
          {displayState === Display.DETAIL && selectedCoin && (
            <DetailCoin coinData={selectedCoin} onBack={handleClose} />
          )}

          {/* {displayState === Display.FORM && (
            <CryptoForm data={portfolioData} onBack={handleFormClose} refresh={mutate} />
          )} */}
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
