"use client";

import React, { ChangeEvent, useCallback, useRef, FormEvent } from "react";
import { ApiCoinResponse, FormCrypto } from "@/app/interfaces/coin";
import useSWR from "swr";
interface Props {
  onBack: () => void;
  setPortfolioData: (data: any) => void;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CryptpForm: React.FC<Props> = ({ onBack, setPortfolioData }) => {
  const formRef = useRef<FormCrypto>({ id: 0, quantity: 0 });
  const { data: response } = useSWR<ApiCoinResponse>(
    "http://localhost:8080/coins",
    fetcher
  );

  const username = localStorage.getItem("username");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const newValue = name === "id" ? parseInt(value, 10) : parseFloat(value);
      formRef.current[name as keyof FormCrypto] = newValue as never;
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = {
        ...formRef.current,
        username,
      };

      console.log("payload", payload);

      try {
        const res = await fetch("http://localhost:8080/portfolio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const result = await res.json();
          setPortfolioData(result);
          onBack();
        }
      } catch (error) {
        console.error("Add coin error:", error);
      }
    },
    [onBack, setPortfolioData, username]
  );

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="relative p-6 rounded-lg max-w-md border bg-[rgb(40, 40, 40)] border-[#343434]">
        <p
          className="flex items-center justify-end font-bold text-xl cursor-pointer hover:text-customYellow"
          onClick={onBack}
        >
          X
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-[#7c7c7c] text-xl font-bold">
              Add a new cryptocurrency
            </p>
            <br />
            <select name="id" onChange={handleChange} className="select-class">
              <option value={0}>Select a coin</option>
              {response?.data.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Quantity</p>
            <input
              name="quantity"
              type="number"
              placeholder="Enter Quantity"
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="primary w-20" type="submit">
              Add
            </button>
            <button className="default w-20" onClick={onBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CryptpForm;
