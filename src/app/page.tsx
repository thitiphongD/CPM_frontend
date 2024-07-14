"use client";
import React from "react";
import CryptoTable from "./components/CryptoTable";
import useSWR from "swr";
import useIsMobile from "./hooks/useIsMobile";
import Loading from "./components/ui/Loading";
import CryptoCard from "./components/CryptoCard";
import { fetcherGET } from "./utils/fetcher";
import { useAuth } from "./auth/AuthProvider";


const Home = () => {
  const { data } = useSWR("http://localhost:8080/coins", fetcherGET);
  const isMobile = useIsMobile();
  const { isAuth } = useAuth();

  if (!data) return <Loading />;
  return (
    <>
      <div className="all-center pb-20">
        {isMobile ? (
          <CryptoCard data={data} username={isAuth.username} />
        ) : (
          <CryptoTable data={data} />
        )}
      </div>
    </>
  );
};

export default Home;
