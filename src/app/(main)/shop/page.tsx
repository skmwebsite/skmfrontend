import React from "react";
import HeroSection from "./_components/Hero";
import SecondSection from "./_components/SecondSection";
import { frontendApi } from "@/src/api/api";
import { TShop } from "@/src/api/type";

export const dynamic = "force-dynamic";

const getShopPageApi = async (): Promise<TShop[] | null> =>
  await frontendApi.getShopPage();

const page = async () => {
  const collections = await getShopPageApi();
  return (
    <div className="~pt-[1rem]/[1.5rem] ">
      <HeroSection />
      <SecondSection menuitems={collections ?? []} />
    </div>
  );
};

export default page;
