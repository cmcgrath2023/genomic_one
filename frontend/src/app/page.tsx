"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import DnaLogo from "@/components/DnaLogo";
import StreamingProgress from "@/components/StreamingProgress";
import GenePanel from "@/components/GenePanel";
import KmerHeatmap from "@/components/KmerHeatmap";
import VariantBrowser from "@/components/VariantBrowser";
import EpigeneticClock from "@/components/EpigeneticClock";
import PharmaDashboard from "@/components/PharmaDashboard";
import PipelineSummary from "@/components/PipelineSummary";
import DiseaseTrajectory from "@/components/DiseaseTrajectory";
import { trajectoryData } from "@/lib/static-data";

const ProteinViewer = dynamic(() => import("@/components/ProteinViewer"), {
  ssr: false,
  loading: () => <div className="h-80 bg-surface rounded-xl animate-pulse" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Environment Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 text-center text-xs text-amber-400">
        Simulated Data — Demo Environment
      </div>

      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DnaLogo className="w-8 h-8 text-foreground" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">Genomic One</h1>
              <p className="text-xs text-zinc-500">AI-Native Genomic Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-live" />
              Live
            </span>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
              MidStream
            </span>
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              SAFLA Active
            </span>
            <Link
              href="/brain/memories"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 hover:text-accent transition-colors"
              aria-label="Open Brain"
              title="Brain"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 018 8c0 3-1.5 5.5-4 7v3H8v-3c-2.5-1.5-4-4-4-7a8 8 0 018-8z" />
                <line x1="10" y1="22" x2="14" y2="22" />
              </svg>
            </Link>
            <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
              Demo Environment
            </span>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Streaming Progress */}
        <section>
          <StreamingProgress />
        </section>

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

        {/* Row 4: Disease Trajectory */}
        <section className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">Disease Trajectory</h2>
          <DiseaseTrajectory data={trajectoryData.t2d_insulin} />
        </section>

        {/* Row 5: Pharmacogenomics */}
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
          Genomic One — AI-Native Genomic Intelligence
        </div>
      </footer>
    </div>
  );
}
