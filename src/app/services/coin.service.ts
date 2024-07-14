import { FormCryptoPayload, FormCryptoUpdatePayload } from "../interfaces/coin";

export const addCoinService = async (payload: FormCryptoPayload) => {
  const res = await fetch("http://localhost:8080/portfolio/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res;
};

export const updateCoinService = async (id: string, payload: FormCryptoUpdatePayload) => {
  const res = await fetch(`http://localhost:8080/portfolio/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res;
};

export const getCoinData = async (id: string) => {
  const res = await fetch(`http://localhost:8080/coin/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const deleteCoinService = async (id: string, username: string | null) => {
  const res = await fetch(`http://localhost:8080/portfolio/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  return res;
};