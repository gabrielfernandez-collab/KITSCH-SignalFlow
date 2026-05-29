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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>Data Collection Status</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Public website collection can run live when enabled. Social and ad
              library sources use public metadata connectors in this MVP.
            </p>
          </div>
          <Button disabled={isRunning} onClick={runCollection}>
            <RefreshCw
              className={cn("h-4 w-4", isRunning && "animate-spin")}
              aria-hidden
            />
            {isRunning ? "Running collection" : "Run Public Collection"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <StatusTile
            label="Live Website Collection"
            status={
              collection.summary.liveWebsiteCollectionEnabled ? "Enabled" : "Disabled"
            }
            tone={collection.summary.liveWebsiteCollectionEnabled ? "green" : "amber"}
          />
          <StatusTile
            label="Social Source Collection"
            status="MVP metadata"
            tone="cyan"
          />
          <StatusTile
            label="Ad Library Collection"
            status="MVP metadata"
            tone="amber"
          />
          <StatusTile
            label="Last Collection"
            status={new Date(collection.collectedAt).toLocaleString()}
            tone="neutral"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <Metric label="Sources processed" value={collection.summary.sourcesProcessed} />
          <Metric label="Signals generated" value={collection.summary.signalsGenerated} />
          <Metric label="Failed sources" value={collection.summary.failedSources} />
          <Metric label="MVP sources" value={collection.summary.mvpSources} />
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            {error ? (
              <AlertCircle className="h-4 w-4 text-signal-rose" aria-hidden />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-signal-green" aria-hidden />
            )}
            {error ? "Collection Error" : "Collection Complete"}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {error ||
              `Sources Processed: ${collection.summary.sourcesProcessed}. Signals Generated: ${collection.summary.signalsGenerated}. Failed Sources: ${collection.summary.failedSources}.`}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Collection log
          </p>
          <div className="grid gap-2">
            {collection.collectionLog.slice(0, 8).map((entry) => (
              <div
                className="flex flex-col gap-2 rounded-md border border-white/10 bg-black/10 p-3 text-sm md:flex-row md:items-center md:justify-between"
                key={`${entry.competitor}-${entry.sourceType}-${entry.sourceUrl}`}
              >
                <div>
                  <p className="font-medium text-foreground">
                    {entry.competitor} - {entry.sourceType}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
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
                >
                  {entry.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-md border border-white/10 bg-black/10 p-4 text-sm leading-6 text-muted-foreground">
          <DatabaseZap className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" aria-hidden />
          <p>
            Live website fetching is controlled by `SIGNALFLOW_LIVE_FETCH=true`.
            The dashboard remains usable if third-party pages block, timeout, or
            require client-side rendering.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusTile({
  label,
  status,
  tone
}: {
  label: string;
  status: string;
  tone: "green" | "amber" | "cyan" | "neutral";
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/10 p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <div className="mt-2">
        <Badge tone={tone}>{status}</Badge>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
