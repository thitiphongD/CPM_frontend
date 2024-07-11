import { FormCryptoPayload } from "../interfaces/coin";

export const addCoinService = async (payload: FormCryptoPayload) => {
  const response = await fetch("http://localhost:8080/portfolio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};
