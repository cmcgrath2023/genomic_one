"use client";

import { useEffect, useState } from "react";
import { Progress, Chip } from "@heroui/react";

const GENES = [
  { name: "HBB", color: "#06b6d4" },
  { name: "TP53", color: "#8b5cf6" },
  { name: "BRCA1", color: "#f43f5e" },
  { name: "CYP2D6", color: "#10b981" },
  { name: "INS", color: "#f59e0b" },
];

const STAGGER_MS = 300;
const ANIMATION_DURATION_MS = 2000;
const TICK_INTERVAL_MS = 30;

export default function StreamingProgress() {
  const [progress, setProgress] = useState<number[]>(GENES.map(() => 0));
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const startTimes = GENES.map((_, i) => i * STAGGER_MS);
    const globalStart = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const next = GENES.map((_, i) => {
        const elapsed = now - globalStart - startTimes[i];
        if (elapsed <= 0) return 0;
        const pct = Math.min(100, (elapsed / ANIMATION_DURATION_MS) * 100);
        return Math.round(pct);
      });
      setProgress(next);

      if (next.every((v) => v >= 100)) {
        clearInterval(interval);
        setComplete(true);
      }
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-zinc-300">MidStream Analysis</h3>
          <Chip
            variant="flat"
            size="sm"
            classNames={{
              base: complete ? "bg-accent-3/15" : "bg-cyan-500/15",
              content: complete ? "text-accent-3" : "text-cyan-400",
            }}
          >
            {complete ? "Complete" : "Streaming Active"}
          </Chip>
        </div>
        {!complete && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-live" />
            <span className="text-xs text-zinc-400">Live</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-5 gap-3">
        {GENES.map((gene, i) => (
          <div key={gene.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">{gene.name}</span>
              <span className="text-xs font-mono text-zinc-500">{progress[i]}%</span>
            </div>
            <Progress
              value={progress[i]}
              maxValue={100}
              size="sm"
              classNames={{
                indicator: progress[i] >= 100 ? "bg-accent-3" : "",
                track: "bg-surface-2",
              }}
              style={
                progress[i] < 100
                  ? { ["--heroui-progress-indicator-bg" as string]: gene.color }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
      <p className="text-[10px] text-zinc-600 mt-2">Simulated Data · In Silico Environment</p>
    </div>
  );
}
