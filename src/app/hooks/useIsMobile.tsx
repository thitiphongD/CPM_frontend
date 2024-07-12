import { useState, useCallback, useEffect } from "react";

const useIsMobile = (): boolean => {
  const getIsMobile = (): boolean => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  };

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile());

  const handleResize = useCallback(() => {
    setIsMobile(getIsMobile());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  return isMobile;
};

export default useIsMobile;
