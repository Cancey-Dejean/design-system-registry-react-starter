"use client";
import { useEffect } from "react";

export const useCloseMobileMenuOnResize = (onClose: () => void) => {
  useEffect(() => {
    const handleResize = () => {
      onClose();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);
};
