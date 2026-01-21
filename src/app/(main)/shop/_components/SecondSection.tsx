"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import ProductCard from "@/src/app/_components/ProductCard";
import { TShop } from "@/src/api/type";

type Props = {
  menuitems: TShop[];
};

const SecondSection = ({ menuitems }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isResponsiveUi = useMediaQuery("(max-width: 1024px)");

  const [activeSection, setActiveSection] = useState<string>("");

  if (menuitems.length === 0) {
    return null;
  }

  const isClickScrollingRef = useRef(false);

  useEffect(() => {
    if (!menuitems?.length) {
      return;
    }

    const handleScroll = () => {
      if (isClickScrollingRef.current) {
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.5;

      for (let i = menuitems.length - 1; i >= 0; i--) {
        const section = menuitems[i];
        const slug = section.slug;

        const element = document.getElementById(slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            setActiveSection(slug);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuitems]);

  useEffect(() => {
    if (!(activeSection && scrollContainerRef.current)) {
      return;
    }

    const container = scrollContainerRef.current;
    const activeElement = container.querySelector(
      `[data-section="${activeSection}"]`,
    ) as HTMLElement;

    if (activeElement) {
      const containerWidth = container.offsetWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;

      const scrollPosition =
        elementLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  const handleScrollClick = (category: string) => {
    isClickScrollingRef.current = true;
    setActiveSection(category);

    const el = document.getElementById(category);
    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = -0.3 * window.innerHeight;

    window.scrollTo({ top: rect.top + scrollTop + offset, behavior: "smooth" });

    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);
  };
  if (isResponsiveUi) {
    return (
      <div className="relative min-h-[calc(100vh-16rem)] w-full">
        <div className="pt-[1.125rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] pb-[1.5rem]">
          <h5 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[130%]">
            Shop
          </h5>
          <p className="text-[#1A1A1ABF] ~pt-[0.3rem]/[0.5rem] leading-[130%] tracking-[-0.02em] ~text-[0.75rem]/[1rem]">
            Explore our range of spices, seasonings, and more.
          </p>
        </div>
        <div className="sticky ~top-[3.87rem]/[5.6rem] z-[600]">
          <div
            className="no-scrollbar ~text-[0.75rem]/[1rem] font-medium tracking-[-0.03em] ~px-[1rem]/[1.5rem] flex w-full gap-[1.5rem] overflow-x-auto bg-white py-[0.5rem] lg:hidden"
            ref={scrollContainerRef}
          >
            {menuitems?.map((section) => {
              const slug = section.slug;
              return (
                <motion.button
                  className="flex shrink-0  "
                  data-section={slug}
                  key={slug}
                  layoutId={`position-${slug}`}
                  onClick={() => handleScrollClick(slug)}
                  type="button"
                >
                  <span
                    style={{ color: section.colour }}
                    className={`shrink-0 grow-1   cursor-pointer ${
                      activeSection === slug &&
                      "underline decoration-[1px] underline-offset-2"
                    } uppercase  `}
                  >
                    {section.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="relative pt-[1rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]  flex gap-[1rem] flex-col ">
            {menuitems?.map((section) => {
              const slug = section.slug;
              return (
                <div key={slug}>
                  <div
                    style={{ color: section.colour }}
                    className={`~text-[1rem]/[1.5rem]  flex ~gap-[0.625rem]/[0.75rem] mt-[0.75rem] mb-[1.5rem] whitespace-nowrap uppercase leading-[120%] tracking-[-0.03em] items-center font-semibold `}
                  >
                    <div
                      style={{ backgroundColor: section.colour }}
                      className={`~size-[0.625rem]/[0.875rem] shrink-0 rounded-full `}
                    ></div>
                    {section.name}{" "}
                    <div className="~text-[0.875rem]/[1.25rem] font-normal tracking-[-0.54px]">
                      ({section.products.length})
                    </div>
                    <div className="h-[1px] ~ml-[0.5rem]/[0.75rem] w-full bg-[#D9D9D9]"></div>
                  </div>
                  <div key={slug} id={slug}>
                    <div key={slug} className="grid grid-cols-2 gap-[1rem] ">
                      {section.products.map((item) => (
                        <ProductCard
                          key={item.id}
                          section={section.name}
                          item={item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {menuitems.length === 0 && (
              <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-[0.25rem]">
                <p className="~text-[1rem]/[1.5rem] font-neueHaasMedium text-redcolor/70">
                  No items found.
                </p>
                <p className="~text-[0.75rem]/[1rem] font-medium text-redcolor/50">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] ~pt-[1.6875rem]/[4.625rem] gap-[2.2875rem] w-full ">
      <div className="~w-[12rem]/[15.625rem] shrink-0">
        <div className="sticky  top-[7rem]">
          <div className=" relative overflow-y-auto min-h-[calc(100vh-5rem)] ">
            <h5 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[130%]">
              Shop
            </h5>
            <p className="text-[#1A1A1ABF] pt-[0.5rem] leading-[130%] tracking-[-0.02em] ~text-[0.75rem]/[1rem]">
              Explore our range of spices, seasonings, and more.
            </p>
            <div className=" pt-[1rem] flex flex-col gap-[0.5rem]">
              {menuitems?.map((section) => {
                const slug = section.slug;
                return (
                  <motion.button
                    className="flex uppercase relative text-[1rem] h-[3.5rem] leading-[120%] tracking-[-0.64px] justify-between w-full items-center"
                    key={slug}
                    layoutId={`position-${slug}`}
                    onClick={() => handleScrollClick(slug)}
                    type="button"
                  >
                    <div className="flex items-center gap-[0.75rem]">
                      <div className="size-[0.875rem] rounded-full bg-[#EBEBEB] relative overflow-hidden">
                        <motion.div
                          className={`absolute inset-0 rounded-full`}
                          initial={false}
                          style={{ backgroundColor: section.colour }}
                          animate={{
                            scale: activeSection === slug ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      </div>
                      {section.name}
                    </div>
                    {section.products.length}

                    <motion.div
                      className="absolute bottom-0 w-full bg-[#00000014] overflow-hidden"
                      initial={false}
                      animate={{
                        height: activeSection === slug ? "2px" : "1px",
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <motion.div
                        className="h-full bg-main"
                        initial={false}
                        animate={{
                          scaleX: activeSection === slug ? 1 : 0,
                        }}
                        style={{
                          originX: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {menuitems.length === 0 ? (
          <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-[0.25rem]">
            <p className="~text-[1rem]/[1.5rem] font-bold text-main/70">
              No items found.
            </p>
          </div>
        ) : (
          <div className="">
            {menuitems?.map((section) => {
              const slug = section.slug;
              return (
                <motion.div
                  className="bg-white"
                  id={slug}
                  key={slug}
                  layoutId={`menu-${slug}`}
                >
                  <div
                    style={{ color: section.colour }}
                    className={`text-[1.5rem]  flex gap-[0.75rem] whitespace-nowrap uppercase leading-[120%] tracking-[-0.54px] items-center font-semibold`}
                  >
                    <div className="size-[0.875rem] shrink-0 rounded-full"></div>
                    {section.name}{" "}
                    <div className="text-[1.25rem] font-normal tracking-[-0.54px]">
                      ({section.products.length})
                    </div>
                    <div className="h-[1px] ml-[12px] w-full bg-[#D9D9D9]"></div>
                  </div>
                  <div className="hidden grid-cols-1 ~pt-[1rem]/[2.3125rem] ~pb-[1rem]/[3.75rem] ~gap-[1.5rem]/[3rem] md:grid lg:grid-cols-2 xl:grid-cols-3">
                    {section.products.map((item) => (
                      <ProductCard
                        section={section.name}
                        key={item.id}
                        item={item}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondSection;
