"use client";
import React, { useEffect, useState } from "react";
import { withAuth } from "../components/AuthContext";
import { CoinData } from "../interfaces/coin";
import DetailCoin from "../components/DetailCoin";
import CryptoForm from "../components/forms/CryptoForm";
import useSWR from "swr";

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
    fetcher
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
  if (isValidating) return <div>Loading...</div>;

  return (
    <div className="all-center">
      {displayState === Display.TABLE && (
        <div>
          <table className="w-3/4">
            <thead>
              <tr>
                <th className="w-20 h-12 text-center">Rank</th>
                <th>Coin</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount (USD)</th>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData?.data?.map((coin: CoinData) => (
                <tr
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="text-center">{coin.cmc_rank}</td>
                  <td className="cursor-pointer hover:text-customYellow font-bold">
                    {coin.name} ({coin.symbol})
                  </td>
                  <td>${coin.price}</td>
                  <td>{coin.quantity.toFixed(2)}</td>
                  <td>${coin.amount}</td>
                  <td>{coin.percent_change_1h}%</td>
                  <td>{coin.percent_change_24h}%</td>
                  <td>{coin.percent_change_7d}%</td>
                  <td>${coin.volume_24h}</td>
                  <td>${coin.market_cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="primary mt-4" onClick={handleFormOpen}>
            Add
          </button>
        </div>
      )}

      {displayState === Display.DETAIL && selectedCoin && (
        <DetailCoin coinData={selectedCoin} onBack={handleClose} />
      )}

      {displayState === Display.FORM && (
        <CryptoForm onBack={handleFormClose} mutate={mutate} />
      )}
    </div>
  );
};

export default withAuth(PortfolioPage);
