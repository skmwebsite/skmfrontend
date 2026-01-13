import * as React from "react";
import { SVGProps } from "react";
const Confirm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={20}
    //     height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M7.5 18.333h5c4.166 0 5.833-1.666 5.833-5.833v-5c0-4.167-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.666-5.833 5.833v5c0 4.167 1.666 5.833 5.833 5.833Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m6.458 10 2.359 2.358 4.725-4.716"
    />
  </svg>
);
export default Confirm;
