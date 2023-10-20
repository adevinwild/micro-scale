import React from "react";

const Footer = () => {
  return (
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
      </section>
    </footer>
  );
};

export default Footer;
