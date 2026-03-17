"use client";

import { useState } from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface LayerInfo {
  id: string;
  number: string;
  name: string;
  status: string;
  statusColor: string;
  borderColor: string;
  subComponents: string[];
}

const layers: LayerInfo[] = [
  {
    id: "deploy",
    number: "",
    name: "DEPLOYMENT — Federated MCP",
    status: "\u2B21 5/5 NODES",
    statusColor: "var(--federation-node)",
    borderColor: "var(--federation-node)",
    subComponents: [
      "Copenhagen (DK) \u2014 Primary EU Hub, GDPR Article 44 compliant",
      "Princeton (US) \u2014 R&D Processing, FDA 21 CFR Part 11",
      "Seattle (US) \u2014 Clinical Trials, HIPAA compliant",
      "Bangalore (IN) \u2014 Manufacturing QC, DPDP Act compliant",
      "Oxford (UK) \u2014 Academic Research, UK GDPR compliant",
      "Data never leaves jurisdiction \u2014 only anonymised embeddings cross borders",
    ],
  },
  {
    id: "l6",
    number: "L6",
    name: "SAFLA Safety Validation",
    status: "\u2713 VALIDATED",
    statusColor: "var(--safla-green)",
    borderColor: "var(--safla-green)",
    subComponents: [
      "Confidence threshold \u2014 Model confidence must exceed 80% for clinical recommendations",
      "Contraindication check \u2014 Cross-reference drug-drug interactions and known adverse effects",
      "Population coverage \u2014 Validate training data represents target demographics",
      "Regulatory classification \u2014 CPIC Level A / PharmGKB grading compliance",
    ],
  },
  {
    id: "l5",
    number: "L5",
    name: "Decision / Advisory",
    status: "\u25CF ACTIVE",
    statusColor: "var(--accent-teal)",
    borderColor: "var(--accent-teal)",
    subComponents: [
      "Multi-signal synthesis \u2014 Aggregate outputs from L1\u2013L4 into actionable recommendations",
      "GLP-1 pharmacogenomics \u2014 Semaglutide/Liraglutide dosing based on CYP2D6 phenotype",
      "Drug target identification \u2014 Map variant-pathway-drug relationships",
      "Risk assessment \u2014 Temporal disease trajectories with confidence intervals",
    ],
  },
  {
    id: "l4",
    number: "L4",
    name: "Bayesian + Temporal",
    status: "\u25CF ACTIVE",
    statusColor: "var(--accent-teal)",
    borderColor: "var(--accent-gold)",
    subComponents: [
      "Savant AI trait learning \u2014 Beta/Normal prior distributions updated with each analysis",
      "Temporal Attractor FTLE \u2014 Finite-time Lyapunov exponent disease progression modelling",
      "Prior distributions \u2014 Variant pathogenicity, drug response, epigenetic drift priors",
      "Confidence calibration \u2014 Bayesian updating with evidence accumulation",
    ],
  },
  {
    id: "l3",
    number: "L3",
    name: "Neural + Diffusion",
    status: "\u25CF ACTIVE",
    statusColor: "var(--accent-teal)",
    borderColor: "var(--accent-purple)",
    subComponents: [
      "ruv-FANN classification \u2014 Multi-layer feedforward networks for variant/phenotype classification",
      "Agentic Diffusion molecule generation \u2014 SMILES-based candidate drug design",
      "Cascade networks \u2014 Autoencoder embedding compression for gene clustering",
      "Model ensemble \u2014 VariantClassifier, DrugResponsePredictor, GeneClusterEmbedding",
    ],
  },
  {
    id: "l2",
    number: "L2",
    name: "Vector + FACT",
    status: "\u25CF ACTIVE",
    statusColor: "var(--accent-teal)",
    borderColor: "var(--accent-blue)",
    subComponents: [
      "RuVector HNSW \u2014 512-dimensional gene embeddings with hierarchical navigable small world indexing",
      "KmerIndex \u2014 k-mer frequency vectors for sequence similarity computation",
      "MinCut pathways \u2014 Graph-theoretic pathway partitioning (TP53-BRCA1-MDM2 cluster)",
      "FACT literature retrieval \u2014 PharmGKB, CPIC, PubMed evidence augmentation",
      "Sublinear PageRank \u2014 Efficient pathway importance scoring",
    ],
  },
  {
    id: "l1",
    number: "L1",
    name: "Genomic Core + MidStream",
    status: "\u25CF ACTIVE",
    statusColor: "var(--accent-teal)",
    borderColor: "var(--accent-teal)",
    subComponents: [
      "rvdna pipeline \u2014 Rust-native genomic analysis (HBB, TP53, BRCA1, CYP2D6, INS)",
      "Real-time SSE streaming \u2014 MidStream live results as analysis completes",
      "Variant calling \u2014 SNP detection with quality scores (e.g., HBB E6V sickle-cell)",
      "Protein translation \u2014 Codon-to-amino-acid with contact map prediction",
      "Epigenetics \u2014 CpG methylation analysis and biological age estimation",
    ],
  },
];

