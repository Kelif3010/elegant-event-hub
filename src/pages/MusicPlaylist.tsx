import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { playlistSongs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Music, ThumbsUp, ExternalLink, Link2, Trash2, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState, { MusicIllustration } from "@/components/EmptyState";

const MusicPlaylist = () => {
  const [songs, setSongs] = useState(playlistSongs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/playlist/...");
  const [appleLink, setAppleLink] = useState("https://music.apple.com/playlist/...");

  const categories = [
    { id: "all", label: "Alle" },
    { id: "first-dance", label: "Eröffnungstanz" },
    { id: "romantic", label: "Romantisch" },
    { id: "party", label: "Party" },
  ];

  const filtered = songs
    .filter(s => (filter === "all" || s.category === filter) && (s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => b.votes - a.votes);

  const removeSong = (id: string) => setSongs(prev => prev.filter(s => s.id !== id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Musik & Playlist 🎵</h1>
            <p className="text-muted-foreground text-sm">{songs.length} Songs · Gäste können über das Portal Songs vorschlagen</p>
          </div>
        </div>

        {/* Streaming Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎧</span>
              <h3 className="font-medium text-sm">Spotify verknüpfen</h3>
            </div>
            <div className="flex gap-2">
              <Input value={spotifyLink} onChange={e => setSpotifyLink(e.target.value)} placeholder="Spotify Playlist URL..." className="text-xs" />
              <Button size="sm" variant="outline"><Link2 className="h-3.5 w-3.5" /></Button>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1">
              <ExternalLink className="h-3.5 w-3.5" /> In Spotify öffnen
            </Button>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎵</span>
              <h3 className="font-medium text-sm">Apple Music verknüpfen</h3>
            </div>
            <div className="flex gap-2">
              <Input value={appleLink} onChange={e => setAppleLink(e.target.value)} placeholder="Apple Music Playlist URL..." className="text-xs" />
              <Button size="sm" variant="outline"><Link2 className="h-3.5 w-3.5" /></Button>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1">
              <ExternalLink className="h-3.5 w-3.5" /> In Apple Music öffnen
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground bg-champagne-light/50 border border-champagne/20 rounded-xl p-3">
          💡 <strong>Tipp:</strong> Die verknüpften Playlists werden im Gästeportal angezeigt. Gäste können darüber direkt Songs zur Playlist hinzufügen oder eigene Vorschläge machen.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Song oder Interpret suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
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
        </div>

        {/* Song List */}
        {filtered.length === 0 ? (
          search || filter !== "all" ? (
            <EmptyState illustration={<MusicIllustration />} title="Keine Songs gefunden" description="Versuche einen anderen Suchbegriff oder Kategorie." />
          ) : (
            <EmptyState illustration={<MusicIllustration />} title="Noch keine Songs" description="Lasst eure Gäste Songs über das Portal vorschlagen oder fügt selbst welche hinzu." actionLabel="Song vorschlagen" onAction={() => {}} />
          )
        ) : (
        <div className="space-y-2">
          {filtered.map((song, i) => (
            <div key={song.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-elegant transition-shadow">
              <span className="text-xs text-muted-foreground w-6 text-center font-medium">{i + 1}</span>
              <Music className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{song.title}</p>
                <p className="text-xs text-muted-foreground truncate">{song.artist} · vorgeschlagen von {song.addedBy}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs">
                  {song.category === "first-dance" ? "🩰 Eröffnungstanz" : song.category === "romantic" ? "💕 Romantisch" : "🎉 Party"}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{song.votes}</span>
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeSong(song.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MusicPlaylist;
