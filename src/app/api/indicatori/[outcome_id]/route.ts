import { IndicatoriRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await IndicatoriRepository.createItems(await req.json());
  return NextResponse.json({ data });
}

export async function GET(
  req: NextRequest,
  context: { params: { outcome_id: string } }
) {
  const {
    params: { outcome_id },
  } = context;
  const data = await IndicatoriRepository.readItems(["*", "proxy.*","outcome.*"], {
    //@ts-ignore
    outcome: {
      _eq: outcome_id,
    },
  });
  return NextResponse.json(data);
}
