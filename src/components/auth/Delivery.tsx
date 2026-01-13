"use client";

import { useCart } from "@/src/hooks/useCart";
import Location from "../svg/Location";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { frontendApi } from "@/src/api/api";
import Lottie from "lottie-react";
import successAnimation from "@public/lottie/success.json";
import Link from "next/link";

type View = "cart" | "login" | "otp" | "address" | "delivery";

interface handleDeliveryProps {
  handleDelivery: () => void;
  setCurrentView: React.Dispatch<React.SetStateAction<View>>;
  addressData: AddressResponse | null;
  isLoading: boolean;
  refetchAddress: () => void;
  closeCart: () => void;
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

const convertToKg = (quantity: number, unit: string): number => {
  const unitLower = unit?.toLowerCase() || "";
  if (unitLower === "kg") return quantity;
  if (unitLower === "g" || unitLower === "gm") return quantity / 1000;
  return quantity;
};

const calculateTotalWeight = (items: any[]): number => {
  return items.reduce((total, item) => {
    if (item.isFreeItem) return total;

    const quantity = item.quantity || 1;
    const variantName = item.variantName ? String(item.variantName) : "0";
    const variantUnit = item.variantUnit || "gm";

    const variantKg = convertToKg(parseFloat(variantName), variantUnit);

    return total + variantKg * quantity;
  }, 0);
};

const calculateDeliveryCharges = (
  totalWeight: number,
  basePrice: number,
  incrementalPrice?: number
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
        `Additional ${additionalKgs}kg @ ₹${pricePerAdditionalKg}/kg: ₹${additionalCharges}`
      );
    }
  }

  breakdown.push(
    `Total weight: ${totalWeight.toFixed(
      2
    )}kg (Rounded up to: ${roundedWeight}kg)`
  );
  breakdown.push(`Total delivery charges: ₹${charges}`);

  return { charges, breakdown };
};

const prepareOrderItems = (items: any[]) => {
  return items
    .filter((item) => !item.isFreeItem)
    .map((item) => ({
      product_id:
        typeof item.id === "string"
          ? parseInt(item.id.split("_")[0])
          : Number(item.id),
      product_type: Number(item.productType),
      variant_id: Number(item.variantId),
      quantity: Number(item.quantity),
      customer_note: "Pack properly" as const,
    }));
};

const Delivery = ({
  setCurrentView,
  addressData,
  isLoading,
  closeCart,
  orderSuccess,
  setOrderSuccess,
}: handleDeliveryProps) => {
  const { items, cartNetTotal, emptyCart } = useCart();
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

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: {
      items: {
        product_id: number;
        product_type: number;
        variant_id: number;
        quantity: number;
        customer_note: "Pack properly";
      }[];
      customer_id: number;
    }) => {
      const response = await frontendApi.createOrder(orderData);
      if (!response?.success) {
        throw new Error(response?.message || "Failed to create order");
      }
      return response;
    },
    onSuccess: (data) => {
      console.log("Order created successfully:", data);
      emptyCart();

      const orderAmount = data.data!.amount;

      if (data.data?.order_id) {
        setOrderDetails({
          order_id: data.data.order_id,
          order_date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          items_count: data.data.item_count,
          amount: orderAmount,
        });
      }

      setOrderSuccess(true);

      setTimeout(() => {}, 2000);
    },
    onError: (error: Error) => {
      console.error("Order creation failed:", error);
    },
  });

  useEffect(() => {
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

    const basePrice = parseFloat(addressData.shipping_charge.per_kg_price) || 0;
    const calculation = calculateDeliveryCharges(totalWeight, basePrice);

    setDeliveryCalculation({
      charges: calculation.charges,
      breakdown: calculation.breakdown,
      totalWeight,
    });
  }, [items, addressData]);

  console.log(addressData);
  const handleProceedToPayment = async () => {
    if (items.length === 0) {
      return;
    }

    if (!addressData?.customer_address) {
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
        customer_id: addressData.customer_address.customer_id,
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
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{orderDetails!.items_count} item(s)</span>
              </div>
              {items.filter((item) => item.isFreeItem)?.length > 0 && (
                <div className="flex justify-between">
                  <span>Free items:</span>
                  <span className="text-green-600">
                    {items.filter((item) => item.isFreeItem).length} item(s)
                  </span>
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

  if (isLoading) {
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

  // No address state
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

  const totalAmount = cartNetTotal + deliveryCalculation.charges;

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
            <p>₹ {cartNetTotal.toFixed(2)}</p>
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
