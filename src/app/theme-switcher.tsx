"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

const ThemeSwitcher = ({ size }: { size: ButtonProps["size"] }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="w-8 h-8 bg-white border" />;

  return (
    <Button
      size={size}
      className="flex items-center gap-x-2 dark:text-zinc-50"
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="sr-only">Toggle dark mode </span>
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      <span className="block sm:hidden">Toggle dark mode </span>
    </Button>
  );
};

export default ThemeSwitcher;
