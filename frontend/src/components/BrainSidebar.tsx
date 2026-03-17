"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Tooltip } from "@heroui/react";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "brain-sidebar-collapsed";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Memories",
    href: "/brain/memories",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    label: "Learning",
    href: "/brain/learning",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Pathways",
    href: "/brain/pathways",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="6" y1="7" x2="10.5" y2="10.5" />
        <line x1="18" y1="7" x2="13.5" y2="10.5" />
        <line x1="6" y1="17" x2="10.5" y2="13.5" />
        <line x1="18" y1="17" x2="13.5" y2="13.5" />
      </svg>
    ),
  },
  {
    label: "Advisory",
    href: "/brain/advisory",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="18" x2="15" y2="18" />
        <line x1="10" y1="22" x2="14" y2="22" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
      </svg>
    ),
  },
  {
    label: "Federation",
    href: "/brain/federation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

export default function BrainSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setCollapsed(stored === "true");
      }
    } catch {
      // localStorage unavailable, default to expanded
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const sidebarWidth = collapsed ? 60 : 280;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  const navContent = (isMobile: boolean) => (
    <nav className="flex flex-col gap-1 px-2 py-2">
      {navItems.map((item) => {
        const active = isActive(item.href);
        const linkContent = (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setMobileOpen(false)}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
              transition-colors duration-150
              ${active
                ? "bg-accent/15 text-accent"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }
              ${collapsed && !isMobile ? "justify-center px-0" : ""}
            `}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {(!collapsed || isMobile) && <span>{item.label}</span>}
          </Link>
        );

        if (collapsed && !isMobile) {
          return (
            <Tooltip key={item.href} content={item.label} placement="right">
              {linkContent}
            </Tooltip>
          );
        }
        return <span key={item.href}>{linkContent}</span>;
      })}
    </nav>
  );

  if (!mounted) {
    return <div style={{ width: 280 }} className="hidden md:block flex-shrink-0" />;
  }

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0 border-r border-border bg-surface/80 backdrop-blur-sm overflow-hidden z-40"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-border min-h-[56px]">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-zinc-300 whitespace-nowrap"
            >
              Brain
            </motion.span>
          )}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="text-zinc-400 hover:text-zinc-200 ml-auto"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Button>
        </div>

        {navContent(false)}
      </motion.aside>

      {/* Mobile hamburger button — fixed top-left */}
      <div className="md:hidden fixed top-3 left-3 z-[60]">
        <Hamburger
          toggled={mobileOpen}
          toggle={setMobileOpen}
          size={22}
          color="#a1a1aa"
          label="Toggle navigation"
        />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 z-[55]"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-surface border-r border-border z-[58] flex flex-col overflow-y-auto"
            >
              <div className="flex items-center gap-2 px-4 py-4 border-b border-border min-h-[56px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M12 2a8 8 0 018 8c0 3-1.5 5.5-4 7v3H8v-3c-2.5-1.5-4-4-4-7a8 8 0 018-8z" />
                  <line x1="10" y1="22" x2="14" y2="22" />
                </svg>
                <span className="text-sm font-semibold text-zinc-300">Brain</span>
              </div>
              {navContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
