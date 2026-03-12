import React from "react";
import Hero from "./_component/Hero";
import SecondSection from "./_component/SecondSection";
import { frontendApi } from "@/src/api/api";
import { TCategories } from "@/src/api/type";
import { Metadata } from "next";
import { metaTagsApi } from "@/src/api/meta-tags";
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const metaTagDTO = await metaTagsApi.getCategoriesTags();

  const seo = metaTagDTO;

  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: `/collections`,
    },
    keywords: seo.meta_keywords,
  };
}

const getCollectionPageApi = async (): Promise<TCategories[] | null> =>
  await frontendApi.getCollectionPage();

const page = async () => {
  const collections = await getCollectionPageApi();

  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <Hero />
      <SecondSection collections={collections ?? []} />
    </div>
  );
};

export default page;
