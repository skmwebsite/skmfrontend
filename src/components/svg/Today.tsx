import * as React from "react";
import { SVGProps } from "react";
const Today = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={24}
    //     height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12h-5M15 8h-5M19 17V5a2 2 0 0 0-2-2H4"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
    />
  </svg>
);
export default Today;
