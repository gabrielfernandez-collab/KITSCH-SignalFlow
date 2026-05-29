import { NextResponse } from "next/server";

import { generateWeeklyBrief } from "@/lib/intelligence";

export async function GET() {
  return NextResponse.json(generateWeeklyBrief());
}
