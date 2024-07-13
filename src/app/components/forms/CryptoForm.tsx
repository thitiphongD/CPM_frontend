"use client";

import React, { ChangeEvent, useCallback, useRef, FormEvent } from "react";
import {
  CoinType,
  FormCrypto,
  FormCryptoPayload,
} from "@/app/interfaces/coin";
import { addCoinService } from "@/app/services/coin.service";

interface Props {
  data: CoinType;
  onBack: () => void;
  refresh: () => void;
}

const CryptoForm: React.FC<Props> = ({ onBack, refresh, data }) => {
  const form = useRef<FormCrypto>({ id: 0, quantity: 0 });
  const username = localStorage.getItem("username");

  console.log('CryptoForm data', data);
  

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const newValue = name === "id" ? parseInt(value, 10) : parseFloat(value);
      form.current[name as keyof FormCrypto] = newValue as never;
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload: FormCryptoPayload = {
        ...form.current,
        username,
      };
      try {
        const res = await addCoinService(payload);
        if (res.ok) {
          refresh();
          onBack();
        }
      } catch (error) {
        console.error("Add coin error:", error);
      }
    },
    [onBack, refresh, username],
  );

  return (
    <h1>ddasddasd</h1>
  );
};

export default CryptoForm;
