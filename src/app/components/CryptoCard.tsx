"use client";
import React, { useEffect, useState } from "react";
import { CoinType } from "../interfaces/coin";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import { usePathname } from "next/navigation";
import { deleteCoinService } from "../services/coin.service";
import Icon from "@mdi/react";
import { mdiTrashCan } from "@mdi/js";

interface Props {
  data: CoinType[] | any;
  username: string | null;
  mutate: () => void;
  showDelete: boolean
}

const CryptoCard: React.FC<Props> = ({ data, username, mutate, showDelete }) => {
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
    if (window.confirm("Are you sure delete this coin?")) {
      try {
        const res = await deleteCoinService(id.toString(), username);
        if (res.ok) {
          alert(`Delete coin with ID ${id}`);
          mutate();
        } else {
          const error = await res.json();
          alert(`Fail to delete coin: ${error}`);
          console.error("fail to delete", error);
        }
      } catch (error) {
        console.error("Error delete coin:", error);
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

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((coin: CoinType) => (
          <div
            key={coin.id}
            className="coin-card border rounded-lg p-4 flex flex-col"
          >
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
              className="flex flex-col h-full no-underline"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <Image
                    src={coin.logo}
                    width={40}
                    height={40}
                    alt={`${coin.name} logo`}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold">{coin.name}</p>
                    <p className="text-sm text-gray-600">{coin.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ${coin.quote.USD.price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      coin.quote.USD.percent_change_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {coin.quantity && (
                    <p className="text-sm text-gray-600">
                      Quantity: {coin.quantity.toFixed(2)}
                    </p>
                  )}
                  {coin.amount && (
                    <p className="text-sm text-gray-600">
                      Amount: ${coin.amount.toFixed(2)}
                    </p>
                  )}
                </div>

                {showDelete && (
                  <button
                    className="danger"
                    onClick={() => onDeleteCoin(coin.id)}
                  >
                    <Icon path={mdiTrashCan} size={1} />
                  </button>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoCard;
