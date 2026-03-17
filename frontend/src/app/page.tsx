"use client";

import dynamic from "next/dynamic";
import GenePanel from "@/components/GenePanel";
import KmerHeatmap from "@/components/KmerHeatmap";
import VariantBrowser from "@/components/VariantBrowser";
import EpigeneticClock from "@/components/EpigeneticClock";
import PharmaDashboard from "@/components/PharmaDashboard";
import PipelineSummary from "@/components/PipelineSummary";

const ProteinViewer = dynamic(() => import("@/components/ProteinViewer"), {
  ssr: false,
  loading: () => <div className="h-80 bg-surface rounded-xl animate-pulse" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              G1
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Genomic One</h1>
              <p className="text-xs text-zinc-500">AI-Native Genomic Analysis</p>
            </div>
          </div>
          <a
            href="https://github.com/cmcgrath2023/genomic_one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Row 1: Gene Panel */}
        <section>
          <GenePanel />
        </section>

        {/* Row 2: K-mer Heatmap + Protein 3D */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">K-mer Similarity</h2>
            <KmerHeatmap />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Protein Contact Graph</h2>
            <ProteinViewer />
          </div>
        </section>

        {/* Row 3: Variants + Epigenetics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Variant Calling</h2>
            <VariantBrowser />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Epigenetic Clock</h2>
            <EpigeneticClock />
          </div>
        </section>

        {/* Row 4: Pharmacogenomics */}
        <section className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">Pharmacogenomics</h2>
          <PharmaDashboard />
        </section>

        {/* Row 5: Pipeline Summary */}
        <section className="bg-surface border border-border rounded-xl p-5">
          <PipelineSummary />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-zinc-500">
          Powered by{" "}
          <a href="https://crates.io/crates/rvdna" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            rvdna
          </a>{" "}
          &{" "}
          <a href="https://github.com/ruvnet/RuVector" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            RuVector
          </a>
        </div>
      </footer>
    </div>
  );
}
