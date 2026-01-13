"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import collection from "@public/images/shop-banner.png";
import Badge from "@/src/components/Badge";
import { frontendApi } from "@/src/api/api";
import { toast } from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
const FormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  message: z.string().nonempty({ message: "Message is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
});

type TFormSchema = z.infer<typeof FormSchema>;
const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "";
const HeroSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
  });
  let captchaToken: string | null = null;

  const onSubmit = async (data: TFormSchema) => {
    if (!captchaToken) {
      alert("Please complete the captcha");
      return;
    }

    const payload = {
      ...data,
      cf_turnstile_response: captchaToken,
    };

    try {
      const response = await frontendApi.EnquiryForm(payload);

      if (response?.status) {
        toast.success("Your enquiry was submitted successfully!");
        captchaToken = null;
        reset();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission failed", error);
    }
  };
  return (
    <div>
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
              Experience the Heritage of Flavor
            </h1>
            <h1 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              with Gupta Spices
            </h1>
          </div>

          <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[2.3125rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
            Explore our wide selection of spices and seasonings to elevate your
            culinary creations.{" "}
          </p>
        </div>
      </div>
      <div className="~py-[1.875rem]/[5rem] ~px-[0]/[20rem]">
        <h4 className="~text-[1rem]/[2.5rem] text-center leading-[120%] tracking-[-0.03em]">
          Contact us
        </h4>
        <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[1rem] text-center m tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
          Send us a message below and we'll get back to you in 1 business day.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="~pt-[1.125rem]/[2.375rem] ~space-y-[0.625rem]/[1.5rem] "
        >
          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Name
            </h5>
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                placeholder="Enter Your Name"
                className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem]"
              />
              {errors.name && (
                <p className=" text-red-400 absolute ~bottom-[-1rem]/[-1.3rem] left-[1rem]  ~text-[0.65rem]/[0.875rem] ">
                  *{errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Email
            </h5>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem]  ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem]"
              />
              {errors.email && (
                <p className=" text-red-400 absolute ~bottom-[-1rem]/[-1.3rem] left-[1rem]  ~text-[0.65rem]/[0.875rem] ">
                  *{errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Message
            </h5>
            <div className="relative">
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Enter Your Message"
                className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem]  ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem]"
              />
              {errors.message && (
                <p className=" text-red-400 absolute bottom-[-1rem] left-[1rem]  ~text-[0.65rem]/[0.875rem] ">
                  *{errors.message.message}
                </p>
              )}
            </div>
            <Turnstile
              siteKey={SITE_KEY}
              onError={(error) => {
                console.error("Turnstile error:", error);
                alert("Captcha validation failed: " + error);
              }}
              onSuccess={(token: string) => (captchaToken = token)}
              onExpire={() => (captchaToken = null)}
              className="~mt-[0.95rem]/[1rem]"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`~text-[0.75rem]/[1rem] group overflow-hidden relative w-full flex justify-center items-center gap-[0.5rem] rounded-full leading-[120%] tracking-[-0.03em] bg-main font-medium text-white py-[0.78125rem]
  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <span
              className="
      absolute inset-0
      bg-gradient-to-r from-[#EC5715] to-[#FF7E00]
      opacity-0 group-hover:opacity-100
      transition-opacity duration-700 ease-in-out
    "
            />
            <span className="relative z-20">
              {isSubmitting ? "Submitting..." : "Submit"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
