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
      {/* In Silico Banner */}
      <div
        className="py-1.5 text-center font-mono text-xs"
        style={{ background: '#1A1200', borderBottom: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}
      >
        <span className="font-semibold text-sm tracking-wide">IN SILICO</span>
        <span className="mx-2">·</span>
        Computational simulation — no real patient data is used or stored
      </div>

      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
            <DnaLogo className="w-8 h-8 text-foreground" />
            <h1 className="text-lg font-bold tracking-tight font-mono">GENOMIC ONE</h1>
          </div>

          {/* Center: Status Badges */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded font-mono" style={{ color: 'var(--streaming-pulse)', background: 'rgba(0,201,177,0.1)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-live" style={{ background: 'var(--streaming-pulse)' }} />
              MidStream Live
            </span>
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded font-mono" style={{ color: 'var(--safla-green)', background: 'rgba(0,229,160,0.1)' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
              SAFLA Active
            </span>
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded font-mono" style={{ color: 'var(--federation-node)', background: 'rgba(61,142,255,0.1)' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="8,1 14.93,5 14.93,11 8,15 1.07,11 1.07,5"/></svg>
              5/5 Nodes
            </span>
            <span className="text-xs px-2.5 py-1 rounded font-mono" style={{ color: 'var(--text-secondary)', background: 'rgba(122,156,199,0.1)' }}>
              FACT-Augmented
            </span>
          </div>

          {/* Right: In Silico label + Brain link */}
          <div className="flex items-center gap-2">
            <Link
              href="/brain/memories"
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface-2 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Open Brain"
              title="Brain"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 018 8c0 3-1.5 5.5-4 7v3H8v-3c-2.5-1.5-4-4-4-7a8 8 0 018-8z" />
                <line x1="10" y1="22" x2="14" y2="22" />
              </svg>
            </Link>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded"
              style={{ color: 'var(--accent-gold)', background: '#1A1200' }}
            >
              In Silico
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
          Genomic One — In Silico Case Study
        </div>
      </footer>
    </div>
  );
}
