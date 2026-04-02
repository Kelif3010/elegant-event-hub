import { dashboardStats, tasks, recentActivity, weddingInfo } from "@/data/mockData";
import { Users, UserCheck, Clock, UserX, Baby, Hotel, Bus, UtensilsCrossed, CheckCircle2, ListTodo, Heart, CalendarDays, TrendingUp, Bell, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

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

const Dashboard = () => (
  <DashboardLayout>
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Willkommen zurück</p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">{weddingInfo.coupleName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Countdown</p>
            <p className="text-2xl font-serif font-bold text-gradient-gold">{daysLeft} Tage</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-champagne-light flex items-center justify-center">
            <CalendarDays className="h-6 w-6 text-champagne" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => (
          <div key={c.label} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center`}>
                <c.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* RSVP Overview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-semibold">RSVP-Übersicht</h2>
            <Button variant="outline" size="sm" asChild><Link to="/guests">Alle Gäste</Link></Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Zugesagt</span><span className="text-sage font-medium">{s.confirmed}</span></div>
              <Progress value={(s.confirmed / s.totalGuests) * 100} className="h-2 bg-secondary [&>div]:bg-sage" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Ausstehend</span><span className="text-champagne font-medium">{s.pending}</span></div>
              <Progress value={(s.pending / s.totalGuests) * 100} className="h-2 bg-secondary [&>div]:bg-champagne" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Abgesagt</span><span className="text-rose font-medium">{s.declined}</span></div>
              <Progress value={(s.declined / s.totalGuests) * 100} className="h-2 bg-secondary [&>div]:bg-rose" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: "Plus-Ones", value: s.plusOnes, icon: Users },
              { label: "Kinder", value: s.children, icon: Baby },
              { label: "Diätwünsche", value: s.dietarySpecial, icon: UtensilsCrossed },
            ].map((m) => (
              <div key={m.label} className="text-center p-3 rounded-xl bg-secondary/50 space-y-1">
                <m.icon className="h-4 w-4 mx-auto text-muted-foreground" />
                <p className="text-lg font-semibold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-champagne" />
            <h2 className="text-lg font-serif font-semibold">Letzte Aktivitäten</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-champagne shrink-0" />
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-champagne" />
              <h2 className="text-lg font-serif font-semibold">Offene Aufgaben</h2>
            </div>
            <Badge variant="secondary">{s.openTasks} offen</Badge>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((t) => (
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
        </div>

        {/* Budget & Quick Stats */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-champagne" />
              <h2 className="text-lg font-serif font-semibold">Budget</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ausgegeben</span>
                <span className="font-semibold">€{s.budget.spent.toLocaleString("de-DE")}</span>
              </div>
              <Progress value={(s.budget.spent / s.budget.total) * 100} className="h-3 bg-secondary [&>div]:bg-champagne" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>€{s.budget.spent.toLocaleString("de-DE")} ausgegeben</span>
                <span>€{s.budget.total.toLocaleString("de-DE")} Budget</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2">
              <Hotel className="h-5 w-5 mx-auto text-champagne" />
              <p className="text-2xl font-serif font-bold">{s.accommodationNeeded}</p>
              <p className="text-xs text-muted-foreground">Unterkunft nötig</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-2">
              <Bus className="h-5 w-5 mx-auto text-champagne" />
              <p className="text-2xl font-serif font-bold">{s.shuttleNeeded}</p>
              <p className="text-xs text-muted-foreground">Shuttle benötigt</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-champagne-light to-secondary border border-champagne/10 shadow-elegant space-y-3">
            <Sparkles className="h-5 w-5 text-champagne" />
            <h3 className="font-serif font-semibold">Schnellaktionen</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/guests">Gäste verwalten</Link></Button>
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/rsvp">RSVP-Link teilen</Link></Button>
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/event">Gästeseite</Link></Button>
              <Button variant="outline" size="sm" className="text-xs justify-start" asChild><Link to="/settings">Einstellungen</Link></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Dashboard;
