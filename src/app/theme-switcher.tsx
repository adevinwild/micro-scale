"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useThemeContext } from "~/contexts/theme";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <Button
      size="sm"
      className="flex items-center gap-x-2 dark:text-zinc-50"
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="sr-only">Toggle dark mode (currently disabled)</span>
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </Button>
  );
};

export default ThemeSwitcher;
