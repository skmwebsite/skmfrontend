"use client";
import { TProduct } from "@/src/api/type";
import CartButton from "@/src/components/product/CartButton";
import Arrow from "@/src/components/svg/Arrow";
import BorderRadius from "@/src/components/svg/BorderRadius";
import ChevronDown from "@/src/components/svg/ChevronDown";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = {
  item: TProduct;
  section: string;
};

const ProductCard = ({ item, section }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(
    item?.variants?.find((v) => v.is_primary) ?? item?.variants?.[0],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleVariantSelect = (variant: typeof selectedVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <Link
        href={`/shop/${item.slug}`}
        className="bg-cream group cursor-pointer relative items-center flex w-full justify-center rounded-[0.75rem]"
      >
        <div className="relative ~h-[8.9340820313rem]/[17.0830421448rem] ~w-[7.9340820313rem]/[11.6875rem]">
          <Image
            src={item.thumbnail_image}
            className="object-contain group-hover:scale-105 duration-700 transition-all ease-in-out"
            fill
            alt={item.name}
          />
        </div>
        <div className="size-[3.2748651505rem] max-sm:hidden rounded-tl-[0.75rem] flex justify-center items-center bg-white absolute bottom-0 right-0">
          <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 bottom-0 left-[-0.842rem]" />
          <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 top-[-0.842rem] right-0" />
          <div
            className="
  size-[2.339189291rem]
  relative
  flex justify-center items-center
  rounded-full
  bg-cream
  overflow-hidden
"
          >
            <span
              className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
            />

            <Arrow
              className="
    size-[1.25rem]
     z-10
    text-main group-hover:text-white
    absolute right-[0.5rem]
    transition-all duration-700 ease-in-out
    -rotate-45 
  "
            />
          </div>
        </div>
      </Link>

      <div className="pt-[0.75rem]">
        {item.category_name && (
          <p className="uppercase text-[#F1913D] font-medium md:font-semibold leading-[120%] tracking-[-0.03em] ~text-[0.6875rem]/[1rem]">
            {item.category_name}
          </p>
        )}
        <p className="~text-[0.875rem]/[1.5rem] mb-[0.5rem] font-medium leading-[120%] ~tracking-[-0.05em]/[-0.03em]">
          {item.name}
        </p>

        {item.variants.length > 0 ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="~px-[0.75rem]/[1rem] flex justify-between outline-none font-semibold tracking-[-0.03em] leading-[120%] ~text-[0.75rem]/[1rem] w-full text-main ~py-[0.625rem]/[0.5rem] bg-[#F8F5EE] rounded-[1rem] hover:bg-[#F8F5EE]/80 transition-colors"
            >
              <div className="flex items-center ~gap-[0.2rem]/[0.4rem]">
                <div>
                  {selectedVariant.name}
                  {selectedVariant.unit}
                </div>
                <p className="text-[#00000029] font-bold">/</p>
                <div>₹{selectedVariant.price.toFixed(2)}</div>
              </div>
              <ChevronDown
                className={`text-black shrink-0 w-[0.6775000453rem] transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-[200] mt-[0.5rem] w-full flex flex-col gap-[0.25rem] bg-[#F8F5EE] rounded-[1rem] ~p-[0.75rem]/[1rem] shadow-lg max-h-60 overflow-auto">
                {item.variants?.map((variant, i) => {
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleVariantSelect(variant)}
                      className={`cursor-pointer select-none relative p-[0.4rem] rounded-[0.5rem] text-left hover:bg-main/10 transition-colors ${
                        selectedVariant.id === variant.id
                          ? "bg-main/20 hover:bg-main/30"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-[0.4rem] font-semibold tracking-[-0.03em] leading-[120%] ~text-[0.75rem]/[1rem] text-main">
                        <div>
                          {variant.name}
                          {variant.unit}
                        </div>
                        <p className="text-[#00000029] font-bold">/</p>
                        <div>₹{variant.price.toFixed(2)}</div>
                        {selectedVariant.id === variant.id && (
                          <div className="ml-auto">
                            <svg
                              className="size-4 text-main"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <button className="px-[1rem] flex justify-between outline-none font-semibold tracking-[-0.03em] leading-[120%] ~text-[0.75rem]/[1rem] w-full text-main py-[0.5rem] bg-[#F8F5EE] rounded-[1rem]">
            <div className="flex items-center gap-[0.4rem]">
              <div>
                {item.quantity}
                {item.unit}
              </div>
              <p className="text-[#00000029] font-bold">/</p>
              <div>₹{item.price.toFixed(2)}</div>
              <div className="line-through ~text-[0.75rem]/[0.875rem] text-black">
                ₹{item?.price?.toFixed(2)}
              </div>
            </div>
          </button>
        )}

        <div className="~mt-[0.5rem]/[0.75rem]">
          <CartButton
            item={{ ...item }}
            section={section}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
