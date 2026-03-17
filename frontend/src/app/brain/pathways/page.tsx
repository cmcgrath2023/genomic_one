"use client";

import { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { getMolecules } from "@/lib/api";
import { moleculeData as fallbackMoleculeData } from "@/lib/static-data";
import MoleculeCard, { MoleculeCandidate } from "@/components/MoleculeCard";

interface MoleculeResult {
  target_pathway: string;
  candidates: MoleculeCandidate[];
}

export default function PathwaysPage() {
  const [molecules, setMolecules] = useState<MoleculeResult>(fallbackMoleculeData);

  useEffect(() => {
    getMolecules().then((d) => setMolecules(d as MoleculeResult));
  }, []);

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold tracking-tight mb-2">Pathways</h1>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Biological pathway analysis, gene interaction networks, and signal cascades.
      </p>
      <div
        className="mt-8 rounded-xl border p-8 text-center"
        style={{
          borderColor: "var(--bg-border)",
          background: "var(--bg-surface)",
          color: "var(--text-secondary)",
        }}
      >
        MinCut pathway graph and network visualisation — coming soon
      </div>

      {/* Molecule Generation Section */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-1">
          <h2
            className="font-mono text-xs tracking-[0.15em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Molecule Generation
          </h2>
          <Chip size="sm" variant="flat" color="secondary" className="text-[10px] tracking-wider uppercase">
            Layer 3
          </Chip>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Candidate structures identified by Agentic Diffusion targeting {molecules.target_pathway}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {molecules.candidates.map((candidate) => (
            <MoleculeCard
              key={candidate.id}
              candidate={candidate}
              targetPathway={molecules.target_pathway}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
