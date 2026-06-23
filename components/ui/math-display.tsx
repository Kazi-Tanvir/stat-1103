"use client";

import katex from "katex";
import { useMemo } from "react";

interface MathDisplayProps {
  math: string;
  display?: boolean;
  className?: string;
}

export function MathDisplay({ math, display = false, className = "" }: MathDisplayProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return `<span style="color: #EF4444;">${math}</span>`;
    }
  }, [math, display]);

  if (display) {
    return (
      <div
        className={`formula-box my-4 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
