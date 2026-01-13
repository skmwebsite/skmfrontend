import React from "react";
import HeroSection from "./_components/Hero";
import SecondSection from "./_components/SecondSection";

const page = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <HeroSection />
      <SecondSection />
    </div>
  );
};

export default page;
