"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, DatabaseZap, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PublicCollectionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CollectionControlProps {
  initialCollection: PublicCollectionResult;
}

export function CollectionControl({ initialCollection }: CollectionControlProps) {
  const [collection, setCollection] =
    useState<PublicCollectionResult>(initialCollection);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  async function runCollection() {
    setIsRunning(true);
    setError("");

    try {
      const response = await fetch("/api/collect", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`Collection failed with status ${response.status}`);
      }

      const nextCollection = (await response.json()) as PublicCollectionResult;
      setCollection(nextCollection);
    } catch (collectionError) {
      setError(
        collectionError instanceof Error
          ? collectionError.message
          : "Collection failed unexpectedly."
      );
    } finally {
      setIsRunning(false);
    }
  }

  function formatTimestamp(iso: string) {
    const date = new Date(iso);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    };
  }

  const ts = formatTimestamp(collection.collectedAt);

  return (
    <Card className="max-w-none">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Data Collection Status</CardTitle>
          <Button disabled={isRunning} onClick={runCollection} className="shrink-0">
            <RefreshCw
              className={cn("h-4 w-4", isRunning && "animate-spin")}
              aria-hidden
            />
            {isRunning ? "Running" : "Run Public Collection"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-w-none space-y-6">
        {/* Collection Summary */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Collection Summary
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <StatusTile
              label="Collection Mode"
              tone={collection.mode === "live-public-fetch" ? "green" : "amber"}
            >
              {collection.mode === "live-public-fetch"
                ? "Live Public Fetch"
                : "MVP Public Connectors"}
            </StatusTile>
            <StatusTile
              label="Live Website Collection"
              tone={
                collection.summary.liveWebsiteCollectionEnabled ? "green" : "amber"
              }
            >
              {collection.summary.liveWebsiteCollectionEnabled
                ? "Live Enabled"
                : "Disabled"}
            </StatusTile>
            <StatusTile label="Social Sources" tone="cyan">
              Metadata Connector
            </StatusTile>
            <StatusTile label="Ad Library Sources" tone="amber">
              Reference Connector
            </StatusTile>
            <StatusTile label="Last Collection" tone="neutral" noBadge>
              <span className="block text-sm font-medium text-foreground">
                {ts.date}
              </span>
              <span className="block text-xs text-muted-foreground">
                {ts.time}
              </span>
            </StatusTile>
          </div>
        </div>

        {/* KPI Cards */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Metrics
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Sources Processed"
              value={collection.summary.sourcesProcessed}
            />
            <KpiCard
              label="Signals Generated"
              value={collection.summary.signalsGenerated}
            />
            <KpiCard
              label="Failed Sources"
              value={collection.summary.failedSources}
              highlight={collection.summary.failedSources > 0}
            />
            <KpiCard
              label="MVP Sources"
              value={collection.summary.mvpSources}
            />
          </div>
        </div>

        {/* Collection Status */}
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            {error ? (
              <AlertCircle className="h-4 w-4 text-signal-rose" aria-hidden />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-signal-green" aria-hidden />
            )}
            {error ? "Collection Error" : "Collection Complete"}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error ||
              `${collection.summary.sourcesProcessed} sources processed · ${collection.summary.signalsGenerated} signals generated · ${collection.summary.failedSources} failed`}
          </p>
        </div>

        {/* Collection Log */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Collection log
          </p>
          <div className="grid gap-2">
            {collection.collectionLog.slice(0, 8).map((entry) => (
              <div
                className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/10 p-3"
                key={`${entry.competitor}-${entry.sourceType}-${entry.sourceUrl}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {entry.competitor}
                    <span className="text-muted-foreground"> &middot; </span>
                    {entry.sourceType}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {entry.note}
                  </p>
                </div>
                <Badge
                  tone={
                    entry.status === "Live"
                      ? "green"
                      : entry.status === "Failed"
                        ? "rose"
                        : "neutral"
                  }
                  className="shrink-0 whitespace-nowrap"
                >
                  {entry.status === "Live"
                    ? "Live"
                    : entry.status === "Failed"
                      ? "Failed"
                      : "MVP"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/10 p-4 text-sm leading-6 text-muted-foreground">
          <DatabaseZap className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" aria-hidden />
          <p>
            Live website fetching is controlled by{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs font-mono">
              SIGNALFLOW_LIVE_FETCH=true
            </code>
            . The dashboard remains usable if third-party pages block, timeout, or
            require client-side rendering.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusTile({
  label,
  tone,
  noBadge,
  children
}: {
  label: string;
  tone: "green" | "amber" | "cyan" | "neutral";
  noBadge?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[5rem] flex-col justify-center gap-2 rounded-lg border border-white/10 bg-black/10 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {noBadge ? (
        <div>{children}</div>
      ) : (
        <Badge tone={tone} className="w-fit whitespace-nowrap">
          {children}
        </Badge>
      )}
    </div>
  );
}

function KpiCard({
  label,
  value,
  highlight
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "text-3xl font-semibold tabular-nums tracking-tight",
          highlight ? "text-signal-rose" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}
