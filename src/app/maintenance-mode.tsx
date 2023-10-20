/* eslint-disable react/no-unescaped-entities */
"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { fadeInUp } from "~/lib/animations";
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

const MaintenanceMode = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <a href="">
        <h1
          className={clsx(
            plusJakartaSans.className,
            " text-zinc-900 dark:text-zinc-50 smooth text-5xl text-center mb-4"
          )}
        >
          <span className="text-yellow-500 font-extralight">µ</span>scale
        </h1>
      </a>

      <motion.div
        {...fadeInUp}
        className="flex flex-col w-full p-4 bg-white border gap-y-1 rounded-[20px] dark:bg-zinc-900 dark:border-zinc-700 smooth dark:shadow-2xl dark:shadow-black mb-20 max-w-lg"
        aria-label="Upscaling Note"
      >
        <p className="mb-4 text-base font-medium text-zinc-800 dark:text-zinc-50">
          µScale is currently under maintenance.
        </p>
        <small className="text-sm text-zinc-500 dark:text-zinc-400">
          µScale is experiencing some{" "}
          <span className="font-bold">technical difficulties</span>. I'm working
          on getting everything back up and running as soon as possible.
        </small>

        <small className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Meanwhile, you can help by upvoting me on TheFullStack network 👇
        </small>

        <div className="flex items-center justify-end mt-8 gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://x.com/adevinwild"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="sm" variant="outline" className="gap-x-2">
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

          <a
            href="https://thefullstack.network/adevinwild/project/micro-scale-a-hackathon-entry"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="sm" className="gap-x-2">
              <ArrowUp size={16} />
              <span>Upvote µScale</span>
            </Button>
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default MaintenanceMode;
