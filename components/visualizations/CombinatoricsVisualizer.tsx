"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CombinatoricsVisualizerProps {
  items?: string[];
  defaultR?: number;
  className?: string;
}

export function CombinatoricsVisualizer({
  items = ["A", "B", "C", "D"],
  defaultR = 2,
  className = "",
}: CombinatoricsVisualizerProps) {
  const [r, setR] = useState(defaultR);
  const [mode, setMode] = useState<"combinations" | "permutations">("combinations");
  const n = items.length;

  const getCombinations = (arr: string[], k: number): string[][] => {
    if (k === 1) return arr.map((item) => [item]);
    const combos: string[][] = [];
    arr.forEach((item, index) => {
      if (index + k <= arr.length) {
        const smallerCombos = getCombinations(arr.slice(index + 1), k - 1);
        smallerCombos.forEach((combo) => {
          combos.push([item, ...combo]);
        });
      }
    });
    return combos;
  };

  const getPermutations = (arr: string[], k: number): string[][] => {
    if (k === 1) return arr.map((item) => [item]);
    const perms: string[][] = [];
    arr.forEach((item, index) => {
      const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
      const smallerPerms = getPermutations(rest, k - 1);
      smallerPerms.forEach((perm) => {
        perms.push([item, ...perm]);
      });
    });
    return perms;
  };

  const results = useMemo(() => {
    return mode === "combinations" ? getCombinations(items, r) : getPermutations(items, r);
  }, [items, r, mode]);

  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
  };

  const formula = mode === "combinations"
    ? `C(${n}, ${r}) = \\frac{${n}!}{${r}!(${n}-${r})!} = ${results.length}`
    : `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!} = ${results.length}`;

  const getColor = (item: string) => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
    const idx = items.indexOf(item) % colors.length;
    return colors[idx];
  };

  return (
    <div className={`p-6 rounded-xl border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] ${className}`}>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h4 className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text-secondary)] mb-2 uppercase tracking-widest">
            Configuration
          </h4>
          <div className="flex gap-4 items-center">
            <div className="flex bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-strong)]">
              <button
                onClick={() => setMode("combinations")}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                  mode === "combinations" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                Combinations
              </button>
              <button
                onClick={() => setMode("permutations")}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                  mode === "permutations" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                Permutations
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)]">
              <span>n = {n}</span>
              <span>,</span>
              <span>r = </span>
              <input
                type="number"
                min={1}
                max={n}
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
                className="w-12 bg-[var(--bg-primary)] border border-[var(--border-strong)] rounded px-2 py-1 text-center"
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <h4 className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text-secondary)] mb-2 uppercase tracking-widest">
            Items ({n})
          </h4>
          <div className="flex gap-1.5 justify-end">
            {items.map((item) => (
              <div key={item} className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm ${getColor(item)}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border-primary)] pb-2">
          <h4 className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
            {mode === "combinations" ? "Unique Groups (Order doesn't matter)" : "Unique Arrangements (Order matters)"}
          </h4>
          <span className="font-mono font-bold text-[var(--accent)] text-lg">
            Total: {results.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {results.map((combo, idx) => (
              <motion.div
                key={`${mode}-${idx}-${combo.join("")}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: idx * (0.01) }}
                className="flex p-2 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-strong)] items-center justify-center gap-1"
              >
                {combo.map((item, i) => (
                  <div key={`${idx}-${i}`} className={`w-6 h-6 rounded-sm flex items-center justify-center text-white font-bold text-xs ${getColor(item)}`}>
                    {item}
                  </div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
