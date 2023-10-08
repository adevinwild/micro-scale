import { HTMLMotionProps } from "framer-motion";

export const fadeIn: HTMLMotionProps<any> = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    ease: "easeOut",
  },
};

export const fadeInUp: HTMLMotionProps<any> = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  transition: {
    ease: "easeInOut",
  },
};
