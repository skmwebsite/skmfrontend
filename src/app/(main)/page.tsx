import React from "react";
import HeroSection from "../_components/HeroSection";
import PopularSection from "../_components/PopularSection";
import CollectionSection from "../_components/CollectionSection";
import DiscoverSection from "../_components/DiscoverSection";
import Testimonials from "../_components/Testimonials";
import { frontendApi } from "@/src/api/api";
import { THome } from "@/src/api/type";

export const dynamic = "force-dynamic";

const getHomePageApi = async (): Promise<THome | null> =>
  await frontendApi.getHomePage();

const page = async () => {
  const homePage = await getHomePageApi();
  const popularProduct = homePage?.popular_products ?? [];
  const categories = homePage?.categories ?? [];
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <HeroSection />
      <PopularSection popularProduct={popularProduct} />
      <CollectionSection categories={categories} />

      <DiscoverSection />
      <Testimonials />
    </div>
  );
};

export default page;
