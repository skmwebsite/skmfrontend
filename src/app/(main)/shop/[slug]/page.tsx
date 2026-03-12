import React from "react";
import Hero from "./_components/Hero";
import { frontendApi } from "@/src/api/api";
import SecondSection from "./_components/SecondSection";
import { TShopInner } from "@/src/api/type";
import { Metadata } from "next";
import { metaTagsApi } from "@/src/api/meta-tags";

export const dynamic = "force-dynamic";

const getShopInnerPageApi = async (
  slug: string,
): Promise<TShopInner | null> => {
  const response = await frontendApi.getShopInnerPage(slug);
  return response;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const metaTagDTO = await metaTagsApi.getShopInnerPageTags(slug);

  const seo = metaTagDTO;
  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: `/shop/${slug}`,
    },
    keywords: seo.meta_keywords,
  };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await getShopInnerPageApi(slug);
  const product_details = response?.product_details;
  const popular_products = response?.popular_products;
  return (
    <div className="~pt-[4rem]/[8rem] ">
      {product_details && <Hero product_details={product_details} />}{" "}
      <SecondSection popular_products={popular_products ?? []} />
    </div>
  );
};

export default page;
