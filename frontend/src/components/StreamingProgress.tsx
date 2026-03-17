"use client";

import { useEffect, useState } from "react";
import { Progress } from "@heroui/react";

const GENES = [
  { name: "HBB", full: "Hemoglobin Beta", color: "#06b6d4" },
  { name: "TP53", full: "Tumor Suppressor", color: "#8b5cf6" },
  { name: "BRCA1", full: "DNA Repair", color: "#f43f5e" },
  { name: "CYP2D6", full: "Drug Metabolism", color: "#10b981" },
  { name: "INS", full: "Insulin", color: "#f59e0b" },
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
    <div className="panel-card genomic">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="panel-label mb-0">MidStream Analysis</span>
          {complete ? (
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ color: 'var(--accent-teal)', background: 'rgba(0,201,177,0.1)' }}
            >
              Complete
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse-live" style={{ background: 'var(--streaming-pulse)' }} />
              <span className="text-xs font-mono" style={{ color: 'var(--streaming-pulse)' }}>Streaming</span>
            </span>
          )}
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          {progress.filter(p => p >= 100).length}/{GENES.length} genes analyzed
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {GENES.map((gene, i) => (
          <div key={gene.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>{gene.name}</span>
                <span className="text-xs ml-1.5 hidden sm:inline" style={{ color: 'var(--text-muted)' }}>{gene.full}</span>
              </div>
              <span
                className="text-lg font-mono font-bold tabular-nums"
                style={{ color: progress[i] >= 100 ? 'var(--accent-teal)' : gene.color }}
              >
                {progress[i]}%
              </span>
            </div>
            <Progress
              value={progress[i]}
              maxValue={100}
              size="md"
              classNames={{
                track: "bg-zinc-800/50",
              }}
              style={{
                ["--heroui-progress-indicator-bg" as string]: progress[i] >= 100 ? 'var(--accent-teal)' : gene.color,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
