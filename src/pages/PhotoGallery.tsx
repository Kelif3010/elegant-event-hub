import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { galleryPhotos } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Camera, Upload, Download, Trash2, Heart, Eye, Search, Star,
  Check, X, Grid, List, Play, Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import EmptyState, { PhotosIllustration } from "@/components/EmptyState";

interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
  date: string;
  likes: number;
  category: string;
  approved: boolean;
  featured: boolean;
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(() =>
    galleryPhotos.map(p => ({
      ...p,
      approved: Math.random() > 0.3,
      featured: ["1", "3"].includes(p.id),
    }))
  );
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "featured">("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [slideshow, setSlideshow] = useState(false);
  const [slideshowIdx, setSlideshowIdx] = useState(0);

  const filtered = photos
    .filter(p => {
      if (filter === "approved") return p.approved;
      if (filter === "pending") return !p.approved;
      if (filter === "featured") return p.featured;
      return true;
    })
    .filter(p => p.caption.toLowerCase().includes(search.toLowerCase()));

  const stats = {
    total: photos.length,
    approved: photos.filter(p => p.approved).length,
    pending: photos.filter(p => !p.approved).length,
    featured: photos.filter(p => p.featured).length,
  };

  const approvePhoto = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? { ...p, approved: true } : p));
  const toggleFeatured = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  const deletePhoto = (id: string) => setPhotos(prev => prev.filter(p => p.id !== id));
  const toggleSelect = (id: string) => setSelectedPhotos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const bulkApprove = () => { setPhotos(prev => prev.map(p => selectedPhotos.includes(p.id) ? { ...p, approved: true } : p)); setSelectedPhotos([]); };
  const bulkDelete = () => { setPhotos(prev => prev.filter(p => !selectedPhotos.includes(p.id))); setSelectedPhotos([]); };

  const mockUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100; }
        return p + 20;
      });
    }, 300);
  };

  // Slideshow
  useEffect(() => {
    if (!slideshow) return;
    const timer = setInterval(() => setSlideshowIdx(i => (i + 1) % filtered.length), 4000);
    return () => clearInterval(timer);
  }, [slideshow, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSlideshow(false); setLightbox(null); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold flex items-center gap-2">
              <Camera className="h-6 w-6 text-primary" /> Fotogalerie
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kuratiere die Hochzeitsfotos eurer Gäste
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Admin</span>
              <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
            </div>
            <Button variant="outline" size="sm" onClick={() => { setSlideshowIdx(0); setSlideshow(true); }} className="gap-1.5">
              <Play className="h-3.5 w-3.5" /> Diashow
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Alle herunterladen
            </Button>
            <Button size="sm" onClick={mockUpload} className="gap-1.5">
              <Upload className="h-3.5 w-3.5" /> Fotos hochladen
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="max-w-sm">
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% hochgeladen</p>
          </div>
        )}

        {/* Upload Drop Zone */}
        <div
          onDragEnter={() => setUploadHover(true)}
          onDragLeave={() => setUploadHover(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); setUploadHover(false); mockUpload(); }}
          className={cn(
            "p-6 rounded-xl border-2 border-dashed transition-all text-center space-y-2",
            uploadHover ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/50 hover:border-primary/30"
          )}
        >
          <Upload className="h-6 w-6 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">Fotos hierher ziehen oder oben hochladen</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Gesamt", value: stats.total, icon: Camera, color: "text-primary" },
            { label: "Freigegeben", value: stats.approved, icon: Check, color: "text-primary" },
            { label: "Ausstehend", value: stats.pending, icon: Eye, color: "text-accent" },
            { label: "Favoriten", value: stats.featured, icon: Star, color: "text-yellow-500" },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className={cn("h-4 w-4", s.color)} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <span className="text-2xl font-semibold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            {([
              { key: "all", label: "Alle" },
              { key: "approved", label: "Freigegeben" },
              { key: "pending", label: "Ausstehend" },
              { key: "featured", label: "Favoriten" },
            ] as const).map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  filter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-8 text-xs w-40" />
            </div>
            <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-colors", viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
              <Grid className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-colors", viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          search || filter !== "all" ? (
            <EmptyState illustration={<PhotosIllustration />} title="Keine Fotos gefunden" description="Versuche einen anderen Filter oder Suchbegriff." />
          ) : (
            <EmptyState illustration={<PhotosIllustration />} title="Noch keine Fotos" description="Ladet eure ersten Fotos hoch oder lasst eure Gäste Bilder über das Portal teilen." actionLabel="Erstes Foto hochladen" onAction={mockUpload} />
          )
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map(photo => (
              <div
                key={photo.id}
                className={cn(
                  "relative bg-card rounded-xl border overflow-hidden group cursor-pointer transition-all",
                  selectedPhotos.includes(photo.id) ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/30"
                )}
                onClick={() => setLightbox(photo)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  {!photo.approved && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-[10px] font-medium">Ausstehend</div>
                  )}
                  {photo.featured && (
                    <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-foreground truncate">{photo.caption}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">{photo.uploadedBy} · {photo.date}</span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Heart className="h-2.5 w-2.5" /> {photo.likes}</span>
                  </div>
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                  <button onClick={() => toggleSelect(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary transition-colors">
                    <Check className={cn("h-3.5 w-3.5", selectedPhotos.includes(photo.id) ? "text-primary" : "text-muted-foreground")} />
                  </button>
                  {isAdmin && !photo.approved && (
                    <button onClick={() => approvePhoto(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary transition-colors">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </button>
                  )}
                  <button onClick={() => toggleFeatured(photo.id)} className="p-2 bg-background rounded-full hover:bg-secondary transition-colors">
                    <Star className={cn("h-3.5 w-3.5", photo.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")} />
                  </button>
                  <button onClick={() => { deletePhoto(photo.id); }} className="p-2 bg-background rounded-full hover:bg-secondary transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Foto</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Hochgeladen von</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Datum</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(photo => (
                    <tr key={photo.id} className="hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setLightbox(photo)}>
                      <td className="p-4">
                        <img src={photo.url} alt={photo.caption} className="h-10 w-10 rounded-lg object-cover" />
                      </td>
                      <td className="p-4 text-sm text-foreground">{photo.uploadedBy}</td>
                      <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{photo.date}</td>
                      <td className="p-4">
                        <span className={cn(
                          "text-xs font-medium px-2.5 py-1 rounded-full",
                          photo.approved ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        )}>
                          {photo.approved ? "Freigegeben" : "Ausstehend"}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1" onClick={e => e.stopPropagation()}>
                        {isAdmin && !photo.approved && (
                          <button onClick={() => approvePhoto(photo.id)} className="p-1.5 rounded hover:bg-secondary text-primary"><Check className="h-3.5 w-3.5" /></button>
                        )}
                        <button onClick={() => toggleFeatured(photo.id)} className="p-1.5 rounded hover:bg-secondary">
                          <Star className={cn("h-3.5 w-3.5", photo.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")} />
                        </button>
                        <button onClick={() => deletePhoto(photo.id)} className="p-1.5 rounded hover:bg-secondary text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedPhotos.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background rounded-xl px-6 py-3 flex items-center gap-4 shadow-xl z-40">
          <span className="text-sm">{selectedPhotos.length} ausgewählt</span>
          <Button size="sm" variant="outline" className="text-foreground border-background/30 hover:bg-background/10" onClick={bulkApprove}>
            <Check className="h-3.5 w-3.5 mr-1.5" /> Freigeben
          </Button>
          <Button size="sm" variant="outline" className="text-foreground border-background/30 hover:bg-background/10" onClick={bulkDelete}>
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Löschen
          </Button>
          <button onClick={() => setSelectedPhotos([])} className="ml-2 text-background/60 hover:text-background"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-lg w-full text-center" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.caption} className="w-full max-h-[50vh] object-contain rounded-xl mb-4" />
            <p className="font-serif font-semibold text-foreground">{lightbox.caption}</p>
            <p className="text-sm text-muted-foreground">{lightbox.uploadedBy} · {lightbox.date}</p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Heart className="h-3.5 w-3.5" /> {lightbox.likes}</span>
              <span className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full",
                lightbox.approved ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
              )}>
                {lightbox.approved ? "Freigegeben" : "Ausstehend"}
              </span>
            </div>
            <div className="flex gap-2 mt-5 justify-center">
              {isAdmin && !lightbox.approved && (
                <Button size="sm" onClick={() => { approvePhoto(lightbox.id); setLightbox({ ...lightbox, approved: true }); }}>Freigeben</Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setLightbox(null)}>Schließen</Button>
            </div>
          </div>
        </div>
      )}

      {/* Slideshow */}
      {slideshow && filtered.length > 0 && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center" onClick={() => setSlideshow(false)}>
          <button className="absolute top-6 right-6 text-primary-foreground hover:text-primary-foreground/80"><X className="h-8 w-8" /></button>
          <div className="max-w-4xl w-full px-8">
            <img src={filtered[slideshowIdx]?.url} alt="" className="w-full max-h-[70vh] object-contain rounded-2xl animate-fade-in" />
            <div className="text-center mt-4">
              <p className="text-primary-foreground font-serif text-lg">{filtered[slideshowIdx]?.caption}</p>
              <p className="text-primary-foreground/60 text-sm">{filtered[slideshowIdx]?.uploadedBy}</p>
              <p className="text-primary-foreground/40 text-xs mt-2">{slideshowIdx + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PhotoGallery;
