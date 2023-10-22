import { Ratelimit } from "@upstash/ratelimit";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import Appwrite from "~/server/appwrite";

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, SITE_URL } from "~/lib/constants";
import replicate from "~/server/replicate";

const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(15, "1 d"), // 15 requests per 1 day
  redis: kv,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": SITE_URL,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return NextResponse.json(
      { message: "Maintenance mode is enabled" },
      { status: 503, headers: corsHeaders }
    );
  }

  if (process.env.NODE_ENV === "production") {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      req.ip;

    const limit = await ratelimit.limit(ip ?? "anonymous");

    if (!limit.success || limit.remaining <= 0) {
      return NextResponse.json(
        { message: "You have reached your request limit for the day." },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": limit.remaining.toString(),
            "X-RateLimit-Reset": limit.reset.toString(),
          },
        }
      );
    }
  }

  const file = req.body as ReadableStream;
  const contentType = req.headers.get("content-type");
  const contentLength = Number(req.headers.get("content-length"));

  if (!contentType || !ALLOWED_FILE_TYPES.includes(contentType)) {
    return NextResponse.json(
      { message: "Invalid content type" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (contentLength > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "File too large" },
      { status: 413, headers: corsHeaders }
    );
  }

  const filename = `${nanoid()}.${contentType.split("/")[1]}`;

  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  try {
    const savedPrediction = await Appwrite.database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PREDICTIONS_ID as string,
      "", // unique-id if empty
      {
        is_generated: false,
        output: null,
        input: blob.url,
      }
    );

    const webhook = new URL(`${SITE_URL}/api/webhook/safety`);
    // setting an id to the webhook so we can identify the prediction later
    webhook.searchParams.set("id", savedPrediction.$id);
    webhook.searchParams.set("blobURL", blob.url);

    const prediction = await replicate.predictions.create({
      version:
        "88c3624a13d60bb5ecd0cb215e49e39d2a2135c211bcb94fc801d3def46803c4",
      input: {
        image: blob.url,
      },
      webhook: webhook.toString(),
      webhook_events_filter: ["completed"],
    });

    if (prediction.error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        id: savedPrediction.$id,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
