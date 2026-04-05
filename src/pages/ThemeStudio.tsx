import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme, PRESET_COLORS, TEMPLATES } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Sun, Moon, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fontPairings = [
  { id: "elegant" as const, name: "Elegant", heading: "Playfair Display", body: "Inter" },
  { id: "modern" as const, name: "Modern", heading: "DM Sans", body: "DM Sans" },
  { id: "romantic" as const, name: "Romantic", heading: "Cormorant Garamond", body: "Lato" },
  { id: "minimal" as const, name: "Minimal", heading: "Outfit", body: "Outfit" },
];

const templateCards = [
  { id: "grand-ballroom", name: "Grand Ballroom", desc: "Champagne + Playfair Display", emoji: "🏰", color: "#C9A96E" },
  { id: "garden-party", name: "Garden Party", desc: "Sage + Cormorant Garamond", emoji: "🌿", color: "#5B8A72" },
  { id: "modern-loft", name: "Modern Loft", desc: "Black + DM Sans", emoji: "🖤", color: "#1E293B" },
  { id: "beach-romance", name: "Beach Romance", desc: "Dusty Blue + Outfit", emoji: "🌊", color: "#7BA0C4" },
];

const ThemeStudio = () => {
  const { theme, updateTheme, applyTemplate } = useTheme();
  const [customHex, setCustomHex] = useState(theme.accentColor);
  const [previewTab, setPreviewTab] = useState("invitation");

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const setColor = (hex: string, hsl: string) => {
    setCustomHex(hex);
    updateTheme({ accentColor: hex, accentHSL: hsl });
  };

  const handleSave = () => {
    toast.success("Design gespeichert und überall angewendet ✨");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-semibold">Theme Studio</h1>
            <p className="text-muted-foreground text-sm">Gestalte euer individuelles Design — live Vorschau inklusive</p>
          </div>
          <Button onClick={handleSave} className="gap-2"><Check className="h-4 w-4" /> Speichern</Button>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr_280px] gap-6">
          {/* LEFT — Controls */}
          <div className="space-y-6">
            {/* Colors */}
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <div className="flex items-center gap-2"><Palette className="h-4 w-4 text-accent" /><h3 className="font-serif font-semibold text-sm">Akzentfarbe</h3></div>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_COLORS.map(c => (
                  <button key={c.hex} onClick={() => setColor(c.hex, c.hsl)} className={cn("w-full aspect-square rounded-xl border-2 transition-all hover:scale-105", theme.accentColor === c.hex ? "border-foreground scale-105" : "border-transparent")} style={{ backgroundColor: c.hex }} title={c.name} />
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={customHex} onChange={e => { setCustomHex(e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setColor(e.target.value, hexToHsl(e.target.value)); }} className="font-mono text-xs" placeholder="#C9A96E" />
                <div className="w-10 h-10 rounded-lg border border-border/50 shrink-0" style={{ backgroundColor: customHex }} />
              </div>
            </div>

            {/* Font Pairing */}
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <div className="flex items-center gap-2"><Type className="h-4 w-4 text-accent" /><h3 className="font-serif font-semibold text-sm">Schriftart</h3></div>
              <div className="space-y-2">
                {fontPairings.map(fp => (
                  <button key={fp.id} onClick={() => updateTheme({ fontPairing: fp.id })} className={cn("w-full text-left p-3 rounded-xl border-2 transition-all", theme.fontPairing === fp.id ? "border-accent bg-accent/5" : "border-transparent hover:bg-secondary/50")}>
                    <p className="text-sm font-medium">{fp.name}</p>
                    <p className="text-xs text-muted-foreground">{fp.heading} + {fp.body}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Radius / Dark */}
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Schriftgröße</Label>
                <div className="flex gap-2">
                  {(["S", "M", "L"] as const).map(s => (
                    <Button key={s} variant={theme.fontSize === s ? "default" : "outline"} size="sm" className="flex-1" onClick={() => updateTheme({ fontSize: s })}>{s}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Border-Radius</Label>
                <div className="flex gap-2">
                  {(["sharp", "rounded", "pill"] as const).map(r => (
                    <Button key={r} variant={theme.borderRadius === r ? "default" : "outline"} size="sm" className="flex-1 capitalize" onClick={() => updateTheme({ borderRadius: r })}>{r === "sharp" ? "Eckig" : r === "rounded" ? "Rund" : "Pill"}</Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {theme.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label>{theme.darkMode ? "Dark Mode" : "Light Mode"}</Label>
                </div>
                <Switch checked={theme.darkMode} onCheckedChange={v => updateTheme({ darkMode: v })} />
              </div>
            </div>
          </div>

          {/* MIDDLE — Live Preview */}
          <div className="space-y-4">
            <Tabs value={previewTab} onValueChange={setPreviewTab}>
              <TabsList className="w-full">
                <TabsTrigger value="invitation" className="flex-1">Einladung</TabsTrigger>
                <TabsTrigger value="rsvp" className="flex-1">RSVP</TabsTrigger>
                <TabsTrigger value="portal" className="flex-1">Gästeportal</TabsTrigger>
              </TabsList>

              <TabsContent value="invitation">
                <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elevated text-center space-y-6">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: theme.accentColor + "20" }}>
                    <Sparkles className="h-8 w-8" style={{ color: theme.accentColor }} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Wir heiraten</p>
                    <h2 className="text-3xl font-serif font-bold">{theme.coupleName.partner1} & {theme.coupleName.partner2}</h2>
                    <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: theme.accentColor }} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-serif">{new Date(theme.eventDate).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</p>
                    <p className="text-sm text-muted-foreground">{theme.eventLocation}</p>
                  </div>
                  <Button style={{ backgroundColor: theme.accentColor }} className="text-primary-foreground">Zur Einladung</Button>
                </div>
              </TabsContent>

              <TabsContent value="rsvp">
                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elevated space-y-4">
                  <h3 className="font-serif font-semibold text-lg">RSVP</h3>
                  <div className="space-y-3">
                    <div className="h-10 rounded-lg border border-input bg-background px-3 flex items-center text-sm text-muted-foreground">Vorname</div>
                    <div className="h-10 rounded-lg border border-input bg-background px-3 flex items-center text-sm text-muted-foreground">Nachname</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl border-2 text-center text-sm" style={{ borderColor: theme.accentColor + "40" }}>Ja, wir kommen! 🎉</div>
                      <div className="p-3 rounded-xl border-2 border-border text-center text-sm">Leider nicht 😢</div>
                    </div>
                  </div>
                  <Button className="w-full" style={{ backgroundColor: theme.accentColor }}>Absenden</Button>
                </div>
              </TabsContent>

              <TabsContent value="portal">
                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elevated space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-xl font-serif font-bold">Hallo, Maria! 👋</p>
                    <p className="text-sm text-muted-foreground">{theme.guestPortalGreeting}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Tagesablauf", "Dein Tisch", "Anreise"].map(t => (
                      <div key={t} className="p-3 rounded-xl text-center text-xs font-medium" style={{ backgroundColor: theme.accentColor + "15", color: theme.accentColor }}>{t}</div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50 text-sm">
                    <p className="font-medium">📅 Countdown</p>
                    <p className="text-muted-foreground text-xs">Noch 142 Tage bis zu eurem großen Tag!</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT — Templates */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-sm">Design-Templates</h3>
            <div className="space-y-3">
              {templateCards.map(t => (
                <button key={t.id} onClick={() => applyTemplate(t.id)} className="w-full p-4 rounded-2xl border-2 border-border/50 hover:border-accent/40 transition-all text-left space-y-2 bg-card shadow-elegant hover:shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: t.color + "20" }}>{t.emoji}</div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}80)` }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ThemeStudio;
