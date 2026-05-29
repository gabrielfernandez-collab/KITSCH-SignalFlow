"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { isNavItemActive, navigationGroups } from "@/components/dashboard/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-black/35 px-4 py-5 backdrop-blur lg:block">
      <Link className="mb-8 flex items-center gap-3 px-2" href="/">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-signal-green/25 bg-signal-green/10 text-signal-green">
          <Zap className="h-5 w-5" aria-hidden />
        </span>
        <span>
          <span className="block font-heading text-sm font-semibold text-foreground">
            KITSCH SignalFlow
          </span>
          <span className="font-meta text-xs uppercase tracking-wide text-muted-foreground">
            Executive Intelligence Platform
          </span>
        </span>
      </Link>

      <nav className="space-y-5">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 font-meta text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);
                const Icon = item.icon;

                return (
                  <Link
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
                      isActive && "bg-white/8 text-foreground shadow-soft-border"
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="min-w-0 truncate font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-signal-green" aria-hidden />
          <p className="font-meta text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Signal Standard
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-foreground">
          Every surfaced item must explain what changed, why it matters, and what
          leadership should do next.
        </p>
      </div>
    </aside>
  );
}
