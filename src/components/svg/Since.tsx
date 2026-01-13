import * as React from "react";
import { SVGProps } from "react";
const Since = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.067 7.5V6c0-.53-.211-1.04-.587-1.414A2.011 2.011 0 0 0 19.06 4H5.008c-.533 0-1.044.21-1.42.586A1.996 1.996 0 0 0 3 6v14c0 .53.212 1.04.588 1.414.376.375.887.586 1.42.586H8.52M16.049 2v4M8.019 2v4M3 10h5.019M17.555 17.5l-1.506-1.2V14"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.026 16c0 1.591.635 3.117 1.764 4.243A6.034 6.034 0 0 0 16.05 22c1.597 0 3.129-.632 4.258-1.757A5.988 5.988 0 0 0 22.071 16a5.988 5.988 0 0 0-1.764-4.243A6.034 6.034 0 0 0 16.05 10c-1.597 0-3.13.632-4.259 1.757A5.989 5.989 0 0 0 10.026 16Z"
    />
  </svg>
);
export default Since;
