import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function DataTableSection({
  children,
  description,
  title
}: DataTableSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1">{children}</CardContent>
    </Card>
  );
}
