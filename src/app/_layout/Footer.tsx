import BorderRadius from "@/src/components/svg/BorderRadius";
import FaceBook from "@/src/components/svg/FaceBook";
import Instagram from "@/src/components/svg/Instagram";
import Logo from "@/src/components/svg/Logo";
import Whatsapp from "@/src/components/svg/Whatsapp";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-[2.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] mb-[1.5rem]">
      <div className="bg-[#F8F5EE] relative rounded-[1rem] ~pb-[1.875rem]/[1.5rem] ~px-[1.25rem]/[4rem] ~pt-[5rem]/[6.5rem]">
        <div
          className=" ~w-[11.9375rem]/[17.555622101rem] shrink-0 flex justify-center items-center bg-white absolute top-0
         left-0 rounded-br-[1rem] ~h-[3.25rem]/[4.75rem] "
        >
          <BorderRadius className="size-[1.125rem] absolute bottom-[-1.125rem]  left-0 text-white " />
          <BorderRadius className="size-[1.125rem] absolute right-[-1.12rem]  top-0 text-white " />

          <div className="flex items-center justify-center gap-[0.5rem]">
            <Logo className="~w-[2.775427103rem]/[5.8555626869rem] shrink-0" />
            <p className="font-bold leading-[120%] tracking-[-0.03em]  text-main ~text-[0.75rem]/[0.875rem]">
              Shree Kakaji Masale
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col ~gap-[1.25rem]/[2rem] justify-between">
          <div>
            <h4 className="font-medium tracking-[-0.05em] text-black ~text-[1rem]/[2.25rem]">
              Become a part of our spice-loving family!
            </h4>
            <div className="py-[0.5rem] ~px-[0.1875rem]/[0.5rem] ~mt-[1.25rem]/[1.5rem] bg-white md:w-fit flex md:flex-row flex-col gap-[0.5rem] items-center rounded-[1rem]">
              <p className="text-[#1A1A1ABF] px-[0.5rem] tracking-[-0.04em] font-medium ~text-[0.75rem]/[1rem]">
                Follow us on
              </p>
              <div className="flex items-center ~gap-[0.1875rem]/[0.5rem]">
                <Link
                  href={
                    "https://www.instagram.com/shreekakajimasale?igsh=MW00Y3lmNW83Y2dpbw%3D%3D&utm_source=qr"
                  }
                  target="_blank"
                  className="bg-main hover:bg-main/70 relative overflow-hidden group tracking-[-0.04em] font-medium ~text-[0.75rem]/[1rem] duration-500 transition-all ease-in-out ~py-[0.25rem]/[0.5rem] flex items-center gap-[0.25rem] rounded-full sm:rounded-[0.75rem] text-white ~px-[0.4rem]/[1rem]"
                >
                  <span
                    className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
                  />
                  <Instagram className="~size-[0.625rem]/[1rem] relative z-10 shrink-0" />
                  <span className="relative z-10"> Instagram</span>
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/ShreeKakajimasale?mibextid=wwXIfr&rdid=eENcqqijuRBHJbwE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AqykKHVZ1%2F%3Fmibextid%3DwwXIfr%26ref%3D1#"
                  }
                  target="_blank"
                  className="bg-main hover:bg-main/70 relative overflow-hidden group tracking-[-0.04em] font-medium ~text-[0.75rem]/[1rem] duration-500 transition-all ease-in-out ~py-[0.25rem]/[0.5rem] flex items-center gap-[0.25rem] rounded-full sm:rounded-[0.75rem] text-white ~px-[0.4rem]/[1rem]"
                >
                  <span
                    className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
                  />
                  <FaceBook className="~size-[0.625rem]/[1rem] relative z-10 shrink-0" />
                  <span className="relative z-10"> Facebook</span>
                </Link>
                <Link
                  href={"#"}
                  target="_blank"
                  className="bg-main hover:bg-main/70 relative overflow-hidden group tracking-[-0.04em] font-medium ~text-[0.75rem]/[1rem] duration-500 transition-all ease-in-out ~py-[0.25rem]/[0.5rem] flex items-center gap-[0.25rem] rounded-full sm:rounded-[0.75rem] text-white ~px-[0.4rem]/[1rem]"
                >
                  <span
                    className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
                  />
                  <Whatsapp className="~size-[0.625rem]/[1rem] relative z-10 shrink-0" />
                  <span className="relative z-10"> Whatsapp</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex  max-md:justify-between gap-[2rem]">
            <div className="flex flex-col gap-[1rem] ">
              <h4 className="font-semibold text-[1rem] leading-[120%] tracking-[-0.04em] text-black">
                Pages
              </h4>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/"
              >
                Home
              </Link>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/shop"
              >
                Shop
              </Link>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/collections"
              >
                Collections
              </Link>{" "}
            </div>
            <div className="flex flex-col gap-[1rem] ">
              <h4 className="font-semibold text-[1rem] leading-[120%] tracking-[-0.04em] text-black">
                Information
              </h4>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/terms-and-conditions"
              >
                Terms & Conditions
              </Link>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/privacy-and-policy"
              >
                Privacy policy
              </Link>
              <Link
                className="md:font-medium hover:text-black duration-700 ease-in-out transition-all hover:scale-[1.02] text-[#1A1A1ABF] ~text-[0.75rem]/[1rem] leading-[120%] tracking-[-0.04em]"
                href="/contact-us"
              >
                Contact us
              </Link>{" "}
            </div>
          </div>
        </div>

        <div className="~pt-[0rem]/[3rem] md:flex hidden">
          <p className="text-[#1A1A1ABF] ~text-[0.5rem]/[0.875rem] font-medium leading-[120%] tracking-[-0.03em]">
            Created by 
            <span>
              <Link
                className="text-black hover:underline underline-offset-2"
                href={"https://www.urbanhubinnovations.com"}
                target="_blank"
              >
                Urbanhub Innovations
              </Link>
            </span>{" "}
            © 2025
          </p>
        </div>
      </div>
      <div className="~pt-[0.625rem]/[3rem] justify-center flex md:hidden">
        <p className="text-[#1A1A1ABF] ~text-[0.5rem]/[0.875rem] font-medium leading-[120%] tracking-[-0.03em]">
          Created by 
          <span>
            <Link
              className="text-black hover:underline underline-offset-2"
              href={"https://www.urbanhubinnovations.com"}
              target="_blank"
            >
              Urbanhub Innovations
            </Link>
          </span>{" "}
          © 2025
        </p>
      </div>
    </div>
  );
};

export default Footer;
