"use client";
import { createContext } from "react";

export type TUserData = {
  id: number;
  email: string;
  name: string;
  phone: string;
  phone_code: string;
  email_verified_at: string | null;
  status: number;
  address: string;
  is_registration_needed: boolean;
};

export type TempUserData = {
  phone_code: string;
  phone_number: string;
  temp_token: string;
  is_registered?: boolean;
  requiresAddress?: boolean;
};
export interface AddressData {
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
}
type AuthContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  user: TUserData | null;
  token: string | null;
  tempData: TempUserData | null;
  isLoggedIn: boolean;
  requiresAddress: boolean;
  login: (data: {
    phone_number: string;
    phone_code: string;
  }) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (
    otp: string
  ) => Promise<{ success: boolean; message: string; user?: TUserData }>;
  submitAddress: (data: {
    name: string;
    pincode: string;
    state: string;
    city: string;
    email: string;
    street: string;
  }) => Promise<{ success: boolean; message: string; user?: TUserData }>;
  updateCustomerAddress: (
    id: string,
    data: AddressData
  ) => Promise<{ success: boolean; message: string; data?: any }>;
  logout: () => void;
  getToken: () => string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
