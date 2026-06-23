"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Speed lines background */}
      <div className="speed-lines absolute inset-0" />

      {/* Halftone overlay */}
      <div className="halftone absolute inset-0" />

      {/* Ink corner decorations */}
      <svg
        className="absolute top-0 left-0 w-32 h-32 opacity-20"
        viewBox="0 0 100 100"
      >
        <path d="M0 0 L100 0 L0 100 Z" fill="var(--border-manga)" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
        viewBox="0 0 100 100"
      >
        <path d="M100 100 L0 100 L100 0 Z" fill="var(--border-manga)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Course code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-mono text-[var(--accent)] tracking-[0.3em] uppercase">
            Introduction to
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="font-[family-name:var(--font-display)] text-7xl md:text-9xl font-black tracking-tight text-[var(--text-primary)] mb-2"
        >
          STAT
          <span className="text-[var(--accent)]"> 1103</span>
        </motion.h1>

        {/* Ink underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-8 h-1 max-w-md"
          style={{
            background: `linear-gradient(90deg, transparent, var(--accent), var(--text-primary), var(--accent), transparent)`,
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-[var(--text-secondary)] font-[family-name:var(--font-display)] font-light mb-2"
        >
          Elements of Probability &
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-xl md:text-2xl text-[var(--text-secondary)] font-[family-name:var(--font-display)] font-light mb-12"
        >
          Statistical Reasoning
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Link href="/chapters">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-4 bg-[var(--accent)] text-white font-[family-name:var(--font-display)] font-bold text-lg rounded-lg
                shadow-[0_0_30px_var(--accent-glow)]
                hover:shadow-[0_0_50px_var(--accent-glow)]
                transition-shadow duration-300
                border-2 border-[var(--accent-light)]
              "
            >
              <span className="relative z-10">▶ BEGIN YOUR JOURNEY</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {[
            { label: "Chapters", value: "16" },
            { label: "Topics", value: "50+" },
            { label: "Problems", value: "100+" },
            { label: "Simulations", value: "8" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-subtle)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating manga panels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-8 w-24 h-32 manga-panel-sm rotate-[-8deg]"
      >
        <div className="p-2 text-[8px] text-[var(--text-subtle)]">Ch. 3</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.7 }}
        className="absolute top-20 right-12 w-20 h-28 manga-panel-sm rotate-[5deg]"
      >
        <div className="p-2 text-[8px] text-[var(--text-subtle)]">P(E∪F)</div>
      </motion.div>
    </main>
  );
}
