"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Coin {
  params: {
    id: string;
  };
}

const CoinPage: React.FC<Coin> = ({ params }) => {
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/coin/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoinData(data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchCoinData();
  }, [params.id]);

  if (!coinData || !coinData.data) return null; // Handle case where coinData or coinData.data is null

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!coinData) return null;

  console.log('coin data', coinData)

  return (
    <div className="w-3/4 py-4 px-10">
      <div className="flex-center gap-4">
        <Image
          src={coinData.data[params.id]?.logo}
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <p>
          {coinData.data[params.id]?.name} ({coinData.data[params.id]?.symbol})
        </p>
      </div>
      <div className="py-4">
        <p>{coinData.data[params.id]?.description}</p>
      </div>
    </div>
  );
};

export default CoinPage;
