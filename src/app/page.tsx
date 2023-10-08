import Generate from "~/domain/generate";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "~/components/ui/button";
import { Github } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid content-start gap-y-4 justify-center min-h-[100svh] items-center p-6 lg:p-16 h-full bg-zinc-100">
      <nav className="fixed top-0 left-0 w-full p-4 flex border-b backdrop-filter backdrop-blur-md">
        <div className="flex flex-col gap-y-1">
          <h1 className={plusJakartaSans.className}>
            <span className="font-extralight text-yellow-500">µ</span>scale
          </h1>
          <p className="text-zinc-600 text-xs">
            Upscale any images with AI up to 4x their original size
          </p>
        </div>
      </nav>
      <Generate />
      <footer className="fixed bottom-0 left-0 p-4 flex flex-col lg:flex-row  gap-y-4  items-center justify-between transition-all bg-zinc-200 border-t border-zinc-300  w-full">
        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs text-zinc-600">
            Made by{" "}
            <a
              className="text-zinc-950"
              href="https://github.com/adevinwild"
              target="_blank"
              rel="noopener noreferrer"
            >
              adevinwild
            </a>{" "}
            for the{" "}
            <a
              className="text-zinc-950"
              href="https://thefullstack.network/hackathon/competition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fullstack Network Hackathon #1
            </a>
          </p>
          <p className="text-xs text-zinc-600">
            Using{" "}
            <a
              className="text-zinc-950"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js 13
            </a>{" "}
            ,{" "}
            <a
              className="text-zinc-950"
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>{" "}
            ,{" "}
            <a
              className="text-zinc-950"
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui
            </a>{" "}
            and{" "}
            <a
              className="text-zinc-950"
              href="https://replicate.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Replicate
            </a>
          </p>
        </section>
        <section>
          <a
            href="https://github.com/adevinwild/micro-scale"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-x-2"
            >
              <Github size={16} />
              <span>GitHub</span>
            </Button>
          </a>
        </section>
      </footer>
    </main>
  );
}
