import * as React from "react";
import { SVGProps } from "react";
const Customize = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={20}
    //     height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M2.792 1.667h7.416c.617 0 1.125.508 1.125 1.125v1.233c0 .45-.283 1.008-.558 1.292L8.358 7.45c-.333.283-.558.842-.558 1.292v2.416c0 .334-.225.784-.508.959l-.784.508c-.733.45-1.741-.058-1.741-.958V8.692c0-.392-.225-.9-.45-1.184l-2.134-2.25c-.283-.283-.508-.783-.508-1.125V2.842c-.008-.667.5-1.175 1.117-1.175Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M1.667 10v2.5c0 4.167 1.666 5.833 5.833 5.833h5c4.166 0 5.833-1.666 5.833-5.833v-5c0-2.6-.65-4.233-2.158-5.083-.425-.242-1.275-.425-2.05-.55M10.834 10.833H15M9.166 14.167H15"
    />
  </svg>
);
export default Customize;
