"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import BrainSidebar from "@/components/BrainSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* In Silico Banner */}
      <div
        className="py-1.5 text-center font-mono text-xs"
        style={{ background: '#1A1200', borderBottom: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}
      >
        <span className="font-semibold text-sm tracking-wide">IN SILICO</span>
        <span className="mx-2 hidden sm:inline">·</span>
        <span className="hidden sm:inline">Computational simulation — no real patient data is used or stored</span>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left: spacer for sidebar alignment */}
          <div className="w-[60px] md:hidden" />

          {/* Center: Status Badges */}
          <div className="hidden lg:flex items-center gap-2">
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

          {/* Right: Auth + In Silico */}
          <div className="flex items-center gap-2">
            <Button
              as={Link}
              href="/brain/simulate"
              size="sm"
              variant="flat"
              className="font-mono text-xs hidden sm:flex"
              style={{ color: 'var(--accent-teal)', background: 'rgba(0,201,177,0.1)' }}
            >
              + New Simulation
            </Button>
            <Button size="sm" variant="bordered" className="font-mono text-xs" style={{ borderColor: 'var(--bg-border)', color: 'var(--text-secondary)' }}>
              Log In
            </Button>
            <Button size="sm" className="font-mono text-xs" style={{ background: 'var(--accent-teal)', color: '#090E1A' }}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex">
        <BrainSidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
