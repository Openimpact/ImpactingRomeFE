import { system_client } from "@/repos";
import { createUser } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log("REQUEST DATA", data)
    const result = await system_client.request(createUser(data));
    console.log(result)
    return NextResponse.json({ message: "utente registrato con successo" });
  }