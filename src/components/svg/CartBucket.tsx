import * as React from "react";
import { SVGProps } from "react";
const CartBucket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={20}
    //     height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke="#F9F6FE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M7.083 11.875A2.93 2.93 0 0 0 10 14.792a2.93 2.93 0 0 0 2.917-2.917M7.342 1.667 4.325 4.692M12.658 1.667l3.017 3.025"
    />
    <path
      stroke="#F9F6FE"
      strokeWidth={1.25}
      d="M1.667 6.542c0-1.542.825-1.667 1.85-1.667h12.966c1.025 0 1.85.125 1.85 1.667 0 1.791-.825 1.666-1.85 1.666H3.517c-1.025 0-1.85.125-1.85-1.666Z"
    />
    <path
      stroke="#F9F6FE"
      strokeLinecap="round"
      strokeWidth={1.25}
      d="m2.917 8.333 1.175 7.2c.266 1.617.908 2.8 3.291 2.8h5.025c2.592 0 2.975-1.133 3.275-2.7l1.4-7.3"
    />
  </svg>
);
export default CartBucket;
