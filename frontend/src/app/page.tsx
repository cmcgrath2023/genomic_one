"use client";

import dynamic from "next/dynamic";
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
    <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Streaming Progress */}
      <section>
        <StreamingProgress />
      </section>

      {/* Row 1: Gene Panel */}
      <section>
        <GenePanel />
      </section>

      {/* Row 2: K-mer Heatmap + Protein 3D + Variant Calling */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="panel-card genomic">
          <span className="panel-label">K-mer Similarity</span>
          <KmerHeatmap />
        </div>
        <div className="panel-card genomic">
          <span className="panel-label">Protein Contact Graph</span>
          <ProteinViewer />
        </div>
        <div className="panel-card genomic">
          <span className="panel-label">Variant Calling</span>
          <VariantBrowser />
        </div>
      </section>

      {/* Row 3: Epigenetic Clock + Disease Trajectory */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="panel-card warning">
          <span className="panel-label">Epigenetic Clock</span>
          <EpigeneticClock />
        </div>
        <div className="panel-card warning">
          <span className="panel-label">Disease Trajectory — T2D Risk</span>
          <DiseaseTrajectory data={trajectoryData.t2d_insulin} />
        </div>
      </section>

      {/* Row 4: Pharmacogenomics */}
      <section className="panel-card safla">
        <span className="panel-label">Pharmacogenomics — CYP2D6 / GLP-1</span>
        <PharmaDashboard />
      </section>

      {/* Row 5: Pipeline Summary */}
      <section className="panel-card genomic">
        <PipelineSummary />
      </section>
    </div>
  );
}
