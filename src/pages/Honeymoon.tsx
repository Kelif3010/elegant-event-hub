import { useState, useRef, useEffect, lazy, Suspense } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Plus, Heart, Globe as GlobeIcon, ThumbsUp, Trash2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Globe = lazy(() => import("react-globe.gl"));

interface Destination {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  suggestedBy: string;
  votes: number;
  votedBy: string[];
  reason: string;
}

const INITIAL_DESTINATIONS: Destination[] = [
  { id: "1", city: "Santorini", country: "Griechenland", lat: 36.3932, lng: 25.4615, suggestedBy: "Anna M.", votes: 8, votedBy: ["Anna M.", "Max", "Julia"], reason: "Traumhafte Sonnenuntergänge und romantische Atmosphäre" },
  { id: "2", city: "Bali", country: "Indonesien", lat: -8.3405, lng: 115.092, suggestedBy: "Thomas K.", votes: 12, votedBy: ["Thomas K.", "Sarah", "Lena", "Felix"], reason: "Paradiesische Strände, Tempel und Reisfelder" },
  { id: "3", city: "Malediven", country: "Malediven", lat: 3.2028, lng: 73.2207, suggestedBy: "Sarah L.", votes: 15, votedBy: ["Sarah L.", "Tom", "Lisa", "Ben", "Nina"], reason: "Overwater-Bungalows und kristallklares Wasser" },
  { id: "4", city: "Paris", country: "Frankreich", lat: 48.8566, lng: 2.3522, suggestedBy: "Julia R.", votes: 6, votedBy: ["Julia R.", "Mark"], reason: "Die Stadt der Liebe – ein Klassiker!" },
  { id: "5", city: "Tokio", country: "Japan", lat: 35.6762, lng: 139.6503, suggestedBy: "Felix W.", votes: 9, votedBy: ["Felix W.", "Mia", "Jonas"], reason: "Einzigartige Kultur, Essen und Kirschblüten" },
  { id: "6", city: "Kapstadt", country: "Südafrika", lat: -33.9249, lng: 18.4241, suggestedBy: "Lena B.", votes: 7, votedBy: ["Lena B.", "David"], reason: "Safari, Berge und Weinregionen" },
];

