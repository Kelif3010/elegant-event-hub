import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Eye, GripVertical, ChevronUp, ChevronDown, Settings2, Heart, Clock, UtensilsCrossed, Camera, Music, Gift, Car, Hotel, BookOpen, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortalSection {
  id: string;
  label: string;
  icon: any;
  enabled: boolean;
  description: string;
}

const defaultSections: PortalSection[] = [
  { id: "overview", label: "Übersicht", icon: Heart, enabled: true, description: "Begrüßung, Datum, Ort, Dresscode" },
  { id: "timeline", label: "Tagesablauf", icon: Clock, enabled: true, description: "Zeitlicher Ablauf des Events" },
  { id: "table", label: "Tischzuweisung", icon: UtensilsCrossed, enabled: true, description: "Tisch- und Sitzinformationen" },
  { id: "menu", label: "Menü", icon: UtensilsCrossed, enabled: true, description: "Menükarte mit Gängen" },
  { id: "map", label: "Interaktive Karte", icon: MapPin, enabled: true, description: "Location, Hotels, Shuttle-Routen" },
  { id: "photos", label: "Fotogalerie", icon: Camera, enabled: true, description: "Foto-Upload und Galerie" },
  { id: "music", label: "Musik & Playlist", icon: Music, enabled: true, description: "Song-Vorschläge und Voting" },
  { id: "wishlist", label: "Wunschliste", icon: Gift, enabled: true, description: "Geschenke-Registry" },
  { id: "travel", label: "Anreise", icon: Car, enabled: true, description: "Auto, Bahn, Shuttle, Flug" },
  { id: "hotels", label: "Hotels", icon: Hotel, enabled: true, description: "Empfohlene Unterkünfte" },
  { id: "guestbook", label: "Gästebuch", icon: BookOpen, enabled: true, description: "Nachrichten und Wünsche" },
];

const GuestPortalManager = () => {
  const [sections, setSections] = useState(defaultSections);
  const [showPreview, setShowPreview] = useState(false);

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const next = [...sections];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= next.length) return;
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setSections(next);
  };

  const enabledSections = sections.filter(s => s.enabled);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Inhalte verwalten</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Gästeportal</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2"><Eye className="h-4 w-4" /> Vorschau</Button>
            <Button variant="outline" onClick={() => window.open("/guest-portal", "_blank")} className="gap-2">Portal öffnen</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Section Manager */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-semibold">Sektionen & Reihenfolge</h2>
              <Badge variant="secondary">{enabledSections.length} aktiv</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Aktiviere, deaktiviere und sortiere die Bereiche deines Gästeportals.</p>
            <div className="space-y-2">
              {sections.map((s, i) => (
                <div key={s.id} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", s.enabled ? "border-border/50 bg-card" : "border-transparent bg-secondary/30 opacity-60")}>
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", s.enabled ? "bg-champagne-light" : "bg-secondary")}>
                    <s.icon className={cn("h-4 w-4", s.enabled ? "text-champagne" : "text-muted-foreground")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveSection(i, -1)} className="p-1 rounded hover:bg-secondary"><ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    <button onClick={() => moveSection(i, 1)} className="p-1 rounded hover:bg-secondary"><ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    <Switch checked={s.enabled} onCheckedChange={() => toggleSection(s.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <h2 className="text-lg font-serif font-semibold">Navigation-Vorschau</h2>
            <p className="text-sm text-muted-foreground">So sieht die Tab-Navigation für eure Gäste aus:</p>
            <div className="flex flex-wrap gap-2">
              {enabledSections.map(s => (
                <div key={s.id} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-sm">
                  <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-champagne-light/50 border border-champagne/20">
              <p className="text-sm"><strong>{enabledSections.length}</strong> Bereiche aktiv · Gäste sehen die Tabs in der obigen Reihenfolge</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Schnellinfos</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-secondary/30 text-center">
                  <p className="text-2xl font-serif font-bold">11</p>
                  <p className="text-xs text-muted-foreground">Bereiche gesamt</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/30 text-center">
                  <p className="text-2xl font-serif font-bold">{enabledSections.length}</p>
                  <p className="text-xs text-muted-foreground">Aktive Bereiche</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview */}
      <Sheet open={showPreview} onOpenChange={setShowPreview}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader><SheetTitle className="font-serif">Gästeportal Vorschau</SheetTitle></SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="text-center space-y-2 py-6 bg-gradient-to-b from-champagne-light/50 to-transparent rounded-2xl">
              <Heart className="h-6 w-6 text-champagne mx-auto" />
              <h2 className="text-xl font-serif font-semibold">Sophie & Alexander</h2>
              <p className="text-sm text-muted-foreground">13. September 2025 · Schloss Rothenburg</p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {enabledSections.map(s => (
                <div key={s.id} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-secondary text-xs">
                  <s.icon className="h-3 w-3" />{s.label}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {enabledSections.map(s => (
                <div key={s.id} className="p-4 rounded-xl border border-border/50 bg-secondary/20">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-champagne" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default GuestPortalManager;
