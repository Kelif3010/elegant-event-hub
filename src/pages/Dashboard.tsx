import { useState } from "react";
import {
  Users, CheckCircle, XCircle, Clock, Utensils,
  ListChecks, TrendingUp, ArrowRight, Settings2, Plus, X, RotateCcw,
  Camera, Music, Gift, BookOpen, Globe, Send, Heart, MessageSquare, Plane,
  LayoutGrid, List, AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import DashboardLayout from "@/components/layout/DashboardLayout";

// ── Widget definitions ──

interface WidgetDef {
  id: string;
  title: string;
  icon: any;
  category: string;
  size: "sm" | "md" | "lg";
  colSpan?: number;
}

const allWidgets: WidgetDef[] = [
  { id: "stats", title: "RSVP-Statistiken", icon: Users, category: "Basis", size: "lg", colSpan: 4 },
  { id: "recent_guests", title: "Letzte Rückmeldungen", icon: CheckCircle, category: "Basis", size: "md", colSpan: 2 },
  { id: "tasks", title: "Aufgaben", icon: ListChecks, category: "Basis", size: "md", colSpan: 2 },
  { id: "activity", title: "Letzte Aktivitäten", icon: TrendingUp, category: "Basis", size: "md", colSpan: 2 },
  { id: "meals", title: "Essenswahl", icon: Utensils, category: "Basis", size: "sm", colSpan: 1 },
  { id: "allergies", title: "Allergien & Diäten", icon: Utensils, category: "Basis", size: "sm", colSpan: 1 },
  { id: "budget", title: "Budget-Übersicht", icon: TrendingUp, category: "Basis", size: "sm", colSpan: 1 },
  { id: "guestbook", title: "Letzte Gästebuch-Einträge", icon: BookOpen, category: "Erlebnis", size: "md", colSpan: 2 },
  { id: "photos", title: "Foto-Uploads", icon: Camera, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "music", title: "Musik-Vorschläge", icon: Music, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "wishlist", title: "Wunschlisten-Status", icon: Gift, category: "Erlebnis", size: "sm", colSpan: 1 },
  { id: "invitations", title: "Einladungs-Fortschritt", icon: Send, category: "Kommunikation", size: "sm", colSpan: 1 },
  { id: "honeymoon", title: "Flitterwochen Top-Ziele", icon: Globe, category: "Erlebnis", size: "sm", colSpan: 1 },
];

const defaultWidgetIds = ["stats", "recent_guests", "tasks", "activity", "meals", "allergies", "budget"];

// ── Animated Stat Card ──
const AnimatedStat = ({ label, target, icon: Icon, change, color }: { label: string; target: number; icon: any; change: string; color: string }) => {
  const value = useAnimatedNumber(target);
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-primary" /> {change}
      </div>
    </div>
  );
};

// ── Widget Renderers ──

const StatsWidget = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <AnimatedStat label="Gäste gesamt" target={124} icon={Users} change="+8 diese Woche" color="bg-primary/10 text-primary" />
    <AnimatedStat label="Zugesagt" target={87} icon={CheckCircle} change="+5 diese Woche" color="bg-primary/10 text-primary" />
    <AnimatedStat label="Ausstehend" target={28} icon={Clock} change="-3 diese Woche" color="bg-accent/10 text-accent" />
    <AnimatedStat label="Abgesagt" target={9} icon={XCircle} change="+1 diese Woche" color="bg-destructive/10 text-destructive" />
  </div>
);

