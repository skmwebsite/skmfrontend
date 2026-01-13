import Image from "next/image";

import collection from "@public/images/shop-banner.png";
import Badge from "@/src/components/Badge";
const HeroSection = () => {
  return (
    <div className="~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <div className=" w-full  overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[27.9375rem]/[29.0625rem] relative">
        <Image
          alt=""
          src={collection}
          className=" absolute rotate-[-270deg] md:rotate-0 scale-x-[-1] right-0 max-md:~bottom-[-3rem]/[-20rem] h-auto w-full   md:h-[29.9045696259rem] md:w-auto"
        />
        <div className=" ~px-[0.84375rem]/[4rem] justify-center flex relative  flex-col items-center  z-50">
          <Badge title="Shop" />
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
            culinary creations.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
