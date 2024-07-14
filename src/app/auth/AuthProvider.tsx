"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, createContext, useContext } from "react";

interface UserStatus {
  login: boolean;
  username: string | null;
}

interface AuthContextType {
  isAuth: UserStatus;
  isLoaded: boolean;
  loginAuth: (username: string) => void;
  logoutAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const withAuth = (WrapComponent: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const { isAuth, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded && !isAuth) {
        router.push("/");
      }
    }, [isAuth, isLoaded, router]);

    if (!isLoaded) {
      return null; // หรือ return <LoadingComponent />
    }

    if (!isAuth) {
      return null;
    }

    return <WrapComponent {...props} />;
  };
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<UserStatus>({
    login: false,
    username: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsAuth({
        login: true,
        username: username,
      });
    }
    setIsLoaded(true);
  }, []);

  const loginAuth = (username: string) => {
    localStorage.setItem("username", username);
    setIsAuth({
      login: true,
      username: username,
    });
  };

  const logoutAuth = () => {
    localStorage.removeItem("username");
    setIsAuth({
      login: false,
      username: null,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, isLoaded, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
