"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Menu } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { createPortal } from "react-dom";
import { Button } from "~/components/ui/button";
import { useMobileMenu } from "~/contexts/mobile-menu";
import { fadeInUp } from "~/lib/animations";
import ThemeSwitcher from "./theme-switcher";
import { useEffect, useState } from "react";

export const MobileMenuToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggle } = useMobileMenu();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        onClick={toggle}
        size="sm"
        variant="ghost"
        className="block sm:hidden"
      >
        <Menu size={24} />
      </Button>
      {createPortal(
        <AnimatePresence mode="wait">
          {isOpen && <MobileMenu key="mobile-menu" />}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const MobileMenu = () => {
  const { close } = useMobileMenu();

  return (
    <motion.div
      {...fadeInUp}
      className="fixed top-0 left-0 w-full h-full p-4 overflow-hidden smooth bg-zinc-50 dark:bg-zinc-900 sm:hidden bg-opacity-80 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
    >
      <div className="relative flex flex-col gap-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-y-1">
            <h1
              className={clsx(
                plusJakartaSans.className,
                " text-zinc-900 dark:text-zinc-50 smooth"
              )}
            >
              <span className="text-yellow-500 font-extralight">µ</span>scale
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 smooth">
              Upscale your low quality images with AI up to 4x their original size
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <Button size="lg" className="gap-x-2">
            <Github size={16} />
            <span>Repository</span>
          </Button>
          <ThemeSwitcher size="lg" />
          <Button size="lg" variant="ghost" onClick={close}>
            Close Menu
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
