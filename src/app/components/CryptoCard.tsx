"use client";
import React from "react";
import { CoinData } from "../interfaces/coin";

interface Props {
  data?: CoinData[];
}

const CryptoCard: React.FC<Props> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="crypto-cards-container">
      {data.map((coin) => (
        <div key={coin.id} className="coin-card">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {coin.name}
          </h5>
          <p className="font-normal text-[#7c7c7c]">
            Symbol: {coin.symbol}
            <br />
            Rank: {coin.cmc_rank}
            <br />
            Price: {coin.price}
            <br />
            Percent Change (1h): {coin.percent_change_1h}
            <br />
            Percent Change (24h): {coin.percent_change_24h}
            <br />
            Percent Change (7d): {coin.percent_change_7d}
            <br />
            Volume (24h): {coin.volume_24h}
            <br />
            Market Cap: {coin.market_cap}
            <br />
            Quantity: {coin.quantity}
            <br />
            Amount: {coin.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CryptoCard;
