"use client";
import Arrow from "@/src/components/svg/Arrow";
import Instagram from "@/src/components/svg/Instagram";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { TReel } from "@/src/utils/instagram";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  reels: TReel[];
  instagramUrl: string;
};

const ReelsCarousel = ({ reels, instagramUrl }: Props) => {
  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
    >
      <div className="flex items-center gap-[1rem] justify-between">
        <div>
          <h3 className="~text-[1rem]/[1.5rem] font-medium text-main leading-[120%] tracking-[-0.03em]">
            From Our Instagram
          </h3>
          <p className="~text-[0.75rem]/[1rem] ~mt-[0]/[0.3125rem] font-medium leading-[120%] tracking-[-0.03em] text-[#1A1A1ABF]">
            Recipes, reels and everything happening at Kakaji Masale.
          </p>
        </div>
        <div className="flex gap-[0.5rem] shrink-0">
          <CarouselPrevious>
            <Arrow className="~size-[1.25rem]/[1.5rem] relative z-10 rotate-[180deg] text-main transition-all duration-700 ease-in-out group-hover:text-white" />
          </CarouselPrevious>
          <CarouselNext>
            <Arrow className="~size-[1.25rem]/[1.5rem] relative z-10 text-main transition-all duration-700 ease-in-out group-hover:text-white" />
          </CarouselNext>
        </div>
      </div>

      <CarouselContent className="~mt-[1.875rem]/[2rem] items-stretch">
        {reels.map((reel) => (
          <CarouselItem
            key={reel.shortcode}
            className="~pr-[1rem]/[1.5rem] basis-[75%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <Link
              prefetch={false}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              {/* 9:16 keeps the reel in its native ratio — no stretching. */}
              <div className="relative aspect-[9/16] w-full overflow-hidden ~rounded-[0.75rem]/[1rem] bg-cream">
                <Image
                  src={reel.thumbnail}
                  alt={reel.caption || `Reel by @${reel.author}`}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                {/* Legibility scrim for the caption and play affordance. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                {/* Instagram mark */}
                <div className="absolute ~top-[0.625rem]/[0.875rem] ~right-[0.625rem]/[0.875rem] flex size-[1.75rem] items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-white group-hover:text-main">
                  <Instagram className="size-[0.875rem]" />
                </div>

                {/* Play affordance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex ~size-[2.75rem]/[3.25rem] items-center justify-center rounded-full bg-white/20 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:bg-white/90">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="~size-[1rem]/[1.25rem] translate-x-[1px] text-white transition-colors duration-500 group-hover:text-main"
                    >
                      <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.29-6.86a.5.5 0 0 0 0-.84L8.77 4.72a.5.5 0 0 0-.77.42z" />
                    </svg>
                  </div>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 ~p-[0.75rem]/[1rem]">
                  <p className="~text-[0.6875rem]/[0.8125rem] font-medium leading-[120%] tracking-[-0.02em] text-white/75">
                    @{reel.author}
                  </p>
                  {reel.caption && (
                    <p className="~mt-[0.2rem]/[0.3rem] line-clamp-2 ~text-[0.75rem]/[0.875rem] font-medium leading-[130%] tracking-[-0.02em] text-white">
                      {reel.caption}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-center ~pt-[1.5rem]/[2.5rem]">
        <Link
          prefetch={false}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-main hover:bg-main/70 tracking-[-0.04em] font-medium ~text-[0.75rem]/[1rem] duration-500 transition-all ease-in-out ~py-[0.375rem]/[0.625rem] flex items-center gap-[0.5rem] rounded-full text-white ~px-[0.75rem]/[1.25rem]"
        >
          <Instagram className="~size-[0.875rem]/[1rem]" />
          Follow @shreekakajimasale
        </Link>
      </div>
    </Carousel>
  );
};

export default ReelsCarousel;
