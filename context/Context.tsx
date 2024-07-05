"use client";

import React, { createContext, useState } from "react";

interface ContextType {
  output: { result: { text: string }[] };
  setOutput: React.Dispatch<
    React.SetStateAction<{ result: { text: string }[] }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CraftoContext = createContext<ContextType>({
  output: { result: [] },
  setOutput: () => {},
  loading: false,
  setLoading: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [output, setOutput] = useState<{ result: { text: string }[] }>({
    result: [],
  });
  const [loading, setLoading] = useState(false);

  return (
    <CraftoContext.Provider value={{ output, setOutput, loading, setLoading }}>
      {children}
    </CraftoContext.Provider>
  );
};
