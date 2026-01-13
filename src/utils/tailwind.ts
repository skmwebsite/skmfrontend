import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import {
  createTailwindMerge,
  getDefaultConfig,
  mergeConfigs,
} from "tailwind-merge";

const tailwindMerge = createTailwindMerge(getDefaultConfig, (config) =>
  mergeConfigs(config, {
    extend: {},
  })
);

export default function cn(...input: ClassValue[]) {
  return tailwindMerge(clsx(input));
}
