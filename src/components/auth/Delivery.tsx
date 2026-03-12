"use client";

import { useCart } from "@/src/hooks/useCart";
import Location from "../svg/Location";
import PickUp from "../svg/PickUp";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { frontendApi } from "@/src/api/api";
import Lottie from "lottie-react";
import successAnimation from "@public/lottie/success.json";
import Link from "next/link";
import toast from "react-hot-toast";

type View = "cart" | "login" | "otp" | "pickup" | "address" | "delivery";

interface handleDeliveryProps {
  totalAfterDiscount: number;
  promoCode: string;
  handleDelivery: () => void;
  setCurrentView: React.Dispatch<React.SetStateAction<View>>;
  addressData: AddressResponse | null;
  isLoading: boolean;
  refetchAddress: () => void;
  closeCart: () => void;
  orderType: number; // 1 for Pickup, 2 for Delivery
  orderSuccess: boolean;
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomerAddress {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  customer_id: number;
  customer: {
    phone: string;
    phone_code: string;
  };
}

interface ShippingCharge {
  id: number;
  per_kg_price: string;
  zone: string;
}

interface AddressResponse {
  customer_address: CustomerAddress;
  shipping_charge: ShippingCharge;
}

// Shop address for pickup
const SHOP_ADDRESS = {
  name: "Shree Kakaji Masale",
  street: "Shop No 2, Om Plaza, Trimurti Chowk",
  city: "Nashik",
  state: "Maharashtra",
  pincode: "422008",
  fullAddress:
    "Shop No 2, Om Plaza, Trimurti Chowk, Trimurti-Kamatwade road, Nashik, Maharashtra - 422008",
  phone: "+91 1234567890",
  email: "info@shreekakajimasale.com",
};

const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  return quantity;
};

const convertToGrams = (
  quantity: number,
  unit: string,
  quantityInGrams?: number,
): number => {
  const unitLower = unit?.toLowerCase()?.trim() || "";

  if (
    unitLower === "pcs" ||
    unitLower === "pc" ||
    unitLower === "piece" ||
    unitLower === "pieces"
  ) {
    if (quantityInGrams && quantityInGrams > 0) {
      return quantity * quantityInGrams;
    }
    console.warn(`Unit "${unit}" is pcs but no quantity_in_grams provided`);
    return 0;
  }

  if (unitLower === "kg" || unitLower === "kgs") return quantity * 1000;
  if (
    unitLower === "g" ||
    unitLower === "gm" ||
    unitLower === "gram" ||
    unitLower === "grams"
  )
    return quantity;
  if (unitLower === "mg") return quantity / 1000;

  console.warn(
    `Unknown unit "${unit}" for quantity ${quantity} - defaulting to grams`,
  );
  return quantity;
};

const calculateCustomIngredientsWeightInKg = (
  customIngredients: any[],
): number => {
  if (!customIngredients || customIngredients.length === 0) {
    return 0;
  }

  let runningTotal = 0;

  customIngredients.forEach((ingredient, index) => {
    const rawQty = ingredient.qty;
    const rawUnit = ingredient.unit;
    const unit = rawUnit || "gm";
    const qty = Number(rawQty) || 0;

    let quantityInGrams = ingredient.quantity_in_grams;

    if (
      !quantityInGrams &&
      ingredient.rawMaterials &&
      ingredient.rawMaterials.length > 0
    ) {
      const mat = ingredient.rawMaterials[0];
      const pcsInTier = parseFloat(mat?.name || "1") || 1;
      quantityInGrams = (mat?.quantity_in_grams || 0) / pcsInTier;
    }

    const gramsValue = convertToGrams(qty, unit, quantityInGrams);

    runningTotal += gramsValue;
  });

  const totalKg = runningTotal / 1000;

  return totalKg;
};

