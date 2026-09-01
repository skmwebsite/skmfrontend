import { getReels } from "@/src/utils/instagram";
import React from "react";
import ReelsCarousel from "./ReelsCarousel";

const INSTAGRAM_URL =
  "https://www.instagram.com/shreekakajimasale?igsh=MW00Y3lmNW83Y2dpbw%3D%3D&utm_source=qr";

// Reel shortcodes from instagram.com/shreekakajimasale
const REEL_SHORTCODES = [
  "DTNps1DiYFG",
  "DDtBUtGomYL",
  "DYPonutsEog",
  "DYuiegGsq1c",
  "C-DAmOsBxFI",
  "DXo-7OkjPwj",
];

const ReelsSection = async () => {
  const reels = await getReels(REEL_SHORTCODES);

  return (
    <div className="~pt-[1.5625rem]/[5rem]">
      <ReelsCarousel reels={reels} instagramUrl={INSTAGRAM_URL} />
    </div>
  );
};

export default ReelsSection;
