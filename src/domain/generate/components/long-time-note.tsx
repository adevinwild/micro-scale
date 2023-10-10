import { motion } from "framer-motion";
import React from "react";
import { fadeInUp } from "~/lib/animations";

const LongTimeNote = () => {
  return (
    <motion.div
      {...fadeInUp}
      className="flex flex-col w-full p-4 bg-white border gap-y-1 rounded-[20px] dark:bg-zinc-900 dark:border-zinc-700 smooth dark:shadow-2xl dark:shadow-black mb-20"
      aria-label="Upscaling Note"
    >
      <small className="text-xs font-medium text-zinc-500 dark:text-zinc-50">
        Note
      </small>
      <small className="text-xs text-zinc-500 dark:text-zinc-400">
        Upscaling can take up to a minute, do not refresh the page.
      </small>
    </motion.div>
  );
};

export default LongTimeNote;
