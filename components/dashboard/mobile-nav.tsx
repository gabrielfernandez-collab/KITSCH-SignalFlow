"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { isNavItemActive, navigationGroups } from "@/components/dashboard/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/10 px-4 py-3 lg:hidden">
      <div className="flex gap-4 overflow-x-auto pb-1">
        {navigationGroups.map((group) => (
          <div className="min-w-[11rem] shrink-0" key={group.label}>
            <p className="mb-2 font-meta text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-2">
              {group.items.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);
                const Icon = item.icon;

                return (
                  <Link
                    className={cn(
                      "flex h-10 items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-muted-foreground",
                      isActive && "border-signal-green/30 bg-signal-green/10 text-signal-green"
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="truncate font-medium">{item.label}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
