"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import productsImage from "@public/images/banner-1.png";
import Image from "next/image";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Arrow from "@/src/components/svg/Arrow";
import { TProduct } from "@/src/api/type";

type Props = {
  popularProduct: TProduct[];
};
const PopularSection = ({ popularProduct }: Props) => {
  return (
    <div className="~pt-[1.875rem]/[2.5rem]">
      <div className="flex items-center gap-[1rem]  justify-between">
        <div>
          <h3 className="~text-[1rem]/[1.5rem] font-medium text-main leading-[120%] tracking-[-0.03em]">
            Most Popular
          </h3>
          <p className="~text-[0.75rem]/[1rem] ~mt-[0]/[0.3125rem] font-medium leading-[120%] tracking-[-0.03em] text-[#1A1A1ABF]">
            Showcase your most popular products, front and center.
          </p>
        </div>
        <Link
          className="~text-[0.75rem]/[1rem] md:flex hidden font-medium leading-[120%] tracking-[-0.03em] hover:text-main hover:bg-[#F8F5EE] text-[#1A1A1A] px-[0.875rem] py-[0.5rem] hover:rounded-[0.5rem] transition-all duration-300 ease-in-out"
          href={"/shop"}
        >
          View All
        </Link>
      </div>

      <div className=" ~gap-[1rem]/[3rem] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ~pt-[1.875rem]/[2rem] ">
        {popularProduct.map((item) => (
          <ProductCard section={item.category_name} key={item.id} item={item} />
        ))}
      </div>

      <div className="~pt-[2.125rem]/[7.625rem]">
        <Link
          href={"/shop#yadi"}
          className="md:bg-gradient-to-b group cursor-pointer ~px-[0.5rem]/[2.5rem]  flex md:flex-row flex-col gap-[2rem] justify-between relative items-center pt-[7.4375rem] pb-[2.875rem]  md:py-[0.625rem] rounded-[1rem] bg-[#FFF5E7] md:from-[#A11300] md:to-[#C02611]"
        >
          <h3 className="~text-[1.25rem]/[2.5rem] max-w-[28ch] text-transparent max-md:text-center bg-clip-text bg-gradient-to-b from-[#000000] to-[#666666] md:text-white  font-medium leading-[120%] tracking-[-0.05em]">
            Customize Your Perfect Masala Blend with Yadi Customisation{" "}
          </h3>
          <div className="relative md:~mr-[3rem]/[5rem] shrink-0 ~w-[12.7312011719rem]/[28.25rem] ~h-[6.8393173218rem]/[15.6875rem]">
            {" "}
            <Image
              fill
              className="object-contain"
              src={productsImage}
              alt="products"
            />
          </div>

          <div className="absolute size-[4.375rem] flex justify-center items-center max-md:rounded-bl-[1rem] md:rounded-tl-[1rem] max-md:top-0 md:bottom-0 right-0 bg-white">
            <BorderRadius className="absolute max-md:top-0 md:bottom-0 rotate-90 md:rotate-180 left-[-1.125rem] size-[1.125rem] text-white" />
            <BorderRadius className="absolute right-0 rotate-90 md:rotate-180 bottom-[-1.125rem] md:top-[-1.125rem] size-[1.125rem] text-white" />
            <button className="size-[3.125rem]  overflow-hidden relative flex justify-center items-center bg-[#F8F5EE] rounded-full ">
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />{" "}
              <Arrow className="size-[1.5rem] group-hover:text-white text-main  transition-all duration-700 ease-in-out  -rotate-45" />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopularSection;
