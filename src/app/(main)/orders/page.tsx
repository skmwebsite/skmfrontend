import { Metadata } from "next";
import HeroSection from "./_components/Hero";
import OrdersList from "./_components/OrdersList";

export const metadata: Metadata = {
  title: "My Orders | Shree Kakaji Masale",
  description:
    "Track your orders, view past purchases and reorder your favourite Shree Kakaji Masale products.",
  alternates: {
    canonical: "/orders",
  },
};

const page = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem]">
      <HeroSection />
      <OrdersList />
    </div>
  );
};

export default page;
