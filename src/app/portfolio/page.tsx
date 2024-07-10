"use client";
import React, { useEffect, useState } from "react";
import { withAuth } from "../components/AuthContext";
import { CoinData } from "../interfaces/coin";
import DetailCoin from "../components/DetailCoin";
import CryptpForm from "../components/forms/CryptoForm";

enum Display {
  TABLE,
  DETAIL,
  FORM,
}

const PortfolioPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [displayState, setDisplayState] = useState<Display>(Display.TABLE);

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    setUsername(getUsername);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;

      try {
        const response = await fetch(
          `http://localhost:8080/portfolio/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fail to fetch portfolio");
        }
        const result = await response.json();
        setPortfolioData(result);
      } catch (err) {
        console.error("Error fetch portfolio:", err);
      }
    };

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  const handleCoinClick = (coin: CoinData) => {
    setDisplayState(Display.DETAIL);
    setData(coin);
  };

  const handleClose = () => {
    setDisplayState(Display.TABLE);
  };

  const handleFormOpen = () => {
    setDisplayState(Display.FORM);
  };

  const handleFormClose = () => {
    setDisplayState(Display.TABLE);
  };

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
              {portfolioData?.data.map((coin: CoinData) => (
                <tr
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="text-center">{coin.cmc_rank}</td>
                  <td>
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

      {displayState === Display.DETAIL && Display && (
        <DetailCoin coinData={data} onBack={handleClose} />
      )}

      {displayState === Display.FORM && <CryptpForm onBack={handleFormClose} />}
    </div>
  );
};

export default withAuth(PortfolioPage);
