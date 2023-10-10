import { ReactNode, createContext, useContext, useState } from "react";

type MobileMenuContext = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const MobileMenuContext = createContext<MobileMenuContext>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }

  return context;
};
