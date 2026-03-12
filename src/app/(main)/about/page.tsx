import React from "react";
import HeroSection from "./_components/Hero";
import SecondSection from "./_components/SecondSection";
import { metaTagsApi } from "@/src/api/meta-tags";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metaTagDTO = await metaTagsApi.getAboutUsTags();

  const seo = metaTagDTO;

  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: `/about`,
    },
    keywords: seo.meta_keywords,
  };
}
const page = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <HeroSection />
      <SecondSection />
    </div>
  );
};

export default page;
