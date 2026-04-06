import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { galleryPhotos } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Camera, Download, Eye, Search, Star, Upload, X, Play, Shield, Check, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState, { PhotosIllustration } from "@/components/EmptyState";

type ModerationStatus = "approved" | "pending" | "private";

interface Photo {
  id: string; url: string; caption: string; uploadedBy: string; date: string; likes: number; category: string;
  reactions: Record<string, number>;
  moderationStatus: ModerationStatus;
}

const emojis = [
  { key: "heart", emoji: "❤️" },
  { key: "laugh", emoji: "😂" },
  { key: "wow", emoji: "😍" },
  { key: "cheers", emoji: "🥂" },
];

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(() =>
    galleryPhotos.map(p => ({
      ...p,
      reactions: { heart: p.likes, laugh: Math.floor(Math.random() * 8), wow: Math.floor(Math.random() * 12), cheers: Math.floor(Math.random() * 6) },
      moderationStatus: (["approved", "approved", "pending", "approved", "approved", "private"][Math.floor(Math.random() * 6)] || "approved") as ModerationStatus,
    }))
  );
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState<string[]>(["1", "3"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [slideshow, setSlideshow] = useState(false);
  const [slideshowIdx, setSlideshowIdx] = useState(0);
  const [uploadHover, setUploadHover] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bounceReaction, setBounceReaction] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Alle" },
    { id: "highlights", label: "Highlights" },
    { id: "pending", label: "Ausstehend" },
    { id: "mine", label: "Meine Uploads" },
  ];

  const filtered = photos.filter(p => {
    if (filter === "highlights") return featured.includes(p.id);
    if (filter === "pending") return p.moderationStatus === "pending";
    if (filter === "mine") return p.uploadedBy === "Sophie";
    return true;
  }).filter(p => p.caption.toLowerCase().includes(search.toLowerCase()));

  const toggleFeatured = (id: string) => setFeatured(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const react = (photoId: string, reaction: string) => {
    setBounceReaction(`${photoId}-${reaction}`);
    setTimeout(() => setBounceReaction(null), 400);
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, reactions: { ...p.reactions, [reaction]: (p.reactions[reaction] || 0) + 1 } } : p));
  };

  const approve = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? { ...p, moderationStatus: "approved" } : p));
  const reject = (id: string) => setPhotos(prev => prev.map(p => p.id === id ? { ...p, moderationStatus: "private" } : p));

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

  // Slideshow auto-play
  useEffect(() => {
    if (!slideshow) return;
    const timer = setInterval(() => setSlideshowIdx(i => (i + 1) % filtered.length), 4000);
    return () => clearInterval(timer);
  }, [slideshow, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSlideshow(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const modStatusBadge = (s: ModerationStatus) => {
    if (s === "approved") return <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px]">Freigegeben</Badge>;
    if (s === "pending") return <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">Ausstehend</Badge>;
    return <Badge className="bg-secondary text-muted-foreground border-0 text-[10px]">Privat</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Fotogalerie</h1>
            <p className="text-muted-foreground text-sm">{photos.length} Fotos · {featured.length} kuratiert</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Admin</span>
              <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
            </div>
            <Button variant="outline" size="sm" onClick={() => { setSlideshowIdx(0); setSlideshow(true); }} className="gap-2"><Play className="h-3.5 w-3.5" /> Diashow</Button>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragEnter={() => setUploadHover(true)}
          onDragLeave={() => setUploadHover(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); setUploadHover(false); mockUpload(); }}
          className={cn(
            "p-8 rounded-2xl border-2 border-dashed transition-all text-center space-y-3",
            uploadHover ? "border-accent bg-accent/5 scale-[1.01]" : "border-border/50 hover:border-accent/30"
          )}
        >
          <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">Fotos hierher ziehen</p>
          <Button variant="outline" size="sm" onClick={mockUpload}><Camera className="h-3.5 w-3.5 mr-1" /> oder Fotos auswählen</Button>
          {uploading && (
            <div className="max-w-xs mx-auto">
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-accent transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% hochgeladen</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilter(cat.id)} className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                filter === cat.id ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}>{cat.label}</button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        {filtered.length === 0 ? (
          search || filter !== "all" ? (
            <EmptyState illustration={<PhotosIllustration />} title="Keine Fotos gefunden" description="Versuche einen anderen Filter oder Suchbegriff." />
          ) : (
            <EmptyState illustration={<PhotosIllustration />} title="Noch keine Fotos" description="Ladet eure ersten Fotos hoch oder lasst eure Gäste Bilder über das Portal teilen." actionLabel="Erstes Foto hochladen" onAction={mockUpload} />
          )
        ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map(photo => (
            <div key={photo.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all">
              {featured.includes(photo.id) && <div className="ring-2 ring-accent rounded-2xl absolute inset-0 pointer-events-none z-10" />}
              <img src={photo.url} alt={photo.caption} className="w-full object-cover" style={{ minHeight: "180px" }} />

              {/* Moderation Badge */}
              <div className="absolute top-2 left-2 z-20">{modStatusBadge(photo.moderationStatus)}</div>
              {featured.includes(photo.id) && <div className="absolute top-2 right-2 z-20"><Badge className="bg-accent text-accent-foreground text-[10px]"><Star className="h-2.5 w-2.5 mr-0.5 fill-current" /> Highlight</Badge></div>}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-primary-foreground text-sm font-medium">{photo.caption}</p>
                <p className="text-primary-foreground/70 text-xs">{photo.uploadedBy} · {photo.date}</p>

                {/* Reaction Bar */}
                <div className="flex gap-2 mt-3">
                  {emojis.map(e => (
                    <button
                      key={e.key}
                      onClick={() => react(photo.id, e.key)}
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/30 transition-all",
                        bounceReaction === `${photo.id}-${e.key}` && "scale-125"
                      )}
                    >
                      <span className="text-sm">{e.emoji}</span>
                      <span className="text-[10px] font-medium">{photo.reactions[e.key] || 0}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-1 mt-2">
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground" onClick={() => toggleFeatured(photo.id)}>
                    <Star className={cn("h-3.5 w-3.5", featured.includes(photo.id) && "fill-accent text-accent")} />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>

              {/* Admin Moderation */}
              {isAdmin && photo.moderationStatus === "pending" && (
                <div className="absolute bottom-2 right-2 z-20 flex gap-1">
                  <Button size="sm" className="h-7 bg-emerald-500 hover:bg-emerald-600 text-xs gap-1" onClick={() => approve(photo.id)}><Check className="h-3 w-3" /> Freigeben</Button>
                  <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={() => reject(photo.id)}><XCircle className="h-3 w-3" /> Ablehnen</Button>
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Fullscreen Slideshow */}
      {slideshow && (
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
