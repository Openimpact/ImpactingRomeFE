import { SpaziRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const data = await SpaziRepository.search(["name", "id"], q!, 10);
  return NextResponse.json(data);
}
