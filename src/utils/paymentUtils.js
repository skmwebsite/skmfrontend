// src/utils/paymentUtils.js
import CryptoJS from "crypto-js";
import { getConfig } from "@/src/config/hdfcConfig";

// Generate order ID
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
};

// Encrypt data for HDFC
export const encryptData = (plainText) => {
  const config = getConfig();
  const key = CryptoJS.enc.Utf8.parse(config.workingKey);
  const iv = CryptoJS.enc.Utf8.parse(config.workingKey);

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  return encrypted.toString();
};

// Prepare payment parameters
export const preparePaymentParams = (orderData, addressData) => {
  const config = getConfig();

  const params = {
    merchant_id: config.merchantId,
    order_id: orderData.orderId,
    amount: orderData.amount,
    currency: "INR",
    redirect_url: config.redirectUrl,
    cancel_url: config.cancelUrl,
    language: "EN",

    billing_name: addressData?.customer_address?.name || "",
    billing_address: addressData?.customer_address?.street || "",
    billing_city: addressData?.customer_address?.city || "",
    billing_state: addressData?.customer_address?.state || "",
    billing_zip: addressData?.customer_address?.pincode || "",
    billing_country: "India",
    billing_tel: addressData?.customer_address?.customer?.phone || "",
    billing_email: addressData?.customer_address?.email || "",

    delivery_name: addressData?.customer_address?.name || "",
    delivery_address: addressData?.customer_address?.street || "",
    delivery_city: addressData?.customer_address?.city || "",
    delivery_state: addressData?.customer_address?.state || "",
    delivery_zip: addressData?.customer_address?.pincode || "",
    delivery_country: "India",
    delivery_tel: addressData?.customer_address?.customer?.phone || "",

    merchant_param1: orderData.cartItems, // JSON string of items
    merchant_param2: orderData.promoCode || "",
    merchant_param3: addressData?.shipping_charge?.id || "",
    merchant_param4: orderData.userId || "",
    merchant_param5: "react-ecommerce-app",
  };

  return params;
};
