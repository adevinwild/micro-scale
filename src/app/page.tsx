import clsx from "clsx";
import { Github } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "~/components/ui/button";
import Divider from "~/components/ui/divider";
import Generate from "~/domain/generate";
import ThemeSwitcher from "./theme-switcher";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid content-start gap-y-4 justify-center min-h-[100svh] items-center p-6 lg:p-16 h-full bg-zinc-100 dark:bg-zinc-950 smooth">
      <nav className="fixed top-0 left-0 flex justify-between w-full p-4 border-b backdrop-filter backdrop-blur-md dark:border-zinc-700 smooth">
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
            Upscale any images with AI up to 4x their original size
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />

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
      <Generate />
      <footer className="fixed bottom-0 left-0 flex flex-col items-center justify-between w-full p-4 transition-all border-t smooth lg:flex-row gap-y-4 bg-zinc-100 dark:bg-zinc-950 dark:border-zinc-700">
        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 smooth">
            Made by{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth"
              href="https://github.com/adevinwild"
              target="_blank"
              rel="noopener noreferrer"
            >
              adevinwild
            </a>{" "}
            for the{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth"
              href="https://thefullstack.network/hackathon/competition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fullstack Network Hackathon #1
            </a>
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 smooth">
            Using{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth "
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js 13
            </a>{" "}
            ,{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth"
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>{" "}
            ,{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth"
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui
            </a>{" "}
            and{" "}
            <a
              className="text-zinc-950 dark:text-zinc-50 smooth"
              href="https://replicate.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Replicate
            </a>
          </p>
        </section>
      </footer>
    </main>
  );
}
