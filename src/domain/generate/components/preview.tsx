import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { fadeIn, fadeInUp } from "~/lib/animations";

type Props = {
  file: File;
};
const Preview = ({ file }: Props) => {
  if (!file) {
    return null;
  }

  const url = URL.createObjectURL(file);
  const { name, size } = file;

  const formattedSize =
    Math.floor(size / 1000) > 1000
      ? `${Math.floor(size / 1000000)} MB`
      : `${Math.floor(size / 1000)} KB`;

  return (
    <motion.div {...fadeIn} className="flex flex-col items-center">
      <Image
        src={url}
        alt="Image preview"
        width={128}
        height={128}
        className="rounded-xl mx-0"
      />
      <small className="text-[10px] mt-1 text-center text-zinc-400">
        {name}
        <br />
        {formattedSize}
      </small>
    </motion.div>
  );
};

export default Preview;
