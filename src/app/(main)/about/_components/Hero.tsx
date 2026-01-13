import Image from "next/image";

import collection from "@public/images/about.png";
import Badge from "@/src/components/Badge";
const HeroSection = () => {
  return (
    <div>
      <div className=" w-full  overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[27.9375rem]/[29.0625rem] relative">
        <Image
          alt=""
          src={collection}
          className=" absolute md:~right-[0]/[-1.5rem] max-md:bottom-[-3rem] md:rotate-0 rotate-90 ~h-[13.7558279037rem]/[29.9045696259rem] w-auto"
        />
        <div className=" ~px-[0.84375rem]/[4rem] justify-center flex relative  flex-col items-center  z-50">
          <Badge title="About" />
          <div className="~pt-[1.75rem]/[1rem]">
            <h1 className=" font-medium leading-[110%] max-w-[25ch] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#666666]  ~text-[1.5rem]/[4rem]">
              Discover the Authentic Taste of{" "}
              <span className="bg-gradient-to-b bg-clip-text text-transparent  from-[#EC5715] to-[#FF7E00]">
                Tradition
              </span>{" "}
              with Shree Kakaji Masale{" "}
            </h1>
          </div>

          <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[2.3125rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
            Bringing India’s timeless flavors to your kitchen since 1973
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
