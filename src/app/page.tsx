import Generate from "~/domain/generate";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid content-start gap-y-4 justify-center min-h-[100svh] items-center p-6 lg:p-16 h-full bg-zinc-100">
      <nav className="fixed top-0 left-0 w-full p-4 flex border-b backdrop-filter backdrop-blur-md">
        <div className="flex flex-col gap-y-1">
          <h1 className={plusJakartaSans.className}>
            <span className="font-extralight text-yellow-500">µ</span>scale
          </h1>
          <p className="text-zinc-500 text-xs">
            Upscale any images with AI up to 4x their original size
          </p>
        </div>
      </nav>
      <Generate />
      <section className="fixed bottom-4 left-4 flex flex-col opacity-75 hover:opacity-100 transition-all">
        <p className="text-xs text-zinc-400">
          Made by{" "}
          <a
            className="text-zinc-600"
            href="https://github.com/adevinwild"
            target="_blank"
            rel="noopener noreferrer"
          >
            adevinwild
          </a>{" "}
          for the{" "}
          <a
            className="text-zinc-600"
            href="https://thefullstack.network/hackathon/competition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fullstack Network Hackathon #1
          </a>
        </p>
        <p className="text-xs text-zinc-400">
          Using{" "}
          <a
            className="text-zinc-600"
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js 13
          </a>{" "}
          ,{" "}
          <a
            className="text-zinc-600"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>{" "}
          and{" "}
          <a
            className="text-zinc-600"
            href="https://replicate.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replicate
          </a>
        </p>
      </section>
    </main>
  );
}
