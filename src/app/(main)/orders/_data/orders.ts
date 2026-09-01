// View-model + display metadata for the order history page.
// Source of truth is GET /api/orders/history (see frontendApi.getOrderHistory).

import { StorageUrl } from "@/src/utils/BaseUrl";
import {
  TOrderHistory as TApiOrder,
  TOrderStatus,
  TPaymentStatus,
} from "@/src/api/type";

export type { TOrderStatus, TPaymentStatus };

export type TOrderItem = {
  id: number;
  product_id: number;
  name: string;
  image: string;
  variant: string;
  quantity: number;
  price: number;
  isCustomized?: boolean;
};

export type TOrderHistory = {
  id: number;
  order_id: string;
  placed_on: string;
  status: TOrderStatus;
  status_note: string;
  order_type: 1 | 2;
  payment_status: TPaymentStatus;
  payment_method: string;
  address: string;
  subtotal: number;
  tax: number;
  discount: number;
  delivery_fee: number;
  total: number;
  items: TOrderItem[];
};

export const ORDER_STATUS_META: Record<
  TOrderStatus,
  { label: string; badge: string; dot: string }
> = {
  Pending: {
    label: "Pending",
    badge: "bg-[#FFF8E7] text-[#C77700]",
    dot: "bg-[#C77700]",
  },
  Confirmed: {
    label: "Confirmed",
    badge: "bg-[#FFF3E8] text-[#EC5715]",
    dot: "bg-[#EC5715]",
  },
  Shipped: {
    label: "Out for Delivery",
    badge: "bg-[#FFF1E8] text-[#EC5715]",
    dot: "bg-[#EC5715]",
  },
  Delivered: {
    label: "Delivered",
    badge: "bg-[#EAF7EE] text-[#1E8E4E]",
    dot: "bg-[#1E8E4E]",
  },
  Cancelled: {
    label: "Cancelled",
    badge: "bg-[#FBEBEA] text-main",
    dot: "bg-main",
  },
  Unknown: {
    label: "Processing",
    badge: "bg-[#F1F1F1] text-[#1A1A1ABF]",
    dot: "bg-[#1A1A1ABF]",
  },
};

export const PAYMENT_STATUS_LABEL: Record<TPaymentStatus, string> = {
  "Not initiated": "Payment not initiated",
  Created: "Payment pending",
  Paid: "Paid",
  Failed: "Payment failed",
  Authorized: "Payment authorized",
};

// Order of the fulfilment tracker shown inside an expanded card.
export const ORDER_TRACKER: { key: TOrderStatus; label: string }[] = [
  { key: "Pending", label: "Order Placed" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Shipped", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
];

export const ORDER_FILTERS: { key: "all" | TOrderStatus; label: string }[] = [
  { key: "all", label: "All Orders" },
  { key: "Pending", label: "Pending" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Shipped", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

const VALID_STATUSES: TOrderStatus[] = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Unknown",
];

// The API contract documents order_status as a string enum, but the sample
// payload shows an integer. Accept both so neither shape breaks the page.
const NUMERIC_STATUS: TOrderStatus[] = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const NUMERIC_PAYMENT: TPaymentStatus[] = [
  "Not initiated",
  "Created",
  "Paid",
  "Failed",
  "Authorized",
];

export const normalizeStatus = (value: unknown): TOrderStatus => {
  if (typeof value === "number") return NUMERIC_STATUS[value] ?? "Unknown";
  if (typeof value === "string") {
    const match = VALID_STATUSES.find(
      (status) => status.toLowerCase() === value.toLowerCase(),
    );
    if (match) return match;
  }
  return "Unknown";
};

const normalizePaymentStatus = (value: unknown): TPaymentStatus => {
  if (typeof value === "number") return NUMERIC_PAYMENT[value] ?? "Created";
  if (typeof value === "string") {
    const match = NUMERIC_PAYMENT.find(
      (status) => status.toLowerCase() === value.toLowerCase(),
    );
    if (match) return match;
  }
  return "Created";
};

const toNumber = (value: string | number | null | undefined): number => {
  const parsed = typeof value === "number" ? value : parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const STATUS_NOTE: Record<TOrderStatus, string> = {
  Pending: "We have received your order and will confirm it shortly.",
  Confirmed: "We are preparing your order for dispatch.",
  Shipped: "Your order is on the way.",
  Delivered: "Your order has been delivered.",
  Cancelled: "This order was cancelled.",
  Unknown: "We are processing your order.",
};

// The API returns product_image as an absolute URL in the documented sample,
// but relative paths come back from the same storage bucket as the rest of
// the catalogue, so resolve those against StorageUrl.
const resolveImage = (image: string | null | undefined): string => {
  if (!image) return "/images/sample.png";
  if (/^https?:\/\//i.test(image)) return image;
  return `${StorageUrl}${image.replace(/^\/+/, "")}`;
};

const formatAddress = (address: TApiOrder["delivery_address"]): string => {
  if (!address) return "";
  return [
    address.name,
    address.street,
    address.city,
    address.state,
    address.pincode ? `- ${address.pincode}` : "",
  ]
    .filter(Boolean)
    .join(", ")
    .replace(", -", " -");
};

/** Maps one API order onto the shape the cards render. */
export const mapOrder = (order: TApiOrder): TOrderHistory => {
  const status = normalizeStatus(order.order_status);
  const paymentStatus = normalizePaymentStatus(order.payment_status);

  return {
    id: order.id,
    order_id: order.order_id,
    placed_on: formatDate(order.order_date ?? order.created_at),
    status,
    status_note: STATUS_NOTE[status],
    order_type: order.order_type === 2 ? 2 : 1,
    payment_status: paymentStatus,
    payment_method: PAYMENT_STATUS_LABEL[paymentStatus],
    address: formatAddress(order.delivery_address),
    subtotal: toNumber(order.gross_price),
    tax: toNumber(order.tax),
    discount: toNumber(order.promo_discount),
    delivery_fee: toNumber(order.shipping_charge),
    total: toNumber(order.total_price),
    items: (order.items ?? []).map((item) => ({
      id: item.id,
      product_id: item.product_id,
      name: item.product_name,
      image: resolveImage(item.product_image),
      variant: item.variant
        ? `${item.variant.name} ${item.variant.unit}`.trim()
        : "",
      quantity: item.quantity,
      price: toNumber(item.line_total),
      // product_type 2 marks a customised Yadi blend.
      isCustomized: item.product_type === 2,
    })),
  };
};