const ASCII_ARCHITECTURE = `\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  DEPLOYMENT   Federated MCP    \u2B21 5/5 NODES             \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L6  SAFLA Safety Validation   \u2713 VALIDATED              \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L5  Decision / Advisory       \u25CF ACTIVE                 \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L4  Bayesian + Temporal       \u25CF ACTIVE                 \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L3  Neural + Diffusion        \u25CF ACTIVE                 \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L2  Vector + FACT             \u25CF ACTIVE                 \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  L1  Genomic Core + MidStream  \u25CF ACTIVE                 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

Data Flow:
Sequence Data \u2192 L1 \u2192 k-mer vectors \u2192 L2 \u2192 classified vectors \u2192 L3
\u2192 scored patterns \u2192 L4 \u2192 synthesized insights \u2192 L5 \u2192 SAFLA validated \u2192 L6
                                                                    \u2193
                                                        Federated MCP deployment`;

export default function ArchitecturePage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const copyArchitecture = async () => {
    try {
      await navigator.clipboard.writeText(ASCII_ARCHITECTURE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="p-6 sm:p-10">
      {/* Header */}
      <div className="mb-2">
        <h1
          className="font-mono text-2xl font-light tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          SYSTEM ARCHITECTURE
        </h1>
        <p
          className="font-mono text-sm mt-1"
          style={{ color: "var(--text-secondary)" }}
        >
          7-Layer Genomic Intelligence Pipeline
        </p>
      </div>

      {/* Layer Stack */}
      <div className="mt-8 space-y-0">
        {layers.map((layer, idx) => (
          <div key={layer.id}>
            <Card
              isPressable
              onPress={() => toggle(layer.id)}
              className="bg-surface border border-border rounded-none cursor-pointer transition-colors duration-150 hover:bg-surface-2"
              style={{
                borderTop:
                  idx === 0
                    ? `2px solid ${layer.borderColor}`
                    : `1px solid var(--bg-border)`,
                borderLeft: `3px solid ${layer.borderColor}`,
              }}
            >
              <CardBody className="p-0">
                <div className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    {layer.number && (
                      <span
                        className="font-mono text-xs font-semibold min-w-[24px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {layer.number}
                      </span>
                    )}
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {layer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs"
                      style={{ color: layer.statusColor }}
                    >
                      {layer.status}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200"
                      style={{
                        color: "var(--text-muted)",
                        transform:
                          expanded === layer.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === layer.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-4 pt-1 border-t"
                        style={{ borderColor: "var(--bg-border)" }}
                      >
                        <ul className="space-y-1.5">
                          {layer.subComponents.map((comp, i) => {
                            const [label, ...rest] = comp.split(" \u2014 ");
                            const detail = rest.join(" \u2014 ");
                            return (
                              <li
                                key={i}
                                className="font-mono text-xs flex items-start gap-2"
                              >
                                <span
                                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                  style={{
                                    backgroundColor: layer.borderColor,
                                  }}
                                />
                                <span>
                                  <span
                                    style={{
                                      color: "var(--text-primary)",
                                    }}
                                  >
                                    {label}
                                  </span>
                                  {detail && (
                                    <span
                                      style={{
                                        color: "var(--text-secondary)",
                                      }}
                                    >
                                      {" "}
                                      &mdash; {detail}
                                    </span>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {/* Data Flow Section */}
      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <h2
          className="font-mono text-xs uppercase tracking-[0.15em] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Data Flow
        </h2>
        <div
          className="font-mono text-xs leading-6 whitespace-pre-wrap"
          style={{ color: "var(--text-secondary)" }}
        >
          <span style={{ color: "var(--text-primary)" }}>Sequence Data</span>
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L1</span>
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          k-mer vectors
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L2</span>
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          classified vectors
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L3</span>
          {"\n"}
          <span style={{ color: "var(--accent-teal)" }}>&rarr; </span>
          scored patterns
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L4</span>
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          synthesized insights
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L5</span>
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          SAFLA validated
          <span style={{ color: "var(--accent-teal)" }}> &rarr; </span>
          <span style={{ color: "var(--text-primary)" }}>L6</span>
          {"\n"}
          <span className="ml-[280px] sm:ml-[360px]" />
          {"                                                                    "}
          <span style={{ color: "var(--accent-teal)" }}>&darr;</span>
          {"\n"}
          {"                                                        "}
          <span style={{ color: "var(--federation-node)" }}>
            Federated MCP deployment
          </span>
        </div>
      </div>

      {/* Copy Architecture Button */}
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="bordered"
          size="sm"
          onPress={copyArchitecture}
          className="font-mono text-xs border-border"
          style={{ color: "var(--text-secondary)" }}
        >
          {copied ? "\u2713 Copied" : "Copy Architecture"}
        </Button>
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: "bg-amber-500/10",
            content: "text-amber-400 font-mono text-[10px]",
          }}
        >
          Simulated Data &middot; In Silico Environment
        </Chip>
      </div>
    </div>
  );
}
