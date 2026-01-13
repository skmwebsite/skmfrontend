"use client";
import React, { Fragment, useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product_details.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedVariant, setSelectedVariant] = useState(
    product_details?.variants?.find((v) => v.is_primary) ??
      product_details?.variants?.[0]
  );
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(
    selectedVariant?.spice_levels?.find((s) => s.is_default === 1) ??
      selectedVariant?.spice_levels?.[0]
  );
  const [grinding, setGrinding] = useState(
    selectedVariant?.has_grind === 1 ? "Yes" : "No"
  );
  const [activeTab, setActiveTab] = useState("description");
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [customizedIngredients, setCustomizedIngredients] = useState<any>(null);
  const [isCustomized, setIsCustomized] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "info", label: "Product Information" },
  ];

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
    setSelectedSpiceLevel(
      variant?.spice_levels?.find((s: any) => s.is_default === 1) ??
        variant?.spice_levels?.[0]
    );
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

  // Calculate grinding price based on weight
  const calculateGrindingPrice = () => {
    if (grinding !== "Yes" || selectedVariant?.has_grind !== 1) return 0;

    const variantWeight = parseFloat(selectedVariant.name);
    const weightInKg = variantWeight / 1000;
    return selectedVariant.grind_price * weightInKg;
  };

  // Calculate custom ingredients total
  const customIngredientsTotal =
    isCustomized && customizedIngredients
      ? customizedIngredients.reduce(
          (total: number, ing: any) => total + ing.qty * ing.pricePerUnit,
          0
        )
      : 0;

  // Calculate final price
  const basePrice = isCustomized
    ? customIngredientsTotal
    : selectedVariant?.price || 0;
  const spiceLevelPrice = selectedSpiceLevel?.price || 0;
  const grindingPrice = calculateGrindingPrice();
  const finalPrice = basePrice + spiceLevelPrice + grindingPrice;

  return (
    <div>
      <div className="~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
        <Link
          href={"/shop"}
          className="flex gap-[0.45rem] ~mb-[0.75rem]/[1rem] px-[0.875rem] ~text-[0.875rem]/[1rem] py-[0.5rem] rounded-full w-fit hover:bg-[#F8F5EE] duration-300 ease-in-out transition-all"
        >
          <ChevronDown className="shrink-0 rotate-90 ~w-[0.5775000453rem]/[0.900000095rem]" />
          Back
        </Link>
      </div>
      <div className="flex lg:flex-row flex-col relative ~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem] ~gap-[1rem]/[3rem]">
        <div className="lg:w-[60%] flex flex-col-reverse h-full lg:sticky lg:~top-[4.5rem]/[6.9rem] lg:flex-row gap-[1.5rem]">
          <div className="flex flex-row max-lg:overflow-x-auto no-scrollbar lg:flex-col gap-[0.625rem]">
            {product_details.images.map((image, index) => (
              <div
                key={index}
                className="size-[5.25rem] shrink-0 relative overflow-hidden rounded-[8px] bg-[#FFF5E7] cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  alt={`Thumbnail ${index + 1}`}
                  className="object-contain"
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
                src={selectedImage}
                alt="Product"
                fill
                className="object-contain transition-transform duration-200 ease-out"
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
                  const isSelected = selectedVariant === variant;
                  return (
                    <div
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className="cursor-pointer"
                    >
                      {isSelected ? (
                        <div className="p-[0.125rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] w-fit rounded-[0.625rem]">
                          <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium py-[0.375rem]">
                            {variant.name}
                            {variant.unit}
                          </div>
                        </div>
                      ) : (
                        <div className="p-[0.125rem] bg-[#f8f5ee] w-fit rounded-[0.625rem]">
                          <div className="px-[1.125rem] bg-[#F8F5EE] rounded-[0.5rem] text-[0.75rem] font-medium py-[0.375rem]">
                            {variant.name}
                            {variant.unit}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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

          {product_details.product_type === 2 && (
            <div className="~pb-[1.125rem]/[1.5rem]">
              <div className="~text-[0.75rem]/[1rem] pt-[1.5rem] pb-[1rem] font-medium leading-[120%] tracking-[-0.04em]">
                Customise Ingredients
              </div>
              {isCustomized ? (
                <div className=" text-[#0000008F] ~text-[0.875rem]/[1rem] font-medium tracking-[-0.03em] leading-[120%]">
                  <p className=" flex gap-[0.5rem] items-center">
                    <GradientTick /> Your Customised Mix for{" "}
                    {selectedVariant?.name}
                  </p>
                </div>
              ) : (
                <div className=" text-[#0000008F] ~text-[0.875rem]/[1rem] font-medium tracking-[-0.03em] leading-[120%]">
                  Currently using recommended Shree Kakaji Mix for{" "}
                  {selectedVariant?.name}
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
                {isCustomized ? "Edit Ingredients" : "Customise Ingredients"}
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
                    <div className=" ~py-[0.75rem]/[1rem]  space-y-[0.625rem]">
                      <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                        <span>
                          {isCustomized ? "Customised Ingredients" : " "}
                        </span>
                        <span className="font-medium text-black">
                          ₹{basePrice.toFixed(2)}
                        </span>
                      </div>

                      {/* {isCustomized && customizedIngredients && (
                        <div className="pl-[1rem] space-y-[0.375rem] border-l-2 border-[#EC5715]/20">
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
                                ₹{(ing.qty * ing.pricePerUnit).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )} */}

                      {selectedSpiceLevel && selectedSpiceLevel.price > 0 && (
                        <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                          <span>
                            ({getSpiceLevelLabel(selectedSpiceLevel.level)})
                            Spice Level
                          </span>
                          <span className="font-medium text-black">
                            +₹{selectedSpiceLevel.price.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {grinding === "Yes" && grindingPrice > 0 && (
                        <div className="flex justify-between items-center ~text-[0.75rem]/[0.875rem] text-[#0000008F]">
                          <span>Grinding ({selectedVariant?.name})</span>
                          <span className="font-medium text-black">
                            +₹{grindingPrice.toFixed(2)}
                          </span>
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
                section={product_details.category_name}
                item={product_details}
                selectedVariant={selectedVariant}
                customIngredients={customizedIngredients}
                selectedSpiceLevel={selectedSpiceLevel}
                grinding={grinding}
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

            <div className="~pt-[0.75rem]/[2.5rem] ~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[120%]">
              {activeTab === "description" && (
                <p>{product_details.description}</p>
              )}
              {activeTab === "info" && <p>{product_details.product_info}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
