import { OperatoriRepository } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("REQUEST DATA", data);
  //todo: verificare che i valori che riceviamo siano corretti, altrimenti, restituire un errore appropriato.
  await OperatoriRepository.createItem(data).then(console.log);

  return NextResponse.json({ message: "operatore registrato con successo" });
}

export async function GET(req: NextRequest) {
  const data = await OperatoriRepository.readItems([
    "*",
    "*.*",
    "anagrafica.*",
    "main_image",
    "campoType.*.*",
    "skillType.*.*",
    "professionType.*.*",
  ]);
  return NextResponse.json(data);
}
