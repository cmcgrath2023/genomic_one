# genomic_one

AI-native genomic intelligence platform built with Rust, designed for life sciences researchers and drug makers.

**Live dashboard**: https://cmcgrath2023.github.io/genomic_one/

## Architecture

```
                            ┌──────────────────────────────────────────┐
                            │           GENOMIC ONE PLATFORM           │
                            └──────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                              FRONTEND (Next.js 16 / React 19)                  │
  │                                                                                 │
  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
  │  │  Dashboard    │  │  Brain       │  │  Brain       │  │  Brain           │    │
  │  │  (Gene Panel, │  │  /memories   │  │  /learning   │  │  /pathways       │    │
  │  │   K-mer, 3D   │  │  Vector      │  │  Bayesian    │  │  MinCut graph    │    │
  │  │   Protein,    │  │  similarity  │  │  priors,     │  │  Drug target     │    │
  │  │   Variants,   │  │  graph       │  │  neural      │  │  identification  │    │
  │  │   Epigenetic,  │  │              │  │  models      │  │                  │    │
  │  │   Pharma/GLP-1)│  │              │  │              │  │                  │    │
  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘    │
  │         │                  │                  │                   │              │
  │  ┌──────┴──────────────────┴──────────────────┴───────────────────┴──────────┐  │
  │  │                    HeroUI + Recharts + Three.js + Framer Motion           │  │
  │  │                    Collapsible Brain Sidebar (hamburger-react mobile)     │  │
  │  └──────────────────────────────────┬───────────────────────────────────────┘  │
  └─────────────────────────────────────┼──────────────────────────────────────────┘
                                        │ REST API (JSON)
                                        ▼
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                              BACKEND (Rust / Axum)                              │
  │                                                                                 │
  │  ┌────────────────────────────────────────────────────────────────────────────┐ │
  │  │                         API Layer (port 8080)                              │ │
  │  │  /api/panel  /api/kmer  /api/variants  /api/protein  /api/epigenetics     │ │
  │  │  /api/pharma  /api/rvdna  /api/brain/memories  /api/brain/learning        │ │
  │  │  /api/brain/pathways                                                       │ │
  │  └───────────────────────────────────┬────────────────────────────────────────┘ │
  │                                      │                                          │
  │  ┌───────────────────────────────────┴────────────────────────────────────────┐ │
  │  │                     5-LAYER INTELLIGENCE SYSTEM                            │ │
  │  │                                                                            │ │
  │  │  ┌──────────────────────────────────────────────────────────────────────┐  │ │
  │  │  │  L5: DECISION / ADVISORY                                            │  │ │
  │  │  │  Multi-signal synthesis → explainable recommendations               │  │ │
  │  │  │  Drug target identification, risk assessment                        │  │ │
  │  │  └────────────────────────────────┬─────────────────────────────────────┘  │ │
  │  │  ┌────────────────────────────────┴─────────────────────────────────────┐  │ │
  │  │  │  L4: BAYESIAN LEARNING (Savant-inspired)                            │  │ │
  │  │  │  Trait-based probabilistic reasoning, prior distributions           │  │ │
  │  │  │  Long-term pattern recognition, meta-cognitive reflection           │  │ │
  │  │  └────────────────────────────────┬─────────────────────────────────────┘  │ │
  │  │  ┌────────────────────────────────┴─────────────────────────────────────┐  │ │
  │  │  │  L3: NEURAL CLASSIFICATION (ruv-FANN)                               │  │ │
  │  │  │  Variant pathogenicity scoring, cascade networks                    │  │ │
  │  │  │  Gene expression forecasting, drug interaction prediction           │  │ │
  │  │  └────────────────────────────────┬─────────────────────────────────────┘  │ │
  │  │  ┌────────────────────────────────┴─────────────────────────────────────┐  │ │
  │  │  │  L2: VECTOR INTELLIGENCE (RuVector)                                 │  │ │
  │  │  │  HNSW-indexed k-mer vectors, KmerIndex similarity search            │  │ │
  │  │  │  MinCut pathway analysis, sublinear PageRank                        │  │ │
  │  │  └────────────────────────────────┬─────────────────────────────────────┘  │ │
  │  │  ┌────────────────────────────────┴─────────────────────────────────────┐  │ │
  │  │  │  L1: GENOMIC CORE (rvdna)                                           │  │ │
  │  │  │  Gene sequences → k-mer vectorization → Smith-Waterman alignment    │  │ │
  │  │  │  Variant calling → protein translation → epigenetic clock           │  │ │
  │  │  │  Pharmacogenomics (CYP2D6, GLP-1 interactions) → RVDNA format      │  │ │
  │  │  └─────────────────────────────────────────────────────────────────────┘  │ │
  │  └────────────────────────────────────────────────────────────────────────────┘ │
  └─────────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                              DEPLOYMENT                                         │
  │                                                                                 │
  │  GitHub Pages (static export) ← GitHub Actions (on push to master)              │
  │  Local dev: frontend :3005 │ backend :8080                                      │
  └─────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Sequence Data ──→ L1: rvdna pipeline
                    ├── k-mer vectors ──→ L2: RuVector HNSW index + MinCut
                    │                       ├── classified vectors ──→ L3: ruv-FANN neural nets
                    │                       │                           ├── scored patterns ──→ L4: Bayesian prior updates
                    │                       │                           │                        └──→ L5: Advisory output
                    │                       │                           └── variant pathogenicity, drug response predictions
                    │                       └── pathway partitions, similarity clusters
                    ├── variant calls ──→ sickle cell detection, pathogenicity scoring
                    ├── protein translation ──→ contact graph, 3D visualization
                    ├── epigenetic clock ──→ biological age prediction
                    └── pharmacogenomics ──→ CYP2D6 star alleles, GLP-1 RA recommendations
```

