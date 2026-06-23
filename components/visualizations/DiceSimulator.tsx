"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Dices, RotateCcw, Play } from "lucide-react";

interface DiceSimulatorProps {
  className?: string;
}

export function DiceSimulator({ className = "" }: DiceSimulatorProps) {
  const [die1, setDie1] = useState(1);
  const [die2, setDie2] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [, setHistory] = useState<{ d1: number; d2: number; sum: number }[]>([]);
  const [sumCounts, setSumCounts] = useState<Record<number, number>>({});

  const rollDice = useCallback(() => {
    setRolling(true);
    // Animate through random faces
    let count = 0;
    const interval = setInterval(() => {
      setDie1(Math.floor(Math.random() * 6) + 1);
      setDie2(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        setDie1(d1);
        setDie2(d2);
        setRolling(false);
        const sum = d1 + d2;
        setHistory((prev) => [{ d1, d2, sum }, ...prev].slice(0, 20));
        setSumCounts((prev) => ({ ...prev, [sum]: (prev[sum] || 0) + 1 }));
      }
    }, 60);
  }, []);

  const rollMany = useCallback((n: number) => {
    const newCounts: Record<number, number> = { ...sumCounts };
    const newHistory: { d1: number; d2: number; sum: number }[] = [];
    for (let i = 0; i < n; i++) {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const sum = d1 + d2;
      newCounts[sum] = (newCounts[sum] || 0) + 1;
      if (i < 20) newHistory.push({ d1, d2, sum });
    }
    setDie1(newHistory[0]?.d1 || 1);
    setDie2(newHistory[0]?.d2 || 1);
    setSumCounts(newCounts);
    setHistory(newHistory);
  }, [sumCounts]);

  const reset = useCallback(() => {
    setDie1(1);
    setDie2(1);
    setHistory([]);
    setSumCounts({});
  }, []);

  const totalRolls = Object.values(sumCounts).reduce((a, b) => a + b, 0);
  const maxCount = Math.max(1, ...Object.values(sumCounts));

  const dieFaces: Record<number, string> = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅",
  };

  return (
    <div className={`${className}`}>
      {/* Dice display */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <motion.div
          animate={rolling ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: rolling ? Infinity : 0 }}
          className="text-6xl select-none"
        >
          {dieFaces[die1]}
        </motion.div>
        <span className="text-2xl text-[var(--text-subtle)] font-bold">+</span>
        <motion.div
          animate={rolling ? { rotate: [0, -360], scale: [1, 1.2, 1] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: rolling ? Infinity : 0 }}
          className="text-6xl select-none"
        >
          {dieFaces[die2]}
        </motion.div>
        <span className="text-2xl text-[var(--text-subtle)] font-bold">=</span>
        <span className="text-3xl font-bold font-mono text-[var(--accent-light)]">
          {die1 + die2}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={rollDice}
          disabled={rolling}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          <Dices className="w-4 h-4" />
          Roll
        </button>
        {[100, 1000].map((n) => (
          <button
            key={n}
            onClick={() => rollMany(n)}
            className="flex items-center gap-1 px-3 py-2.5 text-sm border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-lg transition-all"
          >
            <Play className="w-3 h-3" />
            {n}×
          </button>
        ))}
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-2.5 text-sm text-[var(--text-subtle)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Histogram */}
      {totalRolls > 0 && (
        <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[var(--text-secondary)]">
              Sum Distribution
            </h4>
            <span className="text-xs text-[var(--text-subtle)] font-mono">
              {totalRolls} rolls
            </span>
          </div>
          <div className="flex items-end gap-1 h-32">
            {Array.from({ length: 11 }, (_, i) => i + 2).map((sum) => {
              const count = sumCounts[sum] || 0;
              const height = (count / maxCount) * 100;
              const theoretical = (sum <= 7 ? sum - 1 : 13 - sum) / 36;

              return (
                <div key={sum} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-[var(--text-subtle)]">
                    {totalRolls > 0 ? ((count / totalRolls) * 100).toFixed(0) : 0}%
                  </span>
                  <div className="w-full relative" style={{ height: "100px" }}>
                    {/* Theoretical line */}
                    <div
                      className="absolute w-full border-t border-dashed border-[var(--accent-border)]"
                      style={{ bottom: `${theoretical * 100 * (100 / (maxCount / totalRolls || 1))}%` }}
                    />
                    <motion.div
                      className="absolute bottom-0 w-full rounded-t-sm bg-[var(--accent)]"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.3 }}
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-subtle)]">{sum}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-[var(--text-subtle)]">
              Bars = observed • Dashed = theoretical
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
