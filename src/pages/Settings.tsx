import { Palette, Layout, Settings2, Bell, Shield, FormInput, Heart, Globe, Sun, Moon, User, CreditCard, Download, Trash2, HelpCircle, ExternalLink, Sliders, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme, PRESET_COLORS } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const fontPairings = [
  { value: "elegant", label: "Elegant", fonts: "Playfair Display + Inter" },
  { value: "modern", label: "Modern", fonts: "DM Sans + DM Sans" },
  { value: "romantic", label: "Romantic", fonts: "Cormorant Garamond + Lato" },
  { value: "minimal", label: "Minimal", fonts: "Outfit + Outfit" },
];

const borderOptions = [
  { value: "sharp", label: "Eckig" },
  { value: "rounded", label: "Rund" },
  { value: "pill", label: "Pill" },
];

const SettingsPage = () => {
  const { theme, updateTheme } = useTheme();
  const fontSizeLabels = ["S", "M", "L"];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-semibold">Einstellungen</h1>
            <p className="text-muted-foreground">Verwalte euer Event, Design und Konto.</p>
          </div>
          <Button asChild variant="outline" className="gap-2"><Link to="/theme-studio"><Palette className="h-4 w-4" /> Theme Studio</Link></Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary/50 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1" /> Profil</TabsTrigger>
            <TabsTrigger value="event"><Settings2 className="h-3.5 w-3.5 mr-1" /> Event</TabsTrigger>
            <TabsTrigger value="design"><Palette className="h-3.5 w-3.5 mr-1" /> Design</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1" /> Benachrichtigungen</TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="h-3.5 w-3.5 mr-1" /> Datenschutz</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="h-3.5 w-3.5 mr-1" /> Abo</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-6">
              <div className="flex items-center gap-2 mb-2"><User className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Eure Daten</h2></div>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-serif font-bold text-accent">
                  {theme.coupleName.partner1[0]}{theme.coupleName.partner2[0]}
                </div>
                <div className="space-y-1">
                  <p className="font-serif font-semibold text-lg">{theme.coupleName.partner1} & {theme.coupleName.partner2}</p>
                  <p className="text-sm text-muted-foreground">{theme.eventLocation}</p>
                  <Button variant="outline" size="sm" className="text-xs mt-1">Foto ändern</Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Partner 1</Label><Input value={theme.coupleName.partner1} onChange={e => updateTheme({ coupleName: { ...theme.coupleName, partner1: e.target.value } })} /></div>
                <div><Label>Partner 2</Label><Input value={theme.coupleName.partner2} onChange={e => updateTheme({ coupleName: { ...theme.coupleName, partner2: e.target.value } })} /></div>
              </div>
              <div><Label>E-Mail</Label><Input defaultValue="sophie.alexander@email.de" /></div>
              <div><Label>Sprache</Label>
                <Select value={theme.primaryLanguage} onValueChange={v => updateTheme({ primaryLanguage: v as "de" | "en" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="de">Deutsch</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                </Select>
              </div>
              <Button onClick={() => toast.success("Profil gespeichert")}>Speichern</Button>
            </div>
          </TabsContent>

          {/* Event */}
          <TabsContent value="event" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Settings2 className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Event-Details</h2></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Event-Name</Label><Input defaultValue={`Hochzeit ${theme.coupleName.partner1} & ${theme.coupleName.partner2}`} /></div>
                <div><Label>Datum</Label><Input type="date" value={theme.eventDate} onChange={e => updateTheme({ eventDate: e.target.value })} /></div>
                <div><Label>Location</Label><Input value={theme.eventLocation} onChange={e => updateTheme({ eventLocation: e.target.value })} /></div>
                <div><Label>Adresse</Label><Input defaultValue="Schlossallee 12, 91541 Rothenburg" /></div>
              </div>
              <div><Label>Dresscode</Label><Input defaultValue="Eleganter Abendstil" /></div>
              <div><Label>Hashtag</Label><Input defaultValue="#SophieUndAlex2025" /></div>
              <div><Label>PayPal-Link (für Geldgeschenke)</Label><Input placeholder="https://paypal.me/..." value={theme.paypalLink} onChange={e => updateTheme({ paypalLink: e.target.value })} /></div>
              <div><Label>Gästeportal Begrüßungstext</Label><Input placeholder="Willkommen zu unserer Hochzeit!" value={theme.guestPortalGreeting} onChange={e => updateTheme({ guestPortalGreeting: e.target.value })} /></div>
              <Button onClick={() => toast.success("Event-Details gespeichert")}>Speichern</Button>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><FormInput className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">RSVP-Formular</h2></div>
              {["Essenswahl anzeigen", "Allergien abfragen", "Unterkunft-Option", "Songwünsche", "Freitext-Nachricht", "Flitterwochen-Empfehlung"].map((f) => (
                <div key={f} className="flex items-center justify-between"><Label>{f}</Label><Switch defaultChecked /></div>
              ))}
              <Button variant="outline" asChild><Link to="/rsvp">RSVP-Formular bearbeiten →</Link></Button>
            </div>
          </TabsContent>

          {/* Design - Enhanced */}
          <TabsContent value="design" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-6">
              <div className="flex items-center gap-2 mb-2"><Palette className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Design-Einstellungen</h2></div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-3">
                  {theme.darkMode ? <Moon className="h-5 w-5 text-accent" /> : <Sun className="h-5 w-5 text-accent" />}
                  <div>
                    <Label className="text-sm font-medium">{theme.darkMode ? "Dark Mode" : "Light Mode"}</Label>
                    <p className="text-xs text-muted-foreground">Wechsle zwischen hell und dunkel</p>
                  </div>
                </div>
                <Switch checked={theme.darkMode} onCheckedChange={v => updateTheme({ darkMode: v })} />
              </div>

              {/* Accent Color */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2"><Palette className="h-4 w-4" /> Akzentfarbe</Label>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button key={c.hex} onClick={() => updateTheme({ accentColor: c.hex, accentHSL: c.hsl })} className={cn("w-10 h-10 rounded-xl border-2 transition-all hover:scale-110", theme.accentColor === c.hex ? "border-foreground scale-110 shadow-lg" : "border-transparent")} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground shrink-0">Custom Hex:</Label>
                  <Input value={theme.accentColor} onChange={e => updateTheme({ accentColor: e.target.value })} className="h-8 w-32 font-mono text-xs" placeholder="#C9A96E" />
                  <div className="w-8 h-8 rounded-lg border border-border/50" style={{ backgroundColor: theme.accentColor }} />
                </div>
              </div>

              {/* Font Pairing */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2"><Type className="h-4 w-4" /> Schriftart</Label>
                <div className="grid grid-cols-2 gap-3">
                  {fontPairings.map(fp => (
                    <button key={fp.value} onClick={() => updateTheme({ fontPairing: fp.value as any })} className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all hover:shadow-elegant",
                      theme.fontPairing === fp.value ? "border-accent bg-accent/5" : "border-border/50"
                    )}>
                      <p className="text-sm font-medium">{fp.label}</p>
                      <p className="text-xs text-muted-foreground">{fp.fonts}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2"><Sliders className="h-4 w-4" /> Schriftgröße</Label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">S</span>
                  <Slider
                    value={[theme.fontSize === "S" ? 0 : theme.fontSize === "L" ? 2 : 1]}
                    min={0} max={2} step={1}
                    onValueChange={v => updateTheme({ fontSize: (["S", "M", "L"] as const)[v[0]] })}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">L</span>
                  <Badge variant="outline" className="text-xs">{theme.fontSize?.toUpperCase() || "MD"}</Badge>
                </div>
              </div>

              {/* Border Radius */}
              <div className="space-y-3">
                <Label>Ecken-Stil</Label>
                <div className="flex gap-2">
                  {borderOptions.map(b => (
                    <button key={b.value} onClick={() => updateTheme({ borderRadius: b.value as any })} className={cn(
                      "px-4 py-2 text-xs font-medium transition-all",
                      b.value === "sharp" ? "rounded-none" : b.value === "rounded" ? "rounded-xl" : "rounded-full",
                      "border-2",
                      theme.borderRadius === b.value ? "border-accent bg-accent/10" : "border-border/50"
                    )}>{b.label}</button>
                  ))}
                </div>
              </div>

              {/* Live Mini Preview */}
              <div className="space-y-3 pt-4 border-t border-border/50">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Vorschau</Label>
                <div className="p-6 rounded-2xl border border-border/50 bg-background text-center space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Einladung</p>
                  <h3 className="text-xl font-serif font-semibold" style={{ color: theme.accentColor }}>
                    {theme.coupleName.partner1} & {theme.coupleName.partner2}
                  </h3>
                  <p className="text-sm text-muted-foreground">{theme.eventLocation}</p>
                  <Button size="sm" style={{ backgroundColor: theme.accentColor }} className="text-accent-foreground">Zusagen →</Button>
                </div>
              </div>

              <div><Label>Eigene Domain</Label><Input placeholder="sophie-und-alex.de" /></div>
              <Button variant="outline" asChild className="w-full"><Link to="/theme-studio">Zum vollständigen Theme Studio →</Link></Button>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Bell className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">E-Mail-Benachrichtigungen</h2></div>
              {[
                { label: "Neue RSVP-Antwort", desc: "Sofort benachrichtigt werden", on: true },
                { label: "Gast aktualisiert Daten", desc: "Änderungen an Menü, Hotel etc.", on: true },
                { label: "Neues Foto hochgeladen", desc: "Fotos in der Galerie", on: true },
                { label: "Neuer Gästebuch-Eintrag", desc: "Neue Nachrichten", on: true },
                { label: "Wunsch reserviert", desc: "Wenn ein Geschenk reserviert wird", on: true },
                { label: "Offene Aufgaben-Erinnerung", desc: "Tägliche Erinnerung", on: false },
                { label: "Wöchentlicher Statusbericht", desc: "Zusammenfassung per E-Mail", on: false },
                { label: "Budget-Warnung bei >90%", desc: "Wenn Kategorien fast ausgeschöpft", on: true },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-secondary/20 transition-colors">
                  <div><Label>{n.label}</Label><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <Switch defaultChecked={n.on} />
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Globe className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Push-Benachrichtigungen</h2></div>
              {[
                { label: "Sofortige RSVP-Benachrichtigung", on: true },
                { label: "Tägliche Zusammenfassung", on: false },
                { label: "Aufgaben-Erinnerungen", on: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2"><Label>{n.label}</Label><Switch defaultChecked={n.on} /></div>
              ))}
            </div>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Shield className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Datenschutz & Sichtbarkeit</h2></div>
              {[
                { label: "Gästeseite öffentlich zugänglich", desc: "Zugang nur mit Code", checked: true },
                { label: "Gästeliste für andere sichtbar", desc: "Andere Gäste sehen die Liste", checked: false },
                { label: "Fotos-Upload erlauben", desc: "Gäste können Fotos hochladen", checked: true },
                { label: "Kommentarfunktion aktivieren", desc: "Kommentare im Gästebuch", checked: true },
                { label: "Gästebuch öffentlich", desc: "Alle Gäste sehen alle Einträge", checked: false },
                { label: "Wunschliste anzeigen", desc: "Wunschliste im Gästeportal", checked: true },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-secondary/20 transition-colors">
                  <div><Label>{p.label}</Label><p className="text-xs text-muted-foreground">{p.desc}</p></div>
                  <Switch defaultChecked={p.checked} />
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <h3 className="font-serif font-semibold">Daten verwalten</h3>
              <p className="text-sm text-muted-foreground">Exportiere oder lösche deine Daten gemäß DSGVO.</p>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Daten exportieren</Button>
                <Button variant="outline" className="gap-2 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /> Account löschen</Button>
              </div>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><CreditCard className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Aktueller Plan</h2></div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div>
                  <p className="font-serif font-bold text-lg">Premium</p>
                  <p className="text-sm text-muted-foreground">€29 / Monat · Unbegrenzte Gäste</p>
                </div>
                <Badge className="bg-accent/10 text-accent border-0">Aktiv</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-secondary/30 space-y-1">
                  <p className="text-muted-foreground">Nächste Abrechnung</p>
                  <p className="font-medium">13. Juli 2025</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 space-y-1">
                  <p className="text-muted-foreground">Zahlungsart</p>
                  <p className="font-medium">•••• 4242</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Plan ändern</Button>
                <Button variant="outline">Rechnungen anzeigen</Button>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <h3 className="font-serif font-semibold flex items-center gap-2"><HelpCircle className="h-4 w-4 text-accent" /> Hilfe & Support</h3>
              <p className="text-sm text-muted-foreground">Brauchst du Hilfe? Unser Team ist für dich da.</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="gap-2"><ExternalLink className="h-3.5 w-3.5" /> Hilfe-Center</Button>
                <Button variant="outline" size="sm">Kontakt aufnehmen</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