const calculateTotalWeight = (items: any[]): number => {
  return items.reduce((total, item, index) => {
    if (item.isFreeItem) {
      console.log("Skipping free item");
      return total;
    }

    const quantity = item.quantity || 1;

    let spiceLevelWeightKg = 0;
    if (item.spiceLevel?.quantity_in_gm) {
      const spiceGrams = parseFloat(item.spiceLevel.quantity_in_gm) || 0;
      spiceLevelWeightKg = spiceGrams / 1000;
    }

    if (item.productType === "2") {
      if (item.customIngredients && item.customIngredients.length > 0) {
        const ingredientsWeightInKg = calculateCustomIngredientsWeightInKg(
          item.customIngredients,
        );
        const itemWeight =
          (ingredientsWeightInKg + spiceLevelWeightKg) * quantity;

        return total + itemWeight;
      } else {
        const variantName = item.variantName ? String(item.variantName) : "0";

        const match = variantName.match(/([\d.]+)\s*(\w+)/);

        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2].toLowerCase();
          const variantKg = convertToKg(value, unit);

          return total + (variantKg + spiceLevelWeightKg) * quantity;
        } else {
          const value = parseFloat(variantName) || 0;

          return total + (value + spiceLevelWeightKg) * quantity;
        }
      }
    } else {
      const variantName = item.variantName ? String(item.variantName) : "0";
      const variantUnit = item.variantUnit || "gm";
      const unitLower = variantUnit.toLowerCase();

      if (
        unitLower === "pcs" ||
        unitLower === "pc" ||
        unitLower === "piece" ||
        unitLower === "pieces"
      ) {
        const primaryQuantityInGrm = item.primary_quantity_in_grm || 0;
        if (primaryQuantityInGrm > 0) {
          const weightKg = (primaryQuantityInGrm / 1000) * quantity;
          return total + (weightKg + spiceLevelWeightKg * quantity);
        }
        return total + spiceLevelWeightKg * quantity;
      }

      const variantKg = convertToKg(parseFloat(variantName), variantUnit);

      return total + (variantKg + spiceLevelWeightKg) * quantity;
    }
  }, 0);
};

const calculateDeliveryCharges = (
  totalWeight: number,
  basePrice: number,
  incrementalPrice?: number,
): { charges: number; breakdown: string[] } => {
  if (totalWeight <= 0) {
    return { charges: 0, breakdown: ["Weight: 0kg", "Charges: ₹0"] };
  }

  const roundedWeight = Math.ceil(totalWeight);

  const pricePerAdditionalKg = incrementalPrice || basePrice;

  let charges = 0;
  const breakdown: string[] = [];

  if (roundedWeight === 1) {
    charges = basePrice;
    breakdown.push(`0-1kg: ₹${basePrice}`);
  } else {
    charges = basePrice;
    breakdown.push(`First kg (0-1kg): ₹${basePrice}`);

    const additionalKgs = roundedWeight - 1;

    const additionalCharges = additionalKgs * pricePerAdditionalKg;
    charges += additionalCharges;

    if (additionalKgs > 0) {
      breakdown.push(
        `Additional ${additionalKgs}kg @ ₹${pricePerAdditionalKg}/kg: ₹${additionalCharges}`,
      );
    }
  }

  breakdown.push(
    `Total weight: ${totalWeight.toFixed(
      2,
    )}kg (Rounded up to: ${roundedWeight}kg)`,
  );
  breakdown.push(`Total delivery charges: ₹${charges}`);

  return { charges, breakdown };
};

const prepareOrderItems = (items: any[]) => {
  return items
    .filter((item) => !item.isFreeItem)
    .map((item) => {
      const orderItem: any = {
        product_id:
          typeof item.id === "string"
            ? parseInt(item.id.split("_")[0])
            : Number(item.id),
        product_type: Number(item.productType),
        variant_id: Number(item.variantId),
        quantity: Number(item.quantity),
      };

      // Only add spice_level and has_grind for product_type 2
      if (Number(item.productType) === 2) {
        orderItem.spice_level = item.spiceLevel?.id || 0;
        orderItem.has_grind = item.grinding === "Yes" ? true : false;
      }

      if (Number(item.productType) === 2 && item.customIngredients) {
        const ingredients = item.customIngredients.map((ing: any) => ({
          raw_material_id: ing.raw_material_id,
          quantity: ing.qty,
          unit: ing.unit,
          price_per_unit: ing.pricePerUnit,
        }));

        orderItem.yadi_ingredients = ingredients;
      }

      return orderItem;
    });
};

