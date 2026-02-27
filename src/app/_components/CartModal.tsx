"use client";
import CloseIcon from "@/src/components/svg/CloseIcon";
import DeleteIcon from "@/src/components/svg/DeleteIcon";
import {
  useCart,
  isMaxWeightReached,
  getMaxItemCount,
} from "@/src/hooks/useCart";
import bag from "@public/images/empty-bag.png";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Arrow from "@/src/components/svg/Arrow";
import { useAuth } from "@/src/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";
import LoginForm from "@/src/components/auth/LoginForm";
import LoginOTPForm from "@/src/components/auth/LoginOTPForm";
import AddressForm from "@/src/components/auth/AddressForm";
import Delivery from "@/src/components/auth/Delivery";
import { useMutation } from "@tanstack/react-query";
import { frontendApi } from "@/src/api/api";
import ChevronDown from "@/src/components/svg/ChevronDown";
import toast from "react-hot-toast";

type View = "cart" | "login" | "otp" | "address" | "delivery";
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

const CartModal = () => {
  const {
    isCartOpen,
    closeCart,
    totalUniqueItems,
    totalNumberItems,
    items,
    removeItem,
    updateItem,
    cartNetTotal,
  } = useCart();

  const { isLoggedIn, tempData } = useAuth();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currentView, setCurrentView] = useState<View>("cart");
  const [addressData, setAddressData] = useState<AddressResponse | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);
  const [promoData, setPromoData] = useState<{
    discount_type: number;
    discount_value: number;
  } | null>(null);

  const calculateFinalTotal = () => {
    const totalAfterDiscount = cartNetTotal - discountAmount;
    return Math.max(totalAfterDiscount, 0);
  };

  const promoMutation = useMutation({
    mutationFn: (code: string) => frontendApi.getPromoCode(code),

    onMutate: () => {
      toast.dismiss();
      toast.loading("Applying promo code...");
    },

    onSuccess: (res) => {
      toast.dismiss();

      if (!res) {
        toast.error("Invalid promo code");
        setDiscountAmount(0);
        setPromoData(null);
        return;
      }

      const discountValue = Number(res.discount_value);
      let discount = 0;

      // Store promo data for recalculation when cart changes
      setPromoData({
        discount_type: res.discount_type,
        discount_value: discountValue,
      });

      if (res.discount_type === 1) {
        discount = discountValue;
      }

      if (res.discount_type === 2) {
        discount = (cartNetTotal * discountValue) / 100;
      }

      discount = Math.min(discount, cartNetTotal);

      setDiscountAmount(discount);
      setShowPromoSuccess(true);

      // Hide the success animation after 2 seconds
      setTimeout(() => {
        setShowPromoSuccess(false);
      }, 2000);

      toast.success(`Promo applied! You saved ₹${discount.toFixed(2)}`);
    },

    onError: () => {
      toast.dismiss();
      toast.error("Promo code expired or invalid");
      setDiscountAmount(0);
      setPromoData(null);
    },
  });

  // Recalculate discount when cart total changes and promo is applied
  useEffect(() => {
    if (promoData && cartNetTotal > 0) {
      let discount = 0;

      if (promoData.discount_type === 1) {
        // Fixed amount discount
        discount = promoData.discount_value;
      }

      if (promoData.discount_type === 2) {
        // Percentage discount
        discount = (cartNetTotal * promoData.discount_value) / 100;
      }

      discount = Math.min(discount, cartNetTotal);
      setDiscountAmount(discount);
    } else if (cartNetTotal === 0) {
      // Clear promo if cart is empty
      setDiscountAmount(0);
      setPromoData(null);
      setPromoCode("");
    }
  }, [cartNetTotal, promoData]);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    promoMutation.mutate(promoCode);
  };

  const fetchAddressMutation = useMutation({
    mutationFn: async (): Promise<AddressResponse> => {
      const response = await frontendApi.getCustomerAddress();
      if (!response || typeof response !== "object" || response === null) {
      }
      return response as AddressResponse;
    },
    onSuccess: (data) => {
      setAddressData(data);
      setIsLoadingAddress(false);
    },
    onError: (error) => {
      console.error("Error fetching address:", error);
      setIsLoadingAddress(false);
    },
  });

  useEffect(() => {
    if (isLoggedIn && isCartOpen) {
      fetchAddressMutation.mutate();
    }
  }, [isLoggedIn, isCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      setCurrentView("cart");
    }
  }, [isCartOpen]);

  const handleCloseCart = () => {
    setTimeout(() => {
      setCurrentView("cart");
    }, 300);
    closeCart();
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      setCurrentView("delivery");
    } else {
      setCurrentView("login");
    }
  };

  useEffect(() => {
    if (tempData?.is_registered === undefined) return;

    setCurrentView(tempData.is_registered ? "address" : "delivery");
  }, [tempData?.is_registered]);

  const handleOTPVerified = () => {};

  const handleAddressSubmitted = () => {
    if (isLoggedIn) {
      fetchAddressMutation.mutate();
    }
    setCurrentView("delivery");
  };

  const handleDelivery = () => {
    setCurrentView("delivery");
  };

  const handleBackToCart = () => {
    setCurrentView("cart");
  };

  const handleBackToLogin = () => {
    setCurrentView("login");
  };

  const refetchAddress = () => {
    if (isLoggedIn) {
      setIsLoadingAddress(true);
      fetchAddressMutation.mutate();
    }
  };
  const isPromoApplied = discountAmount > 0;
  const dialogPanelKey = isCartOpen ? "cart-open" : "cart-closed";

  return (
    <Transition appear as={Fragment} show={isCartOpen}>
      <Dialog as="div" className="relative z-[9999]" onClose={handleCloseCart}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-[6px]" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center lg:p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 max-lg:translate-y-[100%] lg:translate-x-[100%]"
              enterTo="opacity-100 max-lg:translate-y-0 lg:translate-x-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 max-lg:translate-y-0 lg:translate-x-0"
              leaveTo="opacity-0 max-lg:translate-y-[100%] lg:translate-x-[100%]"
            >
              <DialogPanel
                key={dialogPanelKey}
                className="h-[90svh] w-full bg-white bottom-0 absolute lg:top-0 lg:right-0 lg:h-screen lg:w-[31.25rem]"
              >
                <div className="overflow-hidden flex h-full flex-col justify-between">
                  <div className="~py-[1rem]/[1.5rem] border-b ~px-[1rem]/[1.5rem] border-b-[#00000014] flex ~text-[0.875rem]/[1.5rem] leading-[120%] tracking-[-0.03em] font-medium items-center justify-between">
                    <div className="flex gap-[1rem] items-center">
                      {currentView === "cart" && "Your Cart"}
                      {currentView === "login" && "Login to Continue"}
                      {currentView === "otp" && "Verify OTP"}
                      {currentView === "address" &&
                        (addressData?.customer_address
                          ? "Edit Address"
                          : "Add Address")}
                      {!orderSuccess && currentView === "delivery" && (
                        <div className="flex items-center gap-3">
                          <ChevronDown
                            onClick={() => setCurrentView("cart")}
                            className="shrink-0 cursor-pointer rotate-90 hover:scale-105 duration-300 ease-in-out transition-all ~w-[0.5775000453rem]/[0.900000095rem]"
                          />
                          Delivery Details
                        </div>
                      )}

                      {currentView === "cart" && totalNumberItems > 0 && (
                        <div className="px-[0.5rem] py-[0.1rem] min-w-[3.5ch] text-[0.875rem] cursor-pointer rounded-full bg-gradient-to-r from-[#EC5715] text-white to-[#FF7E00]">
                          {totalNumberItems}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {(currentView === "login" || currentView === "otp") && (
                        <button
                          onClick={
                            currentView === "otp"
                              ? handleBackToLogin
                              : handleBackToCart
                          }
                          className="~text-[0.75rem]/[0.875rem] text-main font-medium hover:underline"
                        >
                          Back
                        </button>
                      )}

                      {currentView === "cart" && (
                        <div
                          onClick={handleCloseCart}
                          className="~size-[0.8999999762rem]/[2.5rem] cursor-pointer hover:bg-main bg-[#F8F5EE] text-black hover:text-white shrink-0 duration-300 ease-in-out transition-all flex justify-center items-center rounded-[0.625rem]"
                        >
                          <CloseIcon />
                        </div>
                      )}
                    </div>
                  </div>

                  <div data-lenis-prevent className="h-full overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {currentView === "cart" && (
                        <motion.div
                          key="cart-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          {totalUniqueItems > 0 ? (
                            <>
                              <div className="~px-[1rem]/[1.5rem] max-h-[55svh] overflow-y-auto border-b border-b-[#00000014] flex-1">
                                {items.map((item, i) => (
                                  <div
                                    key={i}
                                    className={`flex ~py-[1rem]/[1.5rem] border-b border-b-[#00000014] ~gap-[0.75rem]/[1.25rem] ${
                                      item.isFreeItem ? "" : ""
                                    }`}
                                  >
                                    <div className="~w-[3.4140930176rem]/[7.5rem] shrink-0 overflow-hidden  h-auto relative bg-[#FFF5E7] rounded-[0.25rem] ">
                                      <Image
                                        fill
                                        className="object-cover"
                                        src={item.image}
                                        alt={item.title}
                                      />
                                      {item.isFreeItem && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white text-[0.5rem] font-bold px-1 py-0.5 rounded-bl-[0.25rem] rounded-tr-[0.25rem]">
                                          FREE
                                        </div>
                                      )}
                                    </div>
                                    <div className="w-full">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-start ~text-[1rem]/[1.125rem] leading-[120%] tracking-[-0.03em]">
                                          {item.title}

                                          <div className="uppercase pt-[0.25rem] text-start ~text-[0.75rem]/[0.875rem] font-medium text-[#F1913D] ">
                                            • {String(item.category_name)}
                                          </div>
                                        </h4>

                                        {!item.isFreeItem && (
                                          <>
                                            <div
                                              onClick={() => removeItem(item)}
                                              className="~size-[1.5rem]/[2.5rem] hover:text-white shrink-0 bg-[#9A29231A] cursor-pointer text-black duration-500 ease-in-out transition-all hover:bg-main/50 ~rounded-[0.25rem]/[0.625rem] items-center hidden md:flex justify-center"
                                            >
                                              <DeleteIcon className="~size-[0.76rem]/[1rem] shrink-0" />
                                            </div>
                                            <div className="text-semibold ~text-[0.75rem]/[1rem] tracking-[-0.03em] flex md:hidden leading-[120%] ">
                                              ₹{item.itemTotal?.toFixed(2)}
                                            </div>
                                          </>
                                        )}
                                        {item.isFreeItem && (
                                          <div className="text-semibold ~text-[0.75rem]/[1rem] tracking-[-0.03em] flex md:hidden leading-[120%] text-[#EC5715] font-bold">
                                            FREE
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex ~my-[0.3rem]/[0.5rem] gap-[0.5rem] ">
                                        <div
                                          className={`~text-[0.625rem]/[0.875rem] rounded-[0.3125rem] font-medium tracking-[-0.03em] leading-[120%] ${
                                            item.isFreeItem
                                              ? "bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white"
                                              : "bg-[#F8F5EE]"
                                          } ~px-[0.75rem]/[0.875rem] ~py-[0.3rem]/[0.375rem]`}
                                        >
                                          {String(item.variantName)}{" "}
                                          {item.productType !== "2" &&
                                            String(item.variantUnit)}
                                        </div>
                                        {item.hasCustomizedIngredients && (
                                          <div className="~text-[0.625rem]/[0.875rem] rounded-[0.3125rem] font-medium tracking-[-0.03em] leading-[120%] bg-[#F8F5EE] ~px-[0.75rem]/[0.875rem] ~py-[0.3rem]/[0.375rem]">
                                            Customized
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex items-center justify-between">
                                        {!item.isFreeItem ? (
                                          <>
                                            <div className="flex ~gap-[0.25rem]/[0.5rem]">
                                              <button
                                                onClick={() =>
                                                  updateItem(item, -1)
                                                }
                                                className="~size-[1.5rem]/[2.5rem] hover:bg-main text-black hover:text-white bg-[#F8F5EE] ~text-[0.625rem]/[1rem] font-semibold flex justify-center items-center ~rounded-[0.25rem]/[0.625rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={item.quantity <= 1}
                                                type="button"
                                              >
                                                -
                                              </button>
                                              <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                  const newQty =
                                                    parseInt(e.target.value) ||
                                                    0;
                                                  const maxQty =
                                                    getMaxItemCount(item);

                                                  if (newQty > maxQty) {
                                                    e.target.value =
                                                      String(maxQty);
                                                    return;
                                                  }
                                                  if (newQty < 1) {
                                                    e.target.value = "1";
                                                    return;
                                                  }

                                                  const diff =
                                                    newQty - item.quantity;
                                                  if (diff !== 0) {
                                                    updateItem(item, diff);
                                                  }
                                                }}
                                                onBlur={(e) => {
                                                  const value = e.target.value;
                                                  if (
                                                    value === "" ||
                                                    parseInt(value) === 0
                                                  ) {
                                                    removeItem(item);
                                                  }
                                                }}
                                                className="bg-[#F8F5EE] text-center min-w-[5ch] focus:ring-1 focus:ring-main no-spinner ~text-[0.75rem]/[1rem] font-semibold flex justify-center items-center ~rounded-[0.25rem]/[0.625rem] outline-none"
                                                min="1"
                                                max={getMaxItemCount(item)}
                                              />
                                              <button
                                                onClick={() =>
                                                  updateItem(item, 1)
                                                }
                                                className="~size-[1.5rem]/[2.5rem] hover:bg-main text-black hover:text-white bg-[#F8F5EE] ~text-[0.75rem]/[1rem] font-semibold flex justify-center items-center ~rounded-[0.25rem]/[0.625rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isMaxWeightReached(
                                                  item,
                                                )}
                                                type="button"
                                              >
                                                +
                                              </button>
                                            </div>
                                            <div className="text-semibold tracking-[-0.03em] ~text-[0.75rem]/[1rem] md:flex hidden leading-[120%]">
                                              ₹{item.itemTotal?.toFixed(2)}
                                            </div>
                                            <div
                                              onClick={() => removeItem(item)}
                                              className="~size-[1.5rem]/[2.5rem] shrink-0 bg-[#9A29231A] cursor-pointer text-black duration-500 ease-in-out transition-all hover:bg-main/50 hover:text-white ~rounded-[0.25rem]/[0.625rem] items-center md:hidden flex justify-center"
                                            >
                                              <DeleteIcon className="~size-[0.75rem]/[1rem] shrink-0" />
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className="text-semibold justify-end tracking-[-0.03em] text-end w-full ~text-[0.75rem]/[1rem] md:flex hidden leading-[120%] text-[#EC5715] font-bold">
                                              FREE
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div>
                                <div className="~p-[1rem]/[1.5rem] border-b flex flex-col items-start border-b-[#00000014] relative">
                                  <p className="underline tracking-[-0.03em] ~pb-[0.625rem]/[1.25rem] text-black  ~text-[0.75rem]/[1rem] leading-[120%] font-medium">
                                    Have a promo code?
                                  </p>
                                  <div className="flex w-full gap-[0.625rem] ">
                                    <input
                                      value={promoCode}
                                      onChange={(e) =>
                                        setPromoCode(e.target.value)
                                      }
                                      disabled={
                                        promoMutation.isPending ||
                                        isPromoApplied
                                      }
                                      placeholder="Enter Promo Code"
                                      className="bg-[#F8F5EE] py-[0.625rem] ~text-[0.75rem]/[1rem] px-[0.75rem] outline-none rounded-[0.625rem] w-full "
                                    />
                                    <button
                                      onClick={() => {
                                        if (isPromoApplied) {
                                          setPromoCode("");
                                          setDiscountAmount(0);
                                          setPromoData(null);
                                        } else {
                                          handleApplyPromo();
                                        }
                                      }}
                                      disabled={promoMutation.isPending}
                                      className="bg-black text-white p-[0.625rem] w-[10ch] ~text-[0.75rem]/[1rem] rounded-[0.625rem] font-medium tracking-[-0.03em] leading-[120%] relative overflow-hidden"
                                    >
                                      {isPromoApplied
                                        ? "Reset"
                                        : promoMutation.isPending
                                          ? "Applying..."
                                          : "Apply"}
                                    </button>
                                  </div>

                                  <AnimatePresence>
                                    {showPromoSuccess && (
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          scale: 0.5,
                                          y: 10,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{
                                          opacity: 0,
                                          scale: 0.5,
                                          y: -10,
                                        }}
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 25,
                                        }}
                                        className="absolute -top-2 right-4 z-10"
                                      >
                                        {/* Confetti burst */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          {Array.from({ length: 12 }).map(
                                            (_, i) => (
                                              <ConfettiParticle
                                                key={i}
                                                index={i}
                                              />
                                            ),
                                          )}
                                        </div>

                                        {/* Badge */}
                                        <motion.div
                                          className="relative bg-gradient-to-r from-[#EC5715] to-[#FF7E00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                                          animate={{
                                            scale: [1, 1.15, 0.95, 1.05, 1],
                                          }}
                                          transition={{
                                            duration: 0.5,
                                            ease: "easeOut",
                                            delay: 0.1,
                                          }}
                                        >
                                          {/* Shimmer sweep */}
                                          <motion.div
                                            className="absolute inset-0 rounded-full overflow-hidden"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "200%" }}
                                            transition={{
                                              duration: 0.6,
                                              delay: 0.2,
                                              ease: "easeInOut",
                                            }}
                                          >
                                            <div className="w-1/3 h-full bg-white/40 skew-x-12" />
                                          </motion.div>

                                          <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center gap-1 relative z-10"
                                          >
                                            Promo Applied!
                                          </motion.span>
                                        </motion.div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <div className="~p-[1rem]/[1.5rem] ~space-y-[1rem]/[1.5rem]">
                                  <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between ">
                                    <p>Subtotal</p>
                                    <p>₹{cartNetTotal.toFixed(2)}</p>
                                  </div>
                                  {isPromoApplied && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="flex font-medium ~text/[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between text-green-600 overflow-hidden"
                                    >
                                      <p>Discount Applied</p>
                                      <motion.p
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 25,
                                        }}
                                      >
                                        -₹{discountAmount.toFixed(2)}
                                      </motion.p>
                                    </motion.div>
                                  )}
                                  <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between ">
                                    <p>Delivery</p>
                                    <p>To be calculated</p>
                                  </div>
                                  <div className="h-[1px] my-[1.5rem] bg-[#00000014] "></div>
                                  <div className="flex font-medium ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.03em] justify-between">
                                    <p>Total</p>
                                    <motion.p
                                      key={calculateFinalTotal()}
                                      initial={{ scale: 1.2, color: "#10b981" }}
                                      animate={{ scale: 1, color: "#000000" }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      ₹{calculateFinalTotal().toFixed(2)}
                                    </motion.p>
                                  </div>
                                  <AnimatePresence mode="wait">
                                    <motion.div
                                      onClick={handleCheckout}
                                      key="checkout-button"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                      }}
                                    >
                                      <button className="~text-[0.75rem]/[1rem] group relative w-full overflow-hidden flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem]">
                                        <span
                                          className="
                                            absolute inset-0
                                            bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
                                            opacity-0 group-hover:opacity-100
                                            transition-opacity duration-700 ease-in-out
                                          "
                                        />
                                        <span className="relative z-20">
                                          Checkout
                                        </span>
                                      </button>
                                    </motion.div>
                                  </AnimatePresence>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col h-full pb-[40%] items-center justify-center">
                              <Image
                                src={bag}
                                alt=""
                                className="size-[7.9375rem] shrink-0 object-cover"
                              />
                              <div className="~text-[1.25rem]/[2.5rem] leading-[120%] tracking-[-0.03em] font-medium text-[#181D27] ">
                                Your Cart is Empty
                              </div>
                              <p className="pt-[0.4px] text-[#535862] tracking-[-0.03em] ~pb-[0.5rem]/[1rem] ~text-[0.875rem]/[1.125rem]">
                                Add some items to the cart.
                              </p>
                              <Link
                                onClick={handleCloseCart}
                                href={"/shop"}
                                className="relative overflow-hidden rounded-full bg-main text-white p-[0.125rem] ~w-[6.5625rem]/[9rem] flex items-center justify-end ~text-[0.75rem]/[1rem] tracking-[-0.03em] leading-[120%] font-medium group"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                                <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
                                  Shop now
                                </span>
                                <div className="relative z-10 ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem] flex justify-center items-center bg-white rounded-full transition-all duration-700 ease-in-out">
                                  <Arrow className="~size-[1rem]/[1.5rem] text-main absolute right-[0.5rem] transition-transform duration-700 ease-in-out group-hover:-rotate-45" />
                                </div>
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {currentView === "login" && (
                        <motion.div
                          key="login-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <LoginForm
                            onLoginSuccess={() => setCurrentView("otp")}
                          />
                        </motion.div>
                      )}

                      {currentView === "otp" && (
                        <motion.div
                          key="otp-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <LoginOTPForm onOTPVerified={handleOTPVerified} />
                        </motion.div>
                      )}
                      {currentView === "address" && (
                        <motion.div
                          key="address-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <AddressForm
                            onAddressSubmitted={handleAddressSubmitted}
                            existingAddress={addressData?.customer_address}
                            isEditing={!!addressData?.customer_address}
                          />
                        </motion.div>
                      )}
                      {currentView === "delivery" && (
                        <motion.div
                          key="delivery-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          {" "}
                          <Delivery
                            promoCode={promoCode}
                            totalAfterDiscount={calculateFinalTotal()}
                            orderSuccess={orderSuccess}
                            setOrderSuccess={setOrderSuccess}
                            closeCart={closeCart}
                            setCurrentView={setCurrentView}
                            handleDelivery={handleDelivery}
                            addressData={addressData}
                            isLoading={isLoadingAddress}
                            refetchAddress={refetchAddress}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {(currentView === "login" || currentView === "otp") && (
                    <div className="~py-[1rem]/[1.5rem] border-t ~px-[1rem]/[1.5rem] border-t-[#00000014] flex ~text-[0.875rem]/[1.5rem] leading-[120%] tracking-[-0.03em] font-medium items-center justify-between">
                      <div className=" flex text-[0.875rem] w-full text-[#0000008F]   items-center justify-center gap-[0.938rem]">
                        <Link
                          onClick={handleCloseCart}
                          className=" hover:text-main  duration-300 ease-in-out transition-all "
                          href="/terms-and-conditions"
                        >
                          Terms & Conditions
                        </Link>
                        <p className="text-gray-400">|</p>
                        <Link
                          onClick={handleCloseCart}
                          className=" hover:text-main duration-300 ease-in-out transition-all "
                          href="/privacy-and-policy"
                        >
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartModal;
const ConfettiParticle = ({ index }: { index: number }) => {
  const angle = (index / 12) * 360;
  const distance = 30 + Math.random() * 20;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;
  const colors = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98FB98",
  ];
  const color = colors[index % colors.length];
  const size = 4 + Math.random() * 4;

  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        x: [0, x * 0.5, x],
        y: [0, y * 0.5 - 15, y + 10],
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: 0.05,
      }}
    />
  );
};
