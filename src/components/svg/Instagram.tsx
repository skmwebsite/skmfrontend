import * as React from "react";
import { SVGProps } from "react";
const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={16}
    //     height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M11.667 4.333h.006m-7.006-3h6.666a3.333 3.333 0 0 1 3.334 3.334v6.667a3.333 3.333 0 0 1-3.334 3.333H4.667a3.333 3.333 0 0 1-3.334-3.333V4.667a3.333 3.333 0 0 1 3.334-3.333Zm6 6.247a2.666 2.666 0 1 1-5.275.782 2.666 2.666 0 0 1 5.275-.782Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Instagram;
