"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";

const LAYERS = [
  {
    id: "deploy", number: "", name: "Federated MCP", status: "5/5 NODES",
    color: "var(--federation-node)", statusType: "nodes" as const,
    components: [
      "Copenhagen (DK) — Primary EU Hub",
      "Princeton (US) — R&D Processing",
      "Seattle (US) — Clinical Trials",
      "Bangalore (IN) — Manufacturing QC",
      "Oxford (UK) — Academic Research",
    ],
  },
  {
    id: "l6", number: "L6", name: "SAFLA Safety Validation", status: "VALIDATED",
    color: "var(--safla-green)", statusType: "validated" as const,
    components: [
      "Confidence threshold check",
      "Contraindication screening",
      "Population coverage validation",
      "CPIC/PharmGKB regulatory mapping",
      "ISC audit trail + clinical override",
    ],
  },
  {
    id: "l5", number: "L5", name: "Decision / Advisory", status: "ACTIVE",
    color: "var(--accent-teal)", statusType: "active" as const,
    components: [
      "Multi-signal synthesis",
      "GLP-1 RA pharmacogenomics",
      "Drug target identification",
      "Risk assessment + trajectories",
    ],
  },
  {
    id: "l4", number: "L4", name: "Bayesian + Temporal", status: "ACTIVE",
    color: "var(--accent-gold)", statusType: "active" as const,
    components: [
      "Savant AI trait learning",
      "Temporal Attractor (FTLE)",
      "Prior distribution updates",
      "Confidence calibration",
    ],
  },
  {
    id: "l3", number: "L3", name: "Neural + Diffusion", status: "ACTIVE",
    color: "var(--accent-purple)", statusType: "active" as const,
    components: [
      "ruv-FANN classification",
      "Agentic Diffusion molecules",
      "Cascade autoencoders",
      "Model ensemble",
    ],
  },
  {
    id: "l2", number: "L2", name: "Vector + FACT", status: "ACTIVE",
    color: "var(--accent-blue)", statusType: "active" as const,
    components: [
      "RuVector HNSW indexing",
      "MinCut pathway analysis",
      "Sublinear PageRank",
      "FACT literature retrieval",
    ],
  },
  {
    id: "l1", number: "L1", name: "Genomic Core + MidStream", status: "ACTIVE",
    color: "var(--accent-teal)", statusType: "active" as const,
    components: [
      "rvdna pipeline (5 genes)",
      "Real-time SSE streaming",
      "Variant calling + protein",
      "Epigenetic clock",
      "CYP2D6 pharmacogenomics",
    ],
  },
];

const FLOW_STEPS = [
  { label: "Sequence Data", color: "var(--text-primary)" },
  { label: "L1 Genomic Core", color: "var(--accent-teal)" },
  { label: "L2 Vector + FACT", color: "var(--accent-blue)" },
  { label: "L3 Neural + Diffusion", color: "var(--accent-purple)" },
  { label: "L4 Bayesian + Temporal", color: "var(--accent-gold)" },
  { label: "L5 Decision / Advisory", color: "var(--accent-teal)" },
  { label: "L6 SAFLA Validation", color: "var(--safla-green)" },
  { label: "Federated MCP", color: "var(--federation-node)" },
];

const ASCII_ARCH = `Deployment:  Federated MCP (5 nodes, GDPR-compliant)
Layer 6:     SAFLA Safety Validation
Layer 5:     Decision / Advisory (GLP-1 Pharmacogenomics)
Layer 4:     Bayesian + Temporal Attractor (FTLE)
Layer 3:     ruv-FANN + Agentic Diffusion (Molecules)
Layer 2:     RuVector/MinCut + FACT (Literature)
Layer 1:     rvdna + MidStream (Real-time Streaming)`;

export default function ArchitecturePage() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyArch = async () => {
    try {
      await navigator.clipboard.writeText(ASCII_ARCH);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="panel-label mb-0">System Architecture</span>
          <Chip size="sm" variant="flat" color="warning" className="font-mono text-[10px]">
            Development
          </Chip>
        </div>
        <h1 className="text-2xl font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
          7-Layer Genomic Intelligence Pipeline
        </h1>
      </div>

      {/* Architecture Diagram — Visual Stack */}
      <div className="space-y-1">
        {LAYERS.map((layer, idx) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            onMouseEnter={() => setHoveredLayer(layer.id)}
            onMouseLeave={() => setHoveredLayer(null)}
            className="relative overflow-hidden rounded-lg transition-all duration-200"
            style={{
              background: hoveredLayer === layer.id ? 'var(--bg-elevated)' : 'var(--bg-surface)',
              border: `1px solid ${hoveredLayer === layer.id ? layer.color : 'var(--bg-border)'}`,
              borderLeft: `4px solid ${layer.color}`,
            }}
          >
            <div className="px-5 py-3 flex items-center gap-4">
              {/* Layer number */}
              <div
                className="font-mono text-xs font-bold w-8 text-center flex-shrink-0"
                style={{ color: layer.color }}
              >
                {layer.number || "MCP"}
              </div>

              {/* Layer name */}
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {layer.name}
                </div>
                {/* Components — always visible */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  {layer.components.map((comp, i) => (
                    <span key={i} className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {comp}
                      {i < layer.components.length - 1 && (
                        <span className="ml-3" style={{ color: 'var(--bg-border)' }}>|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <span
                  className="font-mono text-xs font-semibold px-2 py-1 rounded"
                  style={{
                    color: layer.color,
                    background: `${layer.color}15`,
                  }}
                >
                  {layer.status}
                </span>
              </div>
            </div>

            {/* Accent glow on hover */}
            {hoveredLayer === layer.id && (
              <div
                className="absolute inset-y-0 left-0 w-1 opacity-60"
                style={{ background: layer.color, boxShadow: `0 0 12px ${layer.color}` }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="mt-10 rounded-lg p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <span className="panel-label">Data Flow Pipeline</span>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {FLOW_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="font-mono text-xs font-semibold px-2.5 py-1 rounded"
                style={{
                  color: step.color,
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}30`,
                }}
              >
                {step.label}
              </span>
              {i < FLOW_STEPS.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-teal)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="bordered"
          size="sm"
          onPress={copyArch}
          className="font-mono text-xs"
          style={{ borderColor: 'var(--bg-border)', color: 'var(--text-secondary)' }}
        >
          {copied ? "Copied" : "Copy Architecture"}
        </Button>
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          Simulated Data · In Silico Environment
        </span>
      </div>
    </div>
  );
}
