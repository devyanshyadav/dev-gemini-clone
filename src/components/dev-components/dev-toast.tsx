"use client";
import geminiZustand from "@/utils/gemini-zustand";
import React, { useEffect } from "react";

const DevToast = () => {
  const { devToast, setToast } = geminiZustand();

  useEffect(() => {
    if (devToast) {
      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  }, [devToast]);
  return (
    devToast && (
      <div className="dev-toast bottom-6 left-6 text-left dark:text-black text-white w-80 text-sm font-light p-3 fixed z-50 dark:bg-rtlLight bg-rtlDark rounded">
        {devToast}
      </div>
    )
  );
};

export default DevToast;
