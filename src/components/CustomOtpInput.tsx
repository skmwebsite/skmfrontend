"use client";
import OtpInput from "react-otp-input";

type Props = {
  otp: string;
  setOtp: (value: string) => void;
};
export default function CustomOtpInput({ otp, setOtp }: Props) {
  return (
    <OtpInput
      containerStyle=" justify-between"
      numInputs={6}
      onChange={setOtp}
      renderInput={(props) => (
        <input
          {...props}
          className="!~size-[2.5rem]/[3.75rem] font-semibold bg-[#F8F5EE] ~text-[1rem]/[1.5rem] ~rounded-[0.5rem]/[1rem] text-black  text-center  focus:border-gray-700 focus:outline-none"
        />
      )}
      shouldAutoFocus
      value={otp}
    />
  );
}
