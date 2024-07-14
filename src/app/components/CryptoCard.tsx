"use client";
import React, { useEffect, useState } from "react";
import { CoinType } from "../interfaces/coin";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import { usePathname } from "next/navigation";
import { deleteCoinService } from "../services/coin.service";

interface Props {
  data: CoinType[] | any;
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

  const onDeleteCoin = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this coin?")) {
      try {
        const res = await deleteCoinService(id.toString(), username);
        if (res.ok) {
          alert(`Successfully deleted coin with ID ${id}`);
        } else {
          const error = await res.json();
          alert(`Failed to delete coin: ${error}`);
          console.log("fail to delete", error);
        }
      } catch (error) {
        console.error("Error deleting coin:", error);
        alert("An error occurred while deleting the coin.");
      }
    }
  };

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
        <div key={coin.id} className="coin-card w-full mt-2 border rounded-lg">
          <Link
            href={{
              pathname: `/coin/${coin.id}`,
              query:
                pathname === "/"
                  ? { isAdd: "true" }
                  : pathname === "/portfolio"
                  ? { isEdit: "true" }
                  : {},
            }}
            className="flex w-full justify-between items-start no-underline"
          >
            <div className="flex items-start gap-4 col-span-2">
              <Image
                src={coin.logo}
                width={30}
                height={30}
                alt={`${coin.name} logo`}
              />
              <div>
                <p className="font-bold">{coin.name} </p>
                <p className="font-normal text-[#7c7c7c]">{coin.symbol}</p>
                {coin.quantity && (
                  <p className="font-normal text-[#7c7c7c]">
                    Quantity {coin.quantity.toFixed(2)}
                  </p>
                )}
                {coin.amount && (
                  <p className="font-normal text-[#7c7c7c]">
                    Amount {coin.amount.toFixed(2)}
                  </p>
                )}
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
          {pathname === "/portfolio" && (
            <div className="flex justify-end">
              <button className="danger" onClick={() => onDeleteCoin(coin.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CryptoCard;
