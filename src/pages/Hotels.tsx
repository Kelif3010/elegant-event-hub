import { useState } from "react";
import { hotels } from "@/data/mockData";
import { Star, Bus, Car, Train, Plane, MapPin, Clock, Hotel, Copy, ExternalLink, Bike, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

const shuttleTimes = {
  hin: [{ time: "14:30", spots: 12 }, { time: "15:00", spots: 8 }, { time: "15:15", spots: 15 }],
  rueck: [{ time: "23:00", spots: 20 }, { time: "00:00", spots: 15 }, { time: "01:00", spots: 10 }],
};

const travelModes = [
  { id: "car", icon: Car, label: "Auto", details: "Schlossallee 12, 91541 Rothenburg ob der Tauber", extra: "Kostenlose Parkplätze direkt am Schloss (ca. 50 Stellplätze)", action: "Google Maps öffnen" },
  { id: "train", icon: Train, label: "Bahn", details: "Nächster Bahnhof: Rothenburg ob der Tauber (2 km)", extra: "Fahrzeit ab München: 2h 45min, ab Frankfurt: 2h 30min", action: "DB Navigator" },
  { id: "plane", icon: Plane, label: "Flugzeug", details: "Nürnberg (NUE) — 80 km, ca. 1h Transfer", extra: "Alternativ: Frankfurt (FRA) — 200 km. Mietwagen empfohlen.", action: "Flüge suchen" },
  { id: "bike", icon: Bike, label: "Fahrrad", details: "Route über den Taubertal-Radweg", extra: "Entfernung ab Rothenburg Zentrum: 2 km, leicht hügelig", action: "Route anzeigen" },
];

const Hotels = () => {
  const { toast } = useToast();
  const [selectedTravel, setSelectedTravel] = useState("car");
  const [reservedShuttle, setReservedShuttle] = useState<string[]>([]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Kopiert!", description: "Buchungscode wurde kopiert." });
  };

  const reserveShuttle = (time: string) => {
    setReservedShuttle(p => [...p, time]);
    toast({ title: "Platz reserviert", description: `Shuttle um ${time} Uhr reserviert.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Anreise & Hotels</h1>
          <p className="text-muted-foreground">Alles rund um Unterkunft, Shuttle und Anfahrt.</p>
        </div>

        {/* SVG Map */}
        <div className="relative rounded-2xl bg-card border border-border/50 shadow-elegant overflow-hidden" style={{ height: "380px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-blue-950/20">
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 200 300 C 250 260 350 240 420 170" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" opacity="0.5" strokeDasharray="10,5">
                <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 600 280 C 550 240 480 210 420 170" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" opacity="0.5" strokeDasharray="10,5">
                <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Venue Pin */}
            <div className="absolute flex flex-col items-center" style={{ left: "55%", top: "38%", transform: "translate(-50%, -100%)" }}>
              <div className="w-12 h-12 rounded-full bg-accent shadow-lg flex items-center justify-center"><Heart className="h-5 w-5 text-accent-foreground" /></div>
              <div className="mt-2 bg-card/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-elegant border border-border/50 text-center">
                <p className="text-xs font-semibold">Schloss Rothenburg</p>
                <p className="text-[10px] text-muted-foreground">Trauung & Feier</p>
              </div>
            </div>

            {/* Hotel Pins */}
            {[
              { name: "Hotel Schlossblick", x: "25%", y: "70%" },
              { name: "Romantik Hotel", x: "75%", y: "62%" },
              { name: "Goldener Hirsch", x: "40%", y: "80%" },
            ].map((h, i) => (
              <div key={i} className="absolute group" style={{ left: h.x, top: h.y, transform: "translate(-50%, -100%)" }}>
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <Hotel className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div className="mt-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-[10px] font-medium">{h.name}</p>
                </div>
              </div>
            ))}

            {/* Other markers */}
            <div className="absolute" style={{ left: "65%", top: "52%", transform: "translate(-50%, -50%)" }}>
              <div className="w-7 h-7 rounded-lg bg-secondary border border-border/50 flex items-center justify-center" title="Parkplatz"><span className="text-xs">🅿️</span></div>
            </div>
            <div className="absolute" style={{ left: "15%", top: "35%", transform: "translate(-50%, -50%)" }}>
              <div className="w-7 h-7 rounded-lg bg-secondary border border-border/50 flex items-center justify-center" title="Bahnhof"><span className="text-xs">🚆</span></div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-elegant border border-border/50 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Legende</p>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-[11px]">Location</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-300" /><span className="text-[11px]">Hotels</span></div>
            <div className="flex items-center gap-2"><span className="text-[11px]">🅿️</span><span className="text-[11px]">Parkplatz</span></div>
            <div className="flex items-center gap-2"><span className="text-[11px]">🚆</span><span className="text-[11px]">Bahnhof</span></div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="bg-secondary/50 w-full flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="hotels" className="gap-1.5"><Hotel className="h-3.5 w-3.5" /> Hotels</TabsTrigger>
            <TabsTrigger value="shuttle" className="gap-1.5"><Bus className="h-3.5 w-3.5" /> Shuttle</TabsTrigger>
            <TabsTrigger value="anreise" className="gap-1.5"><Car className="h-3.5 w-3.5" /> Anreise</TabsTrigger>
            <TabsTrigger value="parken" className="gap-1.5"><MapPin className="h-3.5 w-3.5" /> Parken</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            <div className="grid lg:grid-cols-2 gap-6">
              {hotels.map(h => (
                <div key={h.name} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-semibold">{h.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {h.stars > 0 && <div className="flex">{Array.from({ length: h.stars }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}</div>}
                        <span className="text-sm text-muted-foreground">{h.priceRange}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{h.distance}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{h.description}</p>
                  {h.contingent && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/5 border border-accent/10">
                      <span className="text-xs">📋</span>
                      <p className="text-xs text-muted-foreground">{h.contingent}</p>
                      <Button size="sm" variant="ghost" className="ml-auto h-7 text-xs gap-1" onClick={() => copyCode("HOCHZEIT2025")}><Copy className="h-3 w-3" /> Code</Button>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    {h.shuttle && <Badge variant="secondary" className="text-xs"><Bus className="h-3 w-3 mr-1" /> Shuttle</Badge>}
                    <Button variant="outline" size="sm" className="gap-1"><ExternalLink className="h-3 w-3" /> Website</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shuttle">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h3 className="font-serif font-semibold flex items-center gap-2"><Bus className="h-4 w-4 text-accent" /> Hinfahrt</h3>
                <div className="space-y-2">
                  {shuttleTimes.hin.map(s => (
                    <div key={s.time} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                      <div><p className="font-medium text-sm">{s.time} Uhr</p><p className="text-xs text-muted-foreground">{s.spots} Plätze frei</p></div>
                      {reservedShuttle.includes(s.time) ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0"><Check className="h-3 w-3 mr-1" /> Reserviert</Badge>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => reserveShuttle(s.time)}>Platz reservieren</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h3 className="font-serif font-semibold flex items-center gap-2"><Bus className="h-4 w-4 text-accent" /> Rückfahrt</h3>
                <div className="space-y-2">
                  {shuttleTimes.rueck.map(s => (
                    <div key={s.time} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                      <div><p className="font-medium text-sm">{s.time} Uhr</p><p className="text-xs text-muted-foreground">{s.spots} Plätze frei</p></div>
                      {reservedShuttle.includes(s.time) ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0"><Check className="h-3 w-3 mr-1" /> Reserviert</Badge>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => reserveShuttle(s.time)}>Platz reservieren</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-sm text-muted-foreground"><strong>Abholpunkt:</strong> Marktplatz Rothenburg, vor dem Rathaus · <Button variant="link" className="text-accent p-0 h-auto text-sm">In Karte zeigen</Button></p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anreise">
            <div className="space-y-4">
              <div className="flex gap-3 justify-center">
                {travelModes.map(m => (
                  <button key={m.id} onClick={() => setSelectedTravel(m.id)} className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[90px]",
                    selectedTravel === m.id ? "border-accent bg-accent/5" : "border-border/50 hover:border-accent/30"
                  )}>
                    <m.icon className={cn("h-6 w-6", selectedTravel === m.id ? "text-accent" : "text-muted-foreground")} />
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
              {travelModes.filter(m => m.id === selectedTravel).map(m => (
                <div key={m.id} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 max-w-lg mx-auto animate-fade-in">
                  <h3 className="font-serif font-semibold flex items-center gap-2"><m.icon className="h-5 w-5 text-accent" /> {m.label}</h3>
                  <p className="text-sm">{m.details}</p>
                  <p className="text-sm text-muted-foreground">{m.extra}</p>
                  <Button variant="outline" size="sm" className="gap-1"><ExternalLink className="h-3 w-3" /> {m.action}</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parken">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h3 className="font-serif font-semibold">Parkplatz am Schloss</h3>
                <div className="aspect-video rounded-xl bg-secondary/30 flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <MapPin className="h-8 w-8 mx-auto text-accent" />
                    <p className="text-sm">Parkplatz-Karte</p>
                    <p className="text-xs">ca. 50 Stellplätze, kostenlos</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✅ Kostenlos für alle Hochzeitsgäste</p>
                  <p>✅ Beleuchteter Parkplatz</p>
                  <p>⚠️ Begrenzte Stellplätze — frühzeitig kommen empfohlen</p>
                  <p>📍 Zufahrt über Schlossallee, Beschilderung ab Ortseingang</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Hotels;
