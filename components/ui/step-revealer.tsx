"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MathDisplay } from "./math-display";
import { CheckCircle, Lock, ChevronRight, RotateCcw } from "lucide-react";
import type { SolutionStep } from "@/content/chapter-03";

interface StepRevealerProps {
  steps: SolutionStep[];
  className?: string;
}

export function StepRevealer({ steps, className = "" }: StepRevealerProps) {
  const [revealedCount, setRevealedCount] = useState(1);

  const revealNext = () => {
    if (revealedCount < steps.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const reset = () => {
    setRevealedCount(1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--accent)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(revealedCount / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm text-[var(--text-subtle)] font-mono whitespace-nowrap">
          {revealedCount} / {steps.length}
        </span>
      </div>

      {/* Steps */}
      <AnimatePresence mode="sync">
        {steps.map((step, index) => {
          const isRevealed = index < revealedCount;
          const isActive = index === revealedCount - 1;
          const isLocked = index >= revealedCount;

          return (
            <motion.div
              key={step.stepNumber}
              initial={index === 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className={`
                relative rounded-lg overflow-hidden transition-all duration-300
                ${isActive ? "step-card-active border-l-4" : isRevealed ? "step-card-complete" : "step-card"}
                ${isLocked ? "step-card-locked" : ""}
              `}
            >
              <div className="p-5">
                {/* Step header */}
                <div className="flex items-center gap-3 mb-3">
                  {isRevealed && !isActive ? (
                    <CheckCircle className="w-5 h-5 text-[var(--success)] flex-shrink-0" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{step.stepNumber}</span>
                    </div>
                  ) : (
                    <Lock className="w-5 h-5 text-[var(--text-subtle)] flex-shrink-0" />
                  )}
                  <h4
                    className={`font-semibold font-[family-name:var(--font-display)] ${
                      isActive ? "text-[var(--accent-light)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Step {step.stepNumber}: {step.title}
                  </h4>
                </div>

                {/* Step content */}
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-3 pl-8">
                      {step.explanation}
                    </p>

                    {step.formula && (
                      <div className="pl-8 mb-3">
                        <MathDisplay math={step.formula} display />
                      </div>
                    )}

                    {step.result && (
                      <div className="pl-8 mt-3 p-3 rounded-lg bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)]">
                        <p className="text-[var(--success)] font-medium text-sm">
                          ✓ {step.result}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-3 pt-4">
        {revealedCount < steps.length ? (
          <button
            onClick={revealNext}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent-glow)]"
          >
            <ChevronRight className="w-5 h-5" />
            Next Step
          </button>
        ) : (
          <div className="flex items-center gap-2 px-6 py-3 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[var(--success)] font-semibold rounded-lg">
            <CheckCircle className="w-5 h-5" />
            Solution Complete!
          </div>
        )}

        {revealedCount > 1 && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-3 text-[var(--text-subtle)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] hover:border-[var(--border-strong)] rounded-lg transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