const Honeymoon = () => {
  const { theme } = useTheme();
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newDest, setNewDest] = useState({ city: "", country: "", lat: "", lng: "", reason: "", suggestedBy: "" });
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const sortedDestinations = [...destinations].sort((a, b) => b.votes - a.votes);
  const totalVotes = destinations.reduce((sum, d) => sum + d.votes, 0);
  const topDest = sortedDestinations[0];

  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, [globeReady]);

  const handleVote = (id: string) => {
    setDestinations(prev => prev.map(d =>
      d.id === id ? { ...d, votes: d.votes + 1, votedBy: [...d.votedBy, "Du"] } : d
    ));
  };

  const handleDelete = (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
    if (selectedDest?.id === id) setSelectedDest(null);
  };

  const handleAdd = () => {
    if (!newDest.city || !newDest.country) return;
    const dest: Destination = {
      id: Date.now().toString(),
      city: newDest.city,
      country: newDest.country,
      lat: parseFloat(newDest.lat) || 0,
      lng: parseFloat(newDest.lng) || 0,
      suggestedBy: newDest.suggestedBy || "Anonym",
      votes: 1,
      votedBy: [newDest.suggestedBy || "Anonym"],
      reason: newDest.reason || "",
    };
    setDestinations(prev => [...prev, dest]);
    setNewDest({ city: "", country: "", lat: "", lng: "", reason: "", suggestedBy: "" });
    setShowAddDialog(false);
  };

  const handlePointClick = (point: any) => {
    const dest = destinations.find(d => d.lat === point.lat && d.lng === point.lng);
    if (dest) {
      setSelectedDest(dest);
      globeRef.current?.pointOfView({ lat: dest.lat, lng: dest.lng, altitude: 1.5 }, 1000);
    }
  };

  const accentColor = `hsl(${theme.accentHSL})`;
  const isDark = theme.darkMode;

  const globeImage = isDark
    ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
    : "//unpkg.com/three-globe/example/img/earth-day.jpg";
  const bgImage = isDark
    ? "//unpkg.com/three-globe/example/img/night-sky.png"
    : undefined;

  const pointsData = destinations.map(d => ({
    lat: d.lat,
    lng: d.lng,
    altitude: 0.01 + (d.votes / (topDest?.votes || 1)) * 0.15,
    radius: 0.3 + (d.votes / (topDest?.votes || 1)) * 1.2,
    pointColor: d.id === selectedDest?.id ? "#ffffff" : accentColor,
    name: d.city,
  }));

  const labelsData = destinations.map(d => ({
    lat: d.lat,
    lng: d.lng,
    text: `${d.city} (${d.votes})`,
    size: 1.2,
    labelColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground flex items-center gap-2">
              <Plane className="h-7 w-7" style={{ color: accentColor }} />
              Flitterwochen
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Wohin soll die Reise gehen? Gäste stimmen ab!</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} style={{ backgroundColor: accentColor }} className="text-white">
            <Plus className="h-4 w-4 mr-2" /> Reiseziel vorschlagen
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <GlobeIcon className="h-5 w-5 mx-auto mb-1" style={{ color: accentColor }} />
              <p className="text-2xl font-bold text-foreground">{destinations.length}</p>
              <p className="text-xs text-muted-foreground">Reiseziele</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <ThumbsUp className="h-5 w-5 mx-auto mb-1" style={{ color: accentColor }} />
              <p className="text-2xl font-bold text-foreground">{totalVotes}</p>
              <p className="text-xs text-muted-foreground">Stimmen</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <Heart className="h-5 w-5 mx-auto mb-1" style={{ color: accentColor }} />
              <p className="text-2xl font-bold text-foreground">{topDest?.city || "–"}</p>
              <p className="text-xs text-muted-foreground">Favorit</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4 text-center">
              <MapPin className="h-5 w-5 mx-auto mb-1" style={{ color: accentColor }} />
              <p className="text-2xl font-bold text-foreground">{new Set(destinations.map(d => d.country)).size}</p>
              <p className="text-xs text-muted-foreground">Länder</p>
            </CardContent>
          </Card>
        </div>

        {/* Globe + Ranking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Globe */}
          <Card className="lg:col-span-2 bg-card border-border/50 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif">Weltkarte der Vorschläge</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative" style={{ height: "500px" }}>
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: accentColor }} />
                </div>
              }>
                <Globe
                  ref={globeRef}
                  globeImageUrl={globeImage}
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  backgroundImageUrl={bgImage}
                  backgroundColor={isDark ? "#000011" : "#f0f4f8"}
                  pointsData={pointsData}
                  pointColor={(d: any) => d.pointColor}
                  pointAltitude="altitude"
                  pointRadius="radius"
                  pointsMerge={false}
                  onPointClick={handlePointClick}
                  labelsData={labelsData}
                  labelText="text"
                  labelSize="size"
                  labelColor={(d: any) => d.labelColor}
                  labelDotRadius={0.4}
                  labelAltitude={0.05}
                  atmosphereColor={accentColor}
                  atmosphereAltitude={0.2}
                  animateIn={true}
                  onGlobeReady={() => setGlobeReady(true)}
                  width={undefined}
                  height={500}
                />
              </Suspense>
            </CardContent>
          </Card>

          {/* Ranking */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif">Ranking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[460px] overflow-y-auto">
              {sortedDestinations.map((dest, i) => {
                const pct = topDest ? Math.round((dest.votes / topDest.votes) * 100) : 0;
                return (
                  <button
                    key={dest.id}
                    onClick={() => {
                      setSelectedDest(dest);
                      globeRef.current?.pointOfView({ lat: dest.lat, lng: dest.lng, altitude: 1.5 }, 1000);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedDest?.id === dest.id
                        ? "border-accent bg-accent/10"
                        : "border-border/50 hover:border-accent/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{dest.city}</p>
                          <p className="text-xs text-muted-foreground">{dest.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-xs">{dest.votes} Stimmen</Badge>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVote(dest.id); }}
                          className="p-1 rounded-md hover:bg-accent/20 transition-colors"
                          title="Abstimmen"
                        >
                          <ThumbsUp className="h-3.5 w-3.5" style={{ color: accentColor }} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(dest.id); }}
                          className="p-1 rounded-md hover:bg-destructive/20 transition-colors"
                          title="Entfernen"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                      <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accentColor }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">💡 {dest.reason}</p>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Selected Detail */}
        {selectedDest && (
          <Card className="bg-card border-border/50 border-l-4" style={{ borderLeftColor: accentColor }}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground">{selectedDest.city}, {selectedDest.country}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedDest.reason}</p>
                  <p className="text-xs text-muted-foreground mt-2">Vorgeschlagen von <span className="font-medium text-foreground">{selectedDest.suggestedBy}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: accentColor }}>{selectedDest.votes}</p>
                    <p className="text-xs text-muted-foreground">Stimmen</p>
                  </div>
                  <Button onClick={() => handleVote(selectedDest.id)} variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" /> Abstimmen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Reiseziel vorschlagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Stadt (z.B. Santorini)" value={newDest.city} onChange={e => setNewDest(p => ({ ...p, city: e.target.value }))} />
            <Input placeholder="Land (z.B. Griechenland)" value={newDest.country} onChange={e => setNewDest(p => ({ ...p, country: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Breitengrad" type="number" value={newDest.lat} onChange={e => setNewDest(p => ({ ...p, lat: e.target.value }))} />
              <Input placeholder="Längengrad" type="number" value={newDest.lng} onChange={e => setNewDest(p => ({ ...p, lng: e.target.value }))} />
            </div>
            <Input placeholder="Dein Name" value={newDest.suggestedBy} onChange={e => setNewDest(p => ({ ...p, suggestedBy: e.target.value }))} />
            <Input placeholder="Warum dieses Ziel?" value={newDest.reason} onChange={e => setNewDest(p => ({ ...p, reason: e.target.value }))} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Abbrechen</Button>
            <Button onClick={handleAdd} style={{ backgroundColor: accentColor }} className="text-white">Vorschlagen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Honeymoon;
