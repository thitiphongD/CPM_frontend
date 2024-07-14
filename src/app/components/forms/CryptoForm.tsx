import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  FormEvent,
} from "react";
import {
  CoinType,
  FormCrypto,
  FormCryptoPayload,
  FormCryptoUpdatePayload,
} from "@/app/interfaces/coin";
import { addCoinService, updateCoinService } from "@/app/services/coin.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

interface Props {
  data: CoinType;
  onBack: () => void;
  refresh: () => void;
}

const CryptoForm: React.FC<Props> = ({ onBack, refresh, data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuth } = useAuth();
  const username = isAuth.username;

  const [formData, setFormData] = useState<FormCrypto>({
    id: data.id,
    quantity: "",
  });

  const isAdd = searchParams.get("isAdd");
  const isEdit = searchParams.get("isEdit");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const quantity = parseFloat(formData.quantity);
    const calculatedAmount = quantity * data.quote.USD.price;
    setAmount(isNaN(calculatedAmount) ? 0 : calculatedAmount);
  }, [formData.quantity, data.quote.USD.price]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      const newValue = name === "id" ? parseInt(value, 10) : parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(newValue) ? 0 : newValue,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const quantity = parseFloat(formData.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
      }

      try {
        if (isAdd) {
          const payload: FormCryptoPayload = {
            ...formData,
            username,
          };
          const res = await addCoinService(payload);
          if (res.ok) {
            alert("buy success");
            refresh();
            router.push("/portfolio");
          }
        }
        if (isEdit && formData.id) {
          const payloadUpdate: FormCryptoUpdatePayload = {
            quantity,
            username,
          };
          const update = await updateCoinService(formData.id, payloadUpdate);
          if (update.ok) {
            alert("Update success");
            refresh();
            router.push("/portfolio");
          } else {
            alert("Update fail");
          }
        }
      } catch (error) {
        console.error("error:", error);
        alert("An error occurred");
      }
    },
    [formData, isAdd, isEdit, refresh, router, username]
  );

  const displayAmount = isNaN(amount) ? 0 : amount;

  return (
    <div className="p-4">
      <button onClick={onBack} className="pl-10 pt-2 lg:hidden">
        <Icon path={mdiArrowLeft} size={1.5} />
      </button>
      <div className="all-center gap-4 pt-2">
        <Image
          src={data.logo}
          width={40}
          height={40}
          alt={`${data.name} logo`}
          className="rounded-full"
        />
        <div className="flex items-center gap-1">
          <p>{data.name}</p>
          <p>({data.symbol})</p>
        </div>
      </div>
      <div className="text-center mt-10 leading-loose">
        <p className="font-bold text-md text-[#7c7c7c]">
          ESTIMATE BUYING PRICE
        </p>
        <p className="text-2xl font-bold">${data.quote.USD.price.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <p className="mb-4 text-center font-bold text-md text-[#7c7c7c]"> How much do you want to buy?</p>
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-2 items-center">
              <input
                name="quantity"
                type="number"
                placeholder="Enter Quantity"
                className="placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
                onChange={handleChange}
                value={formData.quantity || ""}
                required
              />
              <p className="font-bold text-xl text-[#7c7c7c]">{data.symbol}</p>
            </div>
            <div>
              <p className="font-bold text-md text-[#7c7c7c]">
                Quantity: {formData.quantity || "0"}
              </p>
              <p className="font-bold text-md text-[#7c7c7c]">
                Amount: ${displayAmount.toFixed(2)}
              </p>
            </div>
            <br />
            <button className="primary w-full" type="submit">
              Buy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CryptoForm;
