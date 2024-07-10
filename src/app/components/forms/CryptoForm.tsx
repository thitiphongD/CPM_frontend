"use client";

import React, {
  ChangeEvent,
  useCallback,
  useRef,
  FormEvent,
  useState,
} from "react";
import { ApiCoinResponse, FormCrypto } from "@/app/interfaces/coin";
import useSWR from "swr";
interface Props {
  onBack: () => void;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CryptpForm: React.FC<Props> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormCrypto>({
    id: 0,
    quantity: 0,
  });

  const { data: coinsResponse, error } = useSWR<ApiCoinResponse>(
    "http://localhost:8080/coins",
    fetcher
  );

  const formRef = useRef<FormCrypto>({ id: 0, quantity: 0 });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const newValue = name === "id" ? parseInt(value, 10) : parseFloat(value);
      formRef.current[name as keyof FormCrypto] = newValue as never;
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    },
    []
  );

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formRef.current);
    // ที่นี่คุณสามารถเพิ่มโค้ดสำหรับการส่งข้อมูลไปยัง API หรือดำเนินการอื่น ๆ ตามต้องการ
  }, []);

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
            <select
              name="id"
              onChange={handleChange}
              value={formData.id}
              className="select-class"
            >
              <option value={0}>Select a coin</option>
              {coinsResponse?.data.map((coin) => (
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
