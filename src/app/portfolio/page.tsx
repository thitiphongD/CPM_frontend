"use client";
import React from "react";
import { withAuth } from "../components/AuthContext";

const PortfolioPage: React.FC = () => {
  return (
    <div>
      <h1>PortfolioPage</h1>
      {/* เนื้อหาของหน้า Portfolio */}
    </div>
  );
};

export default withAuth(PortfolioPage);