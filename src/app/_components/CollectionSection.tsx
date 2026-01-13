import CategoryCard from "./CategoryCard";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Arrow from "@/src/components/svg/Arrow";
import Link from "next/link";
import { TCategories } from "@/src/api/type";

type Props = {
  categories: TCategories[];
};
const CollectionSection = ({ categories }: Props) => {
  return (
    <div className="~pt-[1.5625rem]/[5rem]">
      {" "}
      <div className="flex items-center gap-[1rem] justify-between">
        <div>
          <h3 className="~text-[1rem]/[1.5rem] font-medium text-main leading-[120%] tracking-[-0.03em]">
            Our Collections
          </h3>
          <p className="~text-[0.75rem]/[1rem] ~mt-[0]/[0.3125rem] font-medium leading-[120%] tracking-[-0.03em] text-[#1A1A1ABF]">
            Showcase all of the different collections you have to offer.{" "}
          </p>
        </div>
      </div>
      <div className="grid ~pt-[1.25rem]/[2rem] ~gap-y-[1.25rem]/[2rem] ~gap-x-[1.25rem]/[3rem] md:grid-cols-3">
        {categories.slice(0, 5).map((item, i) => (
          <CategoryCard key={i} category={item} />
        ))}{" "}
        <Link href={"/collections"} className="group min-h-[16.0625rem] h-full">
          <div className="bg-cream cursor-pointer h-full relative items-center flex w-full justify-center rounded-[0.75rem]">
            <div className="  leading-[120%] tracking-[-0.05em] text-main font-medium ~text-[1.5rem]/[3rem] ">
              View All
            </div>
            <div className="size-[3.2748651505rem] rounded-tl-[0.75rem] flex justify-center items-center bg-white absolute bottom-0 right-0">
              <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 bottom-0 left-[-0.842rem]" />
              <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 top-[-0.842rem] right-0" />
              <div className="size-[2.339189291rem] overflow-hidden relative flex justify-center items-center bg-cream rounded-full ">
                <span
                  className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
                />{" "}
                <Arrow className="size-[1.25rem] group-hover:text-white text-main absolute right-[0.5rem] transition-all duration-700 ease-in-out  -rotate-45" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CollectionSection;
