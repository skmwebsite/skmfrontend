import * as React from "react";
import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    {/* Adjusted paths for a smaller cross */}
    <path fill="#9A2923" d="M2 2.5 2.9 1.6 14.4 13.1 13.5 14z" />
    <path fill="#9A2923" d="M14 2.5 13.1 1.6 1.6 13.1 2.5 14z" />
  </svg>
);
export default CloseIcon;
