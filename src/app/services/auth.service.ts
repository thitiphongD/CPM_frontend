import { FormLogin } from "../interfaces/auth";

export const loginService = async (payload: FormLogin) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};
