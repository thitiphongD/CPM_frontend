"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import CryptoForm from "@/app/components/forms/CryptoForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";
import { fetcherGET } from "@/app/services/user.service";
import Loading from "@/app/components/ui/Loading";
import { BtnText } from "@/app/interfaces/auth";

interface Coin {
  params: {
    id: string;
  };
}

const CoinPage: React.FC<Coin> = ({ params }) => {
  const { isAuth } = useAuth();
  const router = useRouter();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [btnText, setBtnText] = useState<string>("");
  const isAdd = searchParams.get("isAdd");
  const isEdit = searchParams.get("isEdit");

  useEffect(() => {
    if (isAdd) {
      setBtnText(BtnText.ADD_COIN);
    }
    if (isEdit) {
      setBtnText(BtnText.UPDATE_COIN);
    }
  }, [isAdd, isEdit]);

  const {
    data: coin,
    mutate,
    isLoading,
  } = useSWR(`http://localhost:8080/coin/${params.id}`, fetcherGET);

  const onOpenForm = () => {
    if (isAuth.login) {
      setOpenForm(true);
    } else {
      router.push("/login");
    }
  };

  const onCloseForm = () => {
    setOpenForm(false);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {!openForm ? (
        <div className="p-6 lg:py-6 lg:px-40">
          <div className="flex-center gap-4 block lg:hidden">
            <Image
              src={coin?.logo}
              width={30}
              height={30}
              alt={`${coin?.name} logo`}
            />
            <div className="flex-center gap-2">
              <p>{coin?.name}</p>
              <p>({coin?.symbol})</p>
            </div>
          </div>
          <br />

          <div className="flex justify-center items-center mb-4">
            <Image
              src={coin?.logo}
              width={70}
              height={70}
              alt={`${coin?.name} logo`}
            />
          </div>
          <div className="text-center">
            <p className="hidden lg:block text-2xl font-bold">
              {coin?.name} ({coin?.symbol})
            </p>
          </div>

          <div className="text-center mb-10">
            <p className="mb-4 mt-4">${coin?.quote.USD.price.toFixed(2)} USD</p>
            <div className="flex justify-center items-center gap-2">
              <p>{coin?.quote.USD.volume_24h.toFixed(2)}</p>
              <p>|</p>
              <p>{coin?.quote.USD.percent_change_24h.toFixed(2)}%</p>
              <p>|</p>
              <p>{coin?.quote.USD.market_cap.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">About</p>
            <br />
            <p>{coin?.description}</p>
          </div>
          <div className="lg:flex items-center justify-end">
            <button
              onClick={onOpenForm}
              className="primary w-full mt-10 lg:w-56 font-bold"
            >
              {btnText}
            </button>
          </div>
        </div>
      ) : (
        <CryptoForm data={coin} onBack={onCloseForm} refresh={mutate} />
      )}
    </>
  );
};

export default CoinPage;
