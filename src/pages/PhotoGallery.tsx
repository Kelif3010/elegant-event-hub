import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { galleryPhotos } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Camera, Heart, Download, Trash2, Eye, Search, Grid3X3, LayoutList, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState(galleryPhotos);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [featured, setFeatured] = useState<string[]>(["1", "3"]);

  const categories = [
    { id: "all", label: "Alle" },
    { id: "pre-wedding", label: "Vor der Hochzeit" },
    { id: "preparation", label: "Vorbereitungen" },
    { id: "ceremony", label: "Trauung" },
    { id: "party", label: "Feier" },
  ];

  const filtered = photos.filter(p =>
    (filter === "all" || p.category === filter) &&
    (p.caption.toLowerCase().includes(search.toLowerCase()) || p.uploadedBy.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleFeatured = (id: string) => {
    setFeatured(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Fotogalerie</h1>
            <p className="text-muted-foreground text-sm">{photos.length} Fotos · {featured.length} kuratiert</p>
          </div>
          <Button className="bg-champagne hover:bg-champagne/90 text-accent-foreground">
            <Camera className="h-4 w-4 mr-2" /> Fotos hochladen
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Gesamt", value: photos.length, icon: "📸" },
            { label: "Kuratiert", value: featured.length, icon: "⭐" },
            { label: "Likes gesamt", value: photos.reduce((s, p) => s + p.likes, 0), icon: "❤️" },
            { label: "Fotografen", value: new Set(photos.map(p => p.uploadedBy)).size, icon: "👤" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  filter === cat.id ? "bg-champagne text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >{cat.label}</button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            <Button size="icon" variant={view === "grid" ? "default" : "ghost"} onClick={() => setView("grid")}><Grid3X3 className="h-4 w-4" /></Button>
            <Button size="icon" variant={view === "list" ? "default" : "ghost"} onClick={() => setView("list")}><LayoutList className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Grid */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(photo => (
              <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-elegant aspect-square">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                {featured.includes(photo.id) && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-champagne text-accent-foreground text-xs"><Star className="h-3 w-3 mr-0.5" /> Kuratiert</Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-primary-foreground text-sm font-medium">{photo.caption}</p>
                  <p className="text-primary-foreground/70 text-xs">{photo.uploadedBy}</p>
                  <div className="flex gap-1 mt-2">
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground" onClick={() => toggleFeatured(photo.id)}>
                      <Star className={cn("h-3.5 w-3.5", featured.includes(photo.id) && "fill-champagne text-champagne")} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground"><Download className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground"><Eye className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(photo => (
              <div key={photo.id} className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border/50 hover:shadow-elegant transition-shadow">
                <img src={photo.url} alt={photo.caption} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{photo.caption}</p>
                  <p className="text-xs text-muted-foreground">{photo.uploadedBy} · {photo.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">❤️ {photo.likes}</span>
                  {featured.includes(photo.id) && <Badge variant="secondary" className="text-xs">⭐</Badge>}
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleFeatured(photo.id)}>
                    <Star className={cn("h-3.5 w-3.5", featured.includes(photo.id) && "fill-champagne text-champagne")} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PhotoGallery;
