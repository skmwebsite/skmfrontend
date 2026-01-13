import Image from "next/image";
import React from "react";
import promise from "@public/images/promise.jpg";
import tradition from "@public/images/tradition.jpg";
import legacy from "@public/images/legacy.png";
import BorderRadius from "@/src/components/svg/BorderRadius";
import Since from "@/src/components/svg/Since";
import Expertise from "@/src/components/svg/Expertise";
import Today from "@/src/components/svg/Today";
import Arrow from "@/src/components/svg/Arrow";
import about1 from "@public/images/about-1.jpg";
import about2 from "@public/images/about-2.png";
import about3 from "@public/images/about-3.png";
import about4 from "@public/images/about-5.png";
import banner from "@public/images/banner-1.png";
import dot from "@public/svg/dots.svg";
import Logo from "@/src/components/svg/Logo";

const SecondSection = () => {
  return (
    <div className="~pt-[1.25rem]/[2.375rem]">
      <div className="flex md:flex-row flex-col  ~gap-[1rem]/[3.125rem]">
        <div className="md:w-[45%] w-full rounded-[1rem] overflow-hidden ~h-[18rem]/[38.2961425781rem] relative">
          <Image alt="" fill className="object-cover" src={tradition} />
        </div>
        <div className="md:w-[55%] flex justify-center items-center">
          <div>
            <h4 className="bg-gradient-to-b bg-clip-text text-transparent tracking-[-0.05em] font-medium ~text-[1.5rem]/[3rem]  leading-[120%]  from-[#EC5715] to-[#FF7E00]">
              The True Taste of Tradition{" "}
            </h4>
            <p className="~text-[0.75rem]/[2.25rem] text-[#000000BF] ~pt-[0.625rem]/[1.875rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
              Over five decades,{" "}
              <span className="text-main font-semibold">
                Shree Kakaji Masale
              </span>{" "}
              has delivered the authentic taste of Indian tradition from
              Malegaon, Nashik , trusted for our quality, honest flavors, and
              family-driven values.
            </p>
          </div>
        </div>
      </div>
      <div className="~pt-[2rem]/[5rem] ~mx-[0]/[2rem]">
        <div className="h-[1px] w-full bg-gradient-to-r from-[#9A2923] to-[#FFCC00]"></div>
        <div className="~pt-[2rem]/[5rem] flex flex-col items-center">
          <h4 className=" text-main tracking-[-0.05em] font-medium  text-center ~text-[1.5rem]/[3rem]  leading-[120%]  ">
            Who We Are{" "}
          </h4>
          <p className="~text-[0.75rem]/[2.25rem] text-center text-[#0000008F] ~pt-[0.625rem]/[1.875rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
            We specialize in{" "}
            <span className="font-semibold text-[#000000BF]">
              pure single spices, herbs, agro-products, and dehydrated
              vegetables,
            </span>{" "}
            sourced responsibly and processed with utmost hygiene. Our advanced
            facilities and traditional expertise ensure that every spice retains
            its natural color, aroma, and taste — just the way it should be.
          </p>
        </div>
        <div className="~pt-[1.875rem]/[7.5rem]">
          <h4 className=" text-main tracking-[-0.05em] font-medium  text-center ~text-[1.5rem]/[3rem]  leading-[120%]  ">
            Our Legacy & Our Journey{" "}
          </h4>
          <p className="text-[1rem] text-[#0000008F] pt-[1rem] text-center leading-[120%]">
            A five-decade journey shaped by authenticity, expertise, and a
            commitment to delivering unmatched spice quality
          </p>

          <div className="w-full relative ~mt-[1.5rem]/[3rem] flex justify-center items-center overflow-hidden  ~h-[25rem]/[32.1993751526rem]">
            <Image
              src={legacy}
              alt="image"
              fill
              className="object-cover ~rounded-[0.75rem]/[1rem]"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 ~pt-[1.5rem]/[3rem] ~gap-[1rem]/[3rem]">
          <div className="bg-[#FEF9F6]  ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
                <Since className="~size-[1rem]/[1.5rem]" />
              </div>{" "}
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                Since 1973
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                A trusted family-led brand known for pure, authentic Indian
                spices.{" "}
              </p>
            </div>
          </div>
          <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center  ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
                <Expertise className="~size-[1rem]/[1.5rem]" />
              </div>
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                5 Decades of Expertise
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                Handpicked sourcing, careful processing, and consistent quality
                in every pack.
              </p>
            </div>
          </div>
          <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full ">
                <Today className="~size-[1rem]/[1.5rem]" />
              </div>
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem]  left-0 text-white " />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem]  top-0 text-white " />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                Tradition to Today
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem]  tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                Evolving with modern needs while preserving the timeless taste
                our customers love..
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-[1rem] ~pt-[1.875rem]/[10rem] items-center">
          <h4 className=" text-main tracking-[-0.05em] font-medium shrink-0  ~text-[1.5rem]/[3rem]  leading-[120%]  ">
            Our Promise
          </h4>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#9A2923] to-[#FFCC00]"></div>
        </div>
        <div className="grid ~pt-[1.25rem]/[5rem]  lg:grid-cols-3 ~gap-[0.625rem]/[2.5rem]">
          <div className="px-[0.9375rem] bg-gradient-to-l text-white from-[#D66E3D] to-[#9A4A23] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2.25rem] leading-[120%] ">
              Our Belief
            </h4>
            <p className="~text-[0.75rem]/[1.125rem] max-md:font-medium text-center ~pt-[1.25rem]/[4rem] leading-[130%]">
              We believe that good food begins with good spices. Every blend we
              create is rooted in the idea that authentic flavor should come
              from pure ingredients, traditional methods, and uncompromising
              freshness. This belief guides every step we take — from selecting
              raw materials to delivering the final product to your kitchen.
            </p>
          </div>
          <div className="px-[0.9375rem] bg-gradient-to-r text-white from-[#EC5715] to-[#FF7E00] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2.25rem] leading-[120%] ">
              Our Standards
            </h4>
            <p className="~text-[0.75rem]/[1.125rem] max-md:font-medium text-center ~pt-[1.25rem]/[4rem] leading-[130%]">
              Quality is the backbone of Shree Kakaji Masale. We follow strict
              quality checks, advanced hygiene practices, and sustainable
              sourcing methods to ensure every spice maintains its natural
              color, aroma, and potency. Our processes are designed to preserve
              the authentic character of each ingredient while staying
              environmentally responsible.
            </p>
          </div>
          <div className="px-[0.9375rem] bg-gradient-to-r text-white from-[#A11300] to-[#C02611] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2.25rem] leading-[120%] ">
              Our Partnerships
            </h4>
            <p className="~text-[0.75rem]/[1.125rem] max-md:font-medium text-center ~pt-[1.25rem]/[4rem] leading-[130%]">
              We believe great spices start at the source. That’s why we
              maintain long-term, trust-based relationships with farmers and
              suppliers who share our values. These partnerships ensure ethical
              sourcing, consistent quality, and support for the communities that
              help bring our spices to life.
            </p>
          </div>
        </div>
        <div className="w-full relative ~mt-[1.25rem]/[7.5rem] flex  items-end md:items-center overflow-hidden  ~h-[25rem]/[32.1993751526rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-50">
            {" "}
          </div>{" "}
          <div className="relative flex py-[1.6875rem]  flex-col ~gap-[0.625rem]/[4.0625rem] ~px-[0.6875rem]/[1.5rem] z-[100]">
            <p className="~text-[1rem]/[3rem] leading-[120%] max-w-[25ch] z-20  text-main font-medium tracking-[-0.04em]">
              Bringing the True Taste of Indian Tradition Since 1973
            </p>
            <button
              className="
  relative overflow-hidden rounded-full
  bg-main text-white p-[0.125rem]
  ~w-[9.5625rem]/[13rem]
  flex items-center justify-end
  ~text-[0.75rem]/[1rem]
  tracking-[-0.03em]
  leading-[120%]
  font-medium
  group
