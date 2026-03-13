"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import BorderRadius from "@/src/components/svg/BorderRadius";
import ChevronDown from "@/src/components/svg/ChevronDown";
import CartButton from "@/src/components/product/CartButton";
import Customize from "@/src/components/svg/Customize";
import { motion, AnimatePresence } from "motion/react";
import { TProduct } from "@/src/api/type";
import CustomizeModal from "./CustomizeModal";
import Link from "next/link";
import GradientTick from "@/src/components/svg/GradientTick";

type Props = {
  product_details: TProduct;
};

const Hero = ({ product_details }: Props) => {
  console.log("product_details", product_details);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product_details.images?.[0],
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedVariant, setSelectedVariant] = useState(
    product_details?.variants?.[0],
  );
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(
    selectedVariant?.spice_levels?.[0],
  );
  const [grinding, setGrinding] = useState(
    selectedVariant?.has_grind === 1 ? "Yes" : "No",
  );
  const [activeTab, setActiveTab] = useState("description");
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [customizedIngredients, setCustomizedIngredients] = useState<any>(null);
  const [isCustomized, setIsCustomized] = useState(false);

  const tabs =
    product_details.category_slug === "dry-fruits" ||
    product_details.category_slug === "tea"
      ? [{ id: "description", label: "Description" }]
      : [
          { id: "description", label: "Description" },
          { id: "info", label: "Product Information" },
        ];

  const convertToGrams = (quantity: number, unit: string): number => {
    const unitLower = unit.toLowerCase();
    if (unitLower === "kg") return quantity * 1000;
    if (unitLower === "gm" || unitLower === "g") return quantity;
    if (unitLower === "mg") return quantity / 1000;
    return quantity;
  };
  const calculateIngredientsTotalWeight = () => {
    if (isCustomized && customizedIngredients) {
      return customizedIngredients.reduce((total: number, ing: any) => {
        let qty = ing.qty || 0;
        const unit = ing.unit?.toLowerCase() || "";

        if (unit === "kg") return total + qty * 1000;
        if (unit === "gm" || unit === "g") return total + qty;

        if (unit === "pcs" || unit === "pc") {
          const mat = ing.rawMaterials?.[0];
          const pcsInTier = parseFloat(mat?.name || "1") || 1;
          const gramsPerPiece = (mat?.quantity_in_grams || 0) / pcsInTier;
          return total + qty * gramsPerPiece;
        }

        return total + qty;
      }, 0);
    }

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
  };

  const totalIngredientsWeight = useMemo(
    () => calculateIngredientsTotalWeight(),
    [selectedVariant, isCustomized, customizedIngredients],
  );

  const spiceLevelPrice = useMemo(() => {
    if (!selectedSpiceLevel || selectedSpiceLevel.price === 0) return 0;

    const spiceQuantity = parseFloat(selectedSpiceLevel.quantity_in_gm) || 0;
    if (spiceQuantity === 0) return 0;

    // Use direct price from spice level
    return selectedSpiceLevel.price;
  }, [selectedSpiceLevel]);

  const grindingPrice = useMemo(() => {
    if (grinding !== "Yes" || selectedVariant?.has_grind !== 1) return 0;

    const spiceQuantity =
      parseFloat(selectedSpiceLevel?.quantity_in_gm || "0") || 0;
    const totalWeightIncludingSpice = totalIngredientsWeight + spiceQuantity;
    const weightInKg = totalWeightIncludingSpice / 1000;
    return selectedVariant.grind_price * weightInKg;
  }, [grinding, selectedVariant, selectedSpiceLevel, totalIngredientsWeight]);

  const customIngredientsTotal = useMemo(() => {
    if (!isCustomized || !customizedIngredients) return 0;

    return customizedIngredients.reduce((total: number, ing: any) => {
      const qty = ing.qty || 0;
      const unit = ing.unit?.toLowerCase() || "";

      // For pieces (pcs), use the price from rawMaterials directly
      if (unit === "pcs" || unit === "pc") {
        if (ing.rawMaterials && ing.rawMaterials.length > 0) {
          const rawMaterial = ing.rawMaterials[0];
          const pcsInTier = parseFloat(rawMaterial?.name || "1") || 1;
          const pricePerPiece = (rawMaterial?.price || 0) / pcsInTier;
          const price = qty * pricePerPiece;
          return total + Math.round(price * 100) / 100;
        }
      }

      // For other units, use pricePerUnit if available
      if (ing.pricePerUnit !== undefined) {
        const price = qty * ing.pricePerUnit;
        return total + Math.round(price * 100) / 100;
      }

      // Fallback calculation for other ingredients without pricePerUnit
      if (ing.rawMaterials && ing.rawMaterials.length > 0) {
        const quantityInGrams = convertToGrams(qty, unit);
        const smallTier = ing.rawMaterials[0];
        const bulkTier =
          ing.rawMaterials.length > 1
            ? ing.rawMaterials[ing.rawMaterials.length - 1]
            : null;
        const smallTierLimit = smallTier.quantity_in_grams || 0;

        let pricePerGram: number;
        if (quantityInGrams > smallTierLimit && bulkTier) {
          pricePerGram =
            bulkTier.price_per_gms ||
            bulkTier.price / (bulkTier.quantity_in_grams || 1);
        } else {
          pricePerGram =
            smallTier.price_per_gms || smallTier.price / (smallTierLimit || 1);
        }

        const price = quantityInGrams * pricePerGram;
        return total + Math.round(price * 100) / 100;
      }

      // Last resort: use ingredient price if available
      return total + (ing.price || 0);
    }, 0);
  }, [isCustomized, customizedIngredients]);

  // Calculate final price with rounding
  const finalPrice = useMemo(() => {
    const basePrice = isCustomized
      ? customIngredientsTotal
      : selectedVariant?.price || 0;

    console.log("basePrice", basePrice);
    const total = basePrice + spiceLevelPrice + grindingPrice;
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }, [
    isCustomized,
    customIngredientsTotal,
    selectedVariant,
    spiceLevelPrice,
    grindingPrice,
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleConfirmIngredients = (ingredients: any, hasChanges: boolean) => {
    setCustomizedIngredients(ingredients);
    setIsCustomized(hasChanges);
    setOpen(false);
  };

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    setSelectedSpiceLevel(variant?.spice_levels?.[0]);
    setGrinding(variant?.has_grind === 1 ? "Yes" : "No");
    setCustomizedIngredients(null);
    setIsCustomized(false);
  };

  const getSpiceLevelLabel = (level: number) => {
    const labels: { [key: number]: string } = {
      1: "No Spice",
      2: "Less",
      3: "Medium",
      4: "Hot",
    };
    return labels[level] || "Medium";
  };

  const rawText =
    product_details.product_information ||
    "No additional information available.";

  const formattedText = rawText.split("<br>");
  return (
    <div>
      <div className="~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
        <Link
          prefetch={false}
          href={`/shop#${product_details.category_slug}`}
          className="flex gap-[0.45rem] ~mb-[0.75rem]/[1rem] px-[0.875rem] ~text-[0.875rem]/[1rem] py-[0.5rem] rounded-full w-fit hover:bg-[#F8F5EE] duration-300 ease-in-out transition-all"
        >
          <ChevronDown className="shrink-0 rotate-90 ~w-[0.5775000453rem]/[0.900000095rem]" />
          Back
        </Link>
      </div>
      <div className="flex lg:flex-row flex-col relative ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] ~gap-[1rem]/[3rem]">
        <div className="lg:w-[60%] flex flex-col-reverse h-full lg:sticky lg:~top-[4.5rem]/[6.9rem] lg:flex-row gap-[1.5rem]">
          <div className="flex flex-row max-lg:overflow-x-auto no-scrollbar lg:flex-col gap-[0.625rem]">
            {product_details.images?.map((image, index) => (
              <div
                key={index}
                className="size-[5.25rem] shrink-0 relative overflow-hidden rounded-[8px] bg-[#FFF5E7] cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover"
                  fill
                  src={image}
                />
              </div>
            ))}
          </div>

          <div
            className="bg-[#FFF5E7] h-fit relative w-full rounded-[1rem] aspect-square overflow-hidden cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <div className="absolute size-[4.375rem] font-medium text-center text-[0.75rem] tracking-[-0.03em] leading-[120%] flex justify-center items-center rounded-bl-[1rem] top-0 right-0 bg-white z-10">
              Hover to
              <br /> Zoom
              <BorderRadius className="absolute top-0 rotate-90 left-[-1.125rem] size-[1.125rem] text-white" />
              <BorderRadius className="absolute right-0 rotate-90 bottom-[-1.125rem] size-[1.125rem] text-white" />
            </div>

            <div className="relative aspect-square">
              <Image
                src={selectedImage || ""}
                alt="Product"
                fill
                className="object-cover transition-transform duration-200 ease-out"
                style={{
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-[40%]">
          <div className="flex gap-[0.375rem] ~text-[0.75rem]/[0.875rem] font-medium tracking-[-0.03em]">
            <p className="text-[#0000007A]">Shop</p>
            <p className="text-[#0000007A]">•</p>
            <p
              style={{ color: product_details.colour }}
              className={` uppercase`}
            >
              {product_details.category_name}
            </p>
          </div>
          <h2 className="~text-[1.25rem]/[3rem] tracking-[-0.04em] leading-[120%] ~pt-[0.75rem]/[0.5rem] bg-clip-text text-transparent font-medium bg-gradient-to-b from-[#000000] to-[#666666]">
            {product_details.name}
          </h2>

          <div className="">
            <div>
              <div className="~text-[0.75rem]/[1rem] pt-[1.5rem] font-medium leading-[120%] tracking-[-0.04em]">
                Weight
              </div>

              <div className="flex pt-[1rem] gap-[0.5rem] flex-wrap">
                {product_details.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;

                  return (
                    <div
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className="cursor-pointer"
                    >
                      {isSelected ? (
                        <div className="p-[0.125rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] w-fit rounded-[0.625rem]">
                          <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium py-[0.375rem]">
                            {variant.formatted_name}
                            {variant.formatted_unit}
                          </div>
                        </div>
                      ) : (
                        <div className="p-[0.125rem] bg-[#f8f5ee] w-fit rounded-[0.625rem]">
                          <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium py-[0.375rem]">
                            {variant.formatted_name}
                            {variant.formatted_unit}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {product_details.product_type === 1 &&
              product_details.has_offer === 1 && (
                <div className="mt-[1.5rem] w-fit">
                  <div
                    className="relative flex items-center gap-2.5 px-4 py-2.5 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #EC5715 0%, #FF7E00 100%)",
                      borderRadius: "8px 8px 8px 8px",
                      boxShadow: "0 2px 12px rgba(236, 87, 21, 0.35)",
                    }}
                  >
                    {/* Left notch dot */}

                    {/* Shimmer sweep */}
                    <div
                      className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                      }}
                    />

                    {/* Icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <path
                        d="M20 12L13.586 5.586A2 2 0 0012.172 5H5a2 2 0 00-2 2v7.172a2 2 0 00.586 1.414L10.5 22.5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="8" cy="10" r="1.2" fill="white" />
                      <path
                        d="M16 16l2 2 4-4"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="text-[0.78rem] font-semibold text-white leading-[120%] tracking-[-0.02em] relative z-10">
                      Special Offer:{" "}
                      <span className="font-bold">
                        Each 5 kg Get 1 kg FREE!
                      </span>
                    </p>
                  </div>
                </div>
              )}
          </div>

          {product_details.product_type === 2 &&
            selectedVariant?.spice_levels &&
            selectedVariant.spice_levels.length > 0 && (
              <div>
                <div className="~text-[0.75rem]/[1rem] pt-[1.5rem] font-medium leading-[120%] tracking-[-0.04em]">
                  Spice Level
                </div>
                <div className="flex pt-[1rem] gap-[0.5rem] flex-wrap ">
                  {selectedVariant.spice_levels.map((spiceLevel) => {
                    const isSelected = selectedSpiceLevel?.id === spiceLevel.id;
                    return (
                      <div
                        key={spiceLevel.id}
                        onClick={() => setSelectedSpiceLevel(spiceLevel)}
                        className="cursor-pointer"
                      >
                        {isSelected ? (
                          <div className="p-[0.125rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] w-fit rounded-[0.625rem]">
                            <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] w-fit text-[0.75rem] font-medium tracking-[-0.03em] py-[0.375rem]">
                              {getSpiceLevelLabel(spiceLevel.level)}
                            </div>
                          </div>
                        ) : (
                          <div className="p-[0.125rem] bg-[#F8F5EE] w-fit rounded-[0.625rem]">
                            <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] w-fit text-[0.75rem] font-medium tracking-[-0.03em] py-[0.375rem]">
                              {getSpiceLevelLabel(spiceLevel.level)}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {product_details.product_type === 2 &&
            selectedVariant?.has_grind === 1 && (
              <div>
                <div className="~text-[0.75rem]/[1rem] pt-[1.5rem] font-medium leading-[120%] tracking-[-0.04em]">
                  Grinding Preference
                </div>

                <div className="flex pt-[1rem] gap-[0.5rem] flex-wrap">
                  {["Yes", "No"].map((option) => {
                    const isSelected = grinding === option;

                    return (
                      <div
                        key={option}
                        onClick={() => setGrinding(option)}
                        className="cursor-pointer"
                      >
                        {isSelected ? (
                          <div className="p-[0.125rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] w-fit rounded-[0.625rem]">
                            <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium tracking-[-0.03em] py-[0.375rem]">
                              {option}
                            </div>
                          </div>
                        ) : (
                          <div className="p-[0.125rem] bg-[#F8F5EE] w-fit rounded-[0.625rem]">
                            <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium tracking-[-0.03em] py-[0.375rem]">
                              {option}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {product_details.variants.at(0)?.is_customizable === 1 && (
            <div>
              {product_details.product_type === 2 && (
                <div className="~pb-[0.75rem]/[1rem]">
                  <div className="~text-[0.75rem]/[1rem] pt-[1.5rem] pb-[1rem] font-medium leading-[120%] tracking-[-0.04em]">
                    Customise Ingredients
                  </div>
                  {isCustomized ? (
                    <div className=" text-[#0000008F] ~text-[0.875rem]/[1rem] font-medium tracking-[-0.03em] leading-[120%]">
                      <p className=" flex gap-[0.5rem] items-center">
                        <GradientTick /> Your Customised Mix for{" "}
                        {selectedVariant?.formatted_name}{" "}
                        {selectedVariant?.formatted_unit}
                      </p>
                    </div>
                  ) : (
                    <div className=" text-[#0000008F] ~text-[0.875rem]/[1rem] font-medium tracking-[-0.03em] leading-[120%]">
                      Currently using recommended Shree Kakaji Mix for{" "}
                      {selectedVariant?.formatted_name}{" "}
                      {selectedVariant?.formatted_unit}
                    </div>
                  )}
                </div>
              )}

              {product_details.product_type === 2 && (
                <button
                  onClick={() => setOpen(true)}
                  className="~text-[0.75rem]/[1rem] h-fit group overflow-hidden relative w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-[#F8F5EE] font-medium text-black py-[0.78125rem]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                  <Customize className="size-[1.25rem] relative z-20 text-main duration-500 ease-in-out transition-colors group-hover:text-white" />
                  <span className="group-hover:text-white duration-500 ease-in-out transition-colors relative z-20">
                    {isCustomized
                      ? "Edit Ingredients"
                      : "Customize Ingredients"}
                  </span>
                </button>
              )}

              <CustomizeModal
                item={product_details}
                selectedVariant={selectedVariant}
                setOpen={setOpen}
                open={open}
                onConfirm={handleConfirmIngredients}
                existingCustomization={customizedIngredients}
              />
            </div>
          )}

          {product_details.product_type === 2 ? (
            <div className="mt-[1.5rem]">
              <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="w-full ~pr-[0.625rem]/[0] cursor-pointer flex py-[0.5rem] justify-between items-center font-medium leading-[110%] ~text-[0.875rem]/[1.25rem] tracking-[-0.03em] border-t border-t-[#00000014] transition-colors duration-200"
              >
                <div className="flex ~gap-[0.8125rem]/[1rem]">
                  ₹{finalPrice.toFixed(2)}
                </div>
                <motion.div
                  animate={{ rotate: isPriceOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="shrink-0 ~w-[0.5775000453rem]/[0.9900000095rem]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isPriceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className=" ~py-[0.75rem]/[1rem] space-y-[0.625rem]">
                      {/* Base Price */}
                      <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                        <span>
                          {isCustomized
                            ? "Customised Ingredients"
                            : "Base Price"}
                        </span>
                        <span className="font-medium text-black">
                          ₹
                          {isCustomized
                            ? customIngredientsTotal.toFixed(2)
                            : selectedVariant?.price.toFixed(2)}
                        </span>
                      </div>

                      {/* {isCustomized && customizedIngredients && (
                        <div className="pl-3 space-y-1 border-l-2 border-main/20">
                          {customizedIngredients.map((ing: any) => (
                            <div
                              key={ing.id}
                              className="flex justify-between items-center ~text-[0.625rem]/[0.75rem] text-[#00000066]"
                            >
                              <span>
                                {ing.name} ({ing.qty}
                                {ing.unit})
                              </span>
                              <span>
                                ₹
                                {(
                                  (ing.qty || 0) *
                                  (ing.pricePerUnit || ing.price || 0)
                                ).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          {customizedIngredients.length > 3 && (
                            <div className="~text-[0.625rem]/[0.75rem] text-[#00000066] italic">
                              + {customizedIngredients.length - 3} more
                              ingredients
                            </div>
                          )}
                        </div>
                      )} */}

                      {selectedSpiceLevel && selectedSpiceLevel.price > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                            <span>
                              Spice Level (
                              {getSpiceLevelLabel(selectedSpiceLevel.level)})
                            </span>
                            <span className="font-medium text-black">
                              +₹{spiceLevelPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      {grinding === "Yes" && grindingPrice > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                            <span>Grinding </span>
                            <span className="font-medium text-black">
                              +₹{grindingPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="pl-3 ~text-[0.625rem]/[0.75rem] text-[#00000066]">
                            <div className="flex justify-between">
                              <span>
                                Grind price: ₹{selectedVariant?.grind_price}/kg
                              </span>
                              <span>
                                Ingredients weight:{" "}
                                {(totalIngredientsWeight / 1000).toFixed(3)}kg
                              </span>
                            </div>
                            {selectedSpiceLevel &&
                              selectedSpiceLevel.price > 0 && (
                                <div className="flex justify-between">
                                  <span>Spice quantity</span>
                                  <span>
                                    {selectedSpiceLevel.quantity_in_gm}g
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mt-[1.5rem] ~pr-[0.625rem]/[0] cursor-pointer flex py-[0.5rem] justify-between items-center font-medium leading-[110%] ~text-[0.875rem]/[1.25rem] tracking-[-0.03em] border-t border-t-[#00000014]">
              <div className="flex ~gap-[0.8125rem]/[1rem]">
                ₹{selectedVariant?.price.toFixed(2)}
              </div>
            </div>
          )}

          <div className="~pt-[1.125rem]/[1.5rem]">
            <div className={`grid ~gap-[0.75rem]/[1rem] `}>
              <CartButton
                section={product_details.category_name || ""}
                item={product_details}
                selectedVariant={selectedVariant}
                customIngredients={customizedIngredients}
                selectedSpiceLevel={selectedSpiceLevel}
                grinding={grinding}
                finalPrice={finalPrice}
              />
            </div>
          </div>

          <div className="~pt-[1.375rem]/[2.25rem]">
            <div className="flex gap-[1.25rem] relative">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="font-medium relative tracking-[-0.03em] ~py-[0.25rem]/[0.625rem] leading-[120%] ~text-[0.75rem]/[1rem]"
                  >
                    {tab.label}

                    {isActive ? (
                      <motion.div
                        layoutId="underline"
                        className="absolute h-[2px] w-full left-0 bottom-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    ) : (
                      <div className="absolute h-[1px] w-full left-0 bottom-0 bg-[#00000014]"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="~pt-[0.75rem]/[2.5rem] ~text-[0.875rem]/[1rem] tracking-[-0.03em] text-black  leading-[130%]">
              {activeTab === "description" && (
                <p>{product_details.description}</p>
              )}
              {activeTab === "info" && (
                <p>
                  {formattedText.map((line, index) => {
                    const [title, value] = line.split(":");

                    return (
                      <span key={index} className="block">
                        {value ? (
                          <>
                            <span className="font-medium  text-[#0000008F]">
                              {title}:
                            </span>
                            <span> {value.trim()}</span>
                          </>
                        ) : (
                          line
                        )}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
