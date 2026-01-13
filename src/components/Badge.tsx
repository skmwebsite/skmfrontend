import React from "react";

type Props = {
  title: string;
};
const Badge = ({ title }: Props) => {
  return (
    <div className="rounded-full w-fit py-[0.25rem] px-[0.75rem]  leading-[120%] font-medium ~text-[0.75rem]/[0.875rem] tracking-[-0.03em] text-white bg-gradient-to-b from-[#EC5715] to-[#FF7E00] border border-white/55">
      {title}
    </div>
  );
};

export default Badge;
