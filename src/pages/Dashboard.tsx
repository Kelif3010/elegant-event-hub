import { useState, useCallback } from "react";
import { dashboardStats, tasks, recentActivity, weddingInfo, guestbookEntries, galleryPhotos, playlistSongs, wishlistItems, guests } from "@/data/mockData";
import { Users, UserCheck, Clock, UserX, Baby, Hotel, Bus, UtensilsCrossed, CheckCircle2, ListTodo, Heart, CalendarDays, TrendingUp, Bell, Sparkles, Camera, Music, Gift, BookOpen, Send, Globe, GripVertical, Plus, X, RotateCcw, Settings2, Maximize2, Minimize2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const s = dashboardStats;
const weddingDate = new Date(weddingInfo.date);
const today = new Date();
const daysLeft = Math.max(0, Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

const statCards = [
  { label: "Gäste gesamt", value: s.totalGuests, icon: Users, color: "bg-champagne-light text-champagne" },
  { label: "Zugesagt", value: s.confirmed, icon: UserCheck, color: "bg-sage-light text-sage" },
  { label: "Ausstehend", value: s.pending, icon: Clock, color: "bg-champagne-light text-champagne" },
  { label: "Abgesagt", value: s.declined, icon: UserX, color: "bg-rose-light text-rose" },
];

const honeymoonVotes = [
  { destination: "Bali, Indonesien", country: "ID", votes: 18, emoji: "🌴", lat: -8.4, lng: 115.2 },
  { destination: "Santorini, Griechenland", country: "GR", votes: 14, emoji: "🏛️", lat: 36.4, lng: 25.4 },
  { destination: "Malediven", country: "MV", votes: 12, emoji: "🏝️", lat: 3.2, lng: 73.2 },
  { destination: "Toskana, Italien", country: "IT", votes: 9, emoji: "🍷", lat: 43.3, lng: 11.3 },
  { destination: "Japan", country: "JP", votes: 7, emoji: "🗾", lat: 36.2, lng: 138.3 },
  { destination: "Island", country: "IS", votes: 5, emoji: "🌋", lat: 64.9, lng: -19.0 },
];
const totalHoneymoonVotes = honeymoonVotes.reduce((a, b) => a + b.votes, 0);

type WidgetId = "stats" | "rsvp" | "activity" | "tasks" | "budget" | "quickstats" | "quickactions" | "guestbook" | "photos" | "music" | "wishlist" | "invitations" | "honeymoon";
type WidgetSize = "xs" | "sm" | "lg" | "xl";

interface WidgetDef {
  id: WidgetId;
  label: string;
  icon: any;
}

const allWidgets: WidgetDef[] = [
  { id: "stats", label: "Statistik-Karten", icon: Users },
  { id: "rsvp", label: "RSVP-Übersicht", icon: UserCheck },
  { id: "activity", label: "Letzte Aktivitäten", icon: Bell },
  { id: "tasks", label: "Offene Aufgaben", icon: ListTodo },
  { id: "budget", label: "Budget", icon: TrendingUp },
  { id: "quickstats", label: "Quick Stats", icon: Hotel },
  { id: "quickactions", label: "Schnellaktionen", icon: Sparkles },
  { id: "guestbook", label: "Gästebuch", icon: BookOpen },
  { id: "photos", label: "Foto-Uploads", icon: Camera },
  { id: "music", label: "Musik-Vorschläge", icon: Music },
  { id: "wishlist", label: "Wunschlisten-Status", icon: Gift },
  { id: "invitations", label: "Einladungs-Fortschritt", icon: Send },
  { id: "honeymoon", label: "Flitterwochen-Globus", icon: Globe },
];

const defaultWidgets: WidgetId[] = ["stats", "rsvp", "activity", "tasks", "budget", "quickstats", "quickactions"];
const defaultSizes: Record<string, WidgetSize> = { stats: "xl", rsvp: "lg", activity: "sm", tasks: "lg", budget: "sm", quickstats: "sm", quickactions: "sm" };

const sizeLabels: Record<WidgetSize, string> = { xs: "Sehr klein", sm: "Klein", lg: "Groß", xl: "Sehr groß" };
const sizeColSpan: Record<WidgetSize, string> = { xs: "col-span-1", sm: "col-span-1", lg: "lg:col-span-2", xl: "lg:col-span-3" };

const Dashboard = () => {
  const [activeWidgets, setActiveWidgets] = useState<WidgetId[]>(() => {
    const saved = localStorage.getItem("dashboard-widgets");
    return saved ? JSON.parse(saved) : defaultWidgets;
  });
  const [widgetSizes, setWidgetSizes] = useState<Record<string, WidgetSize>>(() => {
    const saved = localStorage.getItem("dashboard-widget-sizes");
    return saved ? JSON.parse(saved) : defaultSizes;
  });
  const [editMode, setEditMode] = useState(false);
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const saveWidgets = (w: WidgetId[]) => {
    setActiveWidgets(w);
    localStorage.setItem("dashboard-widgets", JSON.stringify(w));
  };

  const saveSizes = (s: Record<string, WidgetSize>) => {
    setWidgetSizes(s);
    localStorage.setItem("dashboard-widget-sizes", JSON.stringify(s));
  };

  const toggleWidget = (id: WidgetId) => {
    const next = activeWidgets.includes(id) ? activeWidgets.filter(w => w !== id) : [...activeWidgets, id];
    saveWidgets(next);
  };

  const removeWidget = (id: WidgetId) => saveWidgets(activeWidgets.filter(w => w !== id));

  const resetWidgets = () => {
    saveWidgets(defaultWidgets);
    saveSizes(defaultSizes);
    setEditMode(false);
  };

  const changeSize = (id: WidgetId, size: WidgetSize) => {
    saveSizes({ ...widgetSizes, [id]: size });
  };

  const getSize = (id: WidgetId): WidgetSize => widgetSizes[id] || "sm";

  // Drag & Drop
  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); setDragOverIdx(idx); };
  const handleDragEnd = () => {
    if (dragIdx !== null && dragOverIdx !== null && dragIdx !== dragOverIdx) {
      const next = [...activeWidgets];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(dragOverIdx, 0, moved);
      saveWidgets(next);
    }
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const reservedCount = wishlistItems.filter(w => w.reservedBy).length;
  const confirmedGuests = guests.filter(g => g.status === "confirmed").length;
  const invitedTotal = guests.length;
  const invitationProgress = Math.round((confirmedGuests / invitedTotal) * 100);

  const renderWidget = (id: WidgetId, idx: number) => {
    const size = getSize(id);
    const colSpan = sizeColSpan[size];

    const wrapper = (children: React.ReactNode) => (
      <div
        key={id}
        draggable={editMode}
        onDragStart={() => handleDragStart(idx)}
        onDragOver={e => handleDragOver(e, idx)}
        onDragEnd={handleDragEnd}
        className={cn(
          "relative group transition-all duration-300 animate-fade-in",
          colSpan,
          editMode && "cursor-grab active:cursor-grabbing",
          dragOverIdx === idx && dragIdx !== idx && "ring-2 ring-accent ring-offset-2 rounded-2xl",
          dragIdx === idx && "opacity-50"
        )}
      >
        {editMode && (
          <div className="absolute -top-2 -right-2 z-10 flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-6 h-6 rounded-full bg-card border border-border/50 shadow-sm flex items-center justify-center text-xs hover:bg-secondary">
                  <Maximize2 className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(sizeLabels) as WidgetSize[]).map(s => (
                  <DropdownMenuItem key={s} onClick={() => changeSize(id, s)} className={cn(size === s && "bg-accent/10 font-medium")}>
                    {sizeLabels[s]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button onClick={() => removeWidget(id)} className="w-6 h-6 rounded-full bg-destructive/10 border border-destructive/20 shadow-sm flex items-center justify-center hover:bg-destructive/20">
              <X className="h-3 w-3 text-destructive" />
            </button>
          </div>
        )}
        {editMode && <div className="absolute top-2 left-2 z-10"><GripVertical className="h-4 w-4 text-muted-foreground/40" /></div>}
        {children}
      </div>
    );

    switch (id) {
      case "stats":
        if (size === "xs") return wrapper(
          <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant flex items-center gap-4">
            <Users className="h-5 w-5 text-champagne" />
            <div><p className="text-2xl font-serif font-bold">{s.totalGuests}</p><p className="text-xs text-muted-foreground">Gäste · {s.confirmed} zugesagt</p></div>
          </div>
        );
        if (size === "sm") return wrapper(
          <div className="grid grid-cols-2 gap-3">
            {statCards.slice(0, 2).map(c => (
              <div key={c.label} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-2">
                <div className={`w-8 h-8 rounded-xl ${c.color} flex items-center justify-center`}><c.icon className="h-4 w-4" /></div>
                <p className="text-2xl font-serif font-bold">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        );
        return wrapper(
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map(c => (
              <div key={c.label} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3 hover:shadow-elevated transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                  <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center`}><c.icon className="h-4 w-4" /></div>
                </div>
                <p className="text-3xl font-serif font-bold">{c.value}</p>
              </div>
            ))}
          </div>
        );

      case "rsvp":
        if (size === "xs") return wrapper(
          <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant">
            <p className="text-xs text-muted-foreground">RSVP</p>
            <p className="text-2xl font-serif font-bold text-sage">{s.confirmed}/{s.totalGuests}</p>
          </div>
        );
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-semibold">RSVP-Übersicht</h2>
              <Button variant="outline" size="sm" asChild><Link to="/rsvp">Formular verwalten</Link></Button>
            </div>
            <div className="space-y-4">
              {[{ label: "Zugesagt", val: s.confirmed, cls: "bg-sage" }, { label: "Ausstehend", val: s.pending, cls: "bg-champagne" }, { label: "Abgesagt", val: s.declined, cls: "bg-rose" }].map(r => (
                <div key={r.label} className="space-y-2">
                  <div className="flex justify-between text-sm"><span>{r.label}</span><span className="font-medium">{r.val}</span></div>
                  <Progress value={(r.val / s.totalGuests) * 100} className={`h-2 bg-secondary [&>div]:${r.cls}`} />
                </div>
              ))}
            </div>
            {(size === "lg" || size === "xl") && (
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[{ label: "Plus-Ones", value: s.plusOnes, icon: Users }, { label: "Kinder", value: s.children, icon: Baby }, { label: "Diätwünsche", value: s.dietarySpecial, icon: UtensilsCrossed }].map(m => (
                  <div key={m.label} className="text-center p-3 rounded-xl bg-secondary/50 space-y-1">
                    <m.icon className="h-4 w-4 mx-auto text-muted-foreground" />
                    <p className="text-lg font-semibold">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "activity":
        const actCount = size === "xs" ? 2 : size === "sm" ? 3 : 5;
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-champagne" />
              <h2 className="text-lg font-serif font-semibold">Letzte Aktivitäten</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, actCount).map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-champagne shrink-0" />
                  <div><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tasks":
        if (size === "xs") return wrapper(
          <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant">
            <div className="flex items-center gap-2"><ListTodo className="h-4 w-4 text-champagne" /><span className="text-xs text-muted-foreground">Aufgaben</span></div>
            <p className="text-2xl font-serif font-bold mt-1">{s.openTasks} <span className="text-sm font-normal text-muted-foreground">offen</span></p>
          </div>
        );
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><ListTodo className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Offene Aufgaben</h2></div>
              <Badge variant="secondary">{s.openTasks} offen</Badge>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status !== "done").slice(0, size === "sm" ? 2 : 4).map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-champagne/40" />
                    <div>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">Fällig: {new Date(t.due).toLocaleDateString("de-DE")}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{t.category}</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/tasks">Alle Aufgaben →</Link></Button>
          </div>
        );

      case "budget":
        if (size === "xs") return wrapper(
          <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-champagne" /><span className="text-xs text-muted-foreground">Budget</span></div>
            <p className="text-2xl font-serif font-bold mt-1">€{s.budget.spent.toLocaleString("de-DE")}</p>
            <Progress value={(s.budget.spent / s.budget.total) * 100} className="h-1.5 bg-secondary [&>div]:bg-champagne mt-2" />
          </div>
        );
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Budget</h2></div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Ausgegeben</span><span className="font-semibold">€{s.budget.spent.toLocaleString("de-DE")}</span></div>
              <Progress value={(s.budget.spent / s.budget.total) * 100} className="h-3 bg-secondary [&>div]:bg-champagne" />
              <div className="flex justify-between text-sm text-muted-foreground"><span>€{s.budget.spent.toLocaleString("de-DE")}</span><span>€{s.budget.total.toLocaleString("de-DE")}</span></div>
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/budget">Details →</Link></Button>
          </div>
        );

      case "quickstats":
        return wrapper(
          <div className={cn("grid gap-4", size === "xs" ? "grid-cols-1" : "grid-cols-2")}>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2 hover:shadow-elevated transition-shadow">
              <Hotel className="h-5 w-5 mx-auto text-champagne" />
              <p className="text-2xl font-serif font-bold">{s.accommodationNeeded}</p>
              <p className="text-xs text-muted-foreground">Unterkunft nötig</p>
            </div>
            {size !== "xs" && (
              <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2 hover:shadow-elevated transition-shadow">
                <Bus className="h-5 w-5 mx-auto text-champagne" />
                <p className="text-2xl font-serif font-bold">{s.shuttleNeeded}</p>
                <p className="text-xs text-muted-foreground">Shuttle benötigt</p>
              </div>
            )}
          </div>
        );

      case "quickactions":
        return wrapper(
          <div className="p-6 rounded-2xl bg-gradient-to-br from-champagne-light to-secondary border border-champagne/10 shadow-elegant space-y-3 hover:shadow-elevated transition-shadow">
            <Sparkles className="h-5 w-5 text-champagne" />
            <h3 className="font-serif font-semibold">Schnellaktionen</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/guests">Gäste verwalten</Link></Button>
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/rsvp">RSVP verwalten</Link></Button>
              {(size !== "xs") && <><Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/guest-portal">Gästeportal</Link></Button>
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/settings">Einstellungen</Link></Button></>}
            </div>
          </div>
        );

      case "guestbook":
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Gästebuch</h2></div>
              <Badge variant="secondary">{guestbookEntries.length}</Badge>
            </div>
            <div className="space-y-3">
              {guestbookEntries.slice(0, size === "xs" ? 1 : size === "sm" ? 2 : 3).map(e => (
                <div key={e.id} className="p-3 rounded-xl bg-secondary/30 space-y-1">
                  <div className="flex items-center gap-2"><span>{e.emoji}</span><span className="text-sm font-medium">{e.name}</span></div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{e.message}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/guestbook">Alle Einträge →</Link></Button>
          </div>
        );

      case "photos":
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Camera className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Fotos</h2></div>
              <Badge variant="secondary">{galleryPhotos.length} Fotos</Badge>
            </div>
            {size !== "xs" && (
              <div className="grid grid-cols-3 gap-2">
                {galleryPhotos.slice(0, 6).map(p => (
                  <div key={p.id} className="aspect-square rounded-xl bg-secondary overflow-hidden">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/photos">Galerie öffnen →</Link></Button>
          </div>
        );

      case "music":
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Music className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Musik</h2></div>
              <Badge variant="secondary">{playlistSongs.length} Songs</Badge>
            </div>
            <div className="space-y-2">
              {[...playlistSongs].sort((a, b) => b.votes - a.votes).slice(0, size === "xs" ? 2 : 4).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30">
                  <span className="text-xs font-medium text-champagne w-6">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">👍 {s.votes}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/music">Playlist verwalten →</Link></Button>
          </div>
        );

      case "wishlist":
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Gift className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Wunschliste</h2></div>
              <Badge variant="secondary">{reservedCount}/{wishlistItems.length}</Badge>
            </div>
            <Progress value={(reservedCount / wishlistItems.length) * 100} className="h-2 bg-secondary [&>div]:bg-sage" />
            {size !== "xs" && (
              <div className="space-y-2">
                {wishlistItems.filter(w => w.reservedBy).slice(0, 3).map(w => (
                  <div key={w.id} className="flex items-center gap-2 text-sm">
                    <span>{w.image}</span><span className="truncate">{w.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">von {w.reservedBy}</span>
                  </div>
                ))}
              </div>
            )}
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/wishlist">Alle Wünsche →</Link></Button>
          </div>
        );

      case "invitations":
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Send className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Einladungen</h2></div>
            </div>
            {size === "xs" ? (
              <p className="text-2xl font-serif font-bold">{invitationProgress}%</p>
            ) : (
              <div className="space-y-3">
                <Progress value={invitationProgress} className="h-2 bg-secondary [&>div]:bg-champagne" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-sage-light"><p className="text-lg font-bold text-sage">{confirmedGuests}</p><p className="text-[10px] text-muted-foreground">Zugesagt</p></div>
                  <div className="p-2 rounded-lg bg-champagne-light"><p className="text-lg font-bold text-champagne">{guests.filter(g => g.status === "pending").length}</p><p className="text-[10px] text-muted-foreground">Offen</p></div>
                  <div className="p-2 rounded-lg bg-rose-light"><p className="text-lg font-bold text-rose">{guests.filter(g => g.status === "declined").length}</p><p className="text-[10px] text-muted-foreground">Abgesagt</p></div>
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" asChild className="w-full"><Link to="/invitations">Einladungen →</Link></Button>
          </div>
        );

      case "honeymoon":
        if (size === "xs") return wrapper(
          <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant">
            <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-champagne" /><span className="text-xs text-muted-foreground">Flitterwochen</span></div>
            <p className="text-lg font-serif font-bold mt-1">🌴 {honeymoonVotes[0].destination}</p>
            <p className="text-xs text-muted-foreground">{totalHoneymoonVotes} Stimmen gesamt</p>
          </div>
        );
        return wrapper(
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-champagne" /><h2 className="text-lg font-serif font-semibold">Flitterwochen-Voting</h2></div>
              <Badge variant="secondary">{totalHoneymoonVotes} Stimmen</Badge>
            </div>
            {(size === "lg" || size === "xl") && (
              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-emerald-50 border-2 border-blue-200/50 shadow-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center"><div className="w-[90%] h-px bg-blue-200/40" /></div>
                  <div className="absolute inset-0 flex items-center justify-center"><div className="h-[90%] w-px bg-blue-200/40" /></div>
                  <div className="absolute inset-0 flex items-center justify-center"><div className="w-[75%] h-[75%] rounded-full border border-blue-200/30" /></div>
                  {honeymoonVotes.map((v, i) => {
                    const angle = (i / honeymoonVotes.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 30 + (i % 3) * 12;
                    const x = 50 + Math.cos(angle) * radius;
                    const y = 50 + Math.sin(angle) * radius;
                    return (
                      <div key={v.country} className="absolute group cursor-pointer" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }} title={`${v.destination}: ${v.votes}`}>
                        <span className="text-lg">{v.emoji}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="space-y-2">
              {honeymoonVotes.slice(0, size === "sm" ? 3 : 5).map((v, i) => (
                <div key={v.country} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30">
                  <span className="text-sm font-bold text-champagne w-5">#{i + 1}</span>
                  <span>{v.emoji}</span>
                  <span className="text-sm flex-1">{v.destination}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 rounded-full bg-champagne" style={{ width: `${(v.votes / honeymoonVotes[0].votes) * 60}px` }} />
                    <span className="text-xs text-muted-foreground">{v.votes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Willkommen zurück</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">{weddingInfo.coupleName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={editMode ? "default" : "outline"} size="sm" onClick={() => setEditMode(!editMode)} className="gap-2">
              <GripVertical className="h-4 w-4" />
              {editMode ? "Fertig" : "Anordnen"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowWidgetPanel(true)} className="gap-2">
              <Settings2 className="h-4 w-4" />
              Widgets
            </Button>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Countdown</p>
              <p className="text-2xl font-serif font-bold text-gradient-gold">{daysLeft} Tage</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-champagne-light flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-champagne" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeWidgets.map((id, idx) => renderWidget(id, idx))}
        </div>
      </div>

      <Sheet open={showWidgetPanel} onOpenChange={setShowWidgetPanel}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader><SheetTitle className="font-serif">Dashboard anpassen</SheetTitle></SheetHeader>
          <div className="mt-6 space-y-6">
            <Button variant="ghost" size="sm" onClick={resetWidgets} className="gap-2">
              <RotateCcw className="h-3.5 w-3.5" /> Standard wiederherstellen
            </Button>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Widgets ein/ausblenden</p>
              {allWidgets.map(w => (
                <div key={w.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <w.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{w.label}</span>
                  </div>
                  <Switch checked={activeWidgets.includes(w.id)} onCheckedChange={() => toggleWidget(w.id)} />
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default Dashboard;
