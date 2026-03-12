import React from "react";
import HeroSection from "./_components/Hero";
import SecondSection from "./_components/SecondSection";
import { frontendApi } from "@/src/api/api";
import { TShop } from "@/src/api/type";
import { Metadata } from "next";
import { metaTagsApi } from "@/src/api/meta-tags";

export const dynamic = "force-dynamic";

const getShopPageApi = async (): Promise<TShop[] | null> =>
  await frontendApi.getShopPage();

export async function generateMetadata(): Promise<Metadata> {
  const metaTagDTO = await metaTagsApi.getShopTags();

  const seo = metaTagDTO;

  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: `/shop`,
    },
    keywords: seo.meta_keywords,
  };
}

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
