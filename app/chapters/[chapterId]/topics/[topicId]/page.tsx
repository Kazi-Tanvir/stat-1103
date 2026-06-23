"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getChapter, getTopic } from "@/content/chapter-03";
import { MathDisplay } from "@/components/ui/math-display";
import { SpeechBubble } from "@/components/ui/speech-bubble";
import { StepRevealer } from "@/components/ui/step-revealer";
import { VennDiagram } from "@/components/visualizations/VennDiagram";
import { DiceSimulator } from "@/components/visualizations/DiceSimulator";
import { ProbabilityTree, insuranceTree } from "@/components/visualizations/ProbabilityTree";
import { ArrowLeft, ArrowRight, Lightbulb, BookOpen, Zap } from "lucide-react";
import { notFound } from "next/navigation";

export default function TopicDetailPage({
  params,
}: {
  params: Promise<{ chapterId: string; topicId: string }>;
}) {
  const { chapterId, topicId } = use(params);
  const chapter = getChapter(chapterId);
  if (!chapter) return notFound();

  const topic = getTopic(chapterId, topicId);
  if (!topic) return notFound();

  const topicIndex = chapter.topics.findIndex((t) => t.id === topicId);
  const prevTopic = topicIndex > 0 ? chapter.topics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < chapter.topics.length - 1 ? chapter.topics[topicIndex + 1] : null;

  const sectionIcon = (type: string) => {
    switch (type) {
      case "definition":
        return <BookOpen className="w-4 h-4 text-[var(--accent)]" />;
      case "theorem":
        return <Zap className="w-4 h-4 text-[var(--warning)]" />;
      case "note":
        return <Lightbulb className="w-4 h-4 text-[var(--accent-light)]" />;
      default:
        return null;
    }
  };

  const sectionBorder = (type: string) => {
    switch (type) {
      case "definition":
        return "border-l-4 border-l-[var(--accent)]";
      case "theorem":
        return "border-l-4 border-l-[var(--warning)]";
      case "note":
        return "border-l-4 border-l-[var(--accent-light)]";
      case "warning":
        return "border-l-4 border-l-[var(--error)]";
      default:
        return "";
    }
  };

  // Determine which visualization to show for this topic
  const showVenn = ["sample-space-events", "venn-diagrams", "axioms-probability"].includes(topicId);
  const showDice = ["conditional-probability", "equally-likely"].includes(topicId);
  const showTree = topicId === "bayes-formula";

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
          <span className="text-sm text-[var(--text-secondary)] truncate">
            Topic {topic.number}: {topic.title}
          </span>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Topic Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-[family-name:var(--font-display)] text-6xl font-black text-[var(--accent)] opacity-20">
              {topic.number}
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black">
              {topic.title}
            </h1>
          </div>
          <div className="ink-border-bottom pb-4" />
        </motion.div>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {topic.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`rounded-lg bg-[var(--bg-secondary)] p-6 ${sectionBorder(section.type)}`}
            >
              {section.title && (
                <div className="flex items-center gap-2 mb-3">
                  {sectionIcon(section.type)}
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">
                    {section.title}
                  </h3>
                  {section.type === "definition" && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-[var(--accent-glow)] text-[var(--accent)] rounded font-mono">
                      DEFINITION
                    </span>
                  )}
                  {section.type === "theorem" && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(245,158,11,0.1)] text-[var(--warning)] rounded font-mono">
                      THEOREM
                    </span>
                  )}
                </div>
              )}
              <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Formulas */}
        {topic.keyFormulas.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--accent)]" />
              Key Formulas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.keyFormulas.map((formula) => (
                <div
                  key={formula.id}
                  className="formula-box-highlight rounded-lg p-4"
                >
                  <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                    {formula.name}
                  </p>
                  <MathDisplay math={formula.latex} display />
                  <p className="text-xs text-[var(--text-subtle)] mt-2">
                    {formula.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interactive Visualization */}
        {(showVenn || showDice || showTree) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4 flex items-center gap-2">
              🎮 Interactive Visualization
            </h3>
            <div className="manga-panel p-6">
              {showVenn && <VennDiagram />}
              {showDice && <DiceSimulator />}
              {showTree && <ProbabilityTree data={insuranceTree} />}
            </div>
          </motion.div>
        )}

        {/* Examples */}
        {topic.examples.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12 space-y-8"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold flex items-center gap-2">
              📝 Worked Examples
            </h3>
            {topic.examples.map((example) => (
              <div key={example.id} className="space-y-4">
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[var(--accent-light)]">
                  {example.title}
                </h4>
                <SpeechBubble>{example.statement}</SpeechBubble>
                <div className="mt-8">
                  <StepRevealer steps={example.solution} />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[var(--border-primary)]">
          {prevTopic ? (
            <Link
              href={`/chapters/${chapterId}/topics/${prevTopic.id}`}
              className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--accent-light)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs">Previous</div>
                <div className="text-sm font-semibold">{prevTopic.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextTopic ? (
            <Link
              href={`/chapters/${chapterId}/topics/${nextTopic.id}`}
              className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--accent-light)] transition-colors group text-right"
            >
              <div>
                <div className="text-xs">Next</div>
                <div className="text-sm font-semibold">{nextTopic.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
