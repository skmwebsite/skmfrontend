"use client";
import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";

import { frontendApi } from "../api/api";
import { AuthContext, TempUserData, TUserData } from "../contexts/AuthContext";
import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "../utils/authStorage";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [user, setUserState] = useState<TUserData | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [tempData, setTempDataState] = useState<TempUserData | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUser) {
      setUserState(storedUser);
    }
  }, []);

  const openModal = () => {
    setTempDataState(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempDataState(null);
  };

  const saveToken = (newToken: string) => {
    setTokenState(newToken);
    setToken(newToken);
  };

  const saveUser = (newUser: TUserData) => {
    setUserState(newUser);
    setUser(newUser);
  };

  const login = async ({
    phone_code,
    phone_number,
  }: {
    phone_code: string;
    phone_number: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await frontendApi.customerSendOTP({
        phone_code,
        phone_number,
      });
      if (!(response?.success && response.data?.token)) {
        return {
          success: false,
          message: response?.message || "Failed to send OTP",
        };
      }

      setTempDataState({
        phone_code,
        phone_number,
        temp_token: response.data.token,
      });

      return {
        success: true,
        message: response.message || "OTP sent successfully",
      };
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  const verifyOTP = async (
    otp: string
  ): Promise<{ success: boolean; message: string; user?: TUserData }> => {
    try {
      const currentTempToken = tempData?.temp_token;
      if (!currentTempToken) {
        return {
          success: false,
          message: "No active session. Please request OTP again.",
        };
      }

      const response = await frontendApi.customerVerifyOTP({
        token: currentTempToken,
        otp,
      });

      if (!(response?.success && response.data?.token)) {
        return { success: false, message: response?.message || "Invalid OTP" };
      }

      saveToken(response.data.token);

      if (response.data.user) {
        const user = response.data.user;

        const isProfileIncomplete = !user.name || !user.email || !user.address;

        if (isProfileIncomplete) {
          saveUser(user as TUserData);
          setTempDataState({
            phone_code: response.data.phone_code ?? tempData?.phone_code ?? "",
            phone_number:
              response.data.phone_number ?? tempData?.phone_number ?? "",
            temp_token: response.data.token,
            is_registered: response.data.user.is_registration_needed,
            requiresAddress: true,
          });
          return {
            success: true,
            message: response.message,
          };
        } else {
          saveUser(user as TUserData);
          setTempDataState(null);
          closeModal();
          return {
            success: true,
            message: response.message || "Login successful",
          };
        }
      } else {
        setTempDataState({
          phone_code: response.data.phone_code ?? tempData?.phone_code ?? "",
          phone_number:
            response.data.phone_number ?? tempData?.phone_number ?? "",
          temp_token: response.data.token,
          is_registered: false,
          requiresAddress: true,
        });
        return {
          success: true,
          message: response.message,
        };
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      return { success: false, message: "Network error" };
    }
  };

  const submitAddress = async (data: {
    name: string;
    pincode: string;
    state: string;
    city: string;
    email: string;
    street: string;
  }): Promise<{ success: boolean; message: string; user?: TUserData }> => {
    try {
      if (!token) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const response = await frontendApi.postAddress({
        name: data.name,
        email: data.email,
        city: data.city,
        pincode: data.pincode,
        state: data.state,
        street: data.street,
      });

      if (!response?.success) {
        return {
          success: false,
          message: response?.message || "Failed to add address",
        };
      }

      setTempDataState(null);
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      return {
        success: true,
        message: response.message || "address added successfully",
      };
    } catch (error) {
      console.error("Submit Address Error:", error);
      return { success: false, message: "Network error" };
    }
  };

  interface AddressData {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    email: string;
  }
  const updateCustomerAddress = async (
    id: string,
    data: AddressData
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      name: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      email: string;
    };
  }> => {
    try {
      if (!token) {
        return {
          success: false,
          message: "Authentication required",
          data: undefined,
        };
      }

      const response = await frontendApi.updateCustomerAddress(id, {
        name: data.name,
        email: data.email,
        city: data.city,
        pincode: data.pincode,
        state: data.state,
        street: data.street,
      });

      if (!response) {
        return {
          success: false,
          message: "Failed to update address",
          data: undefined,
        };
      }

      queryClient.invalidateQueries({ queryKey: ["customer-address"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      const responseData = {
        name: (response as any).name || data.name,
        street: (response as any).street || data.street,
        city: (response as any).city || data.city,
        state: (response as any).state || data.state,
        pincode: (response as any).pincode || data.pincode,
        email: (response as any).email || data.email,
      };

      return {
        success: true,
        message: "Address updated successfully",
        data: responseData,
      };
    } catch (error: any) {
      console.error("Update Address Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
        data: undefined,
      };
    }
  };
  const logout = () => {
    setUserState(null);
    setTokenState(null);
    setTempDataState(null);
    removeToken();
    removeUser();
  };

  const getTokenValue = () => token;

  const value = {
    isModalOpen,
    openModal,
    closeModal,
    user,
    token,
    tempData,
    isLoggedIn: !!token && !!user,
    login,
    verifyOTP,
    submitAddress,
    logout,
    updateCustomerAddress,
    getToken: getTokenValue,
    requiresAddress: tempData?.requiresAddress || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
