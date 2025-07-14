import { OutcomeRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await OutcomeRepository.createItems(await req.json());
  return NextResponse.json({ data });
}