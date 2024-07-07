"use client";
import React, { useEffect, useState } from "react";
import { withAuth } from "../components/AuthContext";

const PortfolioPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        if (!username) {
          throw new Error("Username not found in localStorage");
        }

        const url = `http://localhost:8080/portfolio`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // Optionally add other headers if needed
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }

        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Handle error state or display error message
      }
    };

    if (username) {
      fetchPortfolioData();
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
