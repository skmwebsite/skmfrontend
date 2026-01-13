"use client";
import type { ReactNode } from "react";
import { CartProvider } from "../hooks/useCart";

type Props = { children: ReactNode };

const CartProviders = ({ children }: Props) => (
  <CartProvider>{children}</CartProvider>
);

export default CartProviders;
