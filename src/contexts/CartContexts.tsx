"use client";

import { createContext } from "react";

export type TCartContext = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const CartContext = createContext<TCartContext>({
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
});
