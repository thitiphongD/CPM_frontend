"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthLogin } from "../interfaces/auth";

type AuthContextType = {
  isAuth: boolean;
  loginAuth: (username: string) => void;
  logoutAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);



//   const [isAuth, setIsAuth] = useState<AuthLogin>({
//     username: '',
//     isLogin: false
//   });

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsAuth(!!username);
  }, []);

  const loginAuth = (username: string) => {
    localStorage.setItem("username", username);
    setIsAuth(true);
  };

  const logoutAuth = () => {
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};



export const withAuth = (WrapComponent: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
      const { isAuth } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!isAuth) {
          router.push('/');
        }
      }, [isAuth, router]);
  
      if (!isAuth) {
        return null; // หรือ return <LoadingComponent />
      }
  
      return <WrapComponent {...props} />;
    };
  };
