import { cn } from "@/utils/cn";
import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof TYPOGRAPHY_VARIANTS;
}

function Typography({ children, className, variant }: TypographyProps) {
  return (
    <h1 className={cn(TYPOGRAPHY_VARIANTS[variant ?? "p"], className)}>
      {children}
    </h1>
  );
}

const TYPOGRAPHY_VARIANTS = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
};

export default Typography;
