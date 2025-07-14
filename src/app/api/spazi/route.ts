import { SpaziRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await SpaziRepository.readItems([
    "*",
    "images.*",
    "type.*.*",
    "dotazioniType.*.*",
  ]);
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("REQUEST DATA", data);
  //todo: verificare che i valori che riceviamo siano corretti, altrimenti, restituire un errore appropriato.
  await SpaziRepository.createItem(data).then(console.log);

  return NextResponse.json({ message: "spazio registrato con successo" });
}
