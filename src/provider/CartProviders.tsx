"use client";
import type { ReactNode } from "react";
import { CartProvider, useCart } from "../hooks/useCart";

type Props = { children: ReactNode };

const CartProviders = ({ children }: Props) => {
  const { openCart } = useCart();

  return <CartProvider>{children}</CartProvider>;
};

export default CartProviders;
