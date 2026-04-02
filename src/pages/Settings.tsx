import { Palette, Layout, Settings2, Bell, Shield, FormInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";

const SettingsPage = () => (
  <DashboardLayout>
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Einstellungen</h1>
        <p className="text-muted-foreground">Verwaltet euer Event, Branding und Benachrichtigungen.</p>
      </div>

      <Tabs defaultValue="event" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="event">Event</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="privacy">Datenschutz</TabsTrigger>
        </TabsList>

        <TabsContent value="event" className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2 mb-2"><Settings2 className="h-5 w-5 text-champagne" /><h2 className="text-lg font-serif font-semibold">Event-Details</h2></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Event-Name</Label><Input defaultValue="Hochzeit Sophie & Alexander" /></div>
              <div><Label>Datum</Label><Input type="date" defaultValue="2025-09-13" /></div>
              <div><Label>Location</Label><Input defaultValue="Schloss Rothenburg" /></div>
              <div><Label>Adresse</Label><Input defaultValue="Schlossallee 12, 91541 Rothenburg" /></div>
            </div>
            <div><Label>Dresscode</Label><Input defaultValue="Eleganter Abendstil" /></div>
            <Button>Speichern</Button>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2 mb-2"><FormInput className="h-5 w-5 text-champagne" /><h2 className="text-lg font-serif font-semibold">RSVP-Formular</h2></div>
            <div className="space-y-4">
              {["Essenswahl anzeigen", "Allergien abfragen", "Unterkunft-Option", "Songwünsche", "Freitext-Nachricht"].map((f) => (
                <div key={f} className="flex items-center justify-between">
                  <Label>{f}</Label>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2 mb-2"><Palette className="h-5 w-5 text-champagne" /><h2 className="text-lg font-serif font-semibold">Design & Theme</h2></div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "Champagne", colors: "from-[#C9A96E] to-[#E8D5A8]" },
                { name: "Sage", colors: "from-[#5B8A72] to-[#A8C5B5]" },
                { name: "Rosé", colors: "from-[#D4899B] to-[#F0C5CF]" },
                { name: "Classic", colors: "from-[#2C3E50] to-[#5D6D7E]" },
              ].map((t) => (
                <button key={t.name} className="p-4 rounded-xl border-2 border-border hover:border-champagne transition-all text-center space-y-2">
                  <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.colors}`} />
                  <span className="text-xs font-medium">{t.name}</span>
                </button>
              ))}
            </div>
            <div><Label>Eigene Domain</Label><Input placeholder="sophie-und-alex.de" /></div>
            <div><Label>Hashtag</Label><Input defaultValue="#SophieUndAlex2025" /></div>
            <Button>Speichern</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2 mb-2"><Bell className="h-5 w-5 text-champagne" /><h2 className="text-lg font-serif font-semibold">Benachrichtigungen</h2></div>
            {["Neue RSVP-Antwort", "Gast aktualisiert Daten", "Erinnerung an offene Aufgaben", "Wöchentlicher Statusbericht"].map((n) => (
              <div key={n} className="flex items-center justify-between">
                <Label>{n}</Label>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2 mb-2"><Shield className="h-5 w-5 text-champagne" /><h2 className="text-lg font-serif font-semibold">Datenschutz</h2></div>
            {["Gästeseite öffentlich zugänglich", "Gästeliste für andere Gäste sichtbar", "Fotos-Upload erlauben", "Kommentarfunktion aktivieren"].map((p) => (
              <div key={p} className="flex items-center justify-between">
                <Label>{p}</Label>
                <Switch defaultChecked={p.includes("öffentlich")} />
              </div>
            ))}
            <Button variant="outline">Daten exportieren</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
