"use client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CustomOtpInput from "../CustomOtpInput";
import { useAuth } from "@/src/hooks/useAuth";

interface LoginOTPFormProps {
  onOTPVerified: () => void;
}
const LoginOTPForm = ({ onOTPVerified }: LoginOTPFormProps) => {
  const { verifyOTP, login, tempData } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyOtpMutation = useMutation({
    mutationFn: (otpValue: string) => verifyOTP(otpValue),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message, { id: "otp-auth" });
        onOTPVerified();
      } else {
        toast.error(response.message, { id: "otp-auth" });
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: () =>
      login({
        phone_code: tempData?.phone_code || "",
        phone_number: tempData?.phone_number || "",
      }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("OTP resent successfully!", { id: "otp-auth" });
        setTimer(30);
        setOtp("");
      } else {
        toast.error(response.message || "Failed to resend OTP");
      }
    },
    onError: () => {
      toast.error("Something went wrong while resending OTP", {
        id: "otp-auth",
      });
    },
  });

  const handleSubmit = () => {
    if (verifyOtpMutation.isPending) {
      return;
    }
    verifyOtpMutation.mutate(otp);
  };

  const handleResend = () => {
    if (!tempData || timer > 0 || resendOtpMutation.isPending) {
      return;
    }
    resendOtpMutation.mutate();
  };

  const getResendButtonText = () => {
    if (timer > 0) {
      return `Resend in (${timer}s)`;
    }
    if (resendOtpMutation.isPending) {
      return <div>Loading</div>;
    }
    return "Resend OTP";
  };

  return (
    <div className="relative w-full h-full ~px-[1rem]/[1.5rem] items-center lg:flex">
      <div className="relative w-full overflow-hidden lg:flex lg:justify-center">
        <div className="flex w-full flex-col justify-center">
          <form action={handleSubmit}>
            <div className="~pt-[1rem]/[2.563rem] ~pb-[3rem]/[5rem] ">
              <p className="~text-[0.875rem]/[1rem] ~pt-[0.5rem]/[1rem] text-center  tracking-[-0.03em] text-[#1A1A1ABF] leading-[130%]">
                We’ve sent a one-time password (OTP) to your mobile number to
                securely verify your account.
              </p>
            </div>

            <div className="~pb-[2rem]/[7.063rem]">
              <div className="w-full">
                <CustomOtpInput otp={otp} setOtp={setOtp} />
              </div>
            </div>

            <div className="~pb-[6rem]/[9.438rem] flex sm:flex-row flex-col justify-center gap-[1rem]">
              <button
                className={` leading-[120%] tracking-[-0.03em] ~px-[0.75rem]/[1.5rem] ~text-[0.75rem]/[1rem] py-[0.625rem] rounded-full border-2 font-semibold disabled:opacity-50 ${
                  timer > 0 || resendOtpMutation.isPending
                    ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500"
                    : "border-black bg-white text-black enabled:hover:text-redcolor"
                }`}
                disabled={
                  timer > 0 ||
                  resendOtpMutation.isPending ||
                  verifyOtpMutation.isPending
                }
                onClick={handleResend}
                type="button"
              >
                {getResendButtonText()}
              </button>

              <button
                className=" w-full rounded-full border-2 border-main  leading-[120%] tracking-[-0.03em] ~px-[0.75rem]/[1.5rem] ~text-[0.75rem]/[1rem] py-[0.625rem] bg-main font-medium text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-main disabled:opacity-50 md:w-fit"
                disabled={
                  verifyOtpMutation.isPending || resendOtpMutation.isPending
                }
                type="submit"
              >
                {verifyOtpMutation.isPending ? (
                  <div>Loading</div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginOTPForm;
