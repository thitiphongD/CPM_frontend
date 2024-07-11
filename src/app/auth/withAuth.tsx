"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "./useAuth";

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
