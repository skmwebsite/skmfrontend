import * as React from "react";
import { SVGProps } from "react";

const BorderRadius = (props: SVGProps<SVGSVGElement>) => {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#${id})`}>
        <path fill="currentColor" d="M0 0v18C0 8.059 8.059 0 18 0H0Z" />
      </g>
      <defs>
        <clipPath id={id}>
          <path fill="currentColor" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BorderRadius;
