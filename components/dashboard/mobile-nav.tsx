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
  UsersRound
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/competitors", label: "Competitors", icon: UsersRound },
  { href: "/product-launch-radar", label: "Launches", icon: Radar },
  { href: "/pricing-intelligence", label: "Pricing", icon: Tags },
  { href: "/campaign-intelligence", label: "Campaigns", icon: Megaphone },
  { href: "/weekly-brief-generator", label: "Brief", icon: FileText },
  { href: "/assessment", label: "Assessment", icon: ClipboardCheck }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 lg:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            className={cn(
              "flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-muted-foreground",
              isActive && "border-signal-green/30 bg-signal-green/10 text-signal-green"
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
  );
}
