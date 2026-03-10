import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        espresso: "#1E1714",
        roast: "#3B2A24",
        latte: "#F7F1E8",
        oat: "#F7F1E8",
        flatwhite: "#FFFDF9",
        caramel: "#C47A3A",
        mint: "#8FB8A8",
        clay: "#C98D7B",
        slate: "#7A6F68",
        mist: "#E8E1D8",
        darkbg: "#12100F",
        darksurface: "#1A1715",
        darkelevated: "#231E1A",
        darkborder: "#3A322D",
        darktext: "#F5EFE7",
        darkmuted: "#BDAFA4",
        surface: {
          base: "#FFFDF9",
          subtle: "#F7F1E8",
          elevated: "#FFFFFF"
        },
        status: {
          success: "#4B8C68",
          warning: "#B97B35",
          danger: "#B94F42",
          info: "#3F6FA8"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Sora", "DM Sans", "Inter", "sans-serif"]
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 12px 32px rgba(43,30,26,0.12)",
        lift: "0 16px 40px rgba(43,30,26,0.16)"
      }
    }
  }
};

export default preset;
