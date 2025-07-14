import { OutcomeRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,  context: { params: { sdg: string } }
  ) {
    const {
      params: { sdg },
    } = context;

  const data = await OutcomeRepository.readItems(["*"],{
    //@ts-ignore
    "sdg":{
      "_in": sdg.split("-")
    }
  });
  return NextResponse.json(data);
}
