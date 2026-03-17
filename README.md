# genomic_one

AI-native genomic intelligence platform built with Rust, designed for life sciences researchers and drug makers.

**Live dashboard**: https://cmcgrath2023.github.io/genomic_one/

## 5-Layer Intelligence Architecture

```
┌─────────────────────────────────────────┐
│  Layer 5: Decision / Advisory           │  Synthesized insights, explainability
│  ─────────────────────────────────────  │
│  Layer 4: Bayesian Learning             │  Savant-style trait learning, priors
│  ─────────────────────────────────────  │
│  Layer 3: Neural Classification         │  ruv-FANN variant/pathway scoring
│  ─────────────────────────────────────  │
│  Layer 2: Vector Intelligence           │  RuVector HNSW, KmerIndex, MinCut
│  ─────────────────────────────────────  │
│  Layer 1: Genomic Core                  │  rvdna pipeline, sequences, variants
└─────────────────────────────────────────┘
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 1. Genomic Core | [rvdna](https://crates.io/crates/rvdna) | Sequence analysis, variant calling, protein translation, epigenetic clock, pharmacogenomics |
| 2. Vector Intelligence | [RuVector](https://github.com/ruvnet/RuVector) | HNSW similarity search, k-mer indexing, [MinCut](https://github.com/ruvnet/RuVector/tree/main/examples/mincut) pathway analysis, [sublinear](https://crates.io/crates/sublinear) PageRank |
| 3. Neural Classification | [ruv-FANN](https://github.com/ruvnet/ruv-FANN) | Variant pathogenicity scoring, gene expression forecasting, cascade networks |
| 4. Bayesian Learning | [Savant AI](https://github.com/bar181/savant-ai-results) | Trait-based probabilistic reasoning, long-term pattern recognition, meta-cognition |
| 5. Decision / Advisory | Custom | Multi-signal synthesis, drug target identification, risk assessment |

## Current Features

- **Gene Panel**: HBB, TP53, BRCA1, CYP2D6, INS — real human gene sequences
- **K-mer Vectorization**: 11-mer frequency vectors (512 dimensions) with cosine similarity
- **Smith-Waterman Alignment**: Local alignment with mapping quality scoring
- **Variant Calling**: Simulated pileup analysis with sickle cell detection
- **Protein Translation**: HBB to hemoglobin beta with contact graph prediction
- **Epigenetic Clock**: Horvath clock biological age estimation
- **Pharmacogenomics**: CYP2D6 star allele calling with drug recommendations
- **RVDNA Format**: AI-native binary format with pre-indexed k-mer vectors

## Brain Dashboard (In Progress)

The "Brain" sidebar provides access to the intelligence layers:

| Route | Content |
|-------|---------|
| `/brain/memories` | RuVector stored memories, similarity graph visualization |
| `/brain/learning` | Bayesian priors, neural model status, long-term patterns |
| `/brain/pathways` | MinCut pathway analysis, drug target identification |
| `/brain/advisory` | Synthesized recommendations, risk assessment |

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
| Frontend | Next.js 16, React 19, HeroUI, Recharts, Three.js |
| Deploy | GitHub Pages (static export via GitHub Actions) |

## Specifications

Feature specs follow [GitHub's Spec-Kit](https://github.com/github/spec-kit) format in `docs/speckit-specs/`.

## Ecosystem

- [rvdna](https://crates.io/crates/rvdna) — Rust DNA analysis library
- [RuVector](https://github.com/ruvnet/RuVector) — Self-learning vector database with graph neural networks
- [ruv-FANN](https://github.com/ruvnet/ruv-FANN) — Pure Rust neural network framework
- [Savant AI](https://github.com/bar181/savant-ai-results) — Bayesian trait-learning cognitive agents
- [Sublinear](https://crates.io/crates/sublinear) — Sublinear-time sparse solvers (included via rvdna)
- [RuView](https://github.com/ruvnet/RuView) — WiFi-based human perception (future: patient monitoring)

## License

MIT
