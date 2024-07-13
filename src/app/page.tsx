"use client";
import React, { useEffect, useState } from "react";
import CryptoTable from "./components/CryptoTable";
import useSWR from "swr";
import useIsMobile from "./hooks/useIsMobile";
import { useAuth } from "./auth/useAuth";
import Loading from "./components/ui/Loading";
import CryptoCard from "./components/CryptoCard";
import { fetcherGET } from "./utils/fetcher";


const Home = () => {
  const { data } = useSWR("http://localhost:8080/coins", fetcherGET);
  const isMobile = useIsMobile();
  const { isAuth } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [isAuth]);

  if (!data) return <Loading />;
  return (
    <>
      <div className="all-center pb-20">
        {isMobile ? (
          <CryptoCard data={data} username={username} />
        ) : (
          <CryptoTable data={data} />
        )}
      </div>
    </>
  );
};

export default Home;
