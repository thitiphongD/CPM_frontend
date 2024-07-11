export type AuthContextType = {
  isAuth: boolean;
  isLoaded: boolean;
  loginAuth: (username: string) => void;
  logoutAuth: () => void;
};
