"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "~/contexts/theme";

type ProvidersProps = {
  children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
