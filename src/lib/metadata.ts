import { Metadata } from "next";

export function getMetadata(
  { title, description, image } = {
    title: "µScale - Upscale your images using AI",
    description:
      "µScale is an open-source image upscaling tool that uses AI to upscale your images up to 4x their original size.",
    image: "https://micro-scale.vercel.app/_static/thumbnail.png",
  }
): Metadata {
  return {
    description,
    title,
    icons: [
      {
        url: "https://micro-scale.vercel.app/_static/favicon.ico",
      },
    ],
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
