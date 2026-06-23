"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getChapter, getProblem } from "@/content/chapter-03";
import { SpeechBubble } from "@/components/ui/speech-bubble";
import { StepRevealer } from "@/components/ui/step-revealer";
import { ParameterExplorer } from "@/components/ui/parameter-explorer";
import { VennDiagram } from "@/components/visualizations/VennDiagram";
import { ProbabilityTree, plantTree, insuranceTree } from "@/components/visualizations/ProbabilityTree";
import { MontyHallSimulator } from "@/components/visualizations/MontyHallSimulator";
import { MarbleSimulator } from "@/components/visualizations/MarbleSimulator";
import { CombinatoricsVisualizer } from "@/components/visualizations/CombinatoricsVisualizer";
import { ArrowLeft, CheckCircle, AlertTriangle, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export default function ProblemSolverPage({
  params,
}: {
  params: Promise<{ chapterId: string; problemId: string }>;
}) {
  const { chapterId, problemId } = use(params);
  const chapter = getChapter(chapterId);
  if (!chapter) return notFound();

  const problem = getProblem(chapterId, problemId);
  if (!problem) return notFound();

  // Find interactive params from the last step
  const interactiveStep = problem.solution?.find((s) => s.interactiveParams);
  const interactiveParams = interactiveStep?.interactiveParams;

  // Get visualization type
  const viz = problem.visualization;

  return (
    <main className="min-h-screen relative">
      <div className="halftone absolute inset-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href={`/chapters/${chapterId}`}
            className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--accent-light)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Chapter {chapter.number}</span>
          </Link>
          <div className="w-px h-5 bg-[var(--border-primary)]" />
          <span className="text-sm text-[var(--text-secondary)]">
            Problem #{problem.number}
          </span>
          {problem.solved && (
            <CheckCircle className="w-4 h-4 text-[var(--success)]" />
          )}
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Problem header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-display)] text-5xl font-black text-[var(--accent)] opacity-30">
              #{problem.number}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  problem.difficulty === "easy"
                    ? "bg-[rgba(34,197,94,0.1)] text-[var(--success)]"
                    : problem.difficulty === "medium"
                    ? "bg-[rgba(245,158,11,0.1)] text-[var(--warning)]"
                    : "bg-[rgba(239,68,68,0.1)] text-[var(--error)]"
                }`}
              >
                {problem.difficulty}
              </span>
              {problem.solved && (
                <span className="text-xs font-mono px-2 py-1 rounded bg-[rgba(34,197,94,0.1)] text-[var(--success)]">
                  SOLVED
                </span>
              )}
            </div>
          </div>
          <div className="ink-border-bottom pb-4" />
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SpeechBubble variant="highlight">{problem.statement}</SpeechBubble>
        </motion.div>

        {/* Sub-parts */}
        {problem.subparts && problem.subparts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-lg bg-[var(--bg-secondary)] p-5"
          >
            <h4 className="text-sm font-semibold text-[var(--text-subtle)] uppercase tracking-wider mb-3">
              Parts
            </h4>
            <div className="space-y-2">
              {problem.subparts.map((part) => (
                <div key={part.label} className="flex gap-3">
                  <span className="font-mono font-bold text-[var(--accent)] text-sm">
                    ({part.label})
                  </span>
                  <span className="text-[var(--text-secondary)] text-sm">
                    {part.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2 mb-8"
        >
          <Tag className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)] border border-[var(--border-primary)]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Solution or "Not Yet Solved" */}
        {problem.solved && problem.solution ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-6 flex items-center gap-2">
              📖 Step-by-Step Solution
            </h3>
            <StepRevealer steps={problem.solution} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10 rounded-lg border-2 border-dashed border-[var(--border-strong)] p-8 text-center"
          >
            <AlertTriangle className="w-8 h-8 text-[var(--warning)] mx-auto mb-3" />
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
              Solution Coming Soon
            </h3>
            <p className="text-[var(--text-subtle)] text-sm">
              This problem has been structured with AI instructions for future solution generation.
              Check back later or try solving it yourself!
            </p>
          </motion.div>
        )}

        {/* Interactive Parameter Explorer */}
        {problem.solved && interactiveParams && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">
              ⚙️ Explore Parameters
            </h3>
            {problemId === "problem-29" && (
              <ParameterExplorer
                params={interactiveParams}
                computeResult={(vals) => {
                  const pW = vals.pWater ?? 0.9;
                  const pDW = vals.pDieWithWater ?? 0.15;
                  const pDNW = vals.pDieWithout ?? 0.8;
                  const pDie = pDW * pW + pDNW * (1 - pW);
                  const pAlive = 1 - pDie;
                  const pForgotGivenDead = (pDNW * (1 - pW)) / pDie;
                  return [
                    {
                      label: "P(die)",
                      formula: `P(D) = ${pDW.toFixed(2)} \\times ${pW.toFixed(2)} + ${pDNW.toFixed(2)} \\times ${(1 - pW).toFixed(2)}`,
                      value: pDie.toFixed(4),
                    },
                    {
                      label: "P(alive)",
                      formula: `P(\\text{alive}) = 1 - ${pDie.toFixed(4)}`,
                      value: pAlive.toFixed(4),
                    },
                    {
                      label: "P(forgot | dead)",
                      formula: `P(W^c|D) = \\frac{${pDNW.toFixed(2)} \\times ${(1 - pW).toFixed(2)}}{${pDie.toFixed(4)}}`,
                      value: pForgotGivenDead.toFixed(4),
                    },
                  ];
                }}
              />
            )}
          </motion.div>
        )}

        {/* Visualization */}
        {problem.solved && viz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">
              🎮 Visualization
            </h3>
            <div className="manga-panel p-6">
              {viz === "venn-diagram" && <VennDiagram />}
              {viz === "probability-tree" && (
                <ProbabilityTree
                  data={problemId === "problem-29" ? plantTree : insuranceTree}
                />
              )}
              {viz === "monty-hall" && <MontyHallSimulator />}
              {viz === "marble-simulator" && (
                <MarbleSimulator
                  initialMarbles={[
                    { color: "red", count: 3, id: "red" },
                    { color: "blue", count: 2, id: "blue" },
                    { color: "green", count: 1, id: "green" },
                  ]}
                  drawCount={2}
                  withReplacement={false}
                />
              )}
              {viz === "combinatorics" && (
                <CombinatoricsVisualizer />
              )}
              {viz === "sample-space-grid" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center font-mono">
                  {["HHH", "HHT", "HTH", "HTT", "THH", "THT", "TTH", "TTT"].map((outcome) => (
                    <div key={outcome} className={`p-4 rounded-xl border-2 ${
                      outcome.split("H").length - 1 > outcome.split("T").length - 1 
                        ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]" 
                        : "border-[var(--border-primary)] bg-[var(--bg-elevated)] text-[var(--text-subtle)]"
                    }`}>
                      {outcome}
                    </div>
                  ))}
                </div>
              )}
              {viz === "system-diagram" && (
                <div className="text-center py-6">
                  <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto">
                    {/* System diagram */}
                    {[1, 2, 3, 4].map((i) => (
                      <g key={i}>
                        <rect
                          x={80 + ((i - 1) % 2) * 150}
                          y={30 + Math.floor((i - 1) / 2) * 80}
                          width="60"
                          height="40"
                          rx="4"
                          fill="var(--bg-elevated)"
                          stroke="var(--accent)"
                          strokeWidth="2"
                        />
                        <text
                          x={110 + ((i - 1) % 2) * 150}
                          y={55 + Math.floor((i - 1) / 2) * 80}
                          fill="var(--text-primary)"
                          fontSize="14"
                          fontFamily="var(--font-mono)"
                          textAnchor="middle"
                        >
                          C{i}
                        </text>
                      </g>
                    ))}
                    <text x="200" y="185" fill="var(--text-subtle)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">
                      Works if (C1∧C2) ∨ (C3∧C4)
                    </text>
                  </svg>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    Each component is either working (1) or failed (0). Total: 2⁴ = 16 outcomes.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
