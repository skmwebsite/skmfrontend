import { TCategories } from "@/src/api/type";
import Arrow from "@/src/components/svg/Arrow";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Image from "next/image";
import Link from "next/link";
type Props = {
  category: TCategories;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link href={`/shop#${category.slug}`} className="group">
      <div className="bg-cream cursor-pointer overflow-hidden  relative items-center flex w-full justify-center rounded-[1rem]">
        <div className="bg-main text-white ~text-[0.75rem]/[0.875rem] leading-[120%] tracking-[-0.03em] px-[1rem] py-[0.5rem] group-hover:opacity-100 opacity-0 transition-opacity ease-in-out duration-500 absolute bottom-0 left-0 rounded-tr-[1rem]">
          {category.products_count} Products
        </div>
        <div
          style={{ color: category.colour }}
          className={`absolute top-[10%] leading-[120%] tracking-[-0.05em] font-medium ~text-[1.5rem]/[3rem] `}
        >
          {category.name}
        </div>
        <div className="relative flex justify-center ~h-[16rem]/[18.8856258392rem] w-full">
          <Image
            src={category.image}
            className="object-contain group-hover:scale-105 duration-700 transition-all ease-in-out"
            fill
            alt={""}
          />
        </div>
        <div className="size-[3.2748651505rem] rounded-tl-[0.75rem] flex justify-center items-center bg-white absolute bottom-0 right-0">
          <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 bottom-0 left-[-0.842rem]" />
          <BorderRadius className="absolute size-[0.8421081305rem] rotate-180 text-white z-20 top-[-0.842rem] right-0" />
          <div className="size-[2.339189291rem] relative flex overflow-hidden justify-center items-center bg-cream rounded-full ">
            <span
              className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
            />

            <Arrow className="size-[1.25rem] group-hover:text-white text-main absolute right-[0.5rem] transition-all duration-700 ease-in-out  -rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
