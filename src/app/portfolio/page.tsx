"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { withAuth } from "../components/AuthContext";

const PortfolioPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    setUsername(getUsername);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;

      try {
        const response = await fetch(
          `http://localhost:8080/portfolio/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }
        const result = await response.json();
        setPortfolioData(result);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  return (
    <div>
      <h1>PortfolioPage</h1>
      {/* เนื้อหาของหน้า Portfolio */}
    </div>
  );
};

export default withAuth(PortfolioPage);
