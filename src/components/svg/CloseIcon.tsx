import * as React from "react";
import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <mask
      id="c"
      width={12}
      height={12}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <g clipPath="url(#a)">
        <g clipPath="url(#b)">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m10.667 1.333-9.334 9.334m0-9.334 9.334 9.334"
          />
        </g>
      </g>
    </mask>
    <g mask="url(#c)">
      <path fill="currentColor" d="M0 0h12v12H0z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default CloseIcon;
