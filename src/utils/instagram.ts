// Reel metadata comes from Instagram's public oEmbed endpoint. It returns the
// caption and author but the thumbnail URL it hands back is signed and expires,
// so images are served through /api/instagram-thumbnail instead.

export type TReel = {
  shortcode: string;
  url: string;
  caption: string;
  author: string;
  thumbnail: string;
};

const stripCaption = (title: string) =>
  title
    .replace(/\s+/g, " ")
    .replace(/#\S+/g, "")
    .trim();

export const getReel = async (shortcode: string): Promise<TReel> => {
  const url = `https://www.instagram.com/reel/${shortcode}/`;
  const fallback: TReel = {
    shortcode,
    url,
    caption: "",
    author: "shreekakajimasale",
    thumbnail: `/api/instagram-thumbnail?shortcode=${shortcode}`,
  };

  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return fallback;

    const data = await response.json();
    return {
      ...fallback,
      caption: stripCaption(data.title ?? ""),
      author: data.author_name ?? fallback.author,
    };
  } catch {
    return fallback;
  }
};

export const getReels = (shortcodes: string[]) =>
  Promise.all(shortcodes.map(getReel));