"
            >
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />

              <span className="absolute z-10 ~left-[0.5rem]/[1rem]">
                Shop Fresh Masala
              </span>

              <div
                className="
    relative z-10
    ~w-[2rem]/[2.5rem] ~h-[2rem]/[2.5rem]
    flex justify-center items-center
    bg-white rounded-full
    transition-all duration-700 ease-in-out
  "
              >
                <Arrow
                  className="
      ~size-[1rem]/[1.5rem]
      text-main
      absolute right-[0.5rem]
      transition-transform duration-700 ease-in-out
      group-hover:-rotate-45
    "
                />
              </div>
            </button>
          </div>
          <Image
            src={promise}
            alt="image"
            fill
            className="object-cover ~rounded-[0.75rem]/[1rem]"
          />
          <div className="~size-[2.1875rem]/[4.375rem] ~rounded-tl-[0.75rem]/[1rem] flex justify-center items-center absolute bottom-0 right-0 bg-white z-50 ">
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute bottom-0 rotate-180 ~left-[-0.8125rem]/[-1.115rem] text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute right-[-1px] rotate-180 ~top-[-0.8125rem]/[-1.11rem] text-white " />
            <button className="~size-[1.5rem]/[3.125rem] relative group overflow-hidden flex justify-center items-center bg-[#F8F5EE] rounded-full ">
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />{" "}
              <Arrow className="~size-[1rem]/[1.25rem] text-main   transition-all group-hover:text-white duration-700 ease-in-out group-hover:rotate-0 -rotate-45" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="~pt-[1.25rem]/[5rem]
      grid md:grid-cols-2 lg:grid-cols-3 ~gap-[0.4375rem]/[1.5rem]"
      >
        <div className="~rounded-[1rem]/[1.79125rem] ~h-[9.375rem]/[19.625rem] relative overflow-hidden  bg-[#FFF5E7]">
          <Image
            src={about2}
            alt=""
            fill
            className="absolute inset-0 h-full object-cover w-full "
          />
        </div>
        <div className="~rounded-[1rem]/[1.79125rem] relative overflow-hidden ~h-[9.375rem]/[19.625rem]">
          <Image src={about1} alt="" fill className="object-cover" />
        </div>
        <div className="~rounded-[1rem]/[1.79125rem] hidden  col-span-2 lg:col-span-1 ~min-h-[9.375rem]/[19.625rem] ~pb-[1.5rem]/[4.125rem] md:flex items-end ~px-[1.375rem]/[1.75rem] relative overflow-hidden bg-gradient-to-r from-[#A11300] to-[#C02611]">
          <div className="relative z-30">
            <h4 className="text-[#FFF5E7] font-bold ~text-[1rem]/[2rem] leading-[120%] tracking-[-0.03em]">
              Pure Spices. <br /> Honest Quality.
            </h4>
            <p className="text-[0.75rem] pt-[0.625rem] max-w-[35ch] text-white tracking-[-0.02em] leading-[120%]">
              Handpicked ingredients and uncompromised standards in every batch.
            </p>
          </div>
          <Image
            src={banner}
            alt=""
            className="~h-[9.375rem]/[13.781908989rem] absolute  bottom-[0.75rem] md:right-0 lg:right-[-12rem] ~w-[20rem]/[24.8360519409rem] "
          />
        </div>
        <div className="col-span-2 ~min-h-[22.5rem]/[19.625rem] flex md:flex-row flex-col items-center overflow-hidden ~rounded-[1rem]/[1.79125rem] relative  bg-[#FFF5E7] ">
          <div className="~pl-[1.375rem]/[1.75rem] pt-[1.25rem]">
            <div>
              <div className="flex items-center gap-[0.5rem]">
                <Logo className="~w-[2.775427103rem]/[5.8555626869rem] shrink-0" />
                <p className="font-bold leading-[120%] tracking-[-0.03em] text-main ~text-[0.5rem]/[0.875rem]">
                  Shree Kakaji Masale
                </p>
              </div>
              <h3 className="~text-[1rem]/[2rem] ~pt-[1.875rem]/[2.6875rem] font-medium md:font-bold leading-[140%] tracking-[-0.02em] text-main">
                Freshly Customised Masale
              </h3>
              <p className="~text-[0.75rem]/[1.75rem] leading-[120%] pt-[0.5rem] max-md:font-medium tracking-[-0.02em]">
                Select spice intensity, texture, and ingredients, crafted to
                your preference.
              </p>
            </div>
          </div>{" "}
          <div className="~w-[15.05908203rem]/[26.3815917969rem] max-md:mt-[-3.5rem] md:~mr-[-5rem]/[-2rem]  shrink-0 relative h-full">
            {" "}
            <Image src={about4} alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="~rounded-[1rem]/[1.79125rem] relative col-span-2 lg:col-span-1 overflow-hidden max-lg:~h-[15.625rem]/[19.625rem]">
          <Image src={about3} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
