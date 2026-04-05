import { useState, useEffect } from "react";
import { weddingInfo, timelineEvents, hotels, menuCourses, wishlistItems, galleryPhotos, playlistSongs, guestbookEntries, guests } from "@/data/mockData";
import { Heart, CalendarDays, UtensilsCrossed, Camera, Music, Gift, Car, Hotel, BookOpen, Clock, MapPin, Sparkles, ThumbsUp, Plus, ExternalLink, Send, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";

const tabs = [
  { id: "overview", label: "Übersicht", icon: Heart },
  { id: "timeline", label: "Dein Tag", icon: Clock },
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
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [wishlist, setWishlist] = useState(wishlistItems);
  const [songs, setSongs] = useState(playlistSongs);
  const [gbEntries, setGbEntries] = useState(guestbookEntries);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });
  const [newMessage, setNewMessage] = useState("");
  const [photos] = useState(galleryPhotos);
  const [selectedGuestId, setSelectedGuestId] = useState(guests[0].id);

  const currentGuest = guests.find(g => g.id === selectedGuestId) || guests[0];
  const guestName = `${currentGuest.firstName} ${currentGuest.lastName}`;

  // Countdown
  const eventDate = new Date(theme.eventDate || weddingInfo.date);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  // Personalized timeline
  const personalTimeline = [
    ...(currentGuest.transport === "Shuttle" ? [{ time: "14:30", title: "Dein Shuttle fährt ab", detail: "Abfahrt vom Marktplatz Rothenburg", icon: "🚌" }] : []),
    { time: "15:00", title: "Einlass", detail: currentGuest.table ? `Dein Tisch ist ${currentGuest.table}` : "Freie Platzwahl", icon: "🚪" },
    { time: "15:30", title: "Trauung beginnt", detail: "Im Schlossgarten", icon: "💒" },
    { time: "16:30", title: "Sektempfang", detail: "Anstoßen & Gratulieren", icon: "🥂" },
    { time: "18:00", title: "Dinner", detail: currentGuest.meal ? `Deine Menüwahl: ${currentGuest.meal}` : "4-Gänge-Menü im großen Saal", icon: "🍽️" },
    { time: "21:00", title: "Party", detail: "DJ & Live-Band im Ballsaal", icon: "🎵" },
    { time: "00:00", title: "Late Night Snack", detail: "Burger, Pommes und Süßes", icon: "🍕" },
    ...(currentGuest.transport === "Shuttle" ? [{ time: "01:00", title: "Rückfahrt Shuttle", detail: "Zum Hotel / Marktplatz", icon: "🚌" }] : []),
  ];

  const reserveWishItem = (id: string) => setWishlist(prev => prev.map(item => item.id === id ? { ...item, reservedBy: guestName } : item));
  const addSong = () => { if (!newSong.title.trim()) return; setSongs(prev => [{ id: String(Date.now()), title: newSong.title, artist: newSong.artist, addedBy: guestName, votes: 1, category: "party" }, ...prev]); setNewSong({ title: "", artist: "" }); };
  const voteSong = (id: string) => setSongs(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
  const addGuestbookEntry = () => { if (!newMessage.trim()) return; setGbEntries(prev => [{ id: String(Date.now()), name: guestName, message: newMessage, date: new Date().toISOString().split("T")[0], emoji: "💌" }, ...prev]); setNewMessage(""); };

  // Guests at same table
  const tablemates = currentGuest.table ? guests.filter(g => g.table === currentGuest.table && g.id !== currentGuest.id) : [];
  // Guest's hotel
  const guestHotel = currentGuest.accommodation ? hotels[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Guest Selector (Admin preview) */}
      <div className="bg-secondary/50 border-b border-border/50 px-6 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Vorschau als Gast:</span>
          <Select value={selectedGuestId} onValueChange={setSelectedGuestId}>
            <SelectTrigger className="h-8 w-auto min-w-[200px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {guests.map(g => (
                <SelectItem key={g.id} value={g.id} className="text-xs">
                  {g.firstName} {g.lastName}
                  <Badge variant="outline" className="ml-2 text-[9px]">{g.status === "confirmed" ? "✅" : g.status === "declined" ? "❌" : "⏳"}</Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Personalized Header */}
      <div className="bg-gradient-to-b from-champagne-light to-background py-12 px-6 text-center animate-fade-in">
        <Heart className="h-8 w-8 mx-auto mb-3" style={{ color: theme.accentColor }} />
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
          Hallo, {currentGuest.firstName}! 👋
        </h1>
        <p className="text-muted-foreground">{theme.coupleName.partner1} & {theme.coupleName.partner2} · {theme.eventLocation}</p>

        {/* Countdown */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 shadow-elegant">
          <CalendarDays className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">Noch <span className="font-bold text-accent">{daysLeft}</span> Tage</span>
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <Badge variant="secondary" className="text-xs">{currentGuest.status === "confirmed" ? "✅ Zugesagt" : currentGuest.status === "declined" ? "❌ Abgesagt" : "⏳ Ausstehend"}</Badge>
          {currentGuest.table && <Badge variant="secondary" className="text-xs">🪑 {currentGuest.table}</Badge>}
          {currentGuest.accommodation && <Badge variant="secondary" className="text-xs">🏨 Hotel gebucht</Badge>}
          {currentGuest.plusOne && <Badge variant="secondary" className="text-xs">👥 +1 {currentGuest.plusOneName}</Badge>}
          {currentGuest.meal && <Badge variant="secondary" className="text-xs">🍽️ {currentGuest.meal}</Badge>}
        </div>

        {/* Special requirements banner */}
        {currentGuest.allergies && (
          <div className="mt-4 max-w-md mx-auto p-3 rounded-xl bg-accent/5 border border-accent/10 text-sm text-muted-foreground">
            ℹ️ Wir haben notiert: <strong>{currentGuest.allergies}</strong>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map(tab => {
              // Hide table tab if no table assigned
              if (tab.id === "table" && !currentGuest.table) return null;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all shrink-0", activeTab === tab.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-secondary")}>
                  <tab.icon className="h-3.5 w-3.5" />{tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl font-serif font-semibold">
                {currentGuest.plusOne ? `${currentGuest.firstName} & ${currentGuest.plusOneName || "Begleitung"}` : `Willkommen, ${currentGuest.firstName}`}
              </h2>
              <p className="text-muted-foreground text-sm">Alle wichtigen Infos auf einen Blick</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: CalendarDays, label: "Datum", value: "13. Sep 2025", sub: "Samstag" },
                { icon: Clock, label: "Beginn", value: "15:30 Uhr", sub: "Trauung" },
                { icon: MapPin, label: "Ort", value: theme.eventLocation || "Schloss Rothenburg", sub: "Schlossgarten" },
                { icon: UtensilsCrossed, label: "Dein Menü", value: currentGuest.meal || "Noch offen", sub: currentGuest.allergies || "Keine Allergien" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2 hover:shadow-elevated transition-shadow">
                  <item.icon className="h-5 w-5 mx-auto" style={{ color: theme.accentColor }} />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
              <div className="flex items-center gap-2"><Sparkles className="h-5 w-5" style={{ color: theme.accentColor }} /><h3 className="font-serif font-medium">Dresscode</h3></div>
              <p className="text-sm text-muted-foreground">{weddingInfo.dressCode}</p>
              <p className="text-sm text-muted-foreground">Hashtag: <span className="font-medium text-foreground">{weddingInfo.hashtag}</span></p>
            </div>
            {currentGuest.table && (
              <div className="p-6 rounded-2xl border border-accent/20 text-center space-y-2" style={{ backgroundColor: `${theme.accentColor}10` }}>
                <p className="font-serif text-lg">Dein Tisch: <span className="font-semibold">{currentGuest.table}</span></p>
                {currentGuest.plusOne && <p className="text-sm text-muted-foreground">+ {currentGuest.plusOneName || "Begleitung"}</p>}
              </div>
            )}
          </div>
        )}

        {/* Personalized Timeline "Dein Tag" */}
        {activeTab === "timeline" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Dein Tag</h2>
            <p className="text-center text-sm text-muted-foreground">Personalisierter Ablauf für {currentGuest.firstName}</p>
            <div className="space-y-4 max-w-lg mx-auto">
              {personalTimeline.map((event, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0", i === 0 ? "bg-accent/20" : "bg-card border border-border/50")}>
                      {event.icon}
                    </div>
                    {i < personalTimeline.length - 1 && <div className="w-px h-full min-h-[2rem] bg-border mt-1" />}
                  </div>
                  <div className="pb-6 flex-1">
                    <span className="text-xs font-medium" style={{ color: theme.accentColor }}>{event.time} Uhr</span>
                    <h3 className="font-serif font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        {activeTab === "table" && currentGuest.table && (
          <div className="space-y-6 animate-fade-up text-center">
            <h2 className="text-2xl font-serif font-semibold">Dein Tisch</h2>
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-elevated max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: `${theme.accentColor}15` }}>
                <span className="text-3xl font-serif font-bold" style={{ color: theme.accentColor }}>{currentGuest.table.replace("Tisch ", "")}</span>
              </div>
              <h3 className="text-xl font-serif font-semibold">{currentGuest.table}</h3>
              <p className="text-muted-foreground text-sm">Gruppe: {currentGuest.group}</p>
              {tablemates.length > 0 && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">Deine Tischnachbarn:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tablemates.map(g => <Badge key={g.id} variant="secondary" className="px-3 py-1">{g.firstName} {g.lastName}</Badge>)}
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
            {currentGuest.meal && (
              <div className="text-center p-3 rounded-xl bg-accent/5 border border-accent/10 max-w-md mx-auto">
                <p className="text-sm">Deine Auswahl: <strong>{currentGuest.meal}</strong></p>
              </div>
            )}
            <div className="space-y-4 max-w-lg mx-auto">
              {menuCourses.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant flex gap-4 items-start hover:shadow-elevated transition-shadow">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.accentColor }}>{c.course}</p>
                    <h3 className="font-serif font-medium mt-0.5">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        {activeTab === "map" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Interaktive Karte</h2>
            <div className="relative rounded-2xl bg-card border border-border/50 shadow-elegant overflow-hidden" style={{ height: "400px" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-blue-950/20">
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#grid2)" />
                </svg>
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 200 350 C 250 300 350 280 420 200" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" opacity="0.5" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
                  </path>
                </svg>
                <div className="absolute flex flex-col items-center" style={{ left: "55%", top: "40%", transform: "translate(-50%, -100%)" }}>
                  <div className="w-12 h-12 rounded-full bg-accent shadow-lg flex items-center justify-center"><Heart className="h-5 w-5 text-accent-foreground" /></div>
                  <div className="mt-2 bg-card/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-elegant border border-border/50 text-center">
                    <p className="text-xs font-semibold">{theme.eventLocation}</p>
                  </div>
                </div>
                {guestHotel && (
                  <div className="absolute group" style={{ left: "25%", top: "72%", transform: "translate(-50%, -100%)" }}>
                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-400 shadow-sm flex items-center justify-center">
                      <Hotel className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="mt-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-border/50">
                      <p className="text-[10px] font-semibold">Dein Hotel</p>
                      <p className="text-[9px] text-muted-foreground">{guestHotel.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-center">
              <p className="text-sm text-muted-foreground">📍 <strong>Schlossallee 12, 91541 Rothenburg</strong></p>
              <Button variant="link" className="text-accent text-sm mt-1">In Google Maps öffnen →</Button>
            </div>
          </div>
        )}

        {/* Photos */}
        {activeTab === "photos" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Fotogalerie</h2></div>
            <div className="flex justify-center"><Button style={{ backgroundColor: theme.accentColor }} className="text-accent-foreground"><Camera className="h-4 w-4 mr-2" /> Foto hochladen</Button></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-elegant aspect-square hover:shadow-elevated transition-shadow">
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
            <div className="text-center"><h2 className="text-2xl font-serif font-semibold">Hochzeits-Playlist 🎵</h2></div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="rounded-full gap-2"><span className="text-lg">🎧</span> Spotify<ExternalLink className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" className="rounded-full gap-2"><span className="text-lg">🎵</span> Apple Music<ExternalLink className="h-3.5 w-3.5" /></Button>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 max-w-lg mx-auto">
              <h3 className="font-medium text-sm">Song vorschlagen</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Songtitel" value={newSong.title} onChange={e => setNewSong(p => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Interpret" value={newSong.artist} onChange={e => setNewSong(p => ({ ...p, artist: e.target.value }))} />
              </div>
              <Button onClick={addSong} size="sm" style={{ backgroundColor: theme.accentColor }} className="text-accent-foreground"><Plus className="h-3.5 w-3.5 mr-1" /> Hinzufügen</Button>
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              {[...songs].sort((a, b) => b.votes - a.votes).map(song => (
                <div key={song.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-elegant transition-shadow">
                  <button onClick={() => voteSong(song.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors shrink-0"><ThumbsUp className="h-3.5 w-3.5" /><span className="font-medium">{song.votes}</span></button>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{song.title}</p><p className="text-xs text-muted-foreground truncate">{song.artist} · von {song.addedBy}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif font-semibold">Wunschliste 🎁</h2></div>
            {theme.paypalLink && (
              <div className="text-center p-4 rounded-2xl bg-accent/5 border border-accent/10 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-2">💝 Geldgeschenke gerne auch über PayPal:</p>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(theme.paypalLink, "_blank")}>
                  <span>💳</span> PayPal öffnen <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {wishlist.map(item => (
                <div key={item.id} className={cn("p-5 rounded-2xl border shadow-elegant transition-all", item.reservedBy ? "bg-muted border-border/30 opacity-75" : "bg-card border-border/50 hover:shadow-elevated")}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2"><h3 className="font-medium text-sm">{item.title}</h3>{item.price && <span className="text-sm font-medium" style={{ color: theme.accentColor }}>{item.price} €</span>}</div>
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
            {currentGuest.transport && (
              <div className="text-center p-3 rounded-xl bg-accent/5 border border-accent/10 max-w-md mx-auto">
                <p className="text-sm">Deine gewählte Anreise: <strong>{currentGuest.transport}</strong></p>
              </div>
            )}
            <div className="grid gap-4 max-w-lg mx-auto">
              {[{ icon: "🚗", title: "Auto", desc: "Parkplätze direkt am Schloss" }, { icon: "🚆", title: "Bahn", desc: "Bahnhof Rothenburg, 10 Min." }, { icon: "🚌", title: "Shuttle", desc: "Kostenlos. Abfahrt: 14:30" }, { icon: "✈️", title: "Flugzeug", desc: "Nürnberg (NUE, 80km)" }].map((item, i) => (
                <div key={i} className={cn("p-5 rounded-2xl bg-card border shadow-elegant flex gap-4 transition-all", currentGuest.transport?.includes(item.title) ? "border-accent/50 bg-accent/5" : "border-border/50 hover:shadow-elevated")}>
                  <span className="text-2xl">{item.icon}</span>
                  <div><h3 className="font-medium text-sm">{item.title}</h3><p className="text-sm text-muted-foreground mt-1">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hotels */}
        {activeTab === "hotels" && (
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-serif font-semibold text-center">Hotels & Unterkünfte</h2>
            {guestHotel && (
              <div className="p-5 rounded-2xl border-2 border-accent/30 bg-accent/5 shadow-elegant space-y-2 max-w-lg mx-auto">
                <Badge className="bg-accent text-accent-foreground text-xs">Dein Hotel</Badge>
                <h3 className="font-serif font-semibold">{guestHotel.name}</h3>
                <p className="text-sm text-muted-foreground">{guestHotel.description}</p>
              </div>
            )}
            <div className="grid gap-4 max-w-lg mx-auto">
              {hotels.filter(h => !guestHotel || h.name !== guestHotel.name).map((hotel, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-2 hover:shadow-elevated transition-shadow">
                  <div className="flex items-center justify-between"><h3 className="font-medium">{hotel.name}</h3><span className="text-sm font-medium" style={{ color: theme.accentColor }}>{hotel.priceRange}</span></div>
                  <p className="text-sm text-muted-foreground">{hotel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">📍 {hotel.distance}</Badge>
                    {hotel.shuttle && <Badge variant="outline" className="text-xs">🚌 Shuttle</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guestbook */}
        {activeTab === "guestbook" && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center"><h2 className="text-2xl font-serif font-semibold">Gästebuch 📖</h2></div>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 max-w-lg mx-auto">
              <Textarea placeholder="Eure Nachricht an das Brautpaar..." value={newMessage} onChange={e => setNewMessage(e.target.value)} rows={3} />
              <Button onClick={addGuestbookEntry} size="sm" style={{ backgroundColor: theme.accentColor }} className="text-accent-foreground"><Send className="h-3.5 w-3.5 mr-1" /> Nachricht senden</Button>
            </div>
            <div className="space-y-4 max-w-lg mx-auto">
              {gbEntries.map(entry => (
                <div key={entry.id} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-shadow">
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
