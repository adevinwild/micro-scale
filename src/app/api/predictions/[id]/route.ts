import { NextRequest, NextResponse } from "next/server";
import appwrite from "~/server/appwrite";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  const prediction = await appwrite.database.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_PREDICTIONS_ID as string,
    params.id
  );
  return NextResponse.json({ prediction, time: Date.now() }, { status: 200 });
}
