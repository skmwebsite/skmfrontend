import Image from "next/image";

import banner from "@public/assets/shop-banner.png";
import Badge from "@/src/components/Badge";

const HeroSection = () => {
  return (
    <div className="~px-[0.75rem]/[1.5rem] 2xl:~px-[-10.75rem]/[15rem]">
      <div className="w-full overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[15rem]/[20rem] relative">
        <Image
          alt=""
          src={banner}
          className="absolute rotate-180 max-md:rotate-[-90deg] scale-x-[-1] right-0 max-md:~bottom-[-9rem]/[-100rem] h-auto w-full md:h-[29.9045696259rem] md:w-auto"
        />
        <div className="~px-[0.84375rem]/[4rem] justify-center flex relative flex-col items-center z-50">
          <Badge title="My Account" />
          <div className="~pt-[1rem]/[1rem]">
            <h1 className="font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent from-[#000000] to-[#66666697] ~text-[1.5rem]/[3.25rem]">
              Your Order History
            </h1>
          </div>

          <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[1.25rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
            Track your orders, revisit past purchases and reorder your
            favourites in a tap.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
