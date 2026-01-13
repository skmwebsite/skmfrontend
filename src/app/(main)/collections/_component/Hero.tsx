import Image from "next/image";

import collection from "@public/images/collection.png";
import Badge from "@/src/components/Badge";
const HeroSection = () => {
  return (
    <div>
      <div className=" w-full  overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[23.9375rem]/[29.0625rem] relative">
        <Image
          alt=""
          src={collection}
          className="~h-[10.2718200684rem]/[21.7306976318rem] absolute right-0 ~bottom-[0]/[6.6rem] ~w-[8.4808349609rem]/[17.9417533875rem]"
        />
        <div className=" ~px-[0.84375rem]/[4rem] justify-center flex relative  flex-col items-center  z-50">
          <Badge title="Collections" />
          <div className="~pt-[1.75rem]/[1rem]">
            <h1 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              Discover Our Unique
            </h1>
            <h1 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              Spice Blends Here
            </h1>
          </div>

          <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[2.3125rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
            Explore our wide selection of spices and seasonings to elevate your
            culinary creations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
