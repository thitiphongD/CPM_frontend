"use client";

import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import CryptoForm from "@/app/components/forms/CryptoForm";

interface Coin {
  params: {
    id: string;
  };
}

const CoinPage: React.FC<Coin> = ({ params }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: coin,
    error,
    mutate,
  } = useSWR(`http://localhost:8080/coin/${params.id}`, fetcher);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const onOpenForm = () => {
    setOpenForm(true);
  };

  const onCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      {!openForm ? (
        <div className="p-6 lg:py-6 lg:px-40">
          <div className="flex-center gap-4 block lg:hidden">
            <Image
              src={coin.logo}
              width={30}
              height={30}
              alt={`${coin.name} logo`}
            />
            <div className="flex-center gap-2">
              <p>{coin.name}</p>
              <p>({coin.symbol})</p>
            </div>
          </div>
          <br />

          <div className="flex justify-center items-center mb-4">
            <Image
              src={coin.logo}
              width={70}
              height={70}
              alt={`${coin.name} logo`}
            />
          </div>
          <div className="text-center">
            <p className="hidden lg:block text-2xl font-bold">
              {coin.name} ({coin.symbol})
            </p>
          </div>

          <div className="text-center mb-10">
            <p>${coin.quote.USD.price.toFixed(2)} USD</p>
            <div className="flex justify-center items-center gap-2">
              <p>{coin.quote.USD.volume_24h.toFixed(2)}</p>
              <p>|</p>
              <p> {coin.quote.USD.percent_change_24h.toFixed(2)}%</p>
              <p>|</p>
              <p>{coin.quote.USD.market_cap.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">About</p>
            <br />
            <p>{coin.description}</p>
          </div>
          <button onClick={onOpenForm} className="primary w-full mt-10 lg:w-40 font-bold">
            Buy
          </button>
        </div>
      ) : (
        <CryptoForm data={coin} onBack={onCloseForm} refresh={mutate} />
      )}
    </>
  );
};

export default CoinPage;
