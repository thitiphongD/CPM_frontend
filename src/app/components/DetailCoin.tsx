import React from "react";
import { CoinData } from "../interfaces/coin";

interface Props {
  coinData: CoinData;
  onBack: () => void;
}

const DetailCoin: React.FC<Props> = ({ coinData, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="relative p-6 rounded-lg max-w-md border bg-[rgb(40, 40, 40)] border-[#343434]">
        <p
          className="flex items-center justify-end font-bold text-xl cursor-pointer hover:text-customYellow"
          onClick={onBack}
        >
          X
        </p>
        <h2 className="text-xl font-bold mb-4">
          {coinData.name} ({coinData.symbol})
        </h2>
        <p>Rank: {coinData.cmc_rank}</p>
        <p>Price: ${coinData.price}</p>
        <p>Quantity: {coinData.quantity}</p>
        <p>Amount (USD): ${coinData.amount}</p>
        <p>1h Change: {coinData.percent_change_1h}%</p>
        <p>24h Change: {coinData.percent_change_24h}%</p>
        <p>7d Change: {coinData.percent_change_7d}%</p>
      </div>
    </div>
  );
};

export default DetailCoin;
