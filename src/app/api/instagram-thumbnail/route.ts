import { NextRequest } from "next/server";

// Instagram's CDN thumbnail URLs are signed and expire, so they can't be
// embedded directly in a cached page. This proxies them by shortcode instead,
// resolving a fresh URL on each request.

const SHORTCODE = /^[A-Za-z0-9_-]{1,32}$/;

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const shortcode = request.nextUrl.searchParams.get("shortcode");

  if (!shortcode || !SHORTCODE.test(shortcode)) {
    return new Response("Invalid shortcode", { status: 400 });
  }

  try {
    const oembed = await fetch(
      `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(
        `https://www.instagram.com/reel/${shortcode}/`,
      )}`,
      { next: { revalidate: 3600 } },
    );

    if (!oembed.ok) {
      return new Response("Not found", { status: 404 });
    }

    const { thumbnail_url } = await oembed.json();
    if (!thumbnail_url) {
      return new Response("No thumbnail", { status: 404 });
    }

    const image = await fetch(thumbnail_url, { next: { revalidate: 3600 } });
    if (!image.ok) {
      return new Response("Thumbnail unavailable", { status: 404 });
    }

    return new Response(image.body, {
      headers: {
        "Content-Type": image.headers.get("Content-Type") ?? "image/jpeg",
        // Cached at the edge; the signed source URL is refreshed hourly.
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Thumbnail unavailable", { status: 404 });
  }
}
