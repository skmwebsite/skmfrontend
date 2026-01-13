import React from "react";
import Hero from "./_component/Hero";
import SecondSection from "./_component/SecondSection";
import { frontendApi } from "@/src/api/api";
import { TCategories } from "@/src/api/type";

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
