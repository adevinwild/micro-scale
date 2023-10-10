"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MobileMenuProvider } from "~/contexts/mobile-menu";

type ProvidersProps = {
  children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class">
      <MobileMenuProvider>{children}</MobileMenuProvider>
    </ThemeProvider>
  );
};

export default Providers;
