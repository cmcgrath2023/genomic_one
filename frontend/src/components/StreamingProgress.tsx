"use client";

import { useEffect, useState } from "react";

const GENES = [
  { name: "HBB", full: "Hemoglobin Beta", color: "#06b6d4" },
  { name: "TP53", full: "Tumor Suppressor", color: "#8b5cf6" },
  { name: "BRCA1", full: "DNA Repair", color: "#f43f5e" },
  { name: "CYP2D6", full: "Drug Metabolism", color: "#10b981" },
  { name: "INS", full: "Insulin", color: "#f59e0b" },
];

const STAGGER_MS = 800;
const ANIMATION_DURATION_MS = 4000;
const TICK_INTERVAL_MS = 50;

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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="panel-label mb-0">MidStream Analysis</span>
          {complete ? (
            <span
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
              style={{ color: 'var(--accent-teal)', background: 'rgba(0,201,177,0.15)' }}
            >
              Analysis Complete
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse-live" style={{ background: 'var(--streaming-pulse)' }} />
              <span className="text-xs font-mono font-semibold" style={{ color: 'var(--streaming-pulse)' }}>Streaming</span>
            </span>
          )}
        </div>
        <span className="text-sm font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
          {progress.filter(p => p >= 100).length}/{GENES.length} genes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
        {GENES.map((gene, i) => {
          const done = progress[i] >= 100;
          const barColor = done ? 'var(--accent-teal)' : gene.color;
          return (
            <div key={gene.name}>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-sm font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{gene.name}</span>
                  <span className="text-xs ml-2 hidden lg:inline" style={{ color: 'var(--text-secondary)' }}>{gene.full}</span>
                </div>
                <span
                  className="text-xl font-mono font-bold tabular-nums"
                  style={{ color: barColor }}
                >
                  {progress[i]}%
                </span>
              </div>
              {/* Custom progress bar — visible on dark backgrounds */}
              <div
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-100 ease-linear"
                  style={{
                    width: `${progress[i]}%`,
                    background: barColor,
                    boxShadow: `0 0 8px ${barColor}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
