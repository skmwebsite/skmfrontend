"use client";
import ChevronDown from "@/src/components/svg/ChevronDown";
import { useAuth } from "@/src/hooks/useAuth";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

type PhoneCode = {
  name: string;
  dial_code: string;
};

const phoneNumberRegex = /^[0-9]+$/;

const countries: PhoneCode[] = [{ name: "India", dial_code: "+91" }];

const Hero = () => {
  const [selectedCode, setSelectedCode] = useState("+91");
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message, { id: "login-auth" });
      } else {
        toast.error(response.message, { id: "login-auth" });
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const schema = z.object({
    phone_number: z
      .string()
      .min(10, { message: "Enter a valid phone number" })
      .regex(phoneNumberRegex, { message: "Only digits allowed" }),
    phone_code: z.string().nonempty("Phone code is required"),
  });
  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { phone_code: "+91" },
  });

  const onSubmit = (value: Schema) => {
    if (loginMutation.isPending) {
      return;
    }

    loginMutation.mutate({
      phone_code: value.phone_code,
      phone_number: value.phone_number,
    });
  };
  return (
    <div className="~pt-[5rem]/[8rem]">
      <div className=" ~pb-[1rem]/[1.5rem] flex w-full flex-col justify-between gap-[3rem] lg:flex-row ">
        <Link
          href={"/shop"}
          className="flex gap-[0.45rem] ~mb-[0.75rem]/[1rem] px-[0.875rem] ~text-[0.875rem]/[1rem] py-[0.5rem] rounded-full w-fit hover:bg-[#F8F5EE] duration-300 ease-in-out transition-all"
        >
          <ChevronDown className="shrink-0 rotate-90 ~w-[0.5775000453rem]/[0.900000095rem]" />
          Back
        </Link>
        <h1 className="~text-[1rem]/[1.75rem] font-semibold text-center leading-[120%] tracking-[-0.03em]">
          Secure Checkout
        </h1>
        <Link
          href={"/shop"}
          className="flex gap-[0.45rem] invisible ~mb-[0.75rem]/[1rem] px-[0.875rem] ~text-[0.875rem]/[1rem] py-[0.5rem] rounded-full w-fit hover:bg-[#F8F5EE] duration-300 ease-in-out transition-all"
        >
          <ChevronDown className="shrink-0 rotate-90 ~w-[0.5775000453rem]/[0.900000095rem]" />
          Back
        </Link>
      </div>

      <div className=" ~gap-[1rem]/[2.5rem] flex w-full flex-col justify-between lg:flex-row ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:basis-[70%]"
        >
          <div className="flex gap-[1rem] items-end">
            <div className="w-full">
              <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
                Phone Number
              </h5>
              <div className="flex  w-full">
                <PhoneCodeCombobox
                  register={register}
                  selectedCode={selectedCode}
                  setSelectedCode={(data) => setSelectedCode(data ?? "+91")}
                />
                <input
                  {...register("phone_number")}
                  className="bg-[#F8F5EE] text-[#0000008F]  leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-r-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem]"
                  placeholder="Enter your number"
                  type="text"
                />
              </div>

              {errors.phone_number && (
                <p className="mt-1 text-redcolor text-sm">
                  *{errors.phone_number.message}
                </p>
              )}
            </div>
            <div>
              <button
                className="  rounded-full whitespace-nowrap shrink-0 border-2 border-main  leading-[120%] tracking-[-0.03em] ~px-[0.75rem]/[1.5rem] ~text-[0.75rem]/[1rem] py-[0.625rem] bg-main font-medium text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-main disabled:opacity-50 md:w-fit"
                disabled={loginMutation.isPending}
                type="submit"
              >
                {loginMutation.isPending ? <p>Loading</p> : "Send OTP"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;

type PhoneCodeComboboxProps = {
  selectedCode: string;
  setSelectedCode: (code: string | null) => void;
  register: ReturnType<
    typeof useForm<{
      phone_number: string;
      phone_code: string;
    }>
  >["register"];
};

const PhoneCodeCombobox = ({
  selectedCode,
  setSelectedCode,
  register,
}: PhoneCodeComboboxProps) => {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter(
          (country) =>
            country.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            country.dial_code
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox onChange={setSelectedCode} value={selectedCode}>
      <div className="relative">
        <ComboboxInput
          {...register("phone_code")}
          className="bg-[#F8F5EE] w-[5ch] text-[#0000008F] border-r border-r-main/20 leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem]  outline-none ~rounded-l-[0.5rem]/[1rem] text-center ~py-[0.5rem]/[0.75rem]"
          displayValue={(code) => (code as string | null) ?? "+91"}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <ComboboxOptions className="absolute top-[100%] left-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCountries.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCountries.map((country) => (
                <ComboboxOption
                  className={({ selected }) =>
                    `relative cursor-pointer select-none px-2 py-2 text-start ${
                      selected ? "bg-redcolor text-white" : "text-gray-900"
                    }`
                  }
                  key={country.dial_code}
                  value={country.dial_code}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        <p>{country.name}</p>
                        <p>{country.dial_code}</p>
                      </span>
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
};
