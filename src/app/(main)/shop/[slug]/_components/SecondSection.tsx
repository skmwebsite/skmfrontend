import { TProduct } from "@/src/api/type";
import ProductCard from "@/src/app/_components/ProductCard";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Carft from "@/src/components/svg/Carft";
import Natural from "@/src/components/svg/Natural";
import Star from "@/src/components/svg/Star";
import Usage from "@/src/components/svg/Usage";
import Link from "next/link";
import React from "react";
type Props = {
  popular_products: TProduct[];
};

const SecondSection = ({ popular_products }: Props) => {
  return (
    <div>
      <div className="~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] grid xl:grid-cols-4 md:grid-cols-2 ~pt-[1.5rem]/[3rem] ~gap-[1rem]/[3rem]">
        <div className="bg-cream  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Star className="~size-[1rem]/[1.5rem]" />
            </div>{" "}
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[2.8rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Authentic Flavor
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem]  tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
              Enjoy the rich, traditional taste that enhances any dish with a
              unique blend of spices.
            </p>
          </div>
        </div>
        <div className="bg-cream  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Usage className="~size-[1rem]/[1.5rem]" />
            </div>{" "}
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[2.8rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Versatile Usage
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem]  tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
              Perfect for curries, marinades, or even as a seasoning for snacks,
              making it a kitchen essential.
            </p>
          </div>
        </div>
        <div className="bg-cream  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Natural className="~size-[1rem]/[1.5rem]" />
            </div>{" "}
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[2.8rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Natural Ingredients
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem]  tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
              Made from 100% organic spices, ensuring a healthy choice without
              artificial additives.
            </p>
          </div>
        </div>
        <div className="bg-cream  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
          <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
            <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
              <Carft className="~size-[1rem]/[1.5rem]" />
            </div>{" "}
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
          </div>
          <div className="~pt-[2.25rem]/[2.8rem]">
            <h4 className="~text-[1rem]/[1.5rem] font-medium tracking-[-0.03em] leading-[120%]">
              Expertly Crafted
            </h4>
            <p className="text-[#1A1A1ABF] pt-[0.5rem]  tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
              Created by skilled artisans who have perfected the art of spice
              blending over generations.
            </p>
          </div>
        </div>
      </div>
      <div className="~pt-[1.875rem]/[5rem] ~pb-[1.875rem]/[2.5rem]">
        <div className="flex items-center ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] gap-[1rem] justify-between">
          <div>
            <h3 className="~text-[1rem]/[1.5rem] font-medium text-black leading-[120%] tracking-[-0.03em]">
              Explore More
            </h3>
            <p className="~text-[0.75rem]/[1rem] ~mt-[0]/[0.3125rem]  leading-[120%] tracking-[-0.03em] text-[#0000008F]">
              Showcase your most popular products, front and center.
            </p>
          </div>
          <Link
            className="~text-[0.75rem]/[1rem] md:flex hidden font-medium leading-[120%] tracking-[-0.03em] hover:bg-main/10 text-[#1A1A1A] px-[0.875rem] py-[0.5rem] hover:rounded-full transition-all duration-300 ease-in-out"
            href={"/shop"}
          >
            View All
          </Link>
        </div>

        <div className="~px-[0.75rem]/[1.5rem] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ~gap-[1rem]/[3rem]  2xl:~px-[-10.75rem]/[15rem] ~pt-[1.875rem]/[2rem] ">
          {popular_products?.map((item) => (
            <ProductCard
              section={item.category_name}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
