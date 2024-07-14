import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { CoinType, FormCrypto, FormCryptoPayload, FormCryptoUpdatePayload } from "@/app/interfaces/coin";
import { addCoinService, updateCoinService } from "@/app/services/coin.service";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";
import { string } from "zod";

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

  console.log("isAdd", isAdd);
  console.log("isEdit", isEdit);

  const [amount, setAmount] = useState(0);

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

  useEffect(() => {
    const quantity = parseFloat(formData.quantity);
    const calculatedAmount = quantity * data.quote.USD.price;
    setAmount(isNaN(calculatedAmount) ? 0 : calculatedAmount);
  }, [formData.quantity, data.quote.USD.price]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      console.log(formData);
      
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
            alert('Update success');
            refresh();
            router.push("/portfolio");
          } else {
            alert('Update failed');
          }
        }
      } catch (error) {
        console.error("Operation error:", error);
        alert('An error occurred');
      }
    },
    [formData, isAdd, isEdit, refresh, router, username]
  );

  const displayAmount = isNaN(amount) ? 0 : amount;

  return (
    <div className="p-4">
      <div className="all-center gap-4">
        {/* <img src={data.logo} alt={data.name} className="w-8 h-8" /> */}
        <p>{data.name}</p>
        <p>{data.symbol}</p>
      </div>
      <div className="text-center">
        <p>ESTIMATE BUYING PRICE</p>
        <p>${data.quote.USD.price.toFixed(2)}</p>
      </div>
      <div className="text-center">
        How much do you want to buy?
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-2">
              <input
                name="quantity"
                type="number"
                placeholder="Enter Quantity"
                className="placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
                onChange={handleChange}
                value={formData.quantity || ""}
              />
            </div>
            <div>
              <p>Amount: ${displayAmount.toFixed(2)}</p>
              <p>Quantity: {formData.quantity || "0"}</p>
            </div>
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
