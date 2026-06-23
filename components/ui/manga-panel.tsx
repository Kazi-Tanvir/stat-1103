"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MangaPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  delay?: number;
}

export function MangaPanel({
  children,
  className,
  hover = true,
  active = false,
  size = "md",
  onClick,
  delay = 0,
}: MangaPanelProps) {
  const sizeClasses = {
    sm: "manga-panel-sm p-3",
    md: "manga-panel p-5",
    lg: "manga-panel p-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        sizeClasses[size],
        active && "manga-panel-active",
        onClick && "cursor-pointer",
        "relative z-10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