## Current Features

- **Gene Panel**: HBB, TP53, BRCA1, CYP2D6, INS — real human gene sequences
- **K-mer Vectorization**: 11-mer frequency vectors (512 dimensions) with cosine similarity
- **Smith-Waterman Alignment**: Local alignment with mapping quality scoring
- **Variant Calling**: Simulated pileup analysis with sickle cell detection
- **Protein Translation**: HBB to hemoglobin beta with 3D contact graph
- **Epigenetic Clock**: Horvath clock biological age estimation
- **Pharmacogenomics**: CYP2D6 star allele calling with GLP-1 receptor agonist recommendations, risk flags, and clinical interpretation
- **RVDNA Format**: AI-native binary format with pre-indexed k-mer vectors
- **Brain Dashboard**: Collapsible sidebar with Memories, Learning, Pathways, and Advisory views

## Quick Start

```bash
# Run the genomic analysis pipeline
cargo run

# Start the API backend (port 8080)
cargo run -- --serve

# Start the frontend dev server (port 3005)
cd frontend && npm install && npm run dev

# Analyze a 23andMe file
cargo run -- path/to/23andme.txt
```

## Tech Stack

| Layer | Stack |
|-------|-------|
| Pipeline | Rust, rvdna, ruvector-core, ruvector-solver |
| API | Axum, Tokio, tower-http (CORS) |
| Frontend | Next.js 16, React 19, HeroUI, Recharts, Three.js, Framer Motion |
| Deploy | GitHub Pages (static export via GitHub Actions) |

## Specifications

Feature specs follow [GitHub's Spec-Kit](https://github.com/github/spec-kit) format in `docs/speckit-specs/`.

## Ecosystem

- [rvdna](https://crates.io/crates/rvdna) — Rust DNA analysis library
- [RuVector](https://github.com/ruvnet/RuVector) — Self-learning vector database with graph neural networks
- [ruv-FANN](https://github.com/ruvnet/ruv-FANN) — Pure Rust neural network framework
- [Savant AI](https://github.com/bar181/savant-ai-results) — Bayesian trait-learning cognitive agents
- [Sublinear](https://crates.io/crates/sublinear) — Sublinear-time sparse solvers (included via rvdna)

## License

MIT
