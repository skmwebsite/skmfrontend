import * as React from "react";
import { SVGProps } from "react";
const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={19}
    //     height={10}
    viewBox="0 0 19 10"
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.571}
      d="m17.126 1.286-6.52 6.52c-.77.77-2.03.77-2.8 0l-6.52-6.52"
    />
  </svg>
);
export default ChevronDown;
