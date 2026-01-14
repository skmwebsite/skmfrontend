import React from "react";
import discover from "@public/images/discover.png";
import Image from "next/image";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Arrow from "@/src/components/svg/Arrow";
import Discover from "@/src/components/svg/Discover";
import Refresh from "@/src/components/svg/Refresh";
import Sheild from "@/src/components/svg/Sheild";
const DiscoverSection = () => {
  return (
    <div className="~pt-[2rem]/[7.5rem]">
      <div className="flex flex-col items-center">
        <h4 className="text-main font-medium  ~px-[4rem]/[0rem] text-center ~text-[1rem]/[2.5rem] leading-[120%] tracking-[-0.05em]">
          Discover the Soul of Indian Spices
        </h4>
        <p className="~text-[0.75rem]/[1rem] md:flex hidden text-center ~mt-[0]/[0.3125rem] font-medium leading-[120%] tracking-[-0.03em] text-[#1A1A1ABF]">
          Showcase your most popular products, front and center.
        </p>
        <p className="~text-[0.75rem]/[1rem] md:hidden  text-center mt-[0.3125rem] font-medium leading-[120%] tracking-[-0.03em] text-[#1A1A1ABF]">
          Our time-tested process delivers unmatched quality.
        </p>
      </div>
      <div className="w-full group cursor-pointer relative ~mt-[1.5rem]/[3rem] flex justify-center items-center overflow-hidden  ~h-[25rem]/[32.1993751526rem]">
        <p className="~text-[1rem]/[3rem] leading-[120%] max-w-[30ch] z-20 text-center text-white font-medium tracking-[-0.04em]">
          Crafted with care for the perfect taste Experience the richness in
          every bite
        </p>
        <Image
          src={discover}
          alt="image"
          fill
          className="object-cover ~rounded-[0.75rem]/[1rem]"
        />
        <div className="~size-[3.2748651505rem]/[4.375rem] ~rounded-tl-[0.75rem]/[1rem] flex justify-center items-center absolute bottom-0 right-0 bg-white z-50 ">
          <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute bottom-[-1px] rotate-180 ~left-[-0.8125rem]/[-1.125rem] text-white " />
          <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute right-[-1px] rotate-180 ~top-[-0.80rem]/[-1.11rem] text-white " />
          <button className="~size-[2.339189291rem]/[3.125rem] relative  overflow-hidden flex justify-center items-center bg-[#F8F5EE] rounded-full ">
            <span
              className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
            />{" "}
            <Arrow className="size-[1.25rem] text-main   transition-all group-hover:text-white duration-700 ease-in-out  -rotate-45" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 ~pt-[1.5rem]/[3rem] ~gap-[1rem]/[3rem]">
        <div className="bg-cream  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Discover className="~size-[1rem]/[1.5rem]" />
            </div>{" "}
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[3.75rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Sourced Directly From Farms
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1.125rem]">
              We partner with local farmers to source the freshest spices.
            </p>
          </div>
        </div>
        <div className="bg-cream ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center  ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Refresh className="~size-[1rem]/[1.5rem]" />
            </div>
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[3.75rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Traditional Grinding Techniques
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1.125rem]">
              Our spices are ground using traditional methods, preserving their
              natural oils and flavors.
            </p>
          </div>
        </div>
        <div className="bg-cream ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Sheild className="~size-[1rem]/[1.5rem]" />
            </div>
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[3.75rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Stringent Quality Control
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1.125rem]">
              Each batch undergoes rigorous testing to ensure purity, potency,
              and consistent flavor.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;
