import { Metadata } from "next";

export function getMetadata(
  { title, description, image } = {
    title: "µScale - Upscale your images using AI",
    description:
      "µScale is an open-source image upscaling tool that uses AI to upscale your images.",
    image: "https://micro-scale.vercel.com/_static/thumbnail.png",
  }
): Metadata {
  return {
    description,
    title,
    openGraph: {
      description,
      title,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@adevinwild",
      description,
      images: [image],
      title,
    },
  };
}
