import Image from "next/image";
import Footer from "./_layout/Footer";
import Header from "./_layout/Header";
import errorPng from "@public/images/404.png";
import Badge from "../components/Badge";
import Link from "next/link";
import Arrow from "../components/svg/Arrow";
export default function NotFound() {
  return (
    <>
      <Header />
      <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem] ">
        <div className="h-[93svh] rounded-[1rem] flex flex-col items-center justify-center bg-[#F8F5EE] ">
          <Image
            src={errorPng}
            className="~size-[12rem]/[16.25rem] shrink-0 object-cover"
            alt=""
          />
          <Badge title="404 error" />
          <div className="~pt-[1.75rem]/[1rem]">
            <h5 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              This page went missing!
            </h5>
          </div>

          <p className="~text-[0.875rem]/[1.125rem] ~pb-[0.75rem]/[1.875rem] ~pt-[0.5rem]/[0.6875rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
            Don’t worry, let’s go home.
          </p>

          <Link
            href={"/"}
            className="relative overflow-hidden rounded-full bg-main text-white p-[0.125rem] ~w-[8.1625rem]/[11rem] flex items-center justify-end ~text-[0.75rem]/[1rem] tracking-[-0.03em] leading-[120%] font-medium group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#EC5715] to-[#FF7E00] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
            <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
              Take me Home
            </span>
            <div className="relative z-10 ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem] flex justify-center items-center bg-white rounded-full transition-all duration-700 ease-in-out">
              <Arrow className="~size-[1rem]/[1.5rem] text-main absolute right-[0.5rem] transition-transform duration-700 ease-in-out group-hover:-rotate-45" />
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
