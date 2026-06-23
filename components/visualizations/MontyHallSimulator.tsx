"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, Trophy, XCircle } from "lucide-react";

type GamePhase = "pick" | "revealed" | "result";

interface Stats {
  switchWins: number;
  switchTotal: number;
  stayWins: number;
  stayTotal: number;
}

export function MontyHallSimulator({ className = "" }: { className?: string }) {
  const [carDoor, setCarDoor] = useState(() => Math.floor(Math.random() * 3));
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<number | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [phase, setPhase] = useState<GamePhase>("pick");
  const [stats, setStats] = useState<Stats>({ switchWins: 0, switchTotal: 0, stayWins: 0, stayTotal: 0 });
  const [simulating, setSimulating] = useState(false);
  const simRef = useRef(false);

  const pickDoor = useCallback((door: number) => {
    if (phase !== "pick") return;
    setPicked(door);
    // Host reveals a goat door (not picked, not car)
    const goatDoors = [0, 1, 2].filter((d) => d !== door && d !== carDoor);
    const revealDoor = goatDoors[Math.floor(Math.random() * goatDoors.length)];
    setRevealed(revealDoor);
    setPhase("revealed");
  }, [phase, carDoor]);

  const makeChoice = useCallback((switchDoor: boolean) => {
    if (phase !== "revealed" || picked === null || revealed === null) return;
    let final: number;
    if (switchDoor) {
      final = [0, 1, 2].find((d) => d !== picked && d !== revealed)!;
    } else {
      final = picked;
    }
    setFinalChoice(final);
    setPhase("result");

    const won = final === carDoor;
    setStats((prev) => ({
      switchWins: prev.switchWins + (switchDoor && won ? 1 : 0),
      switchTotal: prev.switchTotal + (switchDoor ? 1 : 0),
      stayWins: prev.stayWins + (!switchDoor && won ? 1 : 0),
      stayTotal: prev.stayTotal + (!switchDoor ? 1 : 0),
    }));
  }, [phase, picked, revealed, carDoor]);

  const newGame = useCallback(() => {
    setCarDoor(Math.floor(Math.random() * 3));
    setPicked(null);
    setRevealed(null);
    setFinalChoice(null);
    setPhase("pick");
  }, []);

  const runSimulation = useCallback(async (count: number) => {
    setSimulating(true);
    simRef.current = true;
    const newStats: Stats = { switchWins: 0, switchTotal: 0, stayWins: 0, stayTotal: 0 };

    for (let i = 0; i < count && simRef.current; i++) {
      const car = Math.floor(Math.random() * 3);
      const pick = Math.floor(Math.random() * 3);

      // Stay
      if (pick === car) newStats.stayWins++;
      newStats.stayTotal++;

      // Switch
      if (pick !== car) newStats.switchWins++;
      newStats.switchTotal++;

      if (i % 100 === 0) {
        setStats({ ...newStats });
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    setStats({ ...newStats });
    setSimulating(false);
    simRef.current = false;
  }, []);

  const stopSimulation = useCallback(() => {
    simRef.current = false;
    setSimulating(false);
  }, []);

  const getDoorEmoji = (door: number) => {
    if (phase === "result" || (phase === "revealed" && door === revealed)) {
      return door === carDoor ? "🚗" : "🐐";
    }
    return "❓";
  };

  const getDoorStyle = (door: number) => {
    if (phase === "result" && door === finalChoice) {
      return door === carDoor
        ? "border-[var(--success)] bg-[rgba(34,197,94,0.1)] shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        : "border-[var(--error)] bg-[rgba(239,68,68,0.1)]";
    }
    if (door === revealed) {
      return "border-[var(--border-strong)] bg-[var(--bg-subtle)] opacity-60";
    }
    if (door === picked) {
      return "border-[var(--accent)] bg-[var(--accent-glow)]";
    }
    return "border-[var(--border-manga)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] hover:bg-[var(--accent-glow)]";
  };

  return (
    <div className={`${className}`}>
      {/* Game area */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] mb-2">
          🎮 The Monty Hall Problem
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          {phase === "pick" && "Pick a door! Behind one is a 🚗, behind the others are 🐐."}
          {phase === "revealed" && "The host revealed a goat! Do you want to SWITCH or STAY?"}
          {phase === "result" && (finalChoice === carDoor ? "🎉 YOU WON!" : "😢 You got a goat...")}
        </p>
      </div>

      {/* Doors */}
      <div className="flex justify-center gap-4 mb-8">
        {[0, 1, 2].map((door) => (
          <motion.button
            key={door}
            onClick={() => pickDoor(door)}
            disabled={phase !== "pick"}
            whileHover={phase === "pick" ? { scale: 1.05, y: -5 } : undefined}
            whileTap={phase === "pick" ? { scale: 0.95 } : undefined}
            className={`
              relative w-28 h-40 rounded-lg border-3 transition-all duration-300 flex flex-col items-center justify-center gap-2
              ${getDoorStyle(door)}
              ${phase === "pick" ? "cursor-pointer" : "cursor-default"}
            `}
            style={{ borderWidth: "3px" }}
          >
            <span className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider">
              Door {door + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={getDoorEmoji(door)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="text-4xl"
              >
                {getDoorEmoji(door)}
              </motion.span>
            </AnimatePresence>
            {door === picked && phase !== "result" && (
              <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                YOUR PICK
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {phase === "revealed" && (
          <>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => makeChoice(true)}
              className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5"
            >
              🔄 SWITCH
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => makeChoice(false)}
              className="px-6 py-3 border-2 border-[var(--border-manga)] hover:border-[var(--accent)] text-[var(--text-primary)] font-bold rounded-lg transition-all hover:-translate-y-0.5"
            >
              ✋ STAY
            </motion.button>
          </>
        )}
        {phase === "result" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={newGame}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </motion.button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-4 text-center">
          <div className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2">
            Switch Strategy
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--accent-light)]">
            {stats.switchTotal > 0
              ? ((stats.switchWins / stats.switchTotal) * 100).toFixed(1)
              : "—"}
            %
          </div>
          <div className="text-xs text-[var(--text-subtle)] mt-1">
            <Trophy className="w-3 h-3 inline mr-1" />
            {stats.switchWins}/{stats.switchTotal} wins
          </div>
        </div>
        <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-4 text-center">
          <div className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-2">
            Stay Strategy
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--text-secondary)]">
            {stats.stayTotal > 0
              ? ((stats.stayWins / stats.stayTotal) * 100).toFixed(1)
              : "—"}
            %
          </div>
          <div className="text-xs text-[var(--text-subtle)] mt-1">
            <XCircle className="w-3 h-3 inline mr-1" />
            {stats.stayWins}/{stats.stayTotal} wins
          </div>
        </div>
      </div>

      {/* Simulation */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-[var(--text-subtle)]">Run simulation:</span>
        {[100, 1000, 10000].map((n) => (
          <button
            key={n}
            onClick={() => runSimulation(n)}
            disabled={simulating}
            className="px-3 py-1.5 text-xs font-mono border border-[var(--border-primary)] hover:border-[var(--accent)] rounded transition-all disabled:opacity-40"
          >
            <Play className="w-3 h-3 inline mr-1" />
            {n.toLocaleString()}×
          </button>
        ))}
        {simulating && (
          <button
            onClick={stopSimulation}
            className="px-3 py-1.5 text-xs font-mono border border-[var(--error)] text-[var(--error)] rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
