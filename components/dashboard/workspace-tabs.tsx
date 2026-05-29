"use client";

import { Database, Layers, Radio, ScrollText, Target } from "lucide-react";

import { cn } from "@/lib/utils";

export type WorkspaceId =
  | "brief"
  | "actions"
  | "signals"
  | "evidence"
  | "collection";

const workspaces = [
  { id: "brief" as const, label: "BRIEF", icon: Layers },
  { id: "actions" as const, label: "ACTIONS", icon: Target },
  { id: "signals" as const, label: "SIGNALS", icon: Radio },
  { id: "evidence" as const, label: "EVIDENCE", icon: ScrollText },
  { id: "collection" as const, label: "COLLECTION", icon: Database },
];

interface WorkspaceTabsProps {
  active: WorkspaceId;
  onSelect: (id: WorkspaceId) => void;
}

export function WorkspaceTabs({ active, onSelect }: WorkspaceTabsProps) {
  return (
    <div
      className="-mx-5 flex overflow-x-auto border-b border-white/10 px-5"
      role="tablist"
      aria-label="Intelligence workspaces"
    >
      {workspaces.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => {
              const currentIdx = workspaces.findIndex((w) => w.id === active);
              let nextIdx: number | null = null;
              if (e.key === "ArrowRight") {
                nextIdx = (currentIdx + 1) % workspaces.length;
              } else if (e.key === "ArrowLeft") {
                nextIdx =
                  (currentIdx - 1 + workspaces.length) % workspaces.length;
              }
              if (nextIdx !== null) {
                onSelect(workspaces[nextIdx].id);
              }
            }}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium font-meta tracking-wider transition-all duration-150",
              isActive
                ? "border-signal-green text-foreground"
                : "border-transparent text-muted-foreground hover:border-white/20 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}
