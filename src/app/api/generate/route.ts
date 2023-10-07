import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const file: File | null = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 400 });
  }

  console.log(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return NextResponse.json({ message: "Hello world" });
}
