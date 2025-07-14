import { OperatoriRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = context;
  const data = await OperatoriRepository.readItem(id, ["*", "images.*"]);
  return NextResponse.json({ data });
}
