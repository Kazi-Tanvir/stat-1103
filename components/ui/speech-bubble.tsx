"use client";

import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  tailDirection?: "left" | "center" | "right";
  variant?: "default" | "highlight" | "warning";
}

export function SpeechBubble({
  children,
  className,
  tailDirection = "left",
  variant = "default",
}: SpeechBubbleProps) {
  const tailPosition = {
    left: "left-8",
    center: "left-1/2 -translate-x-1/2",
    right: "right-8",
  };

  const variantStyles = {
    default: "border-[var(--border-strong)] bg-[var(--bg-elevated)]",
    highlight: "border-[var(--accent-border)] bg-[rgba(124,58,237,0.05)]",
    warning: "border-[var(--warning)] bg-[rgba(245,158,11,0.05)]",
  };

  const tailColor = {
    default: "border-t-[var(--border-strong)]",
    highlight: "border-t-[var(--accent-border)]",
    warning: "border-t-[var(--warning)]",
  };

  const tailInnerColor = {
    default: "border-t-[var(--bg-elevated)]",
    highlight: "border-t-[rgba(124,58,237,0.05)]",
    warning: "border-t-[rgba(245,158,11,0.05)]",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 px-6 py-5",
        variantStyles[variant],
        className
      )}
    >
      <div className="relative z-10 italic text-[var(--text-secondary)]">
        <span className="text-2xl font-bold text-[var(--text-subtle)] mr-1">&ldquo;</span>
        {children}
        <span className="text-2xl font-bold text-[var(--text-subtle)] ml-1">&rdquo;</span>
      </div>
      {/* Tail outer */}
      <div
        className={cn(
          "absolute -bottom-3 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent",
          tailColor[variant],
          tailPosition[tailDirection]
        )}
      />
      {/* Tail inner */}
      <div
        className={cn(
          "absolute -bottom-[9px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent z-10",
          tailInnerColor[variant],
          tailDirection === "left" ? "left-[34px]" : tailDirection === "right" ? "right-[34px]" : "left-1/2 -translate-x-1/2"
        )}
      />
    </div>
  );
}
