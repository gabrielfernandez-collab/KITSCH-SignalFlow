"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Megaphone,
  Radar,
  Tags,
  UsersRound,
  Zap
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Executive Dashboard", icon: BarChart3 },
  { href: "/competitors", label: "Competitors", icon: UsersRound },
  { href: "/product-launch-radar", label: "Product Launch Radar", icon: Radar },
  { href: "/pricing-intelligence", label: "Pricing Intelligence", icon: Tags },
  { href: "/campaign-intelligence", label: "Campaign Intelligence", icon: Megaphone },
  { href: "/weekly-brief-generator", label: "Weekly Brief Generator", icon: FileText },
  { href: "/assessment", label: "Assessment", icon: ClipboardCheck }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/30 px-4 py-5 lg:block">
      <Link className="mb-8 flex items-center gap-3 px-2" href="/">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-signal-green/25 bg-signal-green/10 text-signal-green">
          <Zap className="h-5 w-5" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">
            KITSCH SignalFlow
          </span>
          <span className="text-xs text-muted-foreground">
            Competitive Intelligence
          </span>
        </span>
      </Link>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              className={cn(
                "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
                isActive && "bg-white/8 text-foreground shadow-soft-border"
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Signal Standard
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground">
          Every surfaced item must explain what changed, why it matters, and what
          action may be required.
        </p>
      </div>
    </aside>
  );
}
