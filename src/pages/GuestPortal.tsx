import { useState } from "react";
import { weddingInfo, timelineEvents, hotels, menuCourses, wishlistItems, galleryPhotos, playlistSongs, guestbookEntries, guests } from "@/data/mockData";
import { Heart, CalendarDays, UtensilsCrossed, Camera, Music, Gift, Car, Hotel, BookOpen, Clock, MapPin, Sparkles, ThumbsUp, Plus, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";

const tabs = [
  { id: "overview", label: "Übersicht", icon: Heart },
  { id: "timeline", label: "Tagesablauf", icon: Clock },
  { id: "table", label: "Dein Tisch", icon: UtensilsCrossed },
  { id: "menu", label: "Menü", icon: UtensilsCrossed },
  { id: "map", label: "Karte", icon: MapPin },
  { id: "photos", label: "Fotos", icon: Camera },
  { id: "music", label: "Musik", icon: Music },
  { id: "wishlist", label: "Wunschliste", icon: Gift },
  { id: "travel", label: "Anreise", icon: Car },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "guestbook", label: "Gästebuch", icon: BookOpen },
];

const GuestPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [wishlist, setWishlist] = useState(wishlistItems);
  const [songs, setSongs] = useState(playlistSongs);
  const [gbEntries, setGbEntries] = useState(guestbookEntries);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });
  const [newMessage, setNewMessage] = useState("");
  const [photos] = useState(galleryPhotos);

  const currentGuest = guests[0];
  const guestName = localStorage.getItem("guestName") || `${currentGuest.firstName} ${currentGuest.lastName}`;

  const reserveWishItem = (id: string) => setWishlist(prev => prev.map(item => item.id === id ? { ...item, reservedBy: guestName } : item));
  const addSong = () => { if (!newSong.title.trim()) return; setSongs(prev => [{ id: String(Date.now()), title: newSong.title, artist: newSong.artist, addedBy: guestName, votes: 1, category: "party" }, ...prev]); setNewSong({ title: "", artist: "" }); };
  const voteSong = (id: string) => setSongs(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
  const addGuestbookEntry = () => { if (!newMessage.trim()) return; setGbEntries(prev => [{ id: String(Date.now()), name: guestName, message: newMessage, date: new Date().toISOString().split("T")[0], emoji: "💌" }, ...prev]); setNewMessage(""); };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-gradient-to-b from-champagne-light to-background py-12 px-6 text-center">
        <Heart className="h-8 w-8 text-champagne mx-auto mb-3" />
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-2">{weddingInfo.coupleName}</h1>
        <p className="text-muted-foreground">13. September 2025 · Schloss Rothenburg</p>
        <p className="text-sm text-champagne mt-2">Willkommen, {guestName}! 👋</p>
      </div>

      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all shrink-0", activeTab === tab.id ? "bg-champagne text-accent-foreground font-medium" : "text-muted-foreground hover:bg-secondary")}>
                <tab.icon className="h-3.5 w-3.5" />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2 mb-8"><h2 className="text-2xl font-serif font-semibold">Euer Überblick</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ icon: CalendarDays, label: "Datum", value: "13. Sep 2025", sub: "Samstag" }, { icon: Clock, label: "Beginn", value: "15:30 Uhr", sub: "Trauung" }, { icon: MapPin, label: "Ort", value: "Schloss Rothenburg", sub: "Schlossgarten" }, { icon: UtensilsCrossed, label: "Dein Menü", value: currentGuest.meal || "Noch offen", sub: currentGuest.allergies || "Keine Allergien" }].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2">
                  <item.icon className="h-5 w-5 text-champagne mx-auto" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
              <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-champagne" /><h3 className="font-serif font-medium">Dresscode</h3></div>
              <p className="text-sm text-muted-foreground">{weddingInfo.dressCode}</p>
              <p className="text-sm text-muted-foreground">Hashtag: <span className="font-medium text-foreground">{weddingInfo.hashtag}</span></p>
            </div>
            <div className="p-6 rounded-2xl bg-champagne-light border border-champagne/20 text-center space-y-2">
              <p className="font-serif text-lg">Dein Tisch: <span className="font-semibold">{currentGuest.table || "Wird noch bekannt gegeben"}</span></p>
              {currentGuest.plusOne && <p className="text-sm text-muted-foreground">+ {currentGuest.plusOneName || "Begleitung"}</p>}
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Tagesablauf</h2>
            <div className="space-y-4">
              {timelineEvents.map((event, i) => (
                <div key={event.id} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0", i === 0 ? "bg-champagne" : "bg-card border border-border/50")}>
                      {event.icon === "heart" ? "💒" : event.icon === "sparkles" ? "✨" : event.icon === "glass-water" ? "🥂" : event.icon === "utensils" ? "🍽️" : event.icon === "music" ? "🎵" : "🍕"}
                    </div>
                    {i < timelineEvents.length - 1 && <div className="w-px h-full min-h-[2rem] bg-border mt-1" />}
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center gap-2 mb-1"><span className="text-xs font-medium text-champagne">{event.time} – {event.endTime}</span><Badge variant="outline" className="text-xs">{event.location}</Badge></div>
                    <h3 className="font-serif font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        {activeTab === "table" && (
          <div className="space-y-6 animate-fade-up text-center">
            <h2 className="text-2xl font-serif font-semibold">Dein Tisch</h2>
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-elevated max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 rounded-full bg-champagne-light mx-auto flex items-center justify-center"><span className="text-3xl font-serif font-bold text-champagne">{currentGuest.table ? currentGuest.table.replace("Tisch ", "") : "?"}</span></div>
              <h3 className="text-xl font-serif font-semibold">{currentGuest.table || "Wird noch zugewiesen"}</h3>
              <p className="text-muted-foreground text-sm">Gruppe: {currentGuest.group}</p>
              {currentGuest.table && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">Deine Tischnachbarn:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guests.filter(g => g.table === currentGuest.table && g.id !== currentGuest.id).map(g => <Badge key={g.id} variant="secondary" className="px-3 py-1">{g.firstName} {g.lastName}</Badge>)}
                    {currentGuest.plusOneName && <Badge variant="secondary" className="px-3 py-1">{currentGuest.plusOneName}</Badge>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu */}
        {activeTab === "menu" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Menü</h2>
            <p className="text-center text-muted-foreground text-sm">Ein 4-Gänge-Menü, kreiert von Gourmet & Co.</p>
            <div className="space-y-4 max-w-lg mx-auto">
              {menuCourses.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant flex gap-4 items-start">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-xs text-champagne font-medium uppercase tracking-wider">{c.course}</p>
                    <h3 className="font-serif font-medium mt-0.5">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Map */}
        {activeTab === "map" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Interaktive Karte</h2>
            <p className="text-center text-muted-foreground text-sm">Location, Hotels & Shuttle-Routen auf einen Blick</p>
            
            {/* Map Container */}
            <div className="relative rounded-2xl bg-card border border-border/50 shadow-elegant overflow-hidden" style={{ height: "450px" }}>
              {/* Stylized Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50">
                {/* Grid lines for map feel */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Roads */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.15" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.15" />
                  <path d="M 100 350 Q 300 300 500 200 Q 600 150 750 180" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.2" strokeDasharray="8,4" />
                </svg>

                {/* Shuttle Route */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 200 350 C 250 300 350 280 420 200" fill="none" stroke="hsl(var(--champagne))" strokeWidth="3" opacity="0.6" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 600 320 C 550 280 480 240 420 200" fill="none" stroke="hsl(var(--champagne))" strokeWidth="3" opacity="0.6" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
                  </path>
                </svg>

                {/* Location Pin - Main Venue */}
                <div className="absolute" style={{ left: "55%", top: "40%", transform: "translate(-50%, -100%)" }}>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-champagne shadow-lg flex items-center justify-center animate-pulse">
                        <Heart className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-champagne rotate-45" />
                    </div>
                    <div className="mt-3 bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-elegant border border-border/50 text-center">
                      <p className="text-xs font-semibold">Schloss Rothenburg</p>
                      <p className="text-[10px] text-muted-foreground">Trauung & Feier</p>
                    </div>
                  </div>
                </div>

                {/* Hotel Pins */}
                {[
                  { name: "Hotel Schlossblick", x: "25%", y: "72%", stars: 4 },
                  { name: "Romantik Hotel", x: "75%", y: "65%", stars: 4 },
                  { name: "Gasthof Goldener Hirsch", x: "40%", y: "82%", stars: 3 },
                ].map((hotel, i) => (
                  <div key={i} className="absolute group" style={{ left: hotel.x, top: hotel.y, transform: "translate(-50%, -100%)" }}>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Hotel className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div className="mt-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <p className="text-[10px] font-medium">{hotel.name}</p>
                        <p className="text-[9px] text-muted-foreground">{"⭐".repeat(hotel.stars)}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Parking */}
                <div className="absolute" style={{ left: "65%", top: "55%", transform: "translate(-50%, -50%)" }}>
                  <div className="w-7 h-7 rounded-lg bg-secondary border border-border/50 flex items-center justify-center" title="Parkplatz">
                    <span className="text-xs">🅿️</span>
                  </div>
                </div>

                {/* Train Station */}
                <div className="absolute" style={{ left: "15%", top: "35%", transform: "translate(-50%, -50%)" }}>
                  <div className="w-7 h-7 rounded-lg bg-secondary border border-border/50 flex items-center justify-center" title="Bahnhof">
                    <span className="text-xs">🚆</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-elegant border border-border/50 space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Legende</p>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-champagne" /><span className="text-[11px]">Location</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-300" /><span className="text-[11px]">Hotels</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-champagne rounded" style={{ borderTop: "2px dashed" }} /><span className="text-[11px]">Shuttle-Route</span></div>
                <div className="flex items-center gap-2"><span className="text-[11px]">🅿️</span><span className="text-[11px]">Parkplatz</span></div>
                <div className="flex items-center gap-2"><span className="text-[11px]">🚆</span><span className="text-[11px]">Bahnhof</span></div>
              </div>

              {/* Shuttle Info */}
              <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-elegant border border-border/50 max-w-[200px]">
                <p className="text-xs font-semibold mb-1">🚌 Shuttle-Service</p>
                <p className="text-[10px] text-muted-foreground">Hinfahrt: 14:30 Uhr</p>
                <p className="text-[10px] text-muted-foreground">Rückfahrt: 01:00 & 03:00</p>
                <p className="text-[10px] text-champagne font-medium mt-1">Kostenlos für alle Gäste</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-champagne-light/50 border border-champagne/20 text-center">
              <p className="text-sm text-muted-foreground">📍 <strong>Schlossallee 12, 91541 Rothenburg ob der Tauber</strong></p>
              <Button variant="link" className="text-champagne text-sm mt-1">In Google Maps öffnen →</Button>
            </div>
          </div>
        )}

        {/* Photos */}
        {activeTab === "photos" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Fotogalerie</h2><p className="text-muted-foreground text-sm">Teilt eure schönsten Momente mit uns! 📸</p></div>
            <div className="flex justify-center"><Button className="bg-champagne hover:bg-champagne/90 text-accent-foreground"><Camera className="h-4 w-4 mr-2" /> Foto hochladen</Button></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-elegant aspect-square">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div><p className="text-primary-foreground text-sm font-medium">{photo.caption}</p><p className="text-primary-foreground/70 text-xs">{photo.uploadedBy} · ❤️ {photo.likes}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Music */}
        {activeTab === "music" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Hochzeits-Playlist 🎵</h2></div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="rounded-full gap-2"><span className="text-lg">🎧</span> Spotify Playlist<ExternalLink className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" className="rounded-full gap-2"><span className="text-lg">🎵</span> Apple Music<ExternalLink className="h-3.5 w-3.5" /></Button>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 max-w-lg mx-auto">
              <h3 className="font-medium text-sm">Song vorschlagen</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Songtitel" value={newSong.title} onChange={e => setNewSong(p => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Interpret" value={newSong.artist} onChange={e => setNewSong(p => ({ ...p, artist: e.target.value }))} />
              </div>
              <Button onClick={addSong} size="sm" className="bg-champagne hover:bg-champagne/90 text-accent-foreground"><Plus className="h-3.5 w-3.5 mr-1" /> Hinzufügen</Button>
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              {songs.sort((a, b) => b.votes - a.votes).map(song => (
                <div key={song.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-elegant transition-shadow">
                  <button onClick={() => voteSong(song.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-champagne transition-colors shrink-0"><ThumbsUp className="h-3.5 w-3.5" /><span className="font-medium">{song.votes}</span></button>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{song.title}</p><p className="text-xs text-muted-foreground truncate">{song.artist} · von {song.addedBy}</p></div>
                  <Badge variant="outline" className="text-xs shrink-0">{song.category === "first-dance" ? "Eröffnungstanz" : song.category === "romantic" ? "Romantisch" : "Party"}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Wunschliste 🎁</h2><p className="text-muted-foreground text-sm">Falls ihr uns eine Freude machen möchtet.</p></div>
            <div className="grid gap-4 md:grid-cols-2">
              {wishlist.map(item => (
                <div key={item.id} className={cn("p-5 rounded-2xl border shadow-elegant transition-all", item.reservedBy ? "bg-muted border-border/30 opacity-75" : "bg-card border-border/50 hover:shadow-elevated")}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2"><h3 className="font-medium text-sm">{item.title}</h3>{item.price && <span className="text-sm font-medium text-champagne">{item.price} €</span>}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      <div className="mt-3">
                        {item.reservedBy ? <Badge variant="secondary" className="text-xs">✓ Reserviert von {item.reservedBy}</Badge> : <Button size="sm" variant="outline" onClick={() => reserveWishItem(item.id)} className="text-xs h-7"><Gift className="h-3 w-3 mr-1" /> Reservieren</Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel */}
        {activeTab === "travel" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Anreise</h2>
            <div className="grid gap-4 max-w-lg mx-auto">
              {[{ icon: "🚗", title: "Mit dem Auto", desc: "Parkplätze direkt am Schloss. Schlossallee 12, 91541 Rothenburg ob der Tauber" }, { icon: "🚆", title: "Mit der Bahn", desc: "Nächster Bahnhof: Rothenburg ob der Tauber. 10 Min. mit Taxi oder Shuttle." }, { icon: "🚌", title: "Shuttle-Service", desc: "Kostenloser Shuttle. Abfahrt: 14:30 Uhr, Rückfahrt: 01:00 & 03:00 Uhr." }, { icon: "✈️", title: "Mit dem Flugzeug", desc: "Nürnberg (NUE, 80km) oder Frankfurt (FRA, 200km)." }].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant flex gap-4"><span className="text-2xl">{item.icon}</span><div><h3 className="font-medium text-sm">{item.title}</h3><p className="text-sm text-muted-foreground mt-1">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        )}

        {/* Hotels */}
        {activeTab === "hotels" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Hotels & Unterkünfte</h2>
            <div className="grid gap-4 max-w-lg mx-auto">
              {hotels.map((hotel, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-2">
                  <div className="flex items-center justify-between"><h3 className="font-medium">{hotel.name}</h3><span className="text-sm text-champagne font-medium">{hotel.priceRange}</span></div>
                  <p className="text-sm text-muted-foreground">{hotel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">📍 {hotel.distance}</Badge>
                    {hotel.shuttle && <Badge variant="outline" className="text-xs">🚌 Shuttle</Badge>}
                    {hotel.stars > 0 && <Badge variant="outline" className="text-xs">{"⭐".repeat(hotel.stars)}</Badge>}
                  </div>
                  {hotel.contingent && <p className="text-xs text-sage font-medium">{hotel.contingent}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guestbook */}
        {activeTab === "guestbook" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Gästebuch 📖</h2></div>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 max-w-lg mx-auto">
              <Textarea placeholder="Eure Nachricht an das Brautpaar..." value={newMessage} onChange={e => setNewMessage(e.target.value)} rows={3} />
              <Button onClick={addGuestbookEntry} size="sm" className="bg-champagne hover:bg-champagne/90 text-accent-foreground"><Send className="h-3.5 w-3.5 mr-1" /> Nachricht senden</Button>
            </div>
            <div className="space-y-4 max-w-lg mx-auto">
              {gbEntries.map(entry => (
                <div key={entry.id} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant">
                  <div className="flex items-center gap-2 mb-2"><span className="text-lg">{entry.emoji}</span><span className="font-medium text-sm">{entry.name}</span><span className="text-xs text-muted-foreground ml-auto">{entry.date}</span></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{entry.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GuestPortal;