const Delivery = ({
  promoCode,
  setCurrentView,
  addressData,
  isLoading,
  closeCart,
  orderType,
  orderSuccess,
  setOrderSuccess,
  totalAfterDiscount,
}: handleDeliveryProps) => {
  const { items } = useCart();
  const [deliveryCalculation, setDeliveryCalculation] = useState<{
    charges: number;
    breakdown: string[];
    totalWeight: number;
  }>({
    charges: 0,
    breakdown: [],
    totalWeight: 0,
  });

  const [orderDetails, setOrderDetails] = useState<{
    order_id: string;
    items_count: number;
    amount: number;
    order_date: string;
  } | null>(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SHOP_ADDRESS.fullAddress);
    setCopySuccess(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: {
      items: {
        product_id: number;
        // product_type: number;
        variant_id: number;
        quantity: number;
        yadi_ingredients?: { raw_material_id: number; quantity: number }[];
        spice_level?: number;
        has_grind?: boolean;
      }[];
      order_type: 1 | 2;
      promo_code: string;
    }) => {
      const response = await frontendApi.createOrder(orderData);

      if (!response || !response.id) {
        console.error("Invalid response - missing id");
        throw new Error("Failed to create order - no session returned");
      }

      if (!response.payment_links?.web) {
        console.error("Invalid response - missing payment link");
        throw new Error("No payment link returned from server");
      }

      return response;
    },
    onSuccess: (data) => {
      console.log("Order created successfully:", data);

      const itemsCount = items.filter((i) => !i.isFreeItem).length;
      const amount = parseFloat(data.sdk_payload?.payload?.amount || "0");

      setOrderDetails({
        order_id: data.order_id,
        items_count: itemsCount,
        amount: amount,
        order_date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });

      const paymentLink = data?.payment_links?.web;

      if (paymentLink) {
        try {
          console.log("Redirecting to payment page:", paymentLink);
          window.location.href = paymentLink;
        } catch (error) {
          console.error("Payment redirect failed:", error);
          toast.error("Failed to initiate payment. Please contact support.");
        }
      } else {
        console.warn("No payment link received from backend");
        setOrderSuccess(true);
        toast.success("Order created! Redirecting to payment...");
      }
    },
    onError: (error: Error) => {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order. Please try again.");
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get("status");
    const orderId = searchParams.get("order_id");

    if (status === "CHARGED" && orderId) {
      setTimeout(() => {
        window.location.href = `/order-details/${orderId}`;
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (orderType === 1) {
      if (!addressData?.shipping_charge || items.length === 0) {
        setDeliveryCalculation({
          charges: 0,
          breakdown: ["Add items to calculate delivery"],
          totalWeight: 0,
        });
        return;
      }

      const totalWeight = calculateTotalWeight(items);

      if (totalWeight <= 0) {
        setDeliveryCalculation({
          charges: 0,
          breakdown: ["No items with weight"],
          totalWeight: 0,
        });
        return;
      }

      const basePrice =
        parseFloat(addressData.shipping_charge.per_kg_price) || 0;
      const calculation = calculateDeliveryCharges(totalWeight, basePrice);
      setDeliveryCalculation({
        charges: calculation.charges,
        breakdown: calculation.breakdown,
        totalWeight,
      });
    } else {
      setDeliveryCalculation({
        charges: 0,
        breakdown: ["Pickup - No delivery charges"],
        totalWeight: calculateTotalWeight(items),
      });
    }
  }, [items, addressData, orderType]);

  const handleProceedToPayment = async () => {
    if (items.length === 0) {
      return;
    }

    if (orderType === 1 && !addressData?.customer_address) {
      setCurrentView("address");
      return;
    }

    const orderItems = prepareOrderItems(items);

    if (orderItems.length === 0) {
      return;
    }

    try {
      await createOrderMutation.mutateAsync({
        items: orderItems,
        order_type: orderType as 1 | 2,
        promo_code: promoCode,
      });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  if (orderSuccess) {
    return (
      <div className="~px-[1rem]/[1.5rem] ~pb-[1rem]/[1.5rem] flex flex-col justify-center items-center h-full">
        <div className="mb-6">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 120, height: 120 }}
          />
        </div>

        <div className="text-center">
          <h2 className="~text-[1.5rem]/[2rem] font-bold text-[#000000]">
            Thank you for your order!
          </h2>

          <p className="~text-[0.875rem]/[1rem] pt-1 ~pb-[1rem]/[3rem] text-[#1A1A1ABF] max-w-md">
            Your order has been successfully placed. We'll send shipping updates
            and details to your email as soon as your order ships.
          </p>

          <div className=" bg-[#F8F5EE] ~space-y-[0.25rem]/[0.5rem] ~text-[0.875rem]/[1rem] py-[1rem] px-[1rem] rounded-[0.5rem] ">
            {orderDetails && (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold">Order :</span>
                  <span className=" ">#{orderDetails.order_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Order Date:</span>
                  <span className="">{orderDetails.order_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-main">
                    ₹{" "}
                    <span className="font-bold text-main">
                      {orderDetails.amount.toFixed(2)}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 text-left w-full">
            <h4 className="~text-[0.875rem]/[1rem] font-semibold mb-2">
              Order Summary:
            </h4>
            <div className="space-y-1 text-sm">
              {orderDetails ? (
                <>
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{orderDetails.items_count} item(s)</span>
                  </div>
                  {items.filter((item) => item.isFreeItem)?.length > 0 && (
                    <div className="flex justify-between">
                      <span>Free items:</span>
                      <span className="text-green-600">
                        {items.filter((item) => item.isFreeItem).length} item(s)
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500 text-sm">
                  Processing payment...
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={"/shop"}
              onClick={closeCart}
              className="~text-[0.75rem]/[1rem] group relative w-full overflow-hidden flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem] px-8"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
              <span className="relative z-20">Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading && orderType === 1) {
    return (
      <div className="~px-[1rem]/[1.5rem] ">
        <div className="~pt-[1rem]/[2.563rem] ~pb-[1rem]/[2rem]">
          <div className="border border-[#00000014] flex gap-[0.75rem] rounded-[0.625rem] p-[0.75rem]">
            <div>
              <Location className="w-[1rem] shrink-0 text-main" />
            </div>
            <div className="flex-1">
              <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
                Loading address...
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderType === 2) {
    return (
      <div className="~px-[1rem]/[1.5rem] ~pb-[1rem]/[1.5rem] flex flex-col justify-between h-full ">
        <div className="~pt-[1rem]/[2.563rem] ~pb-[1rem]/[2rem]">
          <div className="border border-[#00000014] flex ~gap-[0.5rem]/[0.75rem] rounded-[0.625rem] ~p-[0.5rem]/[0.75rem]">
            <div>
              <Location className="w-[1rem] shrink-0 text-main" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h5 className="~text-[0.75rem]/[0.875rem] capitalize text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
                  Pickup from {SHOP_ADDRESS.name}
                </h5>
              </div>
              <div className=" ~text-[0.75rem]/[0.875rem] space-y-1 leading-[120%]">
                <p className="text-start">{SHOP_ADDRESS.street}</p>
                <p className="text-start capitalize">
                  {SHOP_ADDRESS.city}, {SHOP_ADDRESS.state} -{" "}
                  {SHOP_ADDRESS.pincode}
                </p>
                <div className="flex md:flex-row flex-col text-start text-[0.75rem] leading-[120%] text-[#0000008F] ~gap-[0]/[0.5rem]">
                  <p>{SHOP_ADDRESS.phone}</p>
                  <span className="max-md:hidden"> |</span>
                  <p>{SHOP_ADDRESS.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCopyAddress}
              className="~text-[0.75rem]/[0.875rem] font-semibold py-1 px-2 duration-300 ease-in-out transition-all hover:bg-[#F8F5EE] rounded-[0.5rem] cursor-pointer h-fit text-main flex items-center gap-1"
            >
              <svg
                className="size-[20px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Copy
            </button>
          </div>
        </div>

        <div>
          <div className="~py-[1rem]/[1.5rem] ~space-y-[1rem]/[1.5rem]">
            <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between ">
              <p>Subtotal</p>
              <p>₹ {totalAfterDiscount.toFixed(2)}</p>
            </div>

            <div className="h-[1px] my-[1.5rem] bg-[#00000014] "></div>
            <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold">₹ {totalAfterDiscount.toFixed(2)}</p>
            </div>

            <div className="text-[0.75rem] text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>
                  {items.filter((item) => !item.isFreeItem).length} item(s)
                </span>
              </div>
              {items.filter((item) => item.isFreeItem)?.length > 0 && (
                <div className="flex justify-between">
                  <span>Free items:</span>
                  <span className="text-green-600">
                    {items.filter((item) => item.isFreeItem).length} item(s)
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Total weight:</span>
                <span>{deliveryCalculation.totalWeight.toFixed(2)} kg</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={createOrderMutation.isPending || items.length === 0}
            className="~text-[0.75rem]/[1rem] group relative w-full overflow-hidden flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="relative z-20">
              {createOrderMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Placing Order...
                </div>
              ) : (
                `Place Order for ₹ ${totalAfterDiscount.toFixed(2)}`
              )}
            </span>
          </button>

          {createOrderMutation.isError && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-[0.75rem] text-center">
              Failed to create order. Please try again.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!addressData?.customer_address) {
    return (
      <div className="~px-[1rem]/[1.5rem] ">
        <div className="~pt-[1rem]/[2.563rem] ~pb-[1rem]/[2rem]">
          <div className="border border-[#00000014] flex gap-[0.75rem] rounded-[0.625rem] p-[0.75rem]">
            <div>
              <Location className="w-[1rem] shrink-0 text-main" />
            </div>
            <div className="flex-1">
              <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
                No address found
              </h5>
              <button
                onClick={() => setCurrentView("address")}
                className="~text-[0.75rem]/[0.875rem] font-semibold py-1 px-2 mt-2 duration-300 ease-in-out transition-all hover:bg-[#F8F5EE] rounded-[0.5rem] cursor-pointer h-fit text-main"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { name, street, city, state, pincode, email, customer } =
    addressData.customer_address;

  const totalAmount = totalAfterDiscount + deliveryCalculation.charges;

  return (
    <div className="~px-[1rem]/[1.5rem] ~pb-[1rem]/[1.5rem] flex flex-col justify-between h-full ">
      <div className="~pt-[1rem]/[2.563rem] ~pb-[1rem]/[2rem]">
        <div className="border border-[#00000014] flex ~gap-[0.5rem]/[0.75rem] rounded-t-[0.625rem] ~p-[0.5rem]/[0.75rem]">
          <div>
            <Location className="w-[1rem] shrink-0 text-main" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h5 className="~text-[0.75rem]/[0.875rem] capitalize text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
                Delivery to {name || "Customer"}
              </h5>
            </div>
            <div className=" ~text-[0.75rem]/[0.875rem] space-y-1 leading-[120%]">
              <p className="text-start capitalize">{street}</p>
              <p className="text-start capitalize">
                {city}, {state} - {pincode}
              </p>
              <div className="flex md:flex-row flex-col text-start text-[0.75rem] leading-[120%] text-[#0000008F] ~gap-[0]/[0.5rem]">
                <p className="">
                  {customer.phone_code} {customer.phone}
                </p>{" "}
                <span className="max-md:hidden"> |</span> <p>{email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setCurrentView("address")}
            className="~text-[0.75rem]/[0.875rem] font-semibold py-1 px-2 duration-300 ease-in-out transition-all hover:bg-[#F8F5EE] rounded-[0.5rem] cursor-pointer h-fit text-main"
          >
            Edit
          </button>
        </div>

        <div className="border-b border-x border-[#00000014] rounded-b-[0.625rem] ~p-[0.5rem]/[0.75rem] space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="~text-[0.75rem]/[0.875rem] capitalize text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Delivery Charge
            </h5>
            <p className="~text-[0.875rem]/[1rem] font-bold text-main">
              ₹{deliveryCalculation.charges.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="~py-[1rem]/[1.5rem] ~space-y-[1rem]/[1.5rem]">
          <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between ">
            <p>Subtotal</p>
            <p>₹ {totalAfterDiscount.toFixed(2)}</p>
          </div>
          <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between ">
            <p>Delivery</p>
            <p> ₹ {deliveryCalculation.charges.toFixed(2)}</p>
          </div>
          <div className="h-[1px] my-[1.5rem] bg-[#00000014] "></div>
          <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">₹ {totalAmount.toFixed(2)}</p>
          </div>

          <div className="text-[0.75rem] text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>
                {items.filter((item) => !item.isFreeItem).length} item(s)
              </span>
            </div>
            {items.filter((item) => item.isFreeItem)?.length > 0 && (
              <div className="flex justify-between">
                <span>Free items:</span>
                <span className="text-green-600">
                  {items.filter((item) => item.isFreeItem).length} item(s)
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Total weight:</span>
              <span>{deliveryCalculation.totalWeight.toFixed(2)} kg</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          disabled={createOrderMutation.isPending || items.length === 0}
          className="~text-[0.75rem]/[1rem] group relative w-full overflow-hidden flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
          <span className="relative z-20">
            {createOrderMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Placing Order...
              </div>
            ) : (
              `Place Order for ₹ ${totalAmount.toFixed(2)}`
            )}
          </span>
        </button>

        {createOrderMutation.isError && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-[0.75rem] text-center">
            Failed to create order. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivery;
