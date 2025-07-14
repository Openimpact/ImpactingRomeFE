import { ProfessionTypeRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await ProfessionTypeRepository.createItems(await req.json());
  return NextResponse.json({ data });
}

export async function GET(req: NextRequest) {
  const data = await ProfessionTypeRepository.readItems();
  return NextResponse.json(data);
}
