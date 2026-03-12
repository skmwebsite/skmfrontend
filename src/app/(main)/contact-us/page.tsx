import React from "react";
import HeroSection from "./_components/Hero";
import { metaTagsApi } from "@/src/api/meta-tags";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metaTagDTO = await metaTagsApi.getContactUsTags();

  const seo = metaTagDTO;

  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: `/contact-us`,
    },
    keywords: seo.meta_keywords,
  };
}
const page = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <HeroSection />
    </div>
  );
};

export default page;
