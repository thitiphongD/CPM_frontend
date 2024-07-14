export interface FormLogin {
  username: string;
  password: string;
}

export interface FormRegister {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthLogin {
  username: string;
  isLogin: boolean;
}

export interface FormCrypto {
  id: number;
  quantity: number;
}

export enum ErrorType {
  COIN_NOT_FOUND = "COIN_NOT_FOUND"
}
