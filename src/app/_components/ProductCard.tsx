"use client";
import { TProduct, TSpiceLevel } from "@/src/api/type";
import CartButton from "@/src/components/product/CartButton";
import Arrow from "@/src/components/svg/Arrow";
import BorderRadius from "@/src/components/svg/BorderRadius";
import ChevronDown from "@/src/components/svg/ChevronDown";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";

type Props = {
  item: TProduct;
  section: string;
};

const ProductCard = ({ item, section }: Props) => {
  const isYadi = item.product_type === 2;

  const [selectedVariant, setSelectedVariant] = useState(item?.variants?.[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Yadi-specific state
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<
    TSpiceLevel | undefined
  >(
    () =>
      selectedVariant?.spice_levels?.find((l) => l.level === 3) ??
      selectedVariant?.spice_levels?.[0],
  );
  const [grinding, setGrinding] = useState<"Yes" | "No">(
    selectedVariant?.has_grind === 1 ? "Yes" : "No",
  );

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
    if (isYadi) {
      setSelectedSpiceLevel(
        variant?.spice_levels?.find(
          (l) => l.level === selectedSpiceLevel?.level,
        ) ??
          variant?.spice_levels?.find((l) => l.level === 3) ??
          variant?.spice_levels?.[0],
      );
      setGrinding(variant?.has_grind === 1 ? grinding : "No");
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // --- Yadi price calculation (mirrors Hero.tsx logic) ---
  const totalIngredientsWeight = useMemo(() => {
    if (!selectedVariant?.ingredients) return 0;
    return selectedVariant.ingredients.reduce((total, ingredient) => {
      const qtyMatch = ingredient.quantity.match(/(\d+(\.\d+)?)/);
      const qty = qtyMatch ? parseFloat(qtyMatch[1]) : 0;
      const unit = ingredient.unit.toLowerCase();
      if (unit === "kg") return total + qty * 1000;
      if (unit === "gm" || unit === "g") return total + qty;
      if (unit === "pcs" || unit === "pc") {
        const mat = ingredient.raw_materials?.[0];
        const pcsInTier = parseFloat(mat?.name || "1") || 1;
        const gramsPerPiece = (mat?.quantity_in_grams || 0) / pcsInTier;
        return total + qty * gramsPerPiece;
      }
      return total + qty;
    }, 0);
  }, [selectedVariant]);

  const spiceLevelPrice = useMemo(() => {
    if (!isYadi || !selectedSpiceLevel || selectedSpiceLevel.price === 0)
      return 0;
    const spiceQty = parseFloat(selectedSpiceLevel.quantity_in_gm) || 0;
    if (spiceQty === 0) return 0;
    return selectedSpiceLevel.price;
  }, [isYadi, selectedSpiceLevel]);

  const grindingPrice = useMemo(() => {
    if (!isYadi || grinding !== "Yes" || selectedVariant?.has_grind !== 1)
      return 0;
    const spiceQty = parseFloat(selectedSpiceLevel?.quantity_in_gm || "0") || 0;
    const totalWeight = totalIngredientsWeight + spiceQty;
    return (selectedVariant.grind_price * totalWeight) / 1000;
  }, [
    isYadi,
    grinding,
    selectedVariant,
    selectedSpiceLevel,
    totalIngredientsWeight,
  ]);

  // Calculate the display price for the selected variant (used in both trigger and options)
  // Calculate the display price for any variant — uses that variant's own spice level
  // so the dropdown price always matches the price shown after selection.
  const calcVariantPrice = (variant: typeof selectedVariant) => {
    if (!isYadi) return variant?.price || 0;

    // Always resolve the spice level from the target variant itself
    const targetSpiceLevel =
      variant?.spice_levels?.find(
        (l) => l.level === (selectedSpiceLevel?.level ?? 3),
      ) ?? variant?.spice_levels?.[0];

    const spicePrice =
      targetSpiceLevel &&
      targetSpiceLevel.price !== 0 &&
      parseFloat(targetSpiceLevel.quantity_in_gm) !== 0
        ? targetSpiceLevel.price
        : 0;

    const variantGrindPrice = (() => {
      if (grinding !== "Yes" || variant?.has_grind !== 1) return 0;
      // Use this variant's own spice quantity for grind calculation
      const spiceQty = parseFloat(targetSpiceLevel?.quantity_in_gm || "0") || 0;
      const ingWeight =
        variant?.ingredients?.reduce((total, ingredient) => {
          const qtyMatch = ingredient.quantity.match(/(\d+(\.\d+)?)/);
          const qty = qtyMatch ? parseFloat(qtyMatch[1]) : 0;
          const unit = ingredient.unit.toLowerCase();
          if (unit === "kg") return total + qty * 1000;
          if (unit === "gm" || unit === "g") return total + qty;
          if (unit === "pcs" || unit === "pc") {
            const mat = ingredient.raw_materials?.[0];
            const pcsInTier = parseFloat(mat?.name || "1") || 1;
            const gramsPerPiece = (mat?.quantity_in_grams || 0) / pcsInTier;
            return total + qty * gramsPerPiece;
          }
          return total + qty;
        }, 0) ?? 0;
      return (variant.grind_price * (ingWeight + spiceQty)) / 1000;
    })();

    return (
      Math.round(
        ((variant?.price || 0) + spicePrice + variantGrindPrice) * 100,
      ) / 100
    );
  };

  // Final price for the selected variant (used in CartButton)
  const finalPrice = useMemo(() => {
    if (!isYadi) return selectedVariant?.price || 0;
    return (
      Math.round(
        ((selectedVariant?.price || 0) + spiceLevelPrice + grindingPrice) * 100,
      ) / 100
    );
  }, [isYadi, selectedVariant, spiceLevelPrice, grindingPrice]);
  return (
    <div className="">
      <div
        className="relative w-full rounded-bl-[0.75rem] max-sm:rounded-br-[0.75rem] rounded-t-[0.75rem]"
        style={{ contain: "paint" }}
      >
        <Link
          prefetch={false}
          href={`/shop/${item.slug}`}
          className="bg-cream group cursor-pointer relative items-center flex w-full justify-center rounded-[0.75rem]"
          style={{ isolation: "isolate" }}
        >
          <div className="relative aspect-square w-full  ">
            <Image
              loading="lazy"
              src={item.thumbnail_image}
              className="object-cover group-hover:scale-105 duration-700 transition-all ease-in-out"
              fill
              sizes="100vw"
              alt={item.name}
            />
            <div className="size-[3.2748651505rem] max-sm:hidden rounded-tl-[0.75rem] flex justify-center items-center bg-white absolute bottom-0 right-0">
              <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 bottom-0 left-[-0.842rem]" />
              <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 top-[-0.842rem] right-0" />
              <div className="size-[2.339189291rem] relative flex justify-center items-center rounded-full bg-cream overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                <Arrow className="size-[1.25rem] z-10 text-main group-hover:text-white absolute right-[0.5rem] transition-all duration-700 ease-in-out -rotate-45" />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="pt-[0.75rem]">
        {item.category_name && (
          <p className="uppercase text-[#F1913D] font-medium md:font-semibold leading-[120%] tracking-[-0.03em] ~text-[0.6875rem]/[1rem]">
            {item.category_name}
          </p>
        )}
        <p className="~text-[0.875rem]/[1.5rem] line-clamp-1 text-ellipsis mb-[0.5rem] font-medium leading-[120%] ~tracking-[-0.05em]/[-0.03em]">
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
                  {selectedVariant.formatted_name}
                  {selectedVariant.formatted_unit}
                </div>
                <p className="text-[#00000029] font-bold">/</p>
                <div>₹{finalPrice.toFixed(2)}</div>
              </div>
              <ChevronDown
                className={`text-black shrink-0 w-[0.6775000453rem] transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-[200] mt-[0.5rem] w-full flex flex-col gap-[0.25rem] bg-[#F8F5EE] rounded-[1rem] ~p-[0.75rem]/[1rem] shadow-lg overflow-auto">
                {item.variants?.map((variant, i) => {
                  const displayPrice = calcVariantPrice(variant);
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
                          {variant.formatted_name}
                          {variant.formatted_unit}
                        </div>
                        <p className="text-[#00000029] font-bold">/</p>
                        <div>₹{displayPrice.toFixed(2)}</div>
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
                {item.variants?.[0]?.formatted_name}
                {item.variants?.[0]?.formatted_unit}
              </div>
              <p className="text-[#00000029] font-bold">/</p>
              <div>₹{item.variants?.[0]?.price?.toFixed(2)}</div>
            </div>
          </button>
        )}

        <div className="~mt-[0.5rem]/[0.75rem]">
          {item.product_type === 2 ? (
            <Link
              prefetch={false}
              href={`/shop/${item.slug}`}
              className="~text-[0.75rem]/[1rem] overflow-hidden relative group w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white ~py-[0.75rem]/[0.78125rem]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
              <span className="z-50"> View Product</span>
            </Link>
          ) : (
            <CartButton
              item={{ ...item }}
              section={section}
              selectedVariant={selectedVariant}
              customIngredients={null}
              selectedSpiceLevel={null}
              grinding={null}
              finalPrice={finalPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
