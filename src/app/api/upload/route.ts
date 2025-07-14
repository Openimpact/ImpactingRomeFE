import { uploadImage } from "@/repos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const fileData = await request.formData()
  const file: File | null = fileData.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const data = await uploadImage(file);
  return NextResponse.json(data);
}
