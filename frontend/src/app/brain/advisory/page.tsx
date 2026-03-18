"use client";

import { useState } from "react";
import { Card, CardBody, Chip, Progress } from "@heroui/react";

interface Recommendation {
  title: string;
  risk: "low" | "monitor" | "action";
  details: Record<string, string>;
  recommendation: string;
  safla: {
    status: "validated" | "warning";
    auditId: string;
    confidence: number;
    note?: string;
  };
  evidence: string[];
}

const RISK_CONFIG: Record<
  "low" | "monitor" | "action",
  { label: string; color: "success" | "warning" | "danger"; border: string }
> = {
  low: { label: "Low Risk", color: "success", border: "safla" },
  monitor: { label: "Monitor", color: "warning", border: "warning" },
  action: { label: "Action Required", color: "danger", border: "flagged" },
};

const recommendations: Recommendation[] = [
  {
    title: "Semaglutide Dosing \u2014 CYP2D6 Intermediate Metabolizer",
    risk: "low",
    details: {
      Drug: "Semaglutide (Ozempic/Wegovy)",
      Gene: "CYP2D6 *1/*4",
    },
    recommendation:
      "Standard dosing appropriate. Monitor plasma concentration at initiation.",
    safla: {
      status: "validated",
      auditId: "ISC-2026-03-17-CYP2D6-001",
      confidence: 94.2,
    },
    evidence: ["PharmGKB Level 2A", "CPIC Level A"],
  },
  {
    title: "HBB Variant Monitoring \u2014 Sickle Cell Carrier",
    risk: "monitor",
    details: {
      Gene: "HBB E6V",
      Variant: "rs334",
    },
    recommendation:
      "Carrier status confirmed. No immediate intervention. Genetic counselling recommended.",
    safla: {
      status: "warning",
      auditId: "ISC-2026-03-17-HBB-002",
      confidence: 87.0,
      note: "Population coverage",
    },
    evidence: ["ClinVar Pathogenic", "ACMG Category 4"],
  },
  {
    title: "BRCA1 Cancer Screening Schedule",
    risk: "action",
    details: {
      Gene: "BRCA1 185delAG",
      Category: "Hereditary Cancer",
    },
    recommendation:
      "Enhanced screening protocol recommended from age 30. Consider MRI + mammography annually.",
    safla: {
      status: "validated",
      auditId: "ISC-2026-03-17-BRCA1-003",
      confidence: 91.0,
    },
    evidence: ["NCCN Guidelines", "ACMG SF v3.1"],
  },
  {
    title: "T2D Prevention \u2014 GLP-1 RA Consideration",
    risk: "monitor",
    details: {
      Gene: "INS locus",
      Indication: "T2D risk 38% at 10yr",
    },
    recommendation:
      "Lifestyle intervention recommended. GLP-1 RA initiation at age 55 per trajectory model.",
    safla: {
      status: "validated",
      auditId: "ISC-2026-03-17-INS-004",
      confidence: 76.0,
    },
    evidence: ["ADA Standards 2026", "Epigenetic Age Model"],
  },
];

const REASONING_STEPS = [
  {
    step: 1,
    label: "Genomic Input Layer",
    detail: "Variant calling, star allele mapping, structural annotation",
  },
  {
    step: 2,
    label: "Evidence Integration",
    detail: "PharmGKB, ClinVar, CPIC guideline cross-reference",
  },
  {
    step: 3,
    label: "Phenotype Classification",
    detail: "Activity score computation, metabolizer status assignment",
  },
  {
    step: 4,
    label: "Clinical Decision Engine",
    detail: "Drug-gene interaction analysis, dose adjustment calculation",
  },
  {
    step: 5,
    label: "SAFLA Validation",
    detail:
      "Confidence threshold check, contraindication scan, population coverage audit",
  },
];

