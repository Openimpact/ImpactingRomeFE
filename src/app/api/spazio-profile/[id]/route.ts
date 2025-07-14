import { SpaziRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,context: { params:{id:string} }) {
    const {params:{id}} = context
    const data = await SpaziRepository.readItem(id,["*","images.*"])
    return NextResponse.json({ data })
}

