"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ProvidersProps = {
  children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
