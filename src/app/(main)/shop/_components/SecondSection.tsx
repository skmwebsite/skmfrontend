"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import ProductCard from "@/src/app/_components/ProductCard";
import { TShop } from "@/src/api/type";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  menuitems: TShop[];
};

const SecondSection = ({ menuitems }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const isResponsiveUi = useMediaQuery("(max-width: 1024px)");

  const [activeSection, setActiveSection] = useState<string>("");

  const isClickScrollingRef = useRef(false);

  // Filter menu items based on search term from params
  const filteredMenuItems = menuitems.filter((section) => {
    if (searchTerm === "") {
      return true;
    }
    return section.products.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });
  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`?${params.toString()}`);
  };
  if (menuitems.length === 0) {
    return null;
  }

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

  // Scroll to top when search param is present
  useEffect(() => {
    if (searchTerm !== "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchTerm]);

  const SearchHeader = () => {
    if (searchTerm === "") return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className=" ~mb-[0.5rem]/[1.5rem] flex items-center justify-between "
      >
        <div className="flex items-center text-[#1A1A1ABF] pt-[0.5rem] leading-[130%] tracking-[-0.02em] ~text-[0.85rem]/[1rem] gap-2">
          <span className="">Search Results for:</span>
          <span className=" capitalize font-semibold text-main">
            {searchTerm}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearSearch}
          className="flex items-center gap-2 ~px-[0.75rem]/[1rem] ~py-[0.3rem]/[0.5rem]  ~text-[0.875rem]/[1rem] bg-[#F8F5EE] hover:bg-main hover:text-white rounded-full text-sm font-medium text-main transition-colors duration-300"
        >
          <label>Reset</label>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    );
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

        <div className="sticky ~top-[3.87rem]/[5.6rem] z-[600] bg-white pt-[0.5rem]">
          <div
            className="no-scrollbar ~text-[0.75rem]/[1rem] font-medium tracking-[-0.03em] ~px-[1rem]/[1.5rem] flex w-full gap-[1.5rem] overflow-x-auto bg-white py-[0.5rem] lg:hidden"
            ref={scrollContainerRef}
          >
            {filteredMenuItems?.map((section) => {
              const slug = section.slug;
              return (
                <motion.button
                  className="flex shrink-0"
                  data-section={slug}
                  key={slug}
                  layoutId={`position-${slug}`}
                  onClick={() => handleScrollClick(slug)}
                  type="button"
                >
                  <span
                    style={{ color: section.colour }}
                    className={`shrink-0 grow-1 cursor-pointer ${
                      activeSection === slug &&
                      "underline decoration-[1px] underline-offset-2"
                    } uppercase`}
                  >
                    {section.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] ">
            {" "}
            <SearchHeader />
          </div>
          <div className="relative pt-[1rem] ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] flex gap-[1rem] flex-col">
            {filteredMenuItems?.map((section) => {
              const slug = section.slug;
              return (
                <div key={slug}>
                  <div
                    style={{ color: section.colour }}
                    className="~text-[1rem]/[1.5rem] flex ~gap-[0.625rem]/[0.75rem] mt-[0.75rem] mb-[1.5rem] whitespace-nowrap uppercase leading-[120%] tracking-[-0.03em] items-center font-semibold"
                  >
                    <div
                      style={{ backgroundColor: section.colour }}
                      className="~size-[0.625rem]/[0.875rem] shrink-0 rounded-full"
                    />
                    {section.name}{" "}
                    <div className="~text-[0.875rem]/[1.25rem] font-normal tracking-[-0.54px]">
                      ({section.products.length})
                    </div>
                    <div className="h-[1px] ~ml-[0.5rem]/[0.75rem] w-full bg-[#D9D9D9]" />
                  </div>
                  <div key={slug} id={slug}>
                    <div key={slug} className="grid grid-cols-2 gap-[1rem]">
                      {section.products
                        .filter((product) =>
                          searchTerm === ""
                            ? true
                            : product.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()),
                        )
                        .map((item) => (
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
            {filteredMenuItems.length === 0 && (
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
    <div className="relative flex min-h-[calc(100vh-16rem)] ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] gap-[2.2875rem] w-full">
      <div className="~w-[12rem]/[15.625rem] ~pt-[1.6875rem]/[6.75rem]  shrink-0">
        <div className="sticky  top-[7rem]">
          <div
            data-lenis-prevent
            className="relative overflow-y-auto no-scrollbar max-h-[calc(100vh-8rem)]"
          >
            <h5 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[130%]">
              Shop
            </h5>
            <p className="text-[#1A1A1ABF] pt-[0.5rem] leading-[130%] tracking-[-0.02em] ~text-[0.75rem]/[1rem]">
              Explore our range of spices, seasonings, and more.
            </p>
            <div className="pt-[1rem] flex flex-col gap-[0.5rem]">
              {filteredMenuItems?.map((section) => {
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
                          className="absolute inset-0 rounded-full"
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
        <div className="~pt-[4.5rem]/[6.75rem]" />

        <div className="w-full">
          <SearchHeader />
          {filteredMenuItems.length === 0 ? (
            <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-[0.25rem]">
              <svg
                width="174"
                height="149"
                viewBox="0 0 174 149"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M61.5 148.5C92.7041 148.5 118 146.933 118 145C118 143.067 92.7041 141.5 61.5 141.5C30.2959 141.5 5 143.067 5 145C5 146.933 30.2959 148.5 61.5 148.5Z"
                  fill="#928F8F"
                  fill-opacity="0.2"
                />
                <path
                  d="M18.0495 1.5H99.3713C101.395 1.5 103.335 2.3037 104.766 3.7343C106.196 5.1649 107 7.10521 107 9.12839V105.872C107 107.895 106.196 109.835 104.766 111.266C103.335 112.696 101.395 113.5 99.3713 113.5H7.62869C5.60544 113.5 3.66505 112.696 2.23439 111.266C0.803735 109.835 0 107.895 0 105.872V19.7318L18.0495 1.5Z"
                  fill="#9A2923"
                  fill-opacity="0.2"
                />
                <path
                  d="M0 19.5H14.7439C15.6088 19.496 16.437 19.1531 17.0472 18.5462C17.6574 17.9392 18 17.1178 18 16.2615V1.5L0 19.5Z"
                  fill="#9A2923"
                  fill-opacity="0.5"
                />
                <path
                  d="M107.133 28.5H23.8667C20.6266 28.5 18 31.0779 18 34.2579V51.7421C18 54.9221 20.6266 57.5 23.8667 57.5H107.133C110.373 57.5 113 54.9221 113 51.7421V34.2579C113 31.0779 110.373 28.5 107.133 28.5Z"
                  fill="white"
                  fill-opacity="0.5"
                />
                <path
                  d="M34 48.5C36.7614 48.5 39 46.2614 39 43.5C39 40.7386 36.7614 38.5 34 38.5C31.2386 38.5 29 40.7386 29 43.5C29 46.2614 31.2386 48.5 34 48.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M50 48.5C52.7614 48.5 55 46.2614 55 43.5C55 40.7386 52.7614 38.5 50 38.5C47.2386 38.5 45 40.7386 45 43.5C45 46.2614 47.2386 48.5 50 48.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M66 48.5C68.7614 48.5 71 46.2614 71 43.5C71 40.7386 68.7614 38.5 66 38.5C63.2386 38.5 61 40.7386 61 43.5C61 46.2614 63.2386 48.5 66 48.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M107.133 61.5H23.8667C20.6266 61.5 18 64.0779 18 67.2579V84.7421C18 87.9221 20.6266 90.5 23.8667 90.5H107.133C110.373 90.5 113 87.9221 113 84.7421V67.2579C113 64.0779 110.373 61.5 107.133 61.5Z"
                  fill="white"
                  fill-opacity="0.5"
                />
                <path
                  d="M34 81.5C36.7614 81.5 39 79.0376 39 76C39 72.9624 36.7614 70.5 34 70.5C31.2386 70.5 29 72.9624 29 76C29 79.0376 31.2386 81.5 34 81.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M50 81.5C52.7614 81.5 55 79.0376 55 76C55 72.9624 52.7614 70.5 50 70.5C47.2386 70.5 45 72.9624 45 76C45 79.0376 47.2386 81.5 50 81.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M66 81.5C68.7614 81.5 71 79.0376 71 76C71 72.9624 68.7614 70.5 66 70.5C63.2386 70.5 61 72.9624 61 76C61 79.0376 63.2386 81.5 66 81.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M107.133 93.5H23.8667C20.6266 93.5 18 96.1668 18 99.4565V117.544C18 120.833 20.6266 123.5 23.8667 123.5H107.133C110.373 123.5 113 120.833 113 117.544V99.4565C113 96.1668 110.373 93.5 107.133 93.5Z"
                  fill="white"
                  fill-opacity="0.5"
                />
                <path
                  d="M34 113.5C36.7614 113.5 39 111.261 39 108.5C39 105.739 36.7614 103.5 34 103.5C31.2386 103.5 29 105.739 29 108.5C29 111.261 31.2386 113.5 34 113.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M50 113.5C52.7614 113.5 55 111.261 55 108.5C55 105.739 52.7614 103.5 50 103.5C47.2386 103.5 45 105.739 45 108.5C45 111.261 47.2386 113.5 50 113.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M66 113.5C68.7614 113.5 71 111.261 71 108.5C71 105.739 68.7614 103.5 66 103.5C63.2386 103.5 61 105.739 61 108.5C61 111.261 63.2386 113.5 66 113.5Z"
                  fill="#EC5715"
                />
                <path
                  d="M114 65.5C131.673 65.5 146 51.397 146 34C146 16.603 131.673 2.5 114 2.5C96.3269 2.5 82 16.603 82 34C82 51.397 96.3269 65.5 114 65.5Z"
                  fill="white"
                  fill-opacity="0.2"
                  stroke="#9A2923"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M137 56.5L145 65.5"
                  stroke="#9A2923"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M144.23 61.2707L141.607 64.0146C140.427 65.2489 140.471 67.2061 141.706 68.386L164.497 90.1739C165.732 91.3539 167.689 91.3098 168.869 90.0755L171.492 87.3316C172.672 86.0973 172.628 84.1402 171.393 82.9602L148.602 61.1723C147.367 59.9924 145.41 60.0364 144.23 61.2707Z"
                  fill="#9A2923"
                />
              </svg>

              <p className="~text-[0.75rem]/[1rem]  text-main/70">
                No items found.
              </p>
            </div>
          ) : (
            <div>
              <SearchHeader />
              {filteredMenuItems?.map((section) => {
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
                      className="text-[1.5rem] flex gap-[0.75rem] whitespace-nowrap uppercase leading-[120%] tracking-[-0.54px] items-center font-semibold"
                    >
                      <div
                        style={{ backgroundColor: section.colour }}
                        className="size-[0.875rem] shrink-0 rounded-full"
                      />
                      {section.name}{" "}
                      <div className="text-[1.25rem] font-normal tracking-[-0.54px]">
                        ({section.products.length})
                      </div>
                      <div className="h-[1px] ml-[12px] w-full bg-[#D9D9D9]" />
                    </div>
                    <div className="hidden grid-cols-1 ~pt-[1rem]/[2.3125rem] ~pb-[1rem]/[3.75rem] ~gap-[1.5rem]/[3rem] md:grid lg:grid-cols-2 xl:grid-cols-3">
                      {section.products
                        .filter((product) =>
                          searchTerm === ""
                            ? true
                            : product.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()),
                        )
                        .map((item) => (
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
    </div>
  );
};

export default SecondSection;
