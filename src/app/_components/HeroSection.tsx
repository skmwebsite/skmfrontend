"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@public/images/hero-bg.png";
import hero2 from "@public/images/banner-2.jpeg";
import Arrow from "@/src/components/svg/Arrow";
import Link from "next/link";

const banners = [
  {
    image: hero2,
    title: "Shree Kakaji Masale",
    subtitle: {
      part1: "Pure",
      part2: "Indian",
      part3: "Authentic",
    },
    description:
      "Hand-picked spices crafted with tradition and perfected with flavor bringing the true taste of India straight to your kitchen.",
  },
  {
    image: hero1,
    title: "Premium Spice Collection",
    subtitle: {
      part1: "Fresh",
      part2: "Organic",
      part3: "Natural",
    },
    description:
      "Experience the authentic flavors of India with our carefully sourced and expertly blended premium spices.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentBanner = banners[currentIndex];

  return (
    <div className="">
      <div className="w-full overflow-hidden bg-[#F8F5EE] rounded-[1rem] flex items-center max-md:items-end max-md:~pb-[0.84375rem]/[4rem] ~h-[27.6875rem]/[37.9256248474rem] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute  inset-0"
          >
            <Image
              src={currentBanner.image}
              fill
              alt="banner-image"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EE] to-transparent z-20 md:hidden"></div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute ~mt-[5rem]/[2.5rem] ~px-[0.84375rem]/[4rem] z-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-main font-medium leading-[110%] tracking-[-0.05em] ~text-[1.5rem]/[4rem]">
                {currentBanner.title}
              </h1>
              <h2 className="font-medium leading-[110%] tracking-[-0.05em] ~text-[1.5rem]/[4rem]">
                <span className="bg-gradient-to-b bg-clip-text text-transparent max-md:from-black from-[#5C5C5C] to-[#858585]">
                  {currentBanner.subtitle.part1} .
                </span>{" "}
                <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#EC5715] to-[#FF7E00]">
                  {currentBanner.subtitle.part2}
                </span>
                <span className="bg-gradient-to-b bg-clip-text text-transparent max-md:from-black from-[#5C5C5C] to-[#858585]">
                  . {currentBanner.subtitle.part3}
                </span>
              </h2>
              <p className="~text-[0.875rem]/[1.125rem] ~pb-[1.5rem]/[2rem] ~pt-[0.5rem]/[1rem] max-w-[50ch] md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
                {currentBanner.description}
              </p>
            </motion.div>
          </AnimatePresence>
          <Link
            href={"/shop"}
            className="relative overflow-hidden rounded-full bg-main text-white p-[0.125rem] ~w-[9.5625rem]/[13rem] flex items-center justify-end ~text-[0.75rem]/[1rem] tracking-[-0.03em] leading-[120%] font-medium group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
              Shop Fresh Masala
            </span>
            <div className="relative z-10 ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem] flex justify-center items-center bg-white rounded-full transition-all duration-700 ease-in-out">
              <Arrow className="~size-[1rem]/[1.5rem] text-main absolute right-[0.5rem] transition-transform duration-700 ease-in-out group-hover:-rotate-45" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
