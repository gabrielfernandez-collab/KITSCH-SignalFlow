import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: number | string;
  context: string;
  accent: "green" | "amber" | "rose" | "cyan";
}

const accentClasses: Record<MetricCardProps["accent"], string> = {
  green: "text-signal-green",
  amber: "text-signal-amber",
  rose: "text-signal-rose",
  cyan: "text-signal-cyan"
};

export function MetricCard({ accent, context, label, value }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-4xl font-semibold tracking-normal ${accentClasses[accent]}`}>
          {value}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{context}</p>
      </CardContent>
    </Card>
  );
}
