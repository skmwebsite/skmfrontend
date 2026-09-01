import React from "react";

type Props = {
  /** "overlay" sits on top of product imagery; "inline" sits in a text row. */
  variant?: "overlay" | "inline";
  className?: string;
};

/**
 * Shown when a product has tags === 1 (best seller enabled).
 * Uses the brand maroon rather than the orange accent so it stays legible over
 * product photography and doesn't compete with the orange hover states.
 */
const BestSellerTag = ({ variant = "overlay", className = "" }: Props) => {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={`flex w-fit shrink-0 items-center ~gap-[0.2rem]/[0.3rem] rounded-full font-semibold uppercase leading-[120%] tracking-[0.04em] text-white ${
        isOverlay
          ? "bg-main/95 ~px-[0.4rem]/[0.5625rem] ~py-[0.2rem]/[0.25rem] ~text-[0.5rem]/[0.625rem] shadow-[0_1px_6px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-white/25 backdrop-blur-[2px]"
          : "bg-main ~px-[0.5rem]/[0.625rem] ~py-[0.2rem]/[0.25rem] ~text-[0.5625rem]/[0.6875rem]"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="~size-[0.5rem]/[0.625rem] shrink-0"
      >
        <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 16.6l-5.6 3.1 1.3-6.3L3 9.1l6.3-.7L12 2.5z" />
      </svg>
      Best Seller
    </div>
  );
};

export default BestSellerTag;
