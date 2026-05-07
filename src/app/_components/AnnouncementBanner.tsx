"use client";

export default function AnnouncementBanner() {
  return (
    <div className="w-full bg-main left-0 fixed top-0 text-cream text-center ~text-[0.75rem]/[0.875rem] font-medium py-2.5 px-4 z-[90000]">
      <span className="inline-flex items-center  justify-center gap-1 md:gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className=" ~size-[0.875rem]/[1rem] shrink-0"
        >
          <path
            fill="#FFF5E7"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm.75 15h-1.5v-6h1.5v6Zm0-8h-1.5V7h1.5v2Z"
          />
        </svg>
        <span>
          We're not accepting orders right now.
          <span className="max-md:hidden"> Please check back shortly.</span>
        </span>
      </span>
    </div>
  );
}
