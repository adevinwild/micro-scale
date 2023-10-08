import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

import { MAX_FILE_SIZE } from "~/lib/constants";
import replicate from "~/server/replicate";

const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(15, "1 d"), // 10 requests per 1 day
  redis: kv,
});

export async function POST(req: NextRequest) {
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
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": limit.remaining.toString(),
          "X-RateLimit-Reset": limit.reset.toString(),
        },
      }
    );
  }

  const file = req.body as ReadableStream;
  const contentType = req.headers.get("content-type");
  const contentLength = Number(req.headers.get("content-length"));

  if (!contentType || !contentType.startsWith("image/")) {
    return NextResponse.json(
      { message: "Invalid content type" },
      { status: 400 }
    );
  }

  if (contentLength > MAX_FILE_SIZE) {
    return NextResponse.json({ message: "File too large" }, { status: 413 });
  }

  const filename = `${nanoid()}.${contentType.split("/")[1]}`;

  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  const output = await replicate.run(
    "cjwbw/real-esrgan:d0ee3d708c9b911f122a4ad90046c5d26a0293b99476d697f6bb7f2e251ce2d4",
    {
      input: {
        image: blob.url,
        upscale: 4,
      },
    }
  );

  return NextResponse.json({
    improved: output,
    original: blob.url,
  });
}
