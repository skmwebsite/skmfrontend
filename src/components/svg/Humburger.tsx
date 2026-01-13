import * as React from "react";
import { SVGProps } from "react";
const Humburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={12}
    //     height={7}
    viewBox="0 0 12 7"
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.978}
      d="M.49.49h10.188M.489 3.036h10.189M.489 5.584h10.189"
    />
  </svg>
);
export default Humburger;
