import React from "react";
import { CoinData } from "../interfaces/coin";

interface Props {
  coinData: CoinData;
  onBack: () => void;
}

const DetailCoin: React.FC<Props> = ({ coinData, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>
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
  );
};

export default DetailCoin;
