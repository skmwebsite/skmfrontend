"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { Combobox, ComboboxInput, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface LoginFormProps {
  onLoginSuccess: () => void;
}
const phoneNumberRegex = /^[0-9]+$/;

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [selectedCode, setSelectedCode] = useState("+91");
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message, { id: "login-auth" });
        onLoginSuccess();
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
      .max(15, { message: "Enter a valid phone number" })
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
    <form
      className="h-full ~px-[1rem]/[1.5rem] flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="~pt-[1rem]/[2.563rem] ~pb-[3rem]/[5rem] ">
        <p className="~text-[0.875rem]/[1rem] ~pt-[0.5rem]/[1rem] text-center  tracking-[-0.03em] text-[#1A1A1ABF] leading-[130%]">
          Enter your mobile number to receive a one-time password (OTP) and
          complete your purchase securely.
        </p>
      </div>

      <div className="~pb-[2rem]/[5rem]">
        <h5 className="~text-[0.75rem]/[1rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
          Phone Number
        </h5>
        <div className="flex ">
          <PhoneCodeCombobox
            register={register}
            selectedCode={selectedCode}
            setSelectedCode={(data) => setSelectedCode(data ?? "+91")}
          />
          <input
            {...register("phone_number")}
            className="bg-[#F8F5EE] no-spinner  text-[#0000008F]  leading-[120%] tracking-[-0.03em] text-[1rem] w-full outline-none ~rounded-r-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem]"
            placeholder="Enter your number"
            type="number"
          />
        </div>
        {errors.phone_number && (
          <p className="mt-1  text-red-700 text-start ~text-[0.625rem]/[0.85rem]">
            *{errors.phone_number.message}
          </p>
        )}
      </div>

      <div className="~pb-[5rem]/[7rem] flex justify-center">
        <button
          className=" w-full rounded-full border-2 border-main  leading-[120%] tracking-[-0.03em] ~px-[0.75rem]/[1.5rem] ~text-[0.75rem]/[1rem] py-[0.625rem] bg-main font-medium text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-main disabled:opacity-50 md:w-fit"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? <p>Loading</p> : "Send OTP"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

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

  return (
    <Combobox onChange={setSelectedCode} value={selectedCode}>
      <div className="relative">
        <ComboboxInput
          {...register("phone_code")}
          className="bg-[#F8F5EE] w-[5ch] text-[#0000008F] border-r border-r-main/20 leading-[120%] tracking-[-0.03em] text-[1rem]  outline-none ~rounded-l-[0.5rem]/[1rem] text-center ~py-[0.5rem]/[0.75rem]"
          displayValue={(code) => (code as string | null) ?? "+91"}
          onChange={(event) => setQuery(event.target.value)}
          readOnly
        />

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        ></Transition>
      </div>
    </Combobox>
  );
};
