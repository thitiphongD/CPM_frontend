export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthLogin {
  username: string;
  isLogin: boolean;
}
