export const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4MB

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "https://b0b6-2a01-cb1c-8104-d500-312b-2dfb-d4b5-c9b6.ngrok-free.app"
    : "https://micro-scale.vercel.app";
