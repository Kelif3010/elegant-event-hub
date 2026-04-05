import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type FontPairing = "elegant" | "modern" | "romantic" | "minimal";
export type BorderRadius = "sharp" | "rounded" | "pill";

export interface ThemeConfig {
  accentColor: string;
  accentHSL: string;
  fontPairing: FontPairing;
  fontSize: "S" | "M" | "L";
  borderRadius: BorderRadius;
  darkMode: boolean;
  coupleName: { partner1: string; partner2: string };
  eventDate: string;
  eventLocation: string;
  primaryLanguage: "de" | "en";
  activeModules: string[];
  guestPortalGreeting: string;
  paypalLink: string;
}

const fontMap: Record<FontPairing, { heading: string; body: string; import: string }> = {
  elegant: { heading: "Playfair Display", body: "Inter", import: "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700" },
  modern: { heading: "DM Sans", body: "DM Sans", import: "DM+Sans:wght@300;400;500;600;700" },
  romantic: { heading: "Cormorant Garamond", body: "Lato", import: "Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700" },
  minimal: { heading: "Outfit", body: "Outfit", import: "Outfit:wght@300;400;500;600;700" },
};

const presetColors = [
  { name: "Champagne", hex: "#C9A96E", hsl: "38 55% 62%" },
  { name: "Sage", hex: "#5B8A72", hsl: "150 20% 45%" },
  { name: "Rose Gold", hex: "#D4899B", hsl: "350 40% 72%" },
  { name: "Ivory", hex: "#F5F0E8", hsl: "38 40% 93%" },
  { name: "Dusty Blue", hex: "#7BA0C4", hsl: "212 40% 62%" },
  { name: "Terracotta", hex: "#C4725B", hsl: "15 45% 56%" },
  { name: "Forest Green", hex: "#3D6B4F", hsl: "145 28% 33%" },
  { name: "Classic Black", hex: "#1E293B", hsl: "220 20% 14%" },
];

const defaultTheme: ThemeConfig = {
  accentColor: "#C9A96E",
  accentHSL: "38 55% 62%",
  fontPairing: "elegant",
  fontSize: "M",
  borderRadius: "rounded",
  darkMode: false,
  coupleName: { partner1: "Sophie", partner2: "Alexander" },
  eventDate: "2025-09-13",
  eventLocation: "Schloss Rothenburg",
  primaryLanguage: "de",
  activeModules: ["timeline", "table", "menu", "photos", "music", "wishlist", "travel", "guestbook"],
  guestPortalGreeting: "Wir freuen uns, dass ihr dabei seid!",
  paypalLink: "",
};

interface ThemeContextValue {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  presetColors: typeof presetColors;
  fontMap: typeof fontMap;
  applyTemplate: (template: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

const templates: Record<string, Partial<ThemeConfig>> = {
  "grand-ballroom": { accentColor: "#C9A96E", accentHSL: "38 55% 62%", fontPairing: "elegant", borderRadius: "rounded", darkMode: false },
  "garden-party": { accentColor: "#5B8A72", accentHSL: "150 20% 45%", fontPairing: "romantic", borderRadius: "rounded", darkMode: false },
  "modern-loft": { accentColor: "#1E293B", accentHSL: "220 20% 14%", fontPairing: "modern", borderRadius: "sharp", darkMode: true },
  "beach-romance": { accentColor: "#7BA0C4", accentHSL: "212 40% 62%", fontPairing: "minimal", borderRadius: "pill", darkMode: false },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem("eventora-theme");
      return saved ? { ...defaultTheme, ...JSON.parse(saved) } : defaultTheme;
    } catch { return defaultTheme; }
  });

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem("eventora-theme", JSON.stringify(next));
      return next;
    });
  };

  const applyTemplate = (id: string) => {
    const t = templates[id];
    if (t) updateTheme(t);
  };

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme.darkMode);
  }, [theme.darkMode]);

  // Apply accent color to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accentHSL);
    root.style.setProperty("--ring", theme.accentHSL);
    root.style.setProperty("--champagne", theme.accentHSL);
    root.style.setProperty("--champagne-light", theme.accentHSL.replace(/\d+%$/, (m) => `${Math.min(95, parseInt(m) + 28)}%`));
  }, [theme.accentHSL]);

  // Apply font
  useEffect(() => {
    const fm = fontMap[theme.fontPairing];
    const linkId = "theme-font-link";
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${fm.import}&display=swap`;
    document.documentElement.style.setProperty("--font-serif", `"${fm.heading}", Georgia, serif`);
    document.documentElement.style.setProperty("--font-sans", `"${fm.body}", system-ui, sans-serif`);
  }, [theme.fontPairing]);

  // Apply border radius
  useEffect(() => {
    const val = theme.borderRadius === "sharp" ? "0.25rem" : theme.borderRadius === "pill" ? "9999px" : "0.75rem";
    document.documentElement.style.setProperty("--radius", val);
  }, [theme.borderRadius]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, presetColors, fontMap, applyTemplate }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { presetColors as PRESET_COLORS, templates as TEMPLATES };
