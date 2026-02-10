import { TUserData } from "../contexts/AuthContext";
import axiosClient from "./config/axiosClient";
import { TCategories, THome, TPromoCode, TShop, TShopInner } from "./type";

export const frontendApi = {
  getHomePage: async (): Promise<THome | null> => {
    try {
      const response = await axiosClient.get("/home");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getCollectionPage: async (): Promise<TCategories[] | null> => {
    try {
      const response = await axiosClient.get("/get-categories");
      return response.data.data?.categories;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getShopPage: async (): Promise<TShop[] | null> => {
    try {
      const response = await axiosClient.get("/shop");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getPromoCode: async (code: string): Promise<TPromoCode | null> => {
    try {
      const response = await axiosClient.get(`/promocode-check?code=${code}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getPinCode: async (pincode: string): Promise<TPromoCode | null> => {
    try {
      const response = await axiosClient.get(
        `/pincode-check?pincode=${pincode}`,
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getShopInnerPage: async (slug: string): Promise<TShopInner | null> => {
    try {
      const response = await axiosClient.get(`/product-details/${slug}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  EnquiryForm: async (formData: object) => {
    try {
      const response = await axiosClient.post("/contact-us", formData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  customerSendOTP: async (body: {
    phone_code: string;
    phone_number: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: {
      phone_code: string;
      phone_number: string;
      token: string;
    };
  } | null> => {
    try {
      const response = await axiosClient.post("/send-otp", body);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  customerVerifyOTP: async (body: {
    token: string;
    otp: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: {
      is_registration_needed?: boolean;
      phone_code?: string;
      phone_number?: string;
      token: string;
      user?: TUserData;
    };
  } | null> => {
    try {
      const response = await axiosClient.post("/verify-otp", body);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  postAddress: async (body: {
    name: string;
    pincode: string;
    state: string;
    city: string;
    email: string;
    street: string;
  }): Promise<{
    status: number;
    success: boolean;
    message: string;
    data?: { user: TUserData };
  } | null> => {
    try {
      const response = await axiosClient.post("/customer-address", body);
      return response.data;
    } catch (error) {
      console.error("Error creating address:", error);
      return null;
    }
  },
  getCustomerAddress: async (): Promise<{} | null> => {
    try {
      const response = await axiosClient.get("/customer-address");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateCustomerAddress: async (
    id: string,
    data: {
      name: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      email: string;
    },
  ): Promise<{} | null> => {
    try {
      const response = await axiosClient.put(`/customer-address/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createOrder: async (body: {
    items: {
      product_id: number;
      product_type: number;
      variant_id: number;
      quantity: number;
      customer_note: "Pack properly";
      yadi_variant?: {
        variant_id: number;
        ingredients: { raw_material_id: number; quantity: number }[];
      };
      spice_level?: number;
      has_grind?: boolean;
    }[];
    customer_id: number;
    promo_code: string;
  }): Promise<{
    id: string;
    order_id: string;
    payment_links: {
      web: string;
    };
    sdk_payload: {
      currTime: string;
      expiry: string;
      payload: {
        action: string;
        amount: string;
        clientAuthToken: string;
        clientId: string;
        currency: string;
        customerEmail: string;
        customerId: string;
        customerPhone: string;
        merchantId: string;
        orderId: string;
        returnUrl: string;
      };
      requestId: string;
      service: string;
    };
    status: string;
  } | null> => {
    try {
      const response = await axiosClient.post("/create-order", body);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },
  getOrderDetails: async (orderId: string) => {
    const response = await axiosClient.get(`/order-details/${orderId}`);
    return response.data;
  },
};
