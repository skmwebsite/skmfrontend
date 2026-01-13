import * as React from "react";
import { SVGProps } from "react";
const Reset = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={20}
    //     height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12.125 18.058c3.575-.941 6.208-4.191 6.208-8.058 0-4.6-3.7-8.333-8.333-8.333C4.44 1.667 1.667 6.3 1.667 6.3m0 0V2.5m0 3.8H5.367"
    />
    <path
      stroke="#292D32"
      strokeDasharray="2.5 2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M1.667 10c0 4.6 3.733 8.333 8.333 8.333"
      opacity={0.4}
    />
  </svg>
);
export default Reset;
