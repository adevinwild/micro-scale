import { NextRequest, NextResponse } from "next/server";
import appwrite from "~/server/appwrite";

type Prediction = {
  id: string;
  version: string;
  input: {
    image: string;
    upscale: 4;
  };
  logs: "";
  output: string;
  error: unknown | null;
  status: string;
  created_at: string;
  started_at: string;
  completed_at: string;
  webhook: string;
  metrics: { predict_time: number };
  urls: {
    cancel: string;
    get: string;
  };
};
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Prediction;

  const params = new URL(req.url).searchParams;

  const predictionId = params.get("id");

  try {
    await appwrite.database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PREDICTIONS_ID as string,
      predictionId as string,
      {
        is_generated: true,
        output: body.output,
      }
    );

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