export default function AdvisoryPage() {
  const [reasoningOpen, setReasoningOpen] = useState(false);

  return (
    <div className="p-6 sm:p-10">
      {/* Header */}
      <span className="panel-label">Advisory</span>
      <h1
        className="text-2xl font-bold tracking-tight mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        SAFLA-Validated Clinical Recommendations
      </h1>
      <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
        Synthesized intelligence from genomic, pharmacogenomic, and epigenetic
        analysis layers.
      </p>
      <div className="mb-8">
        <span
          className="text-[10px] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded"
          style={{ color: "#f59e0b" }}
        >
          Simulated Data -- In Silico Environment
        </span>
      </div>

      {/* Active Recommendations */}
      <div className="flex items-center gap-3 mb-1">
        <h2
          className="font-mono text-xs tracking-[0.15em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Active Recommendations
        </h2>
        <Chip
          size="sm"
          variant="flat"
          color="success"
          className="text-[10px] tracking-wider uppercase"
        >
          {recommendations.length} Active
        </Chip>
      </div>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        All recommendations validated through the 5-layer intelligence pipeline
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => {
          const cfg = RISK_CONFIG[rec.risk];
          return (
            <Card
              key={i}
              className={`panel-card ${cfg.border}`}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--bg-border)",
              }}
            >
              <CardBody className="p-5 space-y-4">
                {/* Title + Risk */}
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rec.title}
                  </h3>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={cfg.color}
                    className="flex-shrink-0"
                  >
                    {cfg.label}
                  </Chip>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(rec.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="text-xs px-2.5 py-1 rounded"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--bg-border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span style={{ color: "var(--text-muted)" }}>
                        {key}:{" "}
                      </span>
                      <span className="font-mono">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Recommendation text */}
                <div
                  className="rounded-lg px-4 py-3 text-xs leading-relaxed"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--bg-border)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="block text-[10px] uppercase tracking-wider font-mono mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Recommendation
                  </span>
                  {rec.recommendation}
                </div>

                {/* SAFLA badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: "var(--safla-green)" }}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 12 15 16 10" />
                      </svg>
                    </span>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        rec.safla.status === "validated" ? "success" : "warning"
                      }
                      className="text-[10px]"
                    >
                      {rec.safla.status === "validated"
                        ? "SAFLA Validated"
                        : "Validated with Warning"}
                    </Chip>
                  </div>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {rec.safla.auditId}
                  </span>
                </div>

                {/* Confidence bar */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Confidence
                  </span>
                  <Progress
                    size="sm"
                    value={rec.safla.confidence}
                    maxValue={100}
                    classNames={{
                      indicator:
                        rec.safla.confidence >= 85
                          ? "bg-green-500"
                          : "bg-amber-500",
                      track: "bg-zinc-800",
                    }}
                    className="max-w-[120px]"
                    aria-label="Confidence"
                  />
                  <span
                    className="text-[10px] font-mono font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rec.safla.confidence.toFixed(1)}%
                  </span>
                </div>

                {/* Evidence chips */}
                <div className="flex flex-wrap gap-1.5">
                  {rec.evidence.map((ev) => (
                    <Chip
                      key={ev}
                      size="sm"
                      variant="bordered"
                      className="text-[10px]"
                    >
                      {ev}
                    </Chip>
                  ))}
                </div>

                {rec.safla.note && (
                  <div
                    className="text-[10px] flex items-center gap-1"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Warning: {rec.safla.note}
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Reasoning Chain */}
      <div className="mt-10">
        <button
          onClick={() => setReasoningOpen(!reasoningOpen)}
          className="w-full flex items-center justify-between rounded-xl px-5 py-4 transition-colors duration-150"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--bg-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Computational Reasoning Chain
            </span>
            <Chip
              size="sm"
              variant="flat"
              color="secondary"
              className="text-[10px]"
            >
              5-layer intelligence pipeline
            </Chip>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: "var(--text-muted)",
              transform: reasoningOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {reasoningOpen && (
          <div
            className="rounded-b-xl px-5 py-4 space-y-3 -mt-px"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bg-border)",
              borderTop: "none",
            }}
          >
            {REASONING_STEPS.map((rs) => (
              <div key={rs.step} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(0,201,177,0.15)",
                    color: "var(--accent-teal)",
                  }}
                >
                  {rs.step}
                </div>
                <div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rs.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {rs.detail}
                  </div>
                </div>
              </div>
            ))}
            <div
              className="text-[10px] mt-2 pt-2"
              style={{
                color: "var(--text-muted)",
                borderTop: "1px solid var(--bg-border)",
              }}
            >
              Full reasoning chain \u2014 5-layer intelligence pipeline
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          Simulated Data \u00b7 In Silico Environment
        </span>
      </div>
    </div>
  );
}
