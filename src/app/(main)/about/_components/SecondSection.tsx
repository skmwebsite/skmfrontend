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
      {/* ── SECTION 1: Origin Story ── */}
      <div className="flex md:flex-row flex-col ~gap-[1rem]/[3.125rem]">
        <div className="md:w-[45%] w-full rounded-[1rem] overflow-hidden ~h-[18rem]/[38.2961425781rem] relative">
          <Image alt="" fill className="object-cover" src={tradition} />
        </div>
        <div className="md:w-[55%] flex justify-center items-center">
          <div>
            <h4 className="bg-gradient-to-b bg-clip-text text-transparent tracking-[-0.05em] font-medium ~text-[1.5rem]/[2.25rem] leading-[120%] from-[#EC5715] to-[#FF7E00]">
              Before It Became a Brand, It Was a Man People Called Kakaji
            </h4>
            <p className="~text-[0.75rem]/[1.75rem] text-[#000000BF] ~pt-[0.625rem]/[1.875rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
              In 1973, in the small town of{" "}
              <span className="text-main font-semibold">
                Malegaon, Maharashtra,
              </span>{" "}
              a man named{" "}
              <span className="text-main font-semibold">
                Mr. Sureshchandra Mansang Shah
              </span>{" "}
              began roasting spices in his home kitchen. Around the town,
              everyone knew him by a name that carried warmth and familiarity —{" "}
              <span className="text-main font-semibold">"Kakaji."</span>
            </p>
            <p className="~text-[0.75rem]/[1.75rem] text-[#000000BF] ~pt-[0.375rem]/[1rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
              People trusted his judgement, his honesty, and the way he cared
              about the small things that others often overlooked. One of those
              small things was{" "}
              <span className="text-main font-semibold">aroma</span>. Kakaji
              believed that the soul of good food lies in its fragrance — when
              spices are roasted correctly, ground properly, and blended with
              care, the aroma that rises from the kitchen tells you everything
              about the meal before the first bite is taken.
            </p>
            <p className="~text-[0.75rem]/[1.75rem] text-[#000000BF] ~pt-[0.375rem]/[1rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
              This belief became the beginning of what is today known as{" "}
              <span className="text-main font-semibold">
                Shrikakaji Masala.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="~pt-[2rem]/[5rem] ~mx-[0]/[2rem]">
        <div className="h-[1px] w-full bg-gradient-to-r from-[#9A2923] to-[#FFCC00]"></div>

        {/* ── SECTION 2: Who We Are + The Name ── */}
        <div className="~pt-[2rem]/[4rem] flex flex-col items-center">
          <h4 className="text-main tracking-[-0.05em] font-medium text-center ~text-[1.5rem]/[2.25rem]  leading-[120%]">
            Who We Are
          </h4>
          <p className="~text-[0.75rem]/[1.75rem] text-center text-[#0000008F] ~pt-[0.625rem]/[1.875rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
            The name{" "}
            <span className="font-semibold text-[#000000BF]">
              Shrikakaji Masala carries more than branding — it carries a memory
              and a legacy.
            </span>{" "}
            The brand is named after our Nana (grandfather) — the same man
            everyone called Kakaji. In our community, Kakaji was known for his
            warmth, wisdom, and the trust he built with people around him.
            Naming the brand after him is our way of honouring the values he
            lived by:{" "}
            <span className="font-semibold text-[#000000BF]">
              Trust. Honesty. Authenticity.
            </span>
          </p>
          <p className="~text-[0.75rem]/[1.75rem] text-center text-[#0000008F] ~pt-[0.375rem]/[1rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
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

        {/* ── SECTION 3: The First Batch — text + image layout ── */}
        <div className="~pt-[1.875rem]/[5rem] flex md:flex-row flex-col ~gap-[1rem]/[3.125rem]">
          <div className="flex justify-center items-center">
            <div>
              <h4 className="text-main text-center tracking-[-0.05em] font-medium ~text-[1.5rem]/[2.25rem] leading-[120%]">
                A Kitchen, A Roasting Pan, and the First Batch of Kala Masala
              </h4>
              <p className="~text-[0.75rem]/[1.75rem] text-center  text-[#000000BF] ~pt-[0.625rem]/[1.875rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
                The first batches of masala were made exactly the way
                traditional households prepared them. Spices were{" "}
                <span className="text-main font-semibold">
                  hand-roasted, hand-ground, and packed into small packets.
                </span>{" "}
                Kakaji personally delivered them to people's homes. Word
                travelled quietly through neighbourhoods — if you wanted masala
                that smelled real when cooking and tasted rich in the plate, you
                went to Kakaji.
              </p>
              <p className="~text-[0.75rem]/[1.75rem] text-[#000000BF] text-center ~pt-[0.375rem]/[1rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
                The very first blend he created was{" "}
                <span className="text-main font-semibold">
                  Maharashtrian Kala Masala
                </span>{" "}
                — a deeply aromatic spice mix used in traditional village-style
                gravies across Maharashtra. Demand slowly grew. What began in a
                home kitchen soon needed helping hands. Kakaji started hiring a
                few people to assist, and eventually invested in his first
                grinding machine — marking the beginning of a larger journey.
              </p>
              <p className="~text-[0.75rem]/[1.75rem] text-[#000000BF] text-center ~pt-[0.375rem]/[1rem] font-medium md:font-normal leading-[130%] tracking-[-0.02em]">
                But Kakaji never stopped learning. Fascinated by machinery and
                spice processing, he travelled across{" "}
                <span className="text-main font-semibold">
                  Gujarat, South India,
                </span>{" "}
                and other regions to understand different grinding techniques.
                His goal was simple but uncompromising: preserve the natural
                aroma and flavour of the spices as much as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="~pt-[1.875rem]/[5rem]">
          <h4 className="text-main tracking-[-0.05em] font-medium text-center ~text-[1.5rem]/[2.25rem] leading-[120%]">
            Our Legacy & Our Journey
          </h4>
          <p className="text-[1rem] text-[#0000008F] pt-[1rem] text-center leading-[120%]">
            A five-decade journey shaped by authenticity, expertise, and a
            commitment to delivering unmatched spice quality
          </p>
          <div className="w-full relative ~mt-[1.5rem]/[3rem] flex justify-center items-center overflow-hidden ~h-[25rem]/[32.1993751526rem]">
            <Image
              src={legacy}
              alt="image"
              fill
              className="object-cover ~rounded-[0.75rem]/[1rem]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 ~pt-[1.5rem]/[3rem] ~gap-[1rem]/[3rem]">
          <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full">
                <Since className="~size-[1rem]/[1.5rem]" />
              </div>
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem] left-0 text-white" />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem] top-0 text-white" />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                Since 1973
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                Started in a home kitchen in Malegaon — the first blend was
                Maharashtrian Kala Masala, hand-roasted, hand-ground, and
                personally delivered by Kakaji to people's homes.
              </p>
            </div>
          </div>
          <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full">
                <Expertise className="~size-[1rem]/[1.5rem]" />
              </div>
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem] left-0 text-white" />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem] top-0 text-white" />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                5 Decades of Expertise
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem] font-medium tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                Kakaji travelled across Gujarat, South India, and beyond to
                master grinding techniques — always focused on preserving
                natural aroma and flavour. No artificial colours, preservatives,
                or chemicals. Ever.
              </p>
            </div>
          </div>
          <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] relative ~p-[1.875rem]/[2rem]">
            <div className="~size-[2.1875rem]/[4.375rem] flex justify-center items-center ~rounded-br-[0.75rem]/[1rem] bg-white absolute left-0 top-0">
              <div className="~size-[1.5rem]/[3.125rem] relative flex justify-center items-center bg-gradient-to-r from-[#EC5715] to-[#FF7E00] rounded-full">
                <Today className="~size-[1rem]/[1.5rem]" />
              </div>
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~bottom-[-0.8125rem]/[-1.125rem] left-0 text-white" />
              <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute ~right-[-0.8125rem]/[-1.11rem] top-0 text-white" />
            </div>
            <div className="~pt-[2.25rem]/[3.75rem]">
              <h4 className="~text-[1rem]/[1.375rem] font-medium tracking-[-0.03em] leading-[120%]">
                Tradition to Today
              </h4>
              <p className="text-[#1A1A1ABF] pt-[0.5rem] tracking-[-0.04em] leading-[120%] ~text-[0.75rem]/[1rem]">
                From Tier-2 town home cooks to metro kitchens across India — now
                reaching modern homes online while keeping the same honest
                process and traditional taste intact.
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 5: Sourcing — 2 col text block ── */}
        <div className="~pt-[1.875rem]/[5rem]">
          <div className="flex md:flex-row flex-col gap-[1rem] items-center ~pb-[1.25rem]/[3rem]">
            <h4 className="text-main tracking-[-0.05em] md:shrink-0 max-md:text-center font-medium ~text-[1.5rem]/[2.25rem] leading-[120%]">
              Sourced From Where Nature Does It Best
            </h4>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#9A2923] to-[#FFCC00]"></div>
          </div>
          <div className="grid md:grid-cols-2 ~gap-[1rem]/[3rem]">
            <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem]">
              <div className="w-fit ~mb-[0.75rem]/[1.5rem] ~px-[0.75rem]/[1.25rem] ~py-[0.375rem]/[0.625rem] rounded-full bg-gradient-to-r from-[#EC5715] to-[#FF7E00]">
                <p className="text-white font-semibold ~text-[0.625rem]/[0.875rem] tracking-[-0.02em]">
                  South India
                </p>
              </div>
              <h5 className="~text-[0.875rem]/[1.25rem] font-medium tracking-[-0.03em] leading-[120%] text-main">
                Depth of Flavour
              </h5>
              <p className="text-[#1A1A1ABF] ~pt-[0.5rem]/[1rem] tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
                Certain spices are sourced from South India, known for their
                exceptional depth of flavour and rich aromatic profiles that
                have been cultivated for generations.
              </p>
            </div>
            <div className="bg-[#FEF9F6] ~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem]">
              <div className="w-fit ~mb-[0.75rem]/[1.5rem] ~px-[0.75rem]/[1.25rem] ~py-[0.375rem]/[0.625rem] rounded-full bg-gradient-to-r from-[#9A2923] to-[#EC5715]">
                <p className="text-white font-semibold ~text-[0.625rem]/[0.875rem] tracking-[-0.02em]">
                  Northern Regions
                </p>
              </div>
              <h5 className="~text-[0.875rem]/[1.25rem] font-medium tracking-[-0.03em] leading-[120%] text-main">
                Stronger Aroma
              </h5>
              <p className="text-[#1A1A1ABF] ~pt-[0.5rem]/[1rem] tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
                Others come from Northern regions where they naturally develop
                stronger, more pronounced aromas. Over decades, we have built
                long-term partnerships with trusted suppliers who understand our
                commitment to authenticity.
              </p>
            </div>
          </div>
          <div className="~mt-[1rem]/[2rem] bg-gradient-to-r from-[#FEF9F6] to-[#FFF5E7] ~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem]">
            <p className="text-[#000000BF] ~text-[0.75rem]/[1.125rem] leading-[140%] tracking-[-0.02em] text-center font-medium md:font-normal">
              Every ingredient is carefully selected and handpicked before it
              enters our production process. All Shrikakaji Masala products are{" "}
              <span className="text-main font-semibold">FSSAI compliant</span>{" "}
              and undergo regular quality checks. Production is carried out in{" "}
              <span className="text-main font-semibold">small batches,</span>{" "}
              allowing us to maintain freshness and consistency in aroma and
              taste. This approach may not be the fastest way to produce spices
              — but it is the right way.
            </p>
          </div>
        </div>

        {/* ── SECTION 6: Village Kitchens to Modern Homes ── */}
        <div className="~pt-[1.875rem]/[5rem]">
          <div className="flex md:flex-row flex-col gap-[1rem] items-center ~pb-[1.25rem]/[3rem]">
            <h4 className="text-main tracking-[-0.05em] md:shrink-0 font-medium max-md:text-center ~text-[1.5rem]/[2.25rem] leading-[120%] text-right">
              From Village Kitchens to Modern Homes
            </h4>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#FFCC00] to-[#9A2923]"></div>
          </div>
          <div className="grid md:grid-cols-2 ~gap-[1rem]/[3rem]">
            <div className="~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem] border border-[#EC571520]">
              <h5 className="~text-[0.875rem]/[1.25rem] font-medium tracking-[-0.03em] leading-[120%] text-main ~mb-[0.5rem]/[1rem]">
                Spice Traditions Across India
              </h5>
              <p className="text-[#1A1A1ABF] tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
                While Kala Masala remained the heart of the brand, the range
                slowly expanded into everyday essentials — staples like Lal
                Mirchi Powder and Dhaniya Powder. Over time, inspired by
                regional cooking styles, new blends were introduced: from South
                Indian sambar masalas to Punjabi-style spice blends. Yet the
                philosophy never changed — the focus has always remained on
                spices people actually use every day, made in a way that
                preserves traditional taste.
              </p>
            </div>
            <div className="~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem] border border-[#EC571520]">
              <h5 className="~text-[0.875rem]/[1.25rem] font-medium tracking-[-0.03em] leading-[120%] text-main ~mb-[0.5rem]/[1rem]">
                Reaching Every Kitchen
              </h5>
              <p className="text-[#1A1A1ABF] tracking-[-0.04em] leading-[130%] ~text-[0.75rem]/[1rem]">
                For decades, our loyal customers have been home cooks in Tier-2,
                Tier-3, and Tier-4 towns — especially families who value
                authentic Maharashtrian flavours. Today, through our online
                platform, Shrikakaji Masala is reaching kitchens in metro cities
                across India. We understand that modern lifestyles leave less
                time for elaborate cooking — that is why our curated spice
                blends make it easier to prepare rich, aromatic meals without
                complicated preparation.
              </p>
            </div>
          </div>
          <div className="~mt-[1rem]/[2rem] bg-gradient-to-r from-[#9A2923] to-[#C02611] ~rounded-[0.75rem]/[1rem] ~p-[1.5rem]/[2.5rem]">
            <p className="text-white ~text-[0.75rem]/[1.125rem] leading-[140%] tracking-[-0.02em] text-center font-medium">
              Our premium masala hampers have also become a popular choice for{" "}
              <span className="font-bold">festive gifting</span> — allowing
              people to share authentic flavours with friends and family.
            </p>
          </div>
        </div>

        <div className="flex gap-[1rem] ~pt-[1.875rem]/[8rem] items-center">
          <h4 className=" text-main tracking-[-0.05em] font-medium shrink-0  ~text-[1.5rem]/[2.25rem]  leading-[120%]  ">
            The Kakaji Way of Cooking
          </h4>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#9A2923] to-[#FFCC00]"></div>
        </div>
        <div className="grid ~pt-[1.25rem]/[5rem]  lg:grid-cols-3 ~gap-[0.625rem]/[2.5rem]">
          <div className="px-[0.9375rem] bg-gradient-to-l text-white from-[#D66E3D] to-[#9A4A23] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2rem] leading-[120%] ">
              Flavour Before Everything
            </h4>
            <p className="~text-[0.75rem]/[1rem] max-md:font-medium text-center ~pt-[1.25rem]/[3rem] leading-[130%]">
              We believe that good food begins with good spices. Every blend we
              create is rooted in the idea that authentic flavor should come
              from pure ingredients, traditional methods, and uncompromising
              freshness. This belief guides every step we take — from selecting
              raw materials to delivering the final product to your kitchen.
            </p>
          </div>
          <div className="px-[0.9375rem] bg-gradient-to-r text-white from-[#EC5715] to-[#FF7E00] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2rem] leading-[120%] ">
              Less Effort, Deeper Taste
            </h4>
            <p className="~text-[0.75rem]/[1rem] max-md:font-medium text-center ~pt-[1.25rem]/[3rem] leading-[130%]">
              Cooking should feel joyful, not complicated. Instead of mixing
              multiple spices, our blends bring together carefully balanced
              ingredients that work together seamlessly. Often, all you need is
              one masala and salt to create a dish full of flavour.
            </p>
          </div>
          <div className="px-[0.9375rem] bg-gradient-to-r text-white from-[#A11300] to-[#C02611] rounded-[1rem] ~py-[1.875rem]/[3.75rem]">
            <h4 className="text-center font-medium md:font-semibold tracking-[-0.03em] ~text-[1rem]/[2rem] leading-[120%] ">
              The Taste of Home
            </h4>
            <p className="~text-[0.75rem]/[1rem] max-md:font-medium text-center ~pt-[1.25rem]/[3rem] leading-[130%]">
              Across generations and regions, certain flavours instantly feel
              familiar — comforting, warm, and deeply satisfying. Our masalas
              are designed to recreate those timeless tastes that remind you of
              traditional home kitchens.
            </p>
          </div>
        </div>

        {/* ── PROMISE BANNER — 100% UNTOUCHED ── */}
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
          <div className="~size-[3.2748651505rem]/[4.375rem] ~rounded-tl-[0.75rem]/[1rem] flex justify-center items-center absolute bottom-0 right-0 bg-white z-50 ">
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute bottom-0 rotate-180 ~left-[-0.8125rem]/[-1.115rem] text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute right-[-1px] rotate-180 ~top-[-0.8125rem]/[-1.11rem] text-white " />
            <button className="~size-[2.339189291rem]/[3.125rem] relative group overflow-hidden flex justify-center items-center bg-[#F8F5EE] rounded-full ">
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />{" "}
              <Arrow className="size-[1.25rem] text-main   transition-all group-hover:text-white duration-700 ease-in-out group-hover:rotate-0 -rotate-45" />
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM IMAGE GRID — 100% UNTOUCHED ── */}
      <div className="~pt-[1.25rem]/[5rem] grid md:grid-cols-2 lg:grid-cols-3 ~gap-[0.4375rem]/[1.5rem]">
        <div className="~rounded-[1rem]/[1.79125rem] ~h-[9.375rem]/[19.625rem] relative overflow-hidden  bg-[#FFF5E7]">
          <Image
            src={about2}
            alt=""
            fill
            className="absolute inset-0 h-full object-cover w-full"
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
            className="~h-[9.375rem]/[13.781908989rem] absolute  bottom-[0.75rem] md:right-0 lg:right-[-12rem] ~w-[20rem]/[24.8360519409rem]"
          />
        </div>
        <div className="col-span-2 ~min-h-[22.5rem]/[19.625rem] flex md:flex-row flex-col items-center overflow-hidden ~rounded-[1rem]/[1.79125rem] relative  bg-[#FFF5E7]">
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
          </div>
          <div className="~w-[15.05908203rem]/[26.3815917969rem] max-md:mt-[-3.5rem] md:~mr-[-5rem]/[-2rem] shrink-0 relative h-full">
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
