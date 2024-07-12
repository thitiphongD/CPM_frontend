"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Loading from "./ui/Loading";
import Image from "next/image";

const CryptoTable: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  //   const { data, error } = useSWR("http://localhost:8080/coin-list", fetcher, {
  //     refreshInterval: 5000,
  //   });
  const { data } = useSWR("http://localhost:8080/coinsList/v2", fetcher);
  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <>
          <div className="coin-card-list w-full flex flex-wrap justify-between">
            {data.map((coin: any) => (
              <div
                key={coin.id}
                className="coin-card w-full p-4 m-2 border rounded-lg flex justify-between items-start"
              >
                <div className="flex-center gap-4">
                  <Image
                    src={coin.logo}
                    width={30}
                    height={30}
                    alt={`${coin.name} logo`}
                  />
                  <div>
                    <p className="font-bold">{coin.name}</p>
                    <p className="font-normal text-[#7c7c7c]">{coin.symbol}</p>
                  </div>
                </div>
                <p className="font-normal text-[#7c7c7c]">
                  ${coin.quote.USD.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="coin-card-list w-full justify-between items-start">
            <div className="flex-center gap-4">
              <span>image</span>
              <div>
                <p>name</p>
                <p className="font-normal text-[#7c7c7c]">symbol</p>
              </div>
            </div>
            <p className="font-normal text-[#7c7c7c]">price</p>
          </div>
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
              {data.map((coin: any) => (
                <tr key={coin.id}>
                  <td className="text-center">{coin.cmc_rank}</td>
                  <td className="cursor-pointer">
                    <div className="flex-center gap-4">
                      <Image
                        src={coin.logo}
                        width={30}
                        height={30}
                        alt="Picture of the author"
                      />
                      <Link
                        className="inline-block align-baseline font-bold text-sm hover:text-customYellow"
                        href={`/coin/${coin.id}`}
                      >
                        {coin.name} ({coin.symbol})
                      </Link>
                    </div>
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
        </>
      )}
    </>
  );
};

export default CryptoTable;