const RecentGuestsWidget = () => {
  const guests = [
    { name: "Sophie Weber", status: "Zugesagt", meal: "Vegetarisch", plusOne: "Ja" },
    { name: "Thomas Müller", status: "Zugesagt", meal: "Standard", plusOne: "Nein" },
    { name: "Maria Schmidt", status: "Ausstehend", meal: "–", plusOne: "–" },
    { name: "Felix Braun", status: "Abgesagt", meal: "–", plusOne: "–" },
    { name: "Anna Hoffmann", status: "Zugesagt", meal: "Vegan", plusOne: "Ja" },
  ];
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Letzte Rückmeldungen</h3>
        <Link to="/guests" className="text-xs text-primary hover:underline flex items-center gap-1">Alle <ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className="space-y-2">
        {guests.map((g, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground">
                {g.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.meal} · Plus-One: {g.plusOne}</p>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${g.status === "Zugesagt" ? "bg-primary/10 text-primary" : g.status === "Abgesagt" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"}`}>{g.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TasksWidget = () => {
  const tasks = [
    { task: "Blumendeko bestätigen", due: "In 3 Tagen", done: false },
    { task: "DJ-Playlist finalisieren", due: "In 5 Tagen", done: false },
    { task: "Tischkarten drucken", due: "In 1 Woche", done: false },
    { task: "Menü mit Caterer abstimmen", due: "Erledigt", done: true },
    { task: "Fotografen-Briefing", due: "Erledigt", done: true },
  ];
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Aufgaben</h3>
        <Link to="/tasks" className="text-xs text-primary hover:underline flex items-center gap-1">Alle <ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className="space-y-1.5">
        {tasks.map((t, i) => (
          <div key={i} className={`flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-secondary/50 transition-colors ${t.done ? "opacity-50" : ""}`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${t.done ? "border-primary bg-primary/10" : "border-border"}`}>
              {t.done && <CheckCircle className="h-3 w-3 text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.task}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityWidget = () => {
  const activities = [
    { text: "Maria Müller hat zugesagt", time: "vor 2 Stunden", icon: CheckCircle, color: "text-primary" },
    { text: "Anna Fischer hat Allergien aktualisiert", time: "vor 5 Stunden", icon: Utensils, color: "text-accent" },
    { text: "Paul Bauer hat Songwunsch eingereicht", time: "gestern", icon: Music, color: "text-primary" },
    { text: "3 neue RSVP-Antworten", time: "gestern", icon: Send, color: "text-primary" },
    { text: "Hotel Schlossblick Kontingent bestätigt", time: "vor 2 Tagen", icon: CheckCircle, color: "text-primary" },
  ];
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Letzte Aktivitäten</h3>
      </div>
      <div className="space-y-2">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <a.icon className={`h-4 w-4 shrink-0 ${a.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{a.text}</p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MealsWidget = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-foreground">Essenswahl</h3>
    <div className="space-y-3">
      {[
        { label: "Standard", count: 42, pct: 48, color: "bg-primary" },
        { label: "Vegetarisch", count: 23, pct: 26, color: "bg-accent" },
        { label: "Vegan", count: 14, pct: 16, color: "bg-primary/60" },
        { label: "Sonstiges", count: 8, pct: 10, color: "bg-muted-foreground/30" },
      ].map((m, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">{m.label}</span>
            <span className="font-medium text-foreground">{m.count} ({m.pct}%)</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className={`h-full rounded-full ${m.color} transition-all duration-700`} style={{ width: `${m.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AllergiesWidget = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-foreground">Allergien & Diäten</h3>
    <div className="space-y-2">
      {[
        { label: "Laktoseintoleranz", count: 5 },
        { label: "Glutenfrei", count: 3 },
        { label: "Nussallergie", count: 4 },
        { label: "Halal", count: 2 },
        { label: "Keine Angabe", count: 73 },
      ].map((a, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-sm text-foreground">{a.label}</span>
          </div>
          <span className="text-xs text-muted-foreground">{a.count} Gäste</span>
        </div>
      ))}
    </div>
  </div>
);

const BudgetWidget = () => {
  const spent = useAnimatedNumber(18450);
  const pctUsed = 74;
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">Budget-Übersicht</h3>
      <div className="text-center py-2">
        <p className="text-2xl font-bold text-foreground">€{spent.toLocaleString("de-DE")}</p>
        <p className="text-xs text-muted-foreground">von €25.000 geplant</p>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pctUsed}%` }} />
      </div>
      <div className="space-y-1 mt-1">
        {[
          { label: "Location", amount: "€5.500" },
          { label: "Catering", amount: "€6.200" },
          { label: "Fotograf", amount: "€2.800" },
        ].map((b, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{b.label}</span>
            <span className="font-medium text-foreground">{b.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuestbookWidget = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">Letzte Gästebuch-Einträge</h3>
      <Link to="/guestbook" className="text-xs text-primary hover:underline flex items-center gap-1">Alle <ArrowRight className="h-3 w-3" /></Link>
    </div>
    <div className="space-y-3">
      {[
        { author: "Sophie Weber", msg: "Wir freuen uns riesig auf eure Hochzeit! 💕", time: "vor 2 Std.", mood: "🥰" },
        { author: "Thomas Müller", msg: "Herzlichen Glückwunsch euch beiden!", time: "vor 5 Std.", mood: "🎉" },
        { author: "Anna Hoffmann", msg: "Ich kenne Laura schon seit dem Kindergarten...", time: "gestern", mood: "😊" },
      ].map((e, i) => (
        <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
          <span className="text-lg">{e.mood}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{e.author}</p>
            <p className="text-xs text-muted-foreground truncate">{e.msg}</p>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{e.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const PhotosWidget = () => {
  const count = useAnimatedNumber(47);
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col items-center gap-2 text-center">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-sm font-semibold text-foreground">Foto-Uploads</h3>
        <Link to="/photos" className="text-xs text-primary hover:underline"><ArrowRight className="h-3 w-3" /></Link>
      </div>
      <p className="text-3xl font-bold text-foreground">{count}</p>
      <p className="text-xs text-muted-foreground">Fotos hochgeladen</p>
      <div className="flex gap-2 mt-1">
        {["📸", "🌅", "💐", "🥂"].map((e, i) => (
          <span key={i} className="text-lg">{e}</span>
        ))}
      </div>
    </div>
  );
};

const MusicWidget = () => {
  const count = useAnimatedNumber(23);
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col items-center gap-2 text-center">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-sm font-semibold text-foreground">Musik-Vorschläge</h3>
        <Link to="/music" className="text-xs text-primary hover:underline"><ArrowRight className="h-3 w-3" /></Link>
      </div>
      <p className="text-3xl font-bold text-foreground">{count}</p>
      <p className="text-xs text-muted-foreground">Songwünsche eingereicht</p>
      <div className="space-y-1 mt-1 w-full text-left">
        {["Perfect – Ed Sheeran", "Marry You – Bruno Mars", "Can't Help Falling..."].map((s, i) => (
          <p key={i} className="text-xs text-muted-foreground truncate">🎵 {s}</p>
        ))}
      </div>
    </div>
  );
};

const WishlistWidget = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col items-center gap-2 text-center">
    <div className="flex items-center justify-between w-full">
      <h3 className="text-sm font-semibold text-foreground">Wunschliste</h3>
      <Link to="/wishlist" className="text-xs text-primary hover:underline"><ArrowRight className="h-3 w-3" /></Link>
    </div>
    <p className="text-3xl font-bold text-foreground">5/8</p>
    <p className="text-xs text-muted-foreground">Wünsche reserviert</p>
    <div className="h-2 rounded-full bg-secondary overflow-hidden w-full mt-1">
      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: "62.5%" }} />
    </div>
  </div>
);

const InvitationsWidget = () => {
  const sent = useAnimatedNumber(98);
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col items-center gap-2 text-center">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-sm font-semibold text-foreground">Einladungen</h3>
        <Link to="/invitations" className="text-xs text-primary hover:underline"><ArrowRight className="h-3 w-3" /></Link>
      </div>
      <p className="text-3xl font-bold text-foreground">{sent}/124</p>
      <p className="text-xs text-muted-foreground">Einladungen versendet</p>
      <div className="h-2 rounded-full bg-secondary overflow-hidden w-full mt-1">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: "79%" }} />
      </div>
    </div>
  );
};

const HoneymoonWidget = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">Flitterwochen</h3>
      <Link to="/honeymoon" className="text-xs text-primary hover:underline"><ArrowRight className="h-3 w-3" /></Link>
    </div>
    <div className="space-y-2">
      {[
        { dest: "🏝️ Malediven", votes: 18 },
        { dest: "🏛️ Santorini", votes: 14 },
        { dest: "🌺 Bali", votes: 12 },
      ].map((d, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <span className="text-foreground">{d.dest}</span>
          <span className="text-xs text-muted-foreground">{d.votes} Stimmen</span>
        </div>
      ))}
    </div>
  </div>
);

const widgetRenderers: Record<string, () => JSX.Element> = {
  stats: StatsWidget,
  recent_guests: RecentGuestsWidget,
  tasks: TasksWidget,
  activity: ActivityWidget,
  meals: MealsWidget,
  allergies: AllergiesWidget,
  budget: BudgetWidget,
  guestbook: GuestbookWidget,
  photos: PhotosWidget,
  music: MusicWidget,
  wishlist: WishlistWidget,
  invitations: InvitationsWidget,
  honeymoon: HoneymoonWidget,
};

// ── Main Component ──

const DashboardOverview = () => {
  const [activeWidgets, setActiveWidgets] = useState<string[]>(defaultWidgetIds);
  const [editMode, setEditMode] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const removeWidget = (id: string) => setActiveWidgets(activeWidgets.filter(w => w !== id));
  const addWidget = (id: string) => { setActiveWidgets([...activeWidgets, id]); setShowAddDialog(false); };
  const resetWidgets = () => { setActiveWidgets(defaultWidgetIds); setEditMode(false); };

  const availableToAdd = allWidgets.filter(w => !activeWidgets.includes(w.id));

  const pctUsed = 74;
  const showYellowBanner = pctUsed >= 90 && pctUsed < 100;
  const showRedBanner = pctUsed >= 100;

  // Drag and drop
  const handleDragStart = (idx: number) => {
    if (!editMode) return;
    setDragIdx(idx);
  };
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (!editMode) return;
    setDragOverIdx(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragIdx === null || !editMode) return;
    const newWidgets = [...activeWidgets];
    const [moved] = newWidgets.splice(dragIdx, 1);
    newWidgets.splice(idx, 0, moved);
    setActiveWidgets(newWidgets);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const getGridClass = (widgetId: string) => {
    if (viewMode === "list") return "col-span-full";
    const def = allWidgets.find(w => w.id === widgetId);
    if (!def) return "col-span-full";
    if (def.colSpan === 4) return "col-span-full";
    if (def.colSpan === 2) return "col-span-full lg:col-span-2";
    return "col-span-full sm:col-span-2 lg:col-span-1";
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Budget Banners */}
        {showRedBanner && (
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-destructive/30 bg-destructive/5">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="text-sm font-semibold text-destructive">Budget überschritten!</p>
              <p className="text-xs text-muted-foreground">Ihr habt das geplante Budget um {pctUsed - 100}% überschritten.</p>
            </div>
          </div>
        )}
        {showYellowBanner && (
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-accent/30 bg-accent/5">
            <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
            <div>
              <p className="text-sm font-semibold text-accent">Budget-Warnung</p>
              <p className="text-xs text-muted-foreground">{pctUsed}% des Budgets sind bereits verplant.</p>
            </div>
          </div>
        )}

        {/* Demo Banner + Edit Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full inline-block">
              🎯 Demo-Modus – Interaktive Vorschau des Dashboards
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* View mode toggle */}
            <div className="flex rounded-lg overflow-hidden border border-border/50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {editMode && (
              <>
                <Button size="sm" variant="outline" onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4" /> Widget
                </Button>
                <Button size="sm" variant="ghost" onClick={resetWidgets}>
                  <RotateCcw className="h-4 w-4" /> Reset
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant={editMode ? "default" : "outline"}
              onClick={() => setEditMode(!editMode)}
            >
              <Settings2 className="h-4 w-4" />
              {editMode ? "Fertig" : "Anpassen"}
            </Button>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeWidgets.map((widgetId, idx) => {
            const Renderer = widgetRenderers[widgetId];
            const def = allWidgets.find(w => w.id === widgetId);
            if (!Renderer || !def) return null;

            return (
              <div
                key={widgetId}
                className={`${getGridClass(widgetId)} relative group transition-all duration-200 ${editMode ? "cursor-grab active:cursor-grabbing" : ""} ${dragOverIdx === idx && editMode ? "ring-2 ring-primary/50 rounded-2xl" : ""}`}
                draggable={editMode}
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={handleDragEnd}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {editMode && (
                  <div className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => removeWidget(widgetId)} className="p-1.5 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs border border-destructive/20">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className={`h-full ${editMode ? "ring-1 ring-border/50 ring-dashed rounded-2xl" : ""}`}>
                  <Renderer />
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Widget Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Widget hinzufügen</DialogTitle>
            </DialogHeader>
            {availableToAdd.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Alle Widgets sind bereits aktiv.</p>
            ) : (
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {availableToAdd.map(w => (
                  <button
                    key={w.id}
                    onClick={() => addWidget(w.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left group"
                  >
                    <w.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.title}</p>
                      <p className="text-xs text-muted-foreground">{w.category}</p>
                    </div>
                    <Plus className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;
