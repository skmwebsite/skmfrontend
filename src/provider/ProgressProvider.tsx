"use client";

import { ProgressProvider as BProgressProvider } from "@bprogress/next/app";
import type { ReactNode } from "react";

type ProgressProviderProps = {
  children: ReactNode;
};

const ProgressProvider = ({ children }: ProgressProviderProps) => (
  <BProgressProvider
    color="#9A2923"
    height="4px"
    options={{ showSpinner: false }}
    shallowRouting
  >
    {children}
  </BProgressProvider>
);

export default ProgressProvider;
