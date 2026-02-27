"use client";
import BorderRadius from "@/src/components/svg/BorderRadius";
import CartIcon from "@/src/components/svg/CartIcon";
import Logo from "@/src/components/svg/Logo";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Humburger from "@/src/components/svg/Humburger";
import { useCart } from "@/src/hooks/useCart";
import CloseButton from "@/src/components/svg/CloseButton";
import CartModal from "../_components/CartModal";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { totalNumberItems, openCart, closeCart, isCartOpen } = useCart();

  return (
    <>
      {isCartOpen === true && <CartModal />}
      {open && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setOpen(!open)}
              className="w-full h-screen fixed cursor-pointer backdrop-blur-lg lg:hidden z-[700]  bg-black "
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      <div className="lg:~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 lg:~top-[1rem]/[1.5rem] max-lg:w-full z-[2000]"
            >
              <div className="w-full flex  items-center relative">
                <BorderRadius className="text-white absolute ~size-[0.6428571343rem]/[1.125rem] ~left-[0.75rem]/[1.5rem] lg:left-0 z-30 max-lg:~bottom-[-0.6428571343rem]/[-1.125rem] lg:~top-[3.0025rem]/[5.25rem]" />
                <BorderRadius className="text-white absolute ~size-[0.6428571343rem]/[1.125rem] ~right-[0.745rem]/[1.5rem] max-lg:~bottom-[-0.6428571343rem]/[-1.125rem] lg:~left-[27rem]/[31rem] z-30 max-lg:rotate-90 lg:top-0" />

                <motion.div className="flex gap-[1rem] max-lg:justify-between items-center ~rounded-br-[0.5rem]/[1rem] max-lg:py-[1rem] py-[0.75rem] ~px-[0.75rem]/[1.5rem] max-lg:~px-[1rem]/[2rem] w-full lg:~w-[27rem]/[31rem] bg-white">
                  <Link href={"/"}>
                    <div className="flex items-center justify-center gap-[0.5rem]">
                      <Logo className="~w-[3rem]/[5.8555626869rem] shrink-0" />
                      <p className="font-bold leading-[120%] tracking-[-0.03em] lg:hidden text-main ~text-[0.75rem]/[0.875rem]">
                        Shree Kakaji Masale
                      </p>
                    </div>
                  </Link>
                  <div className="lg:flex hidden gap-[0.5rem] items-center font-inter font-medium text-[1rem] text-[#1A1A1A] leading-[1.3125rem] tracking-[-0.035em]">
                    <Link
                      href={"/shop"}
                      className={`px-[0.875rem] py-[0.5rem] leading-[100%] hover:bg-[#F8F5EE] hover:text-main hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/shop")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      Shop
                    </Link>
                    <Link
                      href={"/collections"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#F8F5EE] hover:text-main hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/collections")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      Collections
                    </Link>
                    <Link
                      href={"/about"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#F8F5EE] hover:text-main hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/about")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      About us
                    </Link>

                    <div></div>
                    <motion.div
                      onClick={() => {
                        openCart();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer"
                    >
                      {totalNumberItems > 0 && (
                        <div className="absolute right-[-0.3rem]  top-[-0.3rem] size-[0.875rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] font-bold flex justify-center items-center text-[10px] text-white rounded-full">
                          {totalNumberItems}{" "}
                        </div>
                      )}
                      <CartIcon className="shrink-0 m-[0.25rem] ~size-[1.125rem]/[1.5rem] " />
                    </motion.div>
                  </div>
                  <div className="flex items-center lg:hidden gap-[1rem]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        openCart();
                      }}
                      className="relative cursor-pointer"
                    >
                      {totalNumberItems > 0 && (
                        <div className="absolute right-[-0.3rem] top-[-0.3rem] size-[0.875rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] font-bold flex justify-center items-center text-[10px] text-white rounded-full">
                          {totalNumberItems}{" "}
                        </div>
                      )}
                      <CartIcon className="~size-[1.125rem]/[1.5rem] shrink-0" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Humburger
                        onClick={() => {
                          setOpen(!open);
                        }}
                        className="shrink-0 ~w-[1.25rem]/[1.5rem]"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed w-full top-0 lg:~top-[1rem]/[1.5rem] z-[2000]"
            >
              <div className="w-fit max-lg:w-full relative">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-[1rem] items-center max-lg:justify-between max-lg:shadow-sm  ~rounded-[0.5rem]/[1rem]  max-lg:py-[1rem] py-[0.75rem] ~px-[0.75rem]/[1.5rem] max-lg:~px-[1rem]/[2rem]  w-full lg:~w-[27rem]/[31rem] bg-white  "
                >
                  <Link href={"/"}>
                    <div className="flex items-center justify-center gap-[0.5rem]">
                      <Logo className="~w-[3rem]/[5.8555626869rem] shrink-0" />
                      <p className="font-bold leading-[120%] tracking-[-0.03em] lg:hidden text-main ~text-[0.75rem]/[0.875rem]">
                        Shree Kakaji Masale
                      </p>
                    </div>{" "}
                  </Link>
                  <div className="lg:flex hidden gap-[0.5rem] items-center font-inter font-medium text-[1rem] text-[#1A1A1A] leading-[1.3125rem] tracking-[-0.035em]">
                    <Link
                      href={"/shop"}
                      className={`px-[0.875rem] py-[0.5rem] leading-[100%] hover:bg-[#9A2923]/10 hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/shop")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      Shop
                    </Link>
                    <Link
                      href={"/collections"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#9A2923]/10 hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/collections")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      Collections
                    </Link>
                    <Link
                      href={"/about"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#9A2923]/10 hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/about")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      About us
                    </Link>

                    <div></div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        openCart();
                      }}
                      className="relative  cursor-pointer "
                    >
                      {totalNumberItems > 0 && (
                        <div className="absolute right-[-0.3rem] top-[-0.3rem] text-center min-w-[3ch] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] font-bold flex justify-center items-center text-[10px] text-white rounded-full">
                          {totalNumberItems}
                        </div>
                      )}
                      <CartIcon className="shrink-0 m-[0.25rem] ~size-[1.125rem]/[1.5rem] " />
                    </motion.div>
                  </div>
                  <div className="flex items-center lg:hidden gap-[1rem]">
                    <motion.div
                      onClick={() => {
                        openCart();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer"
                    >
                      {totalNumberItems > 0 && (
                        <div className="absolute right-[-0.3rem]  top-[-0.3rem] size-[0.875rem] bg-gradient-to-b from-[#EC5715] to-[#FF7E00] font-bold flex justify-center items-center text-[10px] text-white rounded-full">
                          {totalNumberItems}
                        </div>
                      )}
                      <CartIcon className="~size-[1.125rem]/[1.5rem]  shrink-0" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Humburger
                        onClick={() => {
                          setOpen(!open);
                        }}
                        className="shrink-0 ~w-[1.25rem]/[1.5rem]"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.8, 0.25, 1],
              }}
              data-lenis-prevent
              className="fixed  top-0 right-0 z-[99999] px-[1rem] py-[1.25rem] shadow-sm rounded-[1rem] w-full h-[50svh] bg-white overflow-y-auto no-scrollbar "
            >
              <div className="flex items-center justify-between">
                {" "}
                <Link href={"/"}>
                  <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center gap-[0.5rem]"
                  >
                    <Logo className="~w-[3rem]/[5.8555626869rem] shrink-0" />
                    <p className="font-bold leading-[120%] tracking-[-0.03em] lg:hidden text-main ~text-[0.5rem]/[0.875rem]">
                      Shree Kakaji Masale
                    </p>
                  </div>{" "}
                </Link>
                <CloseButton
                  className="size-[1.5rem]"
                  onClick={() => setOpen(!open)}
                />
              </div>
              <div className="pt-[2.25rem] space-y-[0.85rem]  ">
                <Link
                  onClick={() => setOpen(!open)}
                  href={"/shop"}
                  className={`~text-[0.875rem]/[1rem] flex ~pb-[0.25rem]/[0.5rem] leading-[155%] border-b border-b-[#00000033] w-full tracking-[-0.03em] text-[#1A1A1A] ${
                    isActive("/shop") ? "font-bold" : "font-medium"
                  }`}
                >
                  {" "}
                  Shop
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  href={"/collections"}
                  className={`~text-[0.875rem]/[1rem] flex leading-[155%] ~pb-[0.25rem]/[0.5rem] border-b border-b-[#00000033] w-full tracking-[-0.03em] text-[#1A1A1A] ${
                    isActive("/collections") ? "font-bold" : "font-medium"
                  }`}
                >
                  Collections
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  href={"/about"}
                  className={`~text-[0.875rem]/[1rem] flex leading-[155%] ~pb-[0.25rem]/[0.5rem] border-b border-b-[#00000033] w-full tracking-[-0.03em] text-[#1A1A1A] ${
                    isActive("/about") ? "font-bold" : "font-medium"
                  }`}
                >
                  {" "}
                  About Us
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  href={"/contact-us"}
                  className={`~text-[0.875rem]/[1rem] flex leading-[155%] ~pb-[0.25rem]/[0.5rem] border-b border-b-[#00000033] w-full tracking-[-0.03em] text-[#1A1A1A] ${
                    isActive("/contact-us") ? "font-bold" : "font-medium"
                  }`}
                >
                  {" "}
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
