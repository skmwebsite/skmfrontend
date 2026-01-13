import * as React from "react";
import { SVGProps } from "react";
const FaceBook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={16}
    //     height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M12 1.333h-2a3.333 3.333 0 0 0-3.333 3.334v2h-2v2.667h2v5.333h2.666V9.334h2L12 6.667H9.333v-2A.667.667 0 0 1 10 4h2V1.333Z"
    />
  </svg>
);
export default FaceBook;
