import { NextResponse } from "next/server";

import { sourceRegistry } from "@/lib/source-registry";

export async function GET() {
  return NextResponse.json(sourceRegistry);
}
