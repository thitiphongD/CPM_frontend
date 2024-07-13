"use client";
import React, { useEffect, useState } from "react";
import { CoinType } from "../interfaces/coin";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import { usePathname } from "next/navigation";

interface Props {
  data: CoinType[];
  username: string | null;
}

const CryptoCard: React.FC<Props> = ({ data, username }) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setTitle("Cryptocurrency");
    } else if (pathname === "/portfolio") {
      setTitle("Portfolio");
    }
  }, [pathname]);

  if (!data || !Array.isArray(data)) {
    return null;
  }  

  return (
    <div className="flex flex-col pt-2 px-4 w-full">
      {isMobile ? (
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold py-4">{title}</p>
          {username && (
            <div className="all-center w-12 h-12 border border-[#7c7c7c] rounded-full">
              <span className="text-xl font-bold text-white">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {username && (
            <span className="text-xl font-bold text-white py-4">
              Welcome {username}
            </span>
          )}
        </div>
      )}

      {data.map((coin: CoinType) => (
        <div
          key={coin.id}
          className="coin-card w-full mt-2 border rounded-lg flex justify-between items-start"
        >
          <Link
            href={`/coin/${coin.id}`}
            className="flex w-full justify-between items-start no-underline"
          >
            <div className="flex-center gap-4 col-span-2">
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
            <div className="text-right col-span-1">
              <p className="font-normal text-[#7c7c7c]">
                ${coin.quote.USD.price.toFixed(2)}
              </p>
              <p className="font-normal text-[#7c7c7c]">
                {coin.quote.USD.percent_change_24h.toFixed(2)}%
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CryptoCard;
