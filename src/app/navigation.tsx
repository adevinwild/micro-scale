import clsx from "clsx";
import { Github } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "~/components/ui/button";
import Divider from "~/components/ui/divider";
import { MobileMenuToggler } from "./mobile-menu";
import ThemeSwitcher from "./theme-switcher";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

const NavigationMenu = () => {
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between w-full p-4 border-b backdrop-filter backdrop-blur-md dark:border-zinc-700 smooth z-[9999]">
      <div className="flex flex-col gap-y-1">
        <h1
          className={clsx(
            plusJakartaSans.className,
            " text-zinc-900 dark:text-zinc-50 smooth text-xl"
          )}
        >
          <span className="font-medium text-yellow-500">µ</span>scale
        </h1>
        <p className="hidden text-xs text-zinc-6 00 dark:text-zinc-400 smooth sm:block">
          Upscale your low quality images with AI up to 4x their original size
        </p>
      </div>
      <MobileMenuToggler />
      <div className="items-center hidden gap-x-4 sm:flex">
        <ThemeSwitcher size="sm" />

        <Divider orientation="vertical" />
        <a
          href="https://github.com/adevinwild/micro-scale"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" className="flex items-center gap-x-2">
            <Github size={16} />
            <span>Repository</span>
          </Button>
        </a>
      </div>
    </nav>
  );
};

export default NavigationMenu;
