import { TProduct } from "@/src/api/type";
import CloseButton from "@/src/components/svg/CloseButton";
import Confirm from "@/src/components/svg/Confirm";
import Reset from "@/src/components/svg/Reset";
import useBodyScrollLock from "@/src/hooks/useBodyScrollLock";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: TProduct;
  selectedVariant: any;
  onConfirm: (ingredients: any, hasChanges: boolean) => void;
  existingCustomization: any;
};

type RawMaterial = {
  id: number;
  name: string;
  unit: string;
  formatted_name: string;
  formatted_unit: string;
  price: number;
  quantity_in_grams?: number;
  price_per_gms?: number;
};

type CustomIngredient = {
  id: number;
  name: string;
  qty: number;
  unit: string;
  defaultQty: number;
  pricePerUnit: number;
  rawMaterials: RawMaterial[];
  editable: number;
  raw_material_id?: number;
};

const CustomizeModal = ({
  open,
  setOpen,
  item,
  selectedVariant,
  onConfirm,
  existingCustomization,
}: Props) => {
  const [ingredients, setIngredients] = useState<CustomIngredient[]>([]);
  useBodyScrollLock(open);

  console.log("selectedVariant", selectedVariant);
  const parseQuantity = (value: string | number): number => {
    if (typeof value === "number") return value;
    return parseFloat(value) || 0;
  };

  const getMinMaxQuantity = () => {
    if (!selectedVariant) return { min: 0, max: Infinity };

    const minQty = parseQuantity(selectedVariant.min_quantity);
    const maxQty = parseQuantity(selectedVariant.max_quantity);

    return {
      min: convertToGrams(minQty, "gm"),
      max: convertToGrams(maxQty, "gm"),
    };
  };

  const convertToGrams = (quantity: number, unit: string): number => {
    const unitLower = unit.toLowerCase();
    if (unitLower === "kg") return quantity * 1000;
    if (unitLower === "g" || unitLower === "gm") return quantity;
    if (unitLower === "mg") return quantity / 1000;
    if (unitLower === "pcs" || unitLower === "pc") return quantity;
    return quantity;
  };

  const calculateIngredientPrice = (ingredient: CustomIngredient): number => {
    const rawMaterials = ingredient.rawMaterials;
    if (!rawMaterials || rawMaterials.length === 0) return 0;

    const unit = ingredient.unit?.toLowerCase() || "gm";

    if (unit === "pcs" || unit === "pc") {
      const mat = rawMaterials[0];
      if (!mat) return 0;
      const pcsInTier = parseFloat(mat.name) || 1;
      const pricePerPiece = mat.price / pcsInTier;
      return ingredient.qty * pricePerPiece;
    }

    const quantityInGrams = convertToGrams(ingredient.qty, ingredient.unit);
    const smallTier = rawMaterials[0];
    const bulkTier =
      rawMaterials.length > 1 ? rawMaterials[rawMaterials.length - 1] : null;
    const smallTierLimit =
      smallTier.quantity_in_grams ||
      convertToGrams(parseFloat(smallTier.name), smallTier.unit);

    if (quantityInGrams > smallTierLimit && bulkTier) {
      return (
        quantityInGrams *
        (bulkTier.price_per_gms ||
          bulkTier.price / (bulkTier.quantity_in_grams || 1))
      );
    }

    return (
      quantityInGrams *
      (smallTier.price_per_gms || smallTier.price / (smallTierLimit || 1))
    );
  };

  const checkForChanges = (currentIngredients: CustomIngredient[]) => {
    return currentIngredients.some((ing) => ing.qty !== ing.defaultQty);
  };

  const isIngredientEdited = (ingredient: CustomIngredient): boolean => {
    return ingredient.qty !== ingredient.defaultQty;
  };

  useEffect(() => {
    if (open && selectedVariant?.ingredients) {
      if (existingCustomization && existingCustomization.length > 0) {
        setIngredients(existingCustomization);
      } else {
        const formattedIngredients = selectedVariant.ingredients.map(
          (ingredient: any) => {
            const defaultQuantity = parseQuantity(ingredient.quantity);
            return {
              id: ingredient.id,
              name: ingredient.raw_material_name,
              qty: defaultQuantity,
              unit: ingredient.unit,
              defaultQty: defaultQuantity,
              pricePerUnit: 0,
              rawMaterials: ingredient.raw_materials || [],
              editable: ingredient.editable ?? 1,
              raw_material_id: ingredient.raw_material_id,
            };
          },
        );
        setIngredients(formattedIngredients);
      }
    }
  }, [open, selectedVariant, existingCustomization]);

  const updateQuantity = (id: number, change: number, unit?: string) => {
    const unitLower = unit?.toLowerCase() || "";
    const step =
      unitLower === "pcs" || unitLower === "pc" ? Math.sign(change) : change;
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id && item.editable === 1
          ? { ...item, qty: Math.max(0, item.qty + step) }
          : item,
      ),
    );
  };

  const handleInputChange = (id: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id && ing.editable === 1
          ? { ...ing, qty: Math.max(0, numValue) }
          : ing,
      ),
    );
  };

  const resetIngredients = () => {
    setIngredients((prev) =>
      prev.map((item) => ({ ...item, qty: item.defaultQty })),
    );
  };

  const calculateTotalInGrams = () => {
    return ingredients.reduce((total, item) => {
      if (
        item.rawMaterials.at(0)?.unit.toLowerCase() === "pcs" ||
        item.rawMaterials.at(0)?.unit.toLowerCase() === "pc"
      ) {
        const primaryMaterial = item.rawMaterials.at(0);
        const pcsInTier = parseFloat(primaryMaterial?.name || "1") || 1;
        const gramsPerPiece =
          (primaryMaterial?.quantity_in_grams || 0) / pcsInTier;
        return total + item.qty * gramsPerPiece;
      }
      return total + convertToGrams(item.qty, item.unit);
    }, 0);
  };

  const handleConfirm = () => {
    const { min, max } = getMinMaxQuantity();
    const totalGrams = calculateTotalInGrams();

    if (totalGrams < min) {
      alert(`Total quantity must be at least ${min}g`);
      return;
    }
    if (totalGrams > max) {
      alert(`Total quantity cannot exceed ${max}g`);
      return;
    }

    const hasChanges = checkForChanges(ingredients);
    const ingredientsWithPrice = ingredients.map((ing) => {
      const rawMaterials = ing.rawMaterials;
      const unit = ing.unit?.toLowerCase() || "gm";
      let pricePerUnit = 0;

      if (unit === "pcs" || unit === "pc") {
        const pcsInTier = parseFloat(rawMaterials[0]?.name || "1") || 1;
        pricePerUnit = (rawMaterials[0]?.price || 0) / pcsInTier;
      } else if (rawMaterials.length > 0) {
        const quantityInGrams = convertToGrams(ing.qty, ing.unit);
        const smallTier = rawMaterials[0];
        const bulkTier =
          rawMaterials.length > 1
            ? rawMaterials[rawMaterials.length - 1]
            : null;
        const smallTierLimit =
          smallTier.quantity_in_grams ||
          convertToGrams(parseFloat(smallTier.name), smallTier.unit);

        if (quantityInGrams > smallTierLimit && bulkTier) {
          pricePerUnit =
            bulkTier.price_per_gms ||
            bulkTier.price / (bulkTier.quantity_in_grams || 1);
        } else {
          pricePerUnit =
            smallTier.price_per_gms || smallTier.price / (smallTierLimit || 1);
        }
      }

      return { ...ing, pricePerUnit };
    });
    onConfirm(ingredientsWithPrice, hasChanges);
  };

  const totalQuantity = calculateTotalInGrams();
  const totalPrice = ingredients.reduce(
    (total, item) => total + calculateIngredientPrice(item),
    0,
  );

  const { min, max } = getMinMaxQuantity();
  const isWithinRange = totalQuantity >= min && totalQuantity <= max;

  return (
    <Transition appear show={open === true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[20000]"
        onClose={() => setOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[100] h-screen bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed  inset-0 z-[150]  ">
          <div className="md:~p-[1rem]/[1.5rem] flex min-h-full items-end justify-center sm:items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-6 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-6 md:translate-y-0 md:scale-95"
            >
              <DialogPanel className="md:~max-w-[20rem]/[43.75rem] rounded-t-xl md:rounded-xl ~p-[1rem]/[1.5rem] w-full transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between">
                  <div>
                    <h3 className="~text-[0.875rem]/[1.5rem] flex items-center font-medium leading-[120%] tracking-[-0.03em] text-black">
                      Customise Ingredients &nbsp;{" "}
                      <div className="bg-gradient-to-r from-[#EC5715] to-[#FF7E00] leading-[120%] text-white rounded-full font-medium py-[0.25rem] px-[0.625rem] ~text-[0.875rem]/[1rem]">
                        {selectedVariant.formatted_name}{" "}
                        {selectedVariant.formatted_unit}
                      </div>
                    </h3>
                    <p className="text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em]">
                      Make your own product
                    </p>
                  </div>

                  <CloseButton
                    onClick={() => setOpen(false)}
                    className="~size-[2rem]/[3.125rem] cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all"
                  />
                </div>
                <div className="~pt-[1rem]/[2.1875rem]">
                  <div className="~text-[0.8125rem]/[1rem] font-light w-full leading-[120%] tracking-[-0.03em]">
                    <div className="grid grid-cols-3 w-full border-b pr-5 border-b-[#D9D9D9] font-normal pb-[0.625rem]">
                      <div className="w-full">Ingredient Name</div>
                      <div className="w-full text-center">Quantity</div>
                      <div className="w-full text-end">Price</div>
                    </div>

                    <div
                      data-lenis-prevent
                      className="my-[0.625rem] max-h-[48svh] pr-5 custom-scroll  md:max-h-[50svh] overflow-y-auto space-y-[0.625rem]"
                    >
                      {ingredients.map((item) => {
                        const itemPrice = calculateIngredientPrice(item);
                        const isEditable = item.editable === 1;
                        const isEdited = isIngredientEdited(item);
                        const isPcs =
                          item.unit?.toLowerCase() === "pcs" ||
                          item.unit?.toLowerCase() === "pc";

                        return (
                          <div
                            key={item.id}
                            className={`grid grid-cols-3 items-center w-full transition-colors duration-300 ${
                              !isEditable ? "opacity-50" : ""
                            } `}
                          >
                            <div className="py-[0.75rem] ~text-[0.8125rem]/[1rem] w-full leading-[120%] tracking-[-0.03em] flex items-center gap-1">
                              {item.name}
                              {!isEditable && (
                                <span className="ml-2 text-xs text-[#0000007A]">
                                  (Fixed)
                                </span>
                              )}
                            </div>
                            <div
                              className={`font-medium ~text-[0.8125rem]/[1rem] gap-[0.6875rem] tracking-[-0.03em] items-center flex justify-center ${
                                isEdited && isEditable ? "text-main" : ""
                              }`}
                            >
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, -5, item.unit)
                                }
                                disabled={!isEditable}
                                className={`~size-[2rem]/[2.5rem] text-main flex items-center justify-center shrink-0 ~rounded-[0.25rem]/[0.5rem] bg-[#F8F5EE] duration-300 ease-in-out transition-all ${
                                  isEditable
                                    ? "hover:bg-gray-100 cursor-pointer"
                                    : "cursor-not-allowed"
                                } `}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={item.qty}
                                min={0}
                                step={isPcs ? 1 : 5}
                                disabled={!isEditable}
                                onChange={(e) =>
                                  handleInputChange(item.id, e.target.value)
                                }
                                className={`bg-[#F8F5EE] rounded-[0.5rem] min-w-[5ch] text-center p-[0.625rem] outline-none no-spinner ${
                                  isEditable
                                    ? "focus:ring-1 focus:ring-main"
                                    : "cursor-not-allowed"
                                } ${
                                  isEdited && isEditable
                                    ? "border border-main/30 "
                                    : ""
                                }`}
                              />
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, 5, item.unit)
                                }
                                disabled={!isEditable}
                                className={`~size-[2rem]/[2.5rem] text-main flex items-center justify-center shrink-0 ~rounded-[0.25rem]/[0.5rem] bg-[#F8F5EE] duration-300 ease-in-out transition-all ${
                                  isEditable
                                    ? "hover:bg-gray-100 cursor-pointer"
                                    : "cursor-not-allowed"
                                } }`}
                              >
                                +
                              </button>
                            </div>
                            <div
                              className={`py-[1.25rem] text-end ${
                                isEdited && isEditable
                                  ? "text-main font-medium"
                                  : ""
                              }`}
                            >
                              ₹{itemPrice.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-[0.625rem] items-center grid grid-cols-3 border-t border-t-[#D9D9D9]">
                    <div className="">Total</div>
                    <div
                      className={`text-center ~text-[1rem]/[1.25rem] font-medium ${
                        !isWithinRange ? "text-red-600" : ""
                      }`}
                    >
                      {totalQuantity.toFixed(0)}
                      <div className="text-xs text-[#0000007A] mt-1">
                        {min}g - {max}g
                      </div>
                    </div>
                    <div className="text-end ~text-[1rem]/[1.25rem] font-medium">
                      ₹{totalPrice.toFixed(2)}
                    </div>
                  </div>

                  {!isWithinRange && (
                    <div className="mt-2 text-sm text-red-600 text-center">
                      Total must be between {min}g and {max}g
                    </div>
                  )}

                  <div className="~pt-[0.75rem]/[1rem] grid ~gap-[0.625rem]/[1rem] md:grid-cols-2">
                    <button
                      onClick={resetIngredients}
                      className="bg-[#F8F5EE] ~h-[2.5625rem]/[2.8125rem] hover:bg-[#ede9dd] transition-colors flex items-center gap-[0.5rem] ~text-[0.75rem]/[0.875rem] font-medium justify-center text-black rounded-full"
                    >
                      <Reset className="~size-[0.875rem]/[1rem]" />
                      Reset Ingredients
                    </button>

                    <button
                      onClick={handleConfirm}
                      disabled={!isWithinRange}
                      className={`~text-[0.75rem]/[1rem] relative group w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] font-medium text-white ~h-[2.5625rem]/[2.8125rem] ${
                        isWithinRange
                          ? "bg-main"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Confirm className="size-[1.25rem]" /> Confirm Ingredients
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomizeModal;
