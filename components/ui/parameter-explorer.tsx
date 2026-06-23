"use client";

import { useState, useCallback } from "react";
import { MathDisplay } from "./math-display";
import { RotateCcw, Sliders } from "lucide-react";
import type { InteractiveParam } from "@/content/chapter-03";

interface ParameterExplorerProps {
  params: InteractiveParam[];
  computeResult: (values: Record<string, number>) => { label: string; formula: string; value: string }[];
  className?: string;
}

export function ParameterExplorer({
  params,
  computeResult,
  className = "",
}: ParameterExplorerProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    params.forEach((p) => {
      initial[p.name] = p.defaultValue;
    });
    return initial;
  });

  const updateValue = useCallback((name: string, value: number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    const initial: Record<string, number> = {};
    params.forEach((p) => {
      initial[p.name] = p.defaultValue;
    });
    setValues(initial);
  }, [params]);

  const results = computeResult(values);

  return (
    <div
      className={`rounded-lg border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-[var(--accent)]" />
        <h4 className="font-semibold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
          Explore Parameters
        </h4>
      </div>

      {/* Sliders */}
      <div className="space-y-5 mb-6">
        {params.map((param) => (
          <div key={param.name}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-[var(--text-secondary)]">
                {param.label}
              </label>
              <span className="font-mono text-sm text-[var(--accent-light)] font-semibold">
                {values[param.name]?.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={values[param.name] ?? param.defaultValue}
              onChange={(e) => updateValue(param.name, parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-[var(--bg-subtle)]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[var(--accent)]
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[var(--accent-light)]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--accent-glow)]
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-125
              "
            />
            <div className="flex justify-between text-xs text-[var(--text-subtle)] mt-1">
              <span>{param.min}</span>
              <span>{param.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="rounded-lg border border-[var(--accent-border)] bg-[var(--bg-primary)] p-4">
        <h5 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
          Result
        </h5>
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i}>
              <span className="text-sm text-[var(--text-subtle)] mr-2">{r.label}:</span>
              <MathDisplay math={r.formula} />
              <span className="text-sm font-semibold text-[var(--accent-light)] ml-2">
                = {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="mt-4 flex items-center gap-2 text-sm text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset to Original Values
      </button>
    </div>
  );
}
