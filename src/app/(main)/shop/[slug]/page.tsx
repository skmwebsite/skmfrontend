import React from "react";
import Hero from "./_components/Hero";
import { frontendApi } from "@/src/api/api";
import SecondSection from "./_components/SecondSection";
import { TShopInner } from "@/src/api/type";

export const dynamic = "force-dynamic";

const getShopInnerPageApi = async (
  slug: string
): Promise<TShopInner | null> => {
  const response = await frontendApi.getShopInnerPage(slug);
  return response;
};

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
