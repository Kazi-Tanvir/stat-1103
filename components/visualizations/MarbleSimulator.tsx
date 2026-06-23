"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

interface MarbleSimulatorProps {
  initialMarbles: { color: string; count: number; id: string }[];
  drawCount: number;
  withReplacement: boolean;
  className?: string;
}

export function MarbleSimulator({
  initialMarbles,
  drawCount,
  withReplacement,
  className = "",
}: MarbleSimulatorProps) {
  const [urn, setUrn] = useState<string[]>(() => {
    const balls: string[] = [];
    initialMarbles.forEach((m) => {
      for (let i = 0; i < m.count; i++) {
        balls.push(m.id);
      }
    });
    return balls;
  });

  const [drawn, setDrawn] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const totalInitial = initialMarbles.reduce((acc, m) => acc + m.count, 0);

  const draw = useCallback(() => {
    if (drawn.length >= drawCount || isDrawing || urn.length === 0) return;
    
    setIsDrawing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * urn.length);
      const drawnColor = urn[randomIndex];
      
      setDrawn((prev) => [...prev, drawnColor]);
      
      if (!withReplacement) {
        setUrn((prev) => prev.filter((_, i) => i !== randomIndex));
      }
      setIsDrawing(false);
    }, 600);
  }, [urn, drawn, drawCount, withReplacement, isDrawing]);

  const reset = useCallback(() => {
    const balls: string[] = [];
    initialMarbles.forEach((m) => {
      for (let i = 0; i < m.count; i++) {
        balls.push(m.id);
      }
    });
    setUrn(balls);
    setDrawn([]);
    setIsDrawing(false);
  }, [initialMarbles]);

  const getColorStyle = (id: string) => {
    const map: Record<string, string> = {
      red: "bg-red-500 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_10px_rgba(239,68,68,0.6)] border-red-400",
      blue: "bg-blue-500 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_10px_rgba(59,130,246,0.6)] border-blue-400",
      green: "bg-green-500 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_10px_rgba(34,197,94,0.6)] border-green-400",
      black: "bg-gray-900 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8),0_0_10px_rgba(0,0,0,0.6)] border-gray-700",
      gold: "bg-yellow-400 shadow-[inset_-4px_-4px_10px_rgba(180,83,9,0.5),0_0_15px_rgba(250,204,21,0.6)] border-yellow-200",
      white: "bg-white shadow-[inset_-4px_-4px_10px_rgba(156,163,175,0.5),0_0_10px_rgba(255,255,255,0.6)] border-gray-100",
    };
    return map[id] || "bg-gray-500";
  };

  return (
    <div className={`p-6 rounded-xl border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] ${className}`}>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* Urn */}
        <div className="relative flex flex-col items-center">
          <h4 className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text-secondary)] mb-2 uppercase tracking-widest">
            The Urn
          </h4>
          <div className="relative w-40 h-48 border-4 border-t-0 border-[var(--border-strong)] rounded-b-[40px] bg-[var(--bg-primary)] overflow-hidden shadow-inner flex flex-wrap-reverse content-start justify-center p-3 gap-2">
            <AnimatePresence>
              {urn.map((color, i) => (
                <motion.div
                  key={`urn-${i}-${color}`}
                  initial={{ scale: 0, y: -50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-8 h-8 rounded-full border border-opacity-50 ${getColorStyle(color)}`}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="absolute -top-1 w-44 h-4 rounded-full border-4 border-[var(--border-strong)] border-b-0" />
        </div>

        {/* Controls & Info */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center mb-2">
            <span className="text-xs text-[var(--text-subtle)] font-mono uppercase tracking-wider block mb-1">
              Mode
            </span>
            <span className="text-sm font-bold text-[var(--accent)] bg-[var(--accent-glow)] px-3 py-1 rounded-full">
              {withReplacement ? "With Replacement" : "Without Replacement"}
            </span>
          </div>

          <button
            onClick={draw}
            disabled={drawn.length >= drawCount || isDrawing || urn.length === 0}
            className="flex items-center gap-2 px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_var(--accent-glow)]"
          >
            <Play className="w-4 h-4" />
            Draw Marble
          </button>
          
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-subtle)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <div className="text-xs text-[var(--text-subtle)] font-mono mt-2">
            Remaining: {urn.length} / {totalInitial}
          </div>
        </div>

        {/* Drawn Marbles */}
        <div className="flex flex-col items-center min-w-[160px]">
          <h4 className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text-secondary)] mb-4 uppercase tracking-widest">
            Drawn
          </h4>
          <div className="flex gap-3 h-12 items-center">
            {Array.from({ length: drawCount }).map((_, i) => (
              <div key={`slot-${i}`} className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--border-primary)] flex items-center justify-center bg-[var(--bg-primary)]">
                <AnimatePresence>
                  {drawn[i] && (
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`w-10 h-10 rounded-full border border-opacity-50 ${getColorStyle(drawn[i])}`}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
