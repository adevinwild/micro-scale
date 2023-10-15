import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "~/lib/constants";
import appwrite from "~/server/appwrite";
import replicate from "~/server/replicate";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { output: { nsfw_detected: boolean } };

  const predictionId = req.nextUrl.searchParams.get("id");
  const blobURL = req.nextUrl.searchParams.get("blobURL");

  if (!predictionId) {
    return NextResponse.json(
      { message: "An error has occured." },
      { status: 500 }
    );
  }

  const isNSFW = body.output.nsfw_detected;

  if (isNSFW) {
    await appwrite.database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PREDICTIONS_ID as string,
      predictionId as string,
      {
        is_generated: false,
        nsfw: true,
      }
    );

    return NextResponse.json({ message: "NSFW" }, { status: 422 });
  }

  try {
    const webhook = new URL(`${SITE_URL}/api/webhook/save-image`);
    webhook.searchParams.set("id", predictionId);

    await replicate.predictions.create({
      version:
        "32fdb2231d00a10d33754cc2ba794a2dfec94216579770785849ce6f149dbc69",
      input: {
        scale: 4,
        image: blobURL,
      },
      webhook: webhook.toString(),
      webhook_events_filter: ["completed"],
    });

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
