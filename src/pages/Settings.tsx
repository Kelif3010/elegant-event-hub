import { Palette, Layout, Settings2, Bell, Shield, FormInput, Heart, Globe, Sun, Moon, User, CreditCard, Download, Trash2, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme, PRESET_COLORS } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const { theme, updateTheme } = useTheme();

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
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
            <TabsTrigger value="privacy">Datenschutz</TabsTrigger>
            <TabsTrigger value="billing">Abo & Zahlung</TabsTrigger>
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

          {/* Design */}
          <TabsContent value="design" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Palette className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Schnelles Design</h2></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label>{theme.darkMode ? "Dark Mode" : "Light Mode"}</Label>
                </div>
                <Switch checked={theme.darkMode} onCheckedChange={v => updateTheme({ darkMode: v })} />
              </div>
              <div className="space-y-2">
                <Label>Akzentfarbe</Label>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button key={c.hex} onClick={() => updateTheme({ accentColor: c.hex, accentHSL: c.hsl })} className={cn("w-8 h-8 rounded-lg border-2 transition-all", theme.accentColor === c.hex ? "border-foreground scale-110" : "border-transparent")} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Schriftart</Label>
                <Select value={theme.fontPairing} onValueChange={v => updateTheme({ fontPairing: v as any })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elegant">Elegant (Playfair + Inter)</SelectItem>
                    <SelectItem value="modern">Modern (DM Sans)</SelectItem>
                    <SelectItem value="romantic">Romantic (Cormorant + Lato)</SelectItem>
                    <SelectItem value="minimal">Minimal (Outfit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Eigene Domain</Label><Input placeholder="sophie-und-alex.de" /></div>
              <Button variant="outline" asChild className="w-full"><Link to="/theme-studio">Zum vollständigen Theme Studio →</Link></Button>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Bell className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">E-Mail-Benachrichtigungen</h2></div>
              {["Neue RSVP-Antwort", "Gast aktualisiert Daten", "Neues Foto hochgeladen", "Neuer Gästebuch-Eintrag", "Wunsch reserviert", "Erinnerung an offene Aufgaben", "Wöchentlicher Statusbericht", "Budget-Warnung bei >90%"].map((n) => (
                <div key={n} className="flex items-center justify-between py-1"><Label>{n}</Label><Switch defaultChecked /></div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Globe className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Push-Benachrichtigungen</h2></div>
              {["Sofortige RSVP-Benachrichtigung", "Tägliche Zusammenfassung", "Aufgaben-Erinnerungen"].map((n) => (
                <div key={n} className="flex items-center justify-between py-1"><Label>{n}</Label><Switch defaultChecked={n.includes("Sofortige")} /></div>
              ))}
            </div>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 mb-2"><Shield className="h-5 w-5 text-accent" /><h2 className="text-lg font-serif font-semibold">Datenschutz & Sichtbarkeit</h2></div>
              {[
                { label: "Gästeseite öffentlich zugänglich", checked: true },
                { label: "Gästeliste für andere Gäste sichtbar", checked: false },
                { label: "Fotos-Upload erlauben", checked: true },
                { label: "Kommentarfunktion aktivieren", checked: true },
                { label: "Gästebuch öffentlich einsehbar", checked: false },
                { label: "Wunschliste anzeigen", checked: true },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between py-1"><Label>{p.label}</Label><Switch defaultChecked={p.checked} /></div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <h3 className="font-serif font-semibold">Daten verwalten</h3>
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
                <div className="p-3 rounded-xl bg-secondary/30"><p className="text-muted-foreground">Nächste Abrechnung</p><p className="font-medium">13. Juli 2025</p></div>
                <div className="p-3 rounded-xl bg-secondary/30"><p className="text-muted-foreground">Zahlungsart</p><p className="font-medium">•••• 4242</p></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Plan ändern</Button>
                <Button variant="outline">Rechnungen anzeigen</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
