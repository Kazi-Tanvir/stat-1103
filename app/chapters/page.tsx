"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MangaPanel } from "@/components/ui/manga-panel";
import { allChapters } from "@/content/chapter-03";
import { Lock, BookOpen, ArrowLeft } from "lucide-react";

export default function ChaptersPage() {
  return (
    <main className="min-h-screen relative">
      <div className="halftone absolute inset-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--accent-light)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </Link>
            <div className="w-px h-5 bg-[var(--border-primary)]" />
            <h1 className="font-[family-name:var(--font-display)] font-bold text-lg">
              STAT 1103 <span className="text-[var(--accent)]">•</span> Chapters
            </h1>
          </div>
        </div>
      </header>

      {/* Chapter Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-black mb-3">
            Select a Chapter
          </h2>
          <p className="text-[var(--text-secondary)]">
            Explore probability, statistics, and data analysis — one chapter at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allChapters.map((chapter, index) => (
            <MangaPanel
              key={chapter.id}
              delay={index * 0.05}
              hover={chapter.available}
              active={chapter.available}
              onClick={
                chapter.available
                  ? undefined
                  : undefined
              }
              className={!chapter.available ? "opacity-40 grayscale" : ""}
            >
              {chapter.available ? (
                <Link href={`/chapters/${chapter.id}`} className="block">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-[family-name:var(--font-display)] text-5xl font-black text-[var(--accent)] opacity-30">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent-glow)] px-2 py-1 rounded">
                      AVAILABLE
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text-primary)] mb-2">
                    {chapter.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-subtle)]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      12 Topics
                    </span>
                    <span>30+ Problems</span>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-[family-name:var(--font-display)] text-5xl font-black text-[var(--text-subtle)] opacity-20">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <Lock className="w-4 h-4 text-[var(--text-subtle)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text-subtle)] mb-2">
                    {chapter.title}
                  </h3>
                  <span className="text-xs text-[var(--text-subtle)]">Coming Soon</span>
                </div>
              )}
            </MangaPanel>
          ))}
        </div>
      </div>
    </main>
  );
}
