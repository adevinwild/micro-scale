import clsx from "clsx";
import React from "react";

type Props = {
  orientation: "horizontal" | "vertical";
} & React.HTMLAttributes<HTMLDivElement>;

const Divider = ({ orientation, className, ...props }: Props) => {
  const orientationStyles = {
    horizontal: "w-full h-[1px] bg-zinc-300 dark:bg-zinc-700",
    vertical: "w-[1px] h-full bg-zinc-300 dark:bg-zinc-700",
  };

  return (
    <div
      className={clsx(orientationStyles[orientation], className)}
      {...props}
    />
  );
};

Divider.defaultProps = {
  orientation: "horizontal",
};

export default Divider;
