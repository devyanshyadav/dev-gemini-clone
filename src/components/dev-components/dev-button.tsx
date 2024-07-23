"use client"; // Require when ripple functionality is needed in NextJS
import React from "react";
import clsx from "clsx";
import useRipple from "use-ripple-hook";
import Link from "next/link";

type DevButton = {
  variant?: "default" | "v2" | "v3" | "v1";//| "border" | "light" | "flat" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
  ripple?: boolean;
  asIcon?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button"> &
  React.ComponentProps<"a">;

const DevButton = ({
  variant = "default",
  size = "md",
  href = "",
  rounded = "md",
  ripple = true,
  asIcon,
  children,
  className,
  ...rest
}: DevButton) => {
  const commonStyle =
    "transition-all flex items-center gap-1 text-nowrap justify-center w-fit h-fit ";

  const buttonVariants = {
    default: "bg-transparent",
    v3: "bg-transparent hover:bg-accentGray/20",
    v2: "active:bg-accentBlue/50",
    v1: "bg-accentGray/20",

    // border: "text-accent font-semibold border-2 border-accent", // Changed from 'outline'
    // light:
    //   "hover:bg-accent/30 font-semibold border-2 border-accent",
    // flat: "border-accent/5 bg-accent/20 font-semibold backdrop-blur-sm ",
    // ghost:
    //   "hover:bg-accent  font-semibold border-2 border-accent",
  };

  const buttonSizes = {
    sm: asIcon ? "p-[4px] aspect-square" : "p-1 px-2",
    md: asIcon ? "p-1 aspect-square" : "p-2 px-3",
    lg: asIcon ? "p-2 aspect-square" : "p-3 px-7",
    xl: asIcon ? "p-3 aspect-square" : "p-3 px-7",

  };
  const buttonRoundness = {
    sm: "rounded-sm",
    md: "rounded-lg",
    lg: "rounded-2xl",
    full: "rounded-full",
    none: "rounded-none",
  };

  const buttonVariant = buttonVariants[variant] || buttonVariants.default;
  const buttonSizeClass = buttonSizes[size] || buttonSizes.md;
  const buttonRoundnessClass = buttonRoundness[rounded] || buttonRoundness.md;
  const [rippleState, event] = useRipple();
  const ButtonComponent = href ? Link : 'button';

  return (
    <ButtonComponent
      ref={rippleState}
      href={href}
      {...rest}
      {...(ripple && { onPointerDown: event })}
      className={clsx(
        commonStyle,
        buttonVariant,
        buttonSizeClass,
        buttonRoundnessClass,
        className
      )}
    >
      {children}
    </ButtonComponent>
  );
};

export default DevButton;
