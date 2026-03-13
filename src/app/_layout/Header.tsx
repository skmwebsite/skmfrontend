"use client";
import BorderRadius from "@/src/components/svg/BorderRadius";
import CartIcon from "@/src/components/svg/CartIcon";
import Logo from "@/src/components/svg/Logo";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Humburger from "@/src/components/svg/Humburger";
import { useCart } from "@/src/hooks/useCart";
import CloseButton from "@/src/components/svg/CloseButton";
import CartModal from "../_components/CartModal";
import { usePathname, useRouter } from "next/navigation";
import SearchIcon from "@/src/components/svg/SearchIcon";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { totalNumberItems, openCart, isCartOpen } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const SearchButton = ({ className }: { className?: string }) => (
    <button
      type="button"
      onClick={handleOpenSearch}
      className="m-[0.25rem]"
      aria-label="Open search"
    >
      <SearchIcon className={className} />
    </button>
  );

  return (
    <>
      {/* Search Dialog */}
      <Dialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        className="relative z-[99999]"
      >
        <DialogBackdrop
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />

        <div className="fixed inset-0 flex items-start justify-center pt-[20vh] px-4">
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            className="w-full max-w-[32rem] bg-white rounded-[1rem] shadow-2xl overflow-hidden"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-[0.75rem] px-[1.25rem] ~py-[0.625rem]/[1rem]"
            >
              <SearchIcon className="size-[1.25rem] shrink-0 text-[#1A1A1A]/50" />
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Product"
                className="flex-1 text-[1rem] font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 bg-transparent outline-none leading-[1.5] tracking-[-0.02em]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                  aria-label="Clear search"
                >
                  <CloseButton className="size-[1.125rem]" />
                </button>
              )}
            </form>
            {searchQuery.trim() && (
              <div className="border-t border-[#00000010] px-[1.25rem] py-[0.875rem]">
                <button
                  type="button"
                  onClick={handleSearchSubmit as any}
                  className="flex items-center gap-[0.5rem] text-[0.875rem] font-medium text-main hover:underline"
                >
                  <SearchIcon className="size-[0.875rem]" />
                  Search for &ldquo;{searchQuery}&rdquo;
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

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
                <BorderRadius className="text-white absolute ~size-[0.6428571343rem]/[1.125rem] ~right-[0.745rem]/[1.5rem] max-lg:~bottom-[-0.6428571343rem]/[-1.125rem] lg:~left-[27rem]/[33rem] z-30 max-lg:rotate-90 lg:top-0" />

                <motion.div className="flex gap-[1rem] max-lg:justify-between items-center ~rounded-br-[0.5rem]/[1rem] max-lg:py-[1rem] py-[0.75rem] ~px-[0.75rem]/[1.5rem] max-lg:~px-[1rem]/[2rem] w-full lg:~w-[27rem]/[33rem] bg-white">
                  <Link prefetch={false} href={"/"}>
                    <div className="flex items-center justify-center gap-[0.5rem]">
                      <Logo className="~w-[3rem]/[5.8555626869rem] shrink-0" />
                      <p className="font-bold leading-[120%] tracking-[-0.03em] lg:hidden text-main ~text-[0.75rem]/[0.875rem]">
                        Shree Kakaji Masale
                      </p>
                    </div>
                  </Link>
                  <div className="lg:flex hidden gap-[0.5rem] items-center font-inter font-medium text-[1rem] text-[#1A1A1A] leading-[1.3125rem] tracking-[-0.035em]">
                    <Link
                      prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
                      href={"/about"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#F8F5EE] hover:text-main hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/about")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      About us
                    </Link>

                    <SearchButton className="size-[22px]" />
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

                  <div className="flex items-center lg:hidden gap-[0.8rem]">
                    <SearchButton className="~size-[1.125rem]/[1.375rem]" />
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
                        className="shrink-0 mt-1 ~w-[1.25rem]/[1.5rem]"
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
                  className="flex gap-[1rem] items-center max-lg:justify-between max-lg:shadow-sm  ~rounded-[0.5rem]/[1rem]  max-lg:py-[1rem] py-[0.75rem] ~px-[0.75rem]/[1.5rem] max-lg:~px-[1rem]/[2rem]  w-full lg:~w-[27rem]/[33rem] bg-white  "
                >
                  <Link prefetch={false} href={"/"}>
                    <div className="flex items-center justify-center gap-[0.5rem]">
                      <Logo className="~w-[3rem]/[5.8555626869rem] shrink-0" />
                      <p className="font-bold leading-[120%] tracking-[-0.03em] lg:hidden text-main ~text-[0.75rem]/[0.875rem]">
                        Shree Kakaji Masale
                      </p>
                    </div>{" "}
                  </Link>
                  <div className="lg:flex hidden gap-[0.5rem] items-center font-inter font-medium text-[1rem] text-[#1A1A1A] leading-[1.3125rem] tracking-[-0.035em]">
                    <Link
                      prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
                      href={"/about"}
                      className={`px-[0.875rem] leading-[100%] py-[0.5rem] hover:bg-[#9A2923]/10 hover:rounded-[0.5rem] transition-all duration-300 ease-in-out ${
                        isActive("/about")
                          ? "font-bold text-main"
                          : "font-medium"
                      }`}
                    >
                      About us
                    </Link>

                    <SearchButton className="size-[22px]" />

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
                  <div className="flex items-center lg:hidden gap-[0.75rem]">
                    <SearchButton className="~size-[1.125rem]/[1.375rem]" />
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
                <Link prefetch={false} href={"/"}>
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
                  prefetch={false}
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
                  prefetch={false}
                  onClick={() => setOpen(!open)}
                  href={"/collections"}
                  className={`~text-[0.875rem]/[1rem] flex leading-[155%] ~pb-[0.25rem]/[0.5rem] border-b border-b-[#00000033] w-full tracking-[-0.03em] text-[#1A1A1A] ${
                    isActive("/collections") ? "font-bold" : "font-medium"
                  }`}
                >
                  Collections
                </Link>
                <Link
                  prefetch={false}
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
                  prefetch={false}
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
