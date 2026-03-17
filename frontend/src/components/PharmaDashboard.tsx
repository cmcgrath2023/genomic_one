"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Chip, Progress } from "@heroui/react";
import { getPharma } from "@/lib/api";

interface PharmaResult {
  sequence_length: number;
  allele1: { name: string; activity: number };
  allele2: { name: string; activity: number };
  phenotype: string;
  recommendations: { drug: string; recommendation: string; dose_factor: number }[];
}

const PHENOTYPE_COLORS: Record<string, "success" | "warning" | "danger" | "primary"> = {
  Normal: "success",
  Intermediate: "warning",
  Poor: "danger",
  Ultrarapid: "primary",
};

export default function PharmaDashboard() {
  const [data, setData] = useState<PharmaResult | null>(null);

  useEffect(() => {
    getPharma().then(setData);
  }, []);

  if (!data) return <div className="h-48 animate-pulse bg-surface-2 rounded" />;

  const totalActivity = data.allele1.activity + data.allele2.activity;

  return (
    <div className="space-y-4">
      {/* Allele cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-surface-2 border border-border">
          <CardBody className="gap-2">
            <div className="text-xs text-zinc-500">CYP2D6 Allele 1</div>
            <div className="text-xl font-mono font-bold">{data.allele1.name.replace("Star", "*")}</div>
            <div className="flex items-center gap-2">
              <Progress
                value={data.allele1.activity * 100}
                maxValue={100}
                size="sm"
                classNames={{ indicator: "bg-red-500", track: "bg-zinc-800" }}
              />
              <span className="text-xs font-mono text-zinc-400">{data.allele1.activity.toFixed(1)}</span>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-surface-2 border border-border">
          <CardBody className="gap-2">
            <div className="text-xs text-zinc-500">CYP2D6 Allele 2</div>
            <div className="text-xl font-mono font-bold">{data.allele2.name.replace("Star", "*")}</div>
            <div className="flex items-center gap-2">
              <Progress
                value={data.allele2.activity * 100}
                maxValue={100}
                size="sm"
                classNames={{ indicator: "bg-amber-500", track: "bg-zinc-800" }}
              />
              <span className="text-xs font-mono text-zinc-400">{data.allele2.activity.toFixed(1)}</span>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-surface-2 border border-border">
          <CardBody className="gap-2">
            <div className="text-xs text-zinc-500">Metabolizer Phenotype</div>
            <div className="flex items-center gap-2 mt-1">
              <Chip color={PHENOTYPE_COLORS[data.phenotype] || "default"} variant="flat" size="lg">
                {data.phenotype}
              </Chip>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Activity score: {totalActivity.toFixed(1)} ({data.sequence_length} bp analyzed)
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recommendations table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-zinc-500 text-xs">
              <th className="text-left py-2 px-3 font-medium">Drug</th>
              <th className="text-left py-2 px-3 font-medium">Recommendation</th>
              <th className="text-left py-2 px-3 font-medium">Dose Adjustment</th>
            </tr>
          </thead>
          <tbody>
            {data.recommendations.map((rec, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-3 px-3 font-mono font-semibold">{rec.drug}</td>
                <td className="py-3 px-3 text-zinc-300">{rec.recommendation}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${rec.dose_factor * 100}%`,
                        maxWidth: "80px",
                        backgroundColor: rec.dose_factor < 0.7 ? "#f43f5e" : "#f59e0b",
                      }}
                    />
                    <span className="font-mono text-xs">{rec.dose_factor}x</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
