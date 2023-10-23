/* eslint-disable react/no-unescaped-entities */
"use client";
import Confetti from "react-confetti";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { fadeIn, fadeInUp } from "~/lib/animations";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ArrowUp, ArrowUpNarrowWide, Vote } from "lucide-react";

const EndMode = () => {
  const [isMounted, setMounted] = useState(false);
  const [isParty, setParty] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParty(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <motion.div
      {...fadeIn}
      transition={{
        delay: 1,
        duration: 1,
      }}
      className="flex flex-col items-center justify-center h-full min-h-[80dvh]"
    >
      <Confetti />
      <div className="flex items-center justify-center mb-8 text-left">
        <span
          className={clsx(
            plusJakartaSans.className,
            "smooth text-yellow-500 font-extralight text-8xl text-left"
          )}
        >
          T
        </span>
        <div className="flex flex-col">
          <span
            className={clsx(
              plusJakartaSans.className,
              " text-zinc-900 dark:text-zinc-50 smooth  font-extralight text-3xl text-left"
            )}
          >
            his was a
          </span>
          <span
            className={clsx(
              plusJakartaSans.className,
              " text-zinc-900 dark:text-zinc-50 smooth mt-auto  font-extralight text-3xl text-left"
            )}
          >
            riumph
          </span>
        </div>
      </div>
      <motion.div
        {...fadeInUp}
        className="flex flex-col justify-center items-center text-left  w-full p-4 bg-white border gap-y-1 rounded-[20px] dark:bg-zinc-900 dark:border-zinc-700 smooth dark:shadow-2xl dark:shadow-black mb-20 max-w-lg"
        aria-label="Upscaling Note"
      >
        <p className="mb-4 text-base font-medium text-zinc-800 dark:text-zinc-50">
          Thank you for using µScale! 💛
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Hey there, µScale users! I hope you've been enjoying using µScale
          during this hackathon. I wanted to let you know that our time together
          is drawing to a close.
        </p>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          First and foremost, a massive thanks to each and every one of you.
          Your support and participation have been incredibly inspiring. I
          didn't expect such a warm reception for µScale in such a short time.
        </p>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Your feedback has been invaluable in shaping µScale, and I'm all ears
          for your thoughts. If you'd like to see µScale back in action or have
          suggestions, please don't hesitate to reach out. Your input means the
          world to me.
        </p>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          In the meantime, let's follow each other on X for updates and stay
          tuned for what's next. It's been a pleasure having you on this µScale
          journey, and I can't wait to see you soon on X!
        </p>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Warm regards, Adil
        </p>

        <div className="flex items-center justify-end mt-8 gap-x-4">
          <a
            href="https://github.com/adevinwild/micro-scale"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="sm" variant="link" className="gap-x-2">
              GitHub Repository
            </Button>
          </a>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://x.com/adevinwild"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="sm" variant="default" className="gap-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://github.com/adevinwild.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    Join me on 𝕏
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col">
                <p>@adevinwild</p>
                <p className="text-neutral-400">Maker of µScale</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EndMode;
