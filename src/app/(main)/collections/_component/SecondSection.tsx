import { TCategories } from "@/src/api/type";
import CategoryCard from "@/src/app/_components/CategoryCard";
import Arrow from "@/src/components/svg/Arrow";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Image from "next/image";
import productsImage from "@public/images/banner-1.png";
import Link from "next/link";

type Props = {
  collections: TCategories[];
};

const SecondSection = ({ collections }: Props) => {
  const yadiCollection = collections.find((item) => item.type === 1);
  const otherCollections = collections.filter((item) => item.type !== 1);

  return (
    <div>
      {yadiCollection && (
        <div className="~pt-[2.125rem]/[5rem]">
          <Link
            href={`/shop#${yadiCollection.slug}`}
            className="md:bg-gradient-to-b group cursor-pointer ~px-[0.5rem]/[2.5rem] flex md:flex-row flex-col gap-[2rem] justify-between relative items-center pt-[7.4375rem] pb-[2.875rem] md:py-[0.625rem] rounded-[1rem] bg-[#FFF5E7] md:from-[#A11300] md:to-[#C02611]"
          >
            <h3 className="~text-[1.25rem]/[2.5rem] max-w-[28ch] text-transparent max-md:text-center bg-clip-text bg-gradient-to-b from-[#000000] to-[#666666] md:text-white font-medium leading-[120%] tracking-[-0.05em]">
              Customize Your Perfect Masala Blend with {yadiCollection.name}{" "}
              Customisation
            </h3>
            <div className="relative md:~mr-[3rem]/[5rem] shrink-0 ~w-[12.7312011719rem]/[28.25rem] ~h-[6.8393173218rem]/[15.6875rem]">
              <Image
                fill
                className="object-contain"
                src={productsImage}
                alt={yadiCollection.name}
              />
            </div>

            <div className="absolute size-[4.375rem] flex justify-center items-center max-md:rounded-bl-[1rem] md:rounded-tl-[1rem] max-md:top-0 md:bottom-0 right-0 bg-white">
              <BorderRadius className="absolute max-md:top-0 md:bottom-0 rotate-90 md:rotate-180 left-[-1.125rem] size-[1.125rem] text-white" />
              <BorderRadius className="absolute right-0 rotate-90 md:rotate-180 bottom-[-1.125rem] md:top-[-1.125rem] size-[1.125rem] text-white" />
              <button className="size-[3.125rem] overflow-hidden relative flex justify-center items-center bg-[#F8F5EE] rounded-full">
                <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                <Arrow className="size-[1.5rem] group-hover:text-white text-main transition-all duration-700 ease-in-out -rotate-45" />
              </button>
            </div>
          </Link>
        </div>
      )}

      <div className="grid ~pt-[1.25rem]/[2rem] ~gap-y-[1.25rem]/[2rem] ~gap-x-[1.25rem]/[3rem] md:grid-cols-2 lg:grid-cols-3">
        {otherCollections.map((item, i) => (
          <CategoryCard key={i} category={item} />
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
