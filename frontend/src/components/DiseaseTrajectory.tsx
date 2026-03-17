"use client";

import { Chip } from "@heroui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

interface TrajectoryPoint {
  age: number;
  risk: number;
  lower: number;
  upper: number;
  flag?: string;
}

interface TrajectoryDataset {
  label: string;
  points: TrajectoryPoint[];
}

interface DiseaseTrajectoryProps {
  data: TrajectoryDataset;
}

export default function DiseaseTrajectory({ data }: DiseaseTrajectoryProps) {
  const flaggedPoints = data.points.filter((p) => p.flag);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-zinc-200">
          {data.label}
        </h3>
        <div className="flex items-center gap-2">
          <Chip size="sm" variant="flat" color="secondary" className="text-[10px]">
            Temporal Attractor Model
          </Chip>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.points}
            margin={{ top: 10, right: 10, bottom: 5, left: -10 }}
          >
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="age"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "#3f3f46" }}
              tickLine={{ stroke: "#3f3f46" }}
              label={{
                value: "Age",
                position: "insideBottomRight",
                offset: -5,
                style: { fill: "#52525b", fontSize: 10 },
              }}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "#3f3f46" }}
              tickLine={{ stroke: "#3f3f46" }}
              domain={[0, 100]}
              label={{
                value: "Cumulative Risk (%)",
                angle: -90,
                position: "insideLeft",
                offset: 20,
                style: { fill: "#52525b", fontSize: 10 },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#27272a",
                border: "1px solid #3f3f46",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#a1a1aa" }}
              formatter={(value, name) => {
                const labels: Record<string, string> = {
                  risk: "Risk",
                  upper: "Upper CI",
                  lower: "Lower CI",
                };
                return [`${value}%`, labels[String(name)] || String(name)];
              }}
              labelFormatter={(label) => `Age ${label}`}
            />
            {/* Confidence band — upper */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#bandGradient)"
              fillOpacity={1}
            />
            {/* Confidence band — lower (mask out) */}
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#18181b"
              fillOpacity={1}
            />
            {/* Main risk line */}
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#riskGradient)"
              fillOpacity={1}
              dot={{ r: 3, fill: "#06b6d4", stroke: "#18181b", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#06b6d4" }}
            />
            {/* Flag markers */}
            {flaggedPoints.map((pt) => (
              <ReferenceDot
                key={pt.age}
                x={pt.age}
                y={pt.risk}
                r={6}
                fill="#f59e0b"
                stroke="#18181b"
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Flagged inflection points */}
      {flaggedPoints.length > 0 && (
        <div className="space-y-2">
          {flaggedPoints.map((pt) => (
            <div
              key={pt.age}
              className="flex items-center gap-2 text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span className="text-zinc-400">
                Age {pt.age} ({pt.risk}% risk):
              </span>
              <span className="text-amber-300 font-medium">{pt.flag}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-[10px] text-zinc-400 pt-1 border-t border-border/50">
        Simulated Data · In Silico Environment. Confidence intervals shown as shaded bands.
      </div>
    </div>
  );
}
