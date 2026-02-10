import { ReactNode } from "react";
import LenisScrollProvider from "../provider/LenisScrollProvider";

export default function Template({ children }: { children: ReactNode }) {
  return <LenisScrollProvider>{children}</LenisScrollProvider>;
}
