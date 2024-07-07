import React, { useEffect, useState } from "react";

interface Props {
  onBack: () => void;
}

const FormCrypto: React.FC<Props> = ({ onBack }) => {
  const [coin, setCoin] = useState<any>({
    name: "",
    quantity: 0,
  });

  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/coins");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, quantity } = coin;

    console.log(name, quantity);
    onBack();
  };

  console.log(data);

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
            <p className="text-[#7c7c7c]">Crypto</p>
            <input
              type="text"
              placeholder="Enter your Crypto"
              value={coin.name}
              onChange={(e) => setCoin({ ...coin, name: e.target.value })}
              required
              className="w-96 placeholder-[#7c7c7c] p-2"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#7c7c7c]">Quantity</p>
            <input
              type="number"
              placeholder="Enter your Quantity"
              value={coin.quantity}
              onChange={(e) => setCoin({ ...coin, quantity: e.target.value })}
              required
              className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            />
          </div>
          <button className="primary w-96" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCrypto;
