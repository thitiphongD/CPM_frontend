"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";

const CryptoTable: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("http://localhost:8080/coin-list", fetcher, {
    refreshInterval: 5000,
  });
  const coins = data?.data;

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <table className="w-3/4">
      <thead>
        <tr>
          <th className="w-20 h-12 text-center">Rank</th>
          <th>Coin</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>24h Volume</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin: any) => (
          <tr key={coin.id}>
            <td className="text-center">{coin.cmc_rank}</td>
            <td>
              {coin.name} ({coin.symbol})
            </td>
            <td>${coin.quote.USD.price.toFixed(2)}</td>
            <td>{coin.quote.USD.percent_change_1h.toFixed(2)}%</td>
            <td>{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
            <td>{coin.quote.USD.percent_change_7d.toFixed(2)}%</td>
            <td>${coin.quote.USD.volume_24h.toFixed(2)}</td>
            <td>${coin.quote.USD.market_cap.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
