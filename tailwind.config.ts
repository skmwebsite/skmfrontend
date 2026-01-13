import type { Config } from "tailwindcss";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

const configs: Config = {
  content: {
    files: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    screens,
    fontSize,
    /** @type {import('fluid-tailwind').FluidThemeConfig} */
    fluid: () => ({
      defaultScreens: ["20rem", "120rem"],
    }),

    extend: {
      colors: {
        main: "#9A2923",
        cream: "#FFF5E7",
      },
      fontFamily: {
        inter: "var(--font-inter), sans-serif",
      },
    },
  },
  plugins: [fluid({ checkSC144: false })],
};

export default configs;
