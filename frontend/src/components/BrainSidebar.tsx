"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Tooltip } from "@heroui/react";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import DnaLogo from "@/components/DnaLogo";

const STORAGE_KEY = "brain-sidebar-collapsed";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  heading?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
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
        label: "Simulate",
        href: "/brain/simulate",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6v2H9zM12 5v3M5.5 8h13l-1.5 13H7z" />
            <circle cx="10" cy="14" r="1" />
            <circle cx="14" cy="14" r="1" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
        ),
      },
    ],
  },
  {
    heading: "Brain",
    items: [
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
    ],
  },
  {
    heading: "System",
    items: [
      {
        label: "Intelligence",
        href: "/brain/intelligence",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
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
      {
        label: "Architecture",
        href: "/brain/architecture",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="4" rx="1" />
            <rect x="5" y="9" width="14" height="3" rx="1" />
            <rect x="5" y="14" width="14" height="3" rx="1" />
            <rect x="3" y="19" width="18" height="2" rx="1" />
          </svg>
        ),
      },
    ],
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

  const renderNavItem = (item: NavItem, isMobile: boolean) => {
    const active = isActive(item.href);
    const linkContent = (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => isMobile && setMobileOpen(false)}
        className={`
          flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
          transition-colors duration-150
          ${active
            ? "text-accent"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }
          ${collapsed && !isMobile ? "justify-center px-0" : ""}
        `}
        style={active ? { background: 'rgba(0,201,177,0.1)', borderLeft: '2px solid var(--accent-teal)' } : {}}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        {(!collapsed || isMobile) && (
              <span className="flex items-center gap-2">
                {item.label}
                {item.href === "/brain/architecture" && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: 'var(--accent-gold)', background: 'rgba(240,180,41,0.1)' }}>DEV</span>
                )}
              </span>
            )}
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
  };

  const navContent = (isMobile: boolean) => (
    <nav className="flex flex-col px-2 py-2">
      {/* Create button */}
      {(!collapsed || isMobile) && (
        <Link
          href="/brain/simulate"
          onClick={() => isMobile && setMobileOpen(false)}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 mb-2 text-sm font-mono font-semibold transition-colors duration-150"
          style={{ background: 'rgba(0,201,177,0.1)', color: 'var(--accent-teal)', border: '1px solid rgba(0,201,177,0.2)' }}
        >
          <span className="w-5 h-5 rounded-full border-2 dark:border-white border-black dark:text-white text-black flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="6" x2="12" y2="18" /><line x1="6" y1="12" x2="18" y2="12" /></svg>
          </span>
          Create
        </Link>
      )}
      {collapsed && !isMobile && (
        <Tooltip content="Create" placement="right">
          <Link
            href="/brain/simulate"
            className="flex items-center justify-center rounded-lg py-2.5 mb-2 transition-colors duration-150"
            style={{ background: 'rgba(0,201,177,0.1)', color: 'var(--accent-teal)' }}
          >
            <span className="w-6 h-6 rounded-full border-2 dark:border-white border-black dark:text-white text-black flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="6" x2="12" y2="18" /><line x1="6" y1="12" x2="18" y2="12" /></svg>
            </span>
          </Link>
        </Tooltip>
      )}
      {navSections.map((section, si) => (
        <div key={si} className={si > 0 ? "mt-2" : ""}>
          {section.heading && !collapsed && (
            <div
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 pt-3 pb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {section.heading}
            </div>
          )}
          {section.heading && collapsed && !isMobile && (
            <div className="border-t border-border my-1 mx-2" />
          )}
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => renderNavItem(item, isMobile))}
          </div>
        </div>
      ))}
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
        {/* Sidebar header: Logo + App Name */}
        <div className="flex items-center px-3 py-3 border-b border-border min-h-[64px] gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <DnaLogo className="w-[42px] h-[42px] flex-shrink-0" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-base font-bold tracking-tight whitespace-nowrap"
                style={{ color: 'var(--text-primary)' }}
              >
                GENOMIC ONE
              </motion.span>
            )}
          </Link>
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
                <DnaLogo className="w-[42px] h-[42px]" />
                <span className="font-mono text-base font-bold" style={{ color: 'var(--text-primary)' }}>GENOMIC ONE</span>
              </div>
              {navContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
