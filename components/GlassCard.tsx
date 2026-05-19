import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  variant?: "default" | "dark" | "gradient";
}

export function GlassCard({
  children,
  className,
  glow = false,
  variant = "default",
  ...props
}: GlassCardProps) {
  const baseStyles = "rounded-2xl backdrop-blur-md transition-all duration-300";

  const variants = {
    default:
      "bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20",
    dark: "bg-white/3 border border-white/10 hover:bg-white/5 hover:border-white/15",
    gradient:
      "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:from-white/15 hover:to-white/10",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glow && "shadow-lg shadow-purple-500/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
