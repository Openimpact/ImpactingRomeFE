import { DotazioniTypeRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await DotazioniTypeRepository.createItems(await req.json());
  return NextResponse.json({ data });
}
export async function GET(req: NextRequest) {
  const data = await DotazioniTypeRepository.readItems();
  return NextResponse.json(data);
}