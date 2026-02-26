"use client";
import Arrow from "@/src/components/svg/Arrow";
import BorderRadius from "@/src/components/svg/BorderRadius";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import dot from "@public/svg/dots.svg";
import banner2 from "@public/images/banner2.png";
const testimonials = [
  {
    id: 1,
    text: "Kakaji Masale has been with me through different phases of life - from messy hostel kitchens to my new home. It carries the same quality and taste as the masalas our grandmothers used to grind by hand. Today, I feel like I’m giving them rest, because Kakaji Masale delivers those memories with the same love and warmth. My personal favorite is Kala Masala, Khandeshi Masala and Chole Masala.",
    name: "Deepika",
    role: "31 | Product Designer",
    image: "/images/avatar.jpeg",
  },
  {
    id: 2,
    text: "Kakaji Masale mujhe us zamane ki yaad dilate hain jab masale dhoop mein sukha kar ghar par peese jaate the. Iski khushboo aur swaad bilkul shuddh lagta hai. Apne parivaar ke liye main is par poora bharosa karti hoon.",
    name: "Saroj",
    role: "64 | Homemaker",
    image: "/images/avatar.jpeg",
  },
  {
    id: 3,
    text: "The masalas added immense flavor to our food. As young humans who have just started cooking I was deeply appreciative of the taste that these spices added to my dishes. This made cooking simple and an experience I looked forward to! If you are someone who gets overwhelmed by too many choices on the market and want one stop shop for the best tasting and ethically sourced spices Shree Kakaji Masale is your spot!",
    name: "Aakanksha Nyati",
    role: "28 | Psychologist",
    image: "/images/avatar.jpeg",
  },
  {
    id: 4,
    text: "I used to live by myself & my roommates in a flat during college, these masalas were the only thing that reminded me of home & brought taste to our experiments 😅 Really flavourful & feels superior. A must have!",
    name: "Muskan Vadera",
    role: "27 | Brand Manager",
    image: "/images/avatar.jpeg",
  },
  {
    id: 5,
    text: "Mumma’s food tastes best when she uses the red masala packet with the kaka on it.",
    name: "Viyona",
    role: "9 | Student",
    image: "/images/avatar.jpeg",
  },
  {
    id: 6,
    text: "My personal favourites are the Chole Masala, Misal Masala, and Sev Bhaji Masala, Tikka Masala-they bring out authentic flavours just like traditional homemade recipes. The Kitchen King Masala is my go-to basic masala and works beautifully in everyday dishes, adding depth and balance without overpowering the food. They also supply pickle masala, which is equally impressive.",
    name: "Neha ",
    role: "37 | Procurement Specialist",
    image: "/images/avatar.jpeg",
  },
  {
    id: 7,
    text: "I have been using Kakaji Masala regularly for the last four years. Their Khichdi Masala deserves a special mention—it is just great and adds a comforting, perfectly spiced taste that makes khichdi even more enjoyable. Another standout for me is their no onion/no garlic Goda Masala. It is my first choice of spice for everyday cooking, and honestly, it tastes even better than many masalas that include onion and garlic. ",
    name: "Dani More ",
    role: "34 | Pastry Chef",
    image: "/images/avatar.jpeg",
  },
  {
    id: 8,
    text: "Kakaji Masala has become my most trusted spice brands. Their Punjabi Gravy Masala is a real lifesaver for me. I prepare gravy in bulk for weekly cooking, and this masala adds such rich, delicious taste to all my meals. Another absolute favorite is their Shev Bhaji Masala. Dhaba-style shev bhaji on the Mumbai-Nashik route is one of my most loved dishes, and Kakaji’s masala has beautifully recreated that authentic flavour which you can take anywhere. ",
    name: "Sai More ",
    role: "34 | Operations Lead",
    image: "/images/avatar.jpeg",
  },
  {
    id: 9,
    text: "I’ve had a wonderful experience with Kakaji Masala. What truly sets them apart is that they grind all their spices in-house and use no preservatives, which really reflects in the aroma, freshness, and taste of their masalas. They cater to local, national and even export their products, which makes it so easy for people living away from home to recreate the same comforting, home-style meals. This is truly a blessing for anyone craving authentic Indian flavours abroad. ",
    name: "Sanjay ",
    role: "",
    image: "/images/avatar.jpeg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const currentTestimonial = testimonials[currentIndex];
  return (
    <div className="~pt-[1.5625rem]/[5rem]">
      <div className=" bg-gradient-to-b relative ~min-h-[34.0625rem]/[36.4375rem] flex items-center overflow-hidden rounded-[1rem] from-[#A11300] to-[#C02611] ~px-[0.3125rem]/[7.5rem] ~pb-[2rem]/[4rem] pt-[4rem] ">
        <div className="md:flex hidden">
          <Image
            className="absolute opacity-[0.5] left-0 w-full top-0"
            src={dot}
            alt=""
          />
        </div>{" "}
        <div className="~w-[6rem]/[8rem] ~h-[3.3125rem]/[4.25rem] absolute top-0 right-0 flex justify-center items-center rounded-bl-[1rem] bg-white">
          <BorderRadius className="absolute top-0 rotate-90 left-[-1.125rem] size-[1.125rem] text-white" />
          <BorderRadius className="absolute right-0 rotate-90 bottom-[-1.125rem]  size-[1.125rem] text-white" />
          <div className="flex gap-[0.5rem] ">
            <button
              onClick={handlePrev}
              className="~size-[2.339189291rem]/[3.125rem] relative flex group overflow-hidden justify-center items-center  bg-[#F8F5EE] rounded-full "
            >
              {" "}
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />
              <Arrow className="~size-[1.25rem]/[1.5rem] text-main  transition-all group-hover:text-white duration-700 ease-in-out rotate-[180deg] " />
            </button>
            <button
              onClick={handleNext}
              className="~size-[2.339189291rem]/[3.125rem] relative flex group overflow-hidden justify-center items-center  bg-[#F8F5EE] rounded-full "
            >
              {" "}
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />
              <Arrow className="~size-[1.25rem]/[1.5rem] text-main  transition-all group-hover:text-white duration-700 ease-in-out rotate-0 " />
            </button>
          </div>
        </div>
        <div className="flex min-h-[18.75rem]  flex-col justify-center gap-[1.25rem]">
          <div className=" md:flex hidden ~gap-[2rem]/[5rem] ">
            <svg
              width="75"
              height="55"
              viewBox="0 0 75 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[-1rem]"
            >
              <path
                opacity="0.5"
                d="M18.0792 54.2377C14.9688 54.2377 12.2472 53.6545 9.91441 52.488C7.58161 51.1921 5.70241 49.5073 4.27681 47.4337C2.98081 45.3601 1.94401 42.8976 1.16641 40.0464C0.388808 37.1952 8.3988e-06 34.2144 8.3988e-06 31.104C8.3988e-06 24.7536 1.62001 18.792 4.86001 13.2192C8.22961 7.64645 13.4136 3.24004 20.412 3.95496e-05L22.1616 3.49924C18.5328 5.18404 15.2928 7.64645 12.4416 10.8865C9.72001 13.9968 8.10001 17.3016 7.58161 20.8009C6.80401 23.5224 6.73921 26.1792 7.38721 28.7712C10.2384 25.6608 14.0616 24.1056 18.8568 24.1056C23.2632 24.1056 26.892 25.4664 29.7432 28.188C32.5944 30.78 34.02 34.4088 34.02 39.0744C34.02 43.6104 32.5296 47.304 29.5488 50.1553C26.568 52.8769 22.7448 54.2377 18.0792 54.2377ZM58.1256 54.2377C55.0152 54.2377 52.2936 53.6545 49.9608 52.488C47.628 51.1921 45.7488 49.5073 44.3232 47.4337C43.0272 45.3601 41.9904 42.8976 41.2128 40.0464C40.4352 37.1952 40.0464 34.2144 40.0464 31.104C40.0464 24.7536 41.6664 18.792 44.9064 13.2192C48.276 7.64645 53.46 3.24004 60.4584 3.95496e-05L62.208 3.49924C58.5792 5.18404 55.3392 7.64645 52.488 10.8865C49.7664 13.9968 48.1464 17.3016 47.628 20.8009C46.8504 23.5224 46.7856 26.1792 47.4336 28.7712C50.2848 25.6608 54.108 24.1056 58.9032 24.1056C63.3096 24.1056 66.9384 25.4664 69.7896 28.188C72.6408 30.78 74.0664 34.4088 74.0664 39.0744C74.0664 43.6104 72.576 47.304 69.5952 50.1553C66.6144 52.8769 62.7912 54.2377 58.1256 54.2377Z"
                fill="white"
              />
            </svg>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="~text-[1rem]/[2rem] text-center text-white   max-w-[45ch] font-medium tracking-[-0.05em] leading-[130%]"
              >
                {currentTestimonial.text}
              </motion.p>
            </AnimatePresence>{" "}
          </div>
          <div className=" justify-center flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex md:flex-row flex-col items-center ~gap-[0.875rem]/[2rem]"
              >
                <div className="relative shrink-0 size-[9rem]">
                  <svg
                    className="absolute inset-0"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="url(#g1)"
                      strokeWidth="2"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="transparent"
                      strokeWidth="2"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="url(#g2)"
                      strokeWidth="2"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="39"
                      stroke="transparent"
                      strokeWidth="2"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="url(#g3)"
                      strokeWidth="2"
                    />

                    <defs>
                      <linearGradient id="g1" x1="0" y1="100" x2="0" y2="0">
                        <stop
                          offset="0%"
                          stopColor="#EC5715"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF7E00"
                          stopOpacity="0.2"
                        />
                      </linearGradient>

                      <linearGradient id="g2" x1="0" y1="100" x2="0" y2="0">
                        <stop
                          offset="0%"
                          stopColor="#EC5715"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF7E00"
                          stopOpacity="0.4"
                        />
                      </linearGradient>

                      <linearGradient id="g3" x1="0" y1="100" x2="0" y2="0">
                        <stop offset="0%" stopColor="#FF361B" />
                        <stop offset="100%" stopColor="#FF7E00" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute shrink-0 inset-[24px] rounded-full overflow-hidden">
                    <Image
                      src={currentTestimonial.image}
                      fill
                      className="object-cover shrink-0"
                      alt={currentTestimonial.name}
                    />
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="~text-[1rem]/[2rem] text-center md:hidden   max-w-[45ch] text-white font-medium tracking-[-0.05em] leading-[130%]"
                  >
                    {currentTestimonial.text}
                  </motion.p>
                </AnimatePresence>
                <div className="text-white flex flex-col items-center">
                  <p className="~text-[0.75rem]/[1.75rem] bg-clip-text text-transparent tracking-wider bg-gradient-to-b from-[#FFD025] to-[#FF7E00]">
                    ★★★★★
                  </p>
                  <h4 className="~text-[0.875rem]/[1.5rem] font-medium leading-[120%] tracking-[-0.04em]">
                    {currentTestimonial.name}
                  </h4>
                  <p className="~text-[0.75rem]/[1rem] font-medium leading-[120%] tracking-[-0.04em]">
                    {currentTestimonial.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full group relative ~rounded-[0.75rem]/[1rem] ~px-[0.625rem]/[3.6875rem] ~py-[5rem]/[2.75rem] ~mt-[1.5rem]/[5rem] flex justify-start items-end overflow-hidden  ~h-[25rem]/[32.1993751526rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EE] to-transparent z-20">
            {" "}
          </div>
          <p className="~text-[1rem]/[3rem] leading-[120%] max-w-[30ch] z-20  text-black font-medium tracking-[-0.04em]">
            Masala cherished across generations Bring home the authentic taste
          </p>
          <Image src={banner2} alt="image" fill className="object-cover " />
          <div className="~size-[3.2748651505rem]/[4.375rem] ~rounded-tl-[0.75rem]/[1rem] flex justify-center items-center absolute bottom-0 right-0 bg-white z-50 ">
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute bottom-[-1px] rotate-180 ~left-[-0.8125rem]/[-1.125rem] text-white " />
            <BorderRadius className="~size-[0.8125rem]/[1.125rem] absolute right-[-1px] rotate-180 ~top-[-0.8rem]/[-1.11rem] text-white " />
            <button className="~size-[2.339189291rem]/[3.125rem] relative  overflow-hidden  flex justify-center items-center bg-[#F8F5EE] rounded-full ">
              <span
                className="
    absolute inset-0
    bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-700 ease-in-out
  "
              />{" "}
              <Arrow className="size-[1.25rem] text-main   transition-all group-hover:text-white duration-700 ease-in-out  -rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
