"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CoinType } from "../interfaces/coin";
import { usePathname } from "next/navigation";

type Props = {
  data: CoinType[];
};

const CryptoTable: React.FC<Props> = ({ data }) => {
  const pathname = usePathname();

  if (!data || !Array.isArray(data)) {
    return null;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
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
          {data.map((coin: CoinType) => (
            <tr key={coin.id}>
              <td className="text-center">{coin.cmc_rank}</td>
              <td className="cursor-pointer">
                <div className="flex-center gap-4">
                  <Image
                    src={coin.logo}
                    width={30}
                    height={30}
                    alt={`${coin.name} logo`}
                  />
                  <Link
                    className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
                    href={{
                      pathname: `/coin/${coin.id}`,
                      query:
                        pathname === "/"
                          ? { isAdd: "true" }
                          : pathname === "/portfolio"
                          ? { isEdit: "true" }
                          : {},
                    }}
                  >
                    {coin.name} ({coin.symbol})
                  </Link>
                </div>
              </td>
              <td>${coin.quote.USD.price.toFixed(2)}</td>
              <td
                className={`text-sm ${
                  coin.quote.USD.percent_change_1h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.quote.USD.percent_change_1h.toFixed(2)}%
              </td>
              <td
                className={`text-sm ${
                  coin.quote.USD.percent_change_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.quote.USD.percent_change_24h.toFixed(2)}%
              </td>
              <td
                className={`text-sm ${
                  coin.quote.USD.percent_change_7d >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.quote.USD.percent_change_7d.toFixed(2)}%
              </td>
              <td>${coin.quote.USD.volume_24h.toFixed(2)}</td>
              <td>${coin.quote.USD.market_cap.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
