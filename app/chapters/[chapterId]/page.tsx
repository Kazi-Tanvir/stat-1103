"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MangaPanel } from "@/components/ui/manga-panel";
import { getChapter } from "@/content/chapter-03";
import { ArrowLeft, BookOpen, FileText, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default function ChapterOverviewPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = use(params);
  const chapter = getChapter(chapterId);

  if (!chapter) return notFound();

  const solvedCount = chapter.problems.filter((p) => p.solved).length;

  return (
    <main className="min-h-screen relative">
      <div className="halftone absolute inset-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/chapters"
            className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--accent-light)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Chapters</span>
          </Link>
          <div className="w-px h-5 bg-[var(--border-primary)]" />
          <h1 className="font-[family-name:var(--font-display)] font-bold text-lg">
            Chapter {chapter.number}
          </h1>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Chapter Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
            <span className="font-[family-name:var(--font-display)] text-8xl font-black text-[var(--accent)] opacity-20 leading-none">
              {String(chapter.number).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-black mb-3">
                {chapter.title}
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                {chapter.description}
              </p>
            </div>
          </div>
          <div className="ink-border-bottom pb-6" />
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            Topics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapter.topics.map((topic, index) => (
              <MangaPanel
                key={topic.id}
                size="sm"
                delay={0.3 + index * 0.04}
              >
                <Link href={`/chapters/${chapterId}/topics/${topic.id}`} className="block">
                  <div className="flex items-start gap-3">
                    <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[var(--accent)] opacity-40">
                      {topic.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)] text-sm mb-1 leading-tight">
                        {topic.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-subtle)]">
                        {topic.sections.length > 0 && (
                          <span>{topic.sections.length} sections</span>
                        )}
                        {topic.examples.length > 0 && (
                          <span>{topic.examples.length} examples</span>
                        )}
                        {topic.keyFormulas.length > 0 && (
                          <span className="text-[var(--accent)]">
                            {topic.keyFormulas.length} formulas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </MangaPanel>
            ))}
          </div>
        </motion.div>

        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            Problems
            <span className="text-sm font-normal text-[var(--text-subtle)] ml-2">
              {solvedCount}/{chapter.problems.length} solved
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapter.problems.map((problem, index) => (
              <MangaPanel
                key={problem.id}
                size="sm"
                delay={0.6 + index * 0.03}
              >
                <Link
                  href={`/chapters/${chapterId}/problems/${problem.id}`}
                  className="block"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                        #{problem.number}
                      </span>
                      {problem.solved && (
                        <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        problem.difficulty === "easy"
                          ? "bg-[rgba(34,197,94,0.1)] text-[var(--success)]"
                          : problem.difficulty === "medium"
                          ? "bg-[rgba(245,158,11,0.1)] text-[var(--warning)]"
                          : "bg-[rgba(239,68,68,0.1)] text-[var(--error)]"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {problem.statement.slice(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </MangaPanel>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
