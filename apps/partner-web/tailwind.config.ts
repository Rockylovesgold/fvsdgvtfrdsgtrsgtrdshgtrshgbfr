import type { Config } from "tailwindcss";
import preset from "../../packages/config/tailwind.preset";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [preset]
};

export default config;
