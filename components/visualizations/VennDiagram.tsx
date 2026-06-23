"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VennDiagramProps {
  className?: string;
  showLabels?: boolean;
  interactive?: boolean;
  pE?: number;
  pF?: number;
  pEF?: number;
}

type Region = "E-only" | "F-only" | "EF" | "neither" | null;

export function VennDiagram({
  className = "",
  showLabels = true,
  interactive = true,
  pE = 0.28,
  pF = 0.07,
  pEF = 0.05,
}: VennDiagramProps) {
  const [highlighted, setHighlighted] = useState<Region>(null);

  const pEonly = pE - pEF;
  const pFonly = pF - pEF;
  const pUnion = pE + pF - pEF;
  const pNeither = 1 - pUnion;

  const regions: { id: Region; label: string; value: number }[] = [
    { id: "E-only", label: "E only", value: pEonly },
    { id: "F-only", label: "F only", value: pFonly },
    { id: "EF", label: "E ∩ F", value: pEF },
    { id: "neither", label: "Neither", value: pNeither },
  ];

  const getOpacity = (region: Region) => {
    if (!highlighted) return 0.2;
    return highlighted === region ? 0.7 : 0.08;
  };

  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 400 280" className="w-full max-w-lg mx-auto">
        {/* Background rectangle = Sample Space S */}
        <rect
          x="10"
          y="10"
          width="380"
          height="260"
          rx="4"
          fill="none"
          stroke="var(--border-manga)"
          strokeWidth="2.5"
        />
        <text x="25" y="35" fill="var(--text-subtle)" fontSize="16" fontFamily="var(--font-display)" fontWeight="bold">
          S
        </text>

        {/* Neither region (click target) */}
        {interactive && (
          <rect
            x="10"
            y="10"
            width="380"
            height="260"
            fill={highlighted === "neither" ? "var(--accent)" : "transparent"}
            opacity={highlighted === "neither" ? 0.15 : 0}
            rx="4"
            className="cursor-pointer"
            onClick={() => setHighlighted(highlighted === "neither" ? null : "neither")}
          />
        )}

        {/* Circle E */}
        <motion.circle
          cx="160"
          cy="140"
          r="85"
          fill="var(--accent)"
          fillOpacity={getOpacity("E-only")}
          stroke="var(--border-manga)"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={interactive ? "cursor-pointer" : ""}
          onClick={() => interactive && setHighlighted(highlighted === "E-only" ? null : "E-only")}
        />

        {/* Circle F */}
        <motion.circle
          cx="240"
          cy="140"
          r="85"
          fill="var(--accent-light)"
          fillOpacity={getOpacity("F-only")}
          stroke="var(--border-manga)"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className={interactive ? "cursor-pointer" : ""}
          onClick={() => interactive && setHighlighted(highlighted === "F-only" ? null : "F-only")}
        />

        {/* Intersection highlight overlay */}
        <clipPath id="clip-e">
          <circle cx="160" cy="140" r="85" />
        </clipPath>
        <motion.circle
          cx="240"
          cy="140"
          r="85"
          clipPath="url(#clip-e)"
          fill="var(--accent)"
          fillOpacity={getOpacity("EF")}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={interactive ? "cursor-pointer" : ""}
          onClick={() => interactive && setHighlighted(highlighted === "EF" ? null : "EF")}
        />

        {/* Labels */}
        {showLabels && (
          <>
            <text x="120" y="135" fill="var(--text-primary)" fontSize="18" fontFamily="var(--font-display)" fontWeight="bold" textAnchor="middle">
              E
            </text>
            <text x="280" y="135" fill="var(--text-primary)" fontSize="18" fontFamily="var(--font-display)" fontWeight="bold" textAnchor="middle">
              F
            </text>

            {/* Values inside regions */}
            <text x="120" y="158" fill="var(--text-secondary)" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">
              {(pEonly).toFixed(2)}
            </text>
            <text x="200" y="158" fill="var(--accent-light)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">
              {pEF.toFixed(2)}
            </text>
            <text x="280" y="158" fill="var(--text-secondary)" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">
              {(pFonly).toFixed(2)}
            </text>

            {/* Neither value */}
            <text x="355" y="255" fill="var(--text-subtle)" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">
              {pNeither.toFixed(2)}
            </text>
          </>
        )}
      </svg>

      {/* Legend / controls */}
      {interactive && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setHighlighted(highlighted === r.id ? null : r.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all border ${
                highlighted === r.id
                  ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent-light)]"
                  : "border-[var(--border-primary)] text-[var(--text-subtle)] hover:border-[var(--border-strong)]"
              }`}
            >
              {r.label}: {r.value.toFixed(2)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
