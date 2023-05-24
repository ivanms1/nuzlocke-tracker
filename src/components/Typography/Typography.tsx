import React from "react";
import { cn } from "@/utils/cn";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof TYPOGRAPHY_VARIANTS;
}

function Typography({ children, className, variant }: TypographyProps) {
  return (
    <p className={cn(TYPOGRAPHY_VARIANTS[variant ?? "p"], className)}>
      {children}
    </p>
  );
}

const TYPOGRAPHY_VARIANTS = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 pb-2 text-3xl font-semibold",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "",
};

export default Typography;
