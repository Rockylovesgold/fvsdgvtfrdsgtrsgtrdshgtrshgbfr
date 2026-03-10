export const coffeeTheme = {
  color: {
    brand: {
      espresso: "#1E1714",
      roast: "#3B2A24",
      oatMilk: "#F7F1E8",
      flatWhite: "#FFFDF9",
      caramel: "#C47A3A",
      sageMint: "#8FB8A8",
      clayRose: "#C98D7B",
      slateTaupe: "#7A6F68",
      mistGrey: "#E8E1D8"
    },
    surface: {
      base: "#FFFDF9",
      elevated: "#FFFFFF",
      subtle: "#F7F1E8",
      inverse: "#1A1715"
    },
    dark: {
      background: "#12100F",
      surface: "#1A1715",
      elevated: "#231E1A",
      border: "#3A322D",
      text: "#F5EFE7",
      mutedText: "#BDAFA4"
    },
    status: {
      success: "#4B8C68",
      warning: "#B97B35",
      danger: "#B94F42",
      info: "#3F6FA8"
    }
  },
  typography: {
    heading: "Sora, Inter, sans-serif",
    body: "Inter, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace"
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  radius: {
    input: 12,
    card: 16,
    hero: 24
  },
  shadow: {
    soft: "0 10px 30px rgba(43,30,26,0.08)",
    lift: "0 16px 40px rgba(43,30,26,0.14)"
  },
  motion: {
    durationFast: 0.18,
    durationBase: 0.24,
    durationSlow: 0.36
  }
} as const;
