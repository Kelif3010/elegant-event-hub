import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { guests, weddingInfo, invitationTemplates } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MessageCircle, Link2, Search, Send, Check, Eye, Sparkles, Filter, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import EmptyState, { InvitationsIllustration } from "@/components/EmptyState";

type InviteStatus = "not_sent" | "sent" | "opened" | "reminded" | "rsvp_done";
const statusConfig: Record<InviteStatus, { label: string; color: string; dot: string }> = {
  not_sent: { label: "Nicht gesendet", color: "bg-secondary text-muted-foreground", dot: "bg-muted-foreground" },
  sent: { label: "Gesendet", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", dot: "bg-blue-500" },
  opened: { label: "Geöffnet", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", dot: "bg-purple-500" },
  reminded: { label: "Erinnert", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", dot: "bg-orange-500" },
  rsvp_done: { label: "RSVP erhalten", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
};

const mockInviteData = guests.map(g => ({
  ...g,
  inviteStatus: (g.status === "confirmed" ? "rsvp_done" : g.status === "declined" ? "rsvp_done" : ["not_sent", "sent", "opened", "reminded"][Math.floor(Math.random() * 4)]) as InviteStatus,
  channel: (["email", "whatsapp", "link"] as const)[Math.floor(Math.random() * 3)],
  sentDate: g.status !== "pending" ? "02.05.2025" : null,
  openedDate: g.status === "confirmed" ? "vor 2 Tagen" : null,
}));

const Invitations = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<InviteStatus | "all">("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [showTemplateDesigner, setShowTemplateDesigner] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("1");
  const [inviteData, setInviteData] = useState(mockInviteData);

  const counts: Record<string, number> = {
    all: inviteData.length,
    not_sent: inviteData.filter(g => g.inviteStatus === "not_sent").length,
    sent: inviteData.filter(g => g.inviteStatus === "sent").length,
    opened: inviteData.filter(g => g.inviteStatus === "opened").length,
    reminded: inviteData.filter(g => g.inviteStatus === "reminded").length,
    rsvp_done: inviteData.filter(g => g.inviteStatus === "rsvp_done").length,
  };

  const funnelStats = [
    { label: "Eingeladen", value: inviteData.length, pct: "100%", icon: "📨" },
    { label: "Geöffnet", value: counts.opened + counts.rsvp_done, pct: `${Math.round(((counts.opened + counts.rsvp_done) / inviteData.length) * 100)}%`, icon: "👀" },
    { label: "Erinnert", value: counts.reminded, pct: `${Math.round((counts.reminded / inviteData.length) * 100)}%`, icon: "🔔" },
    { label: "RSVP erhalten", value: counts.rsvp_done, pct: `${Math.round((counts.rsvp_done / inviteData.length) * 100)}%`, icon: "✅" },
  ];

  const filtered = inviteData.filter(g =>
    (filter === "all" || g.inviteStatus === filter) &&
    `${g.firstName} ${g.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(g => g.id));

  const bulkAction = (action: string) => {
    toast({ title: `${action}`, description: `${selected.length} Gäste betroffen.` });
    setSelected([]);
  };

  const channelIcon = (ch: string) => ch === "email" ? <Mail className="h-3.5 w-3.5" /> : ch === "whatsapp" ? <MessageCircle className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Einladungs-Management</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Einladungen</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowTemplateDesigner(true)} className="gap-2"><Sparkles className="h-4 w-4" /> Template Designer</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Send className="h-4 w-4" /> Alle einladen</Button>
          </div>
        </div>

        {/* Funnel KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {funnelStats.map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center hover:shadow-elevated transition-shadow">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-3xl font-serif font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xs font-medium text-accent mt-1">{stat.pct}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", "not_sent", "sent", "opened", "reminded", "rsvp_done"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
              filter === f ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}>
              {f === "all" ? "Alle" : statusConfig[f].label}
              <span className={cn("px-1.5 py-0.5 rounded-full text-[10px]", filter === f ? "bg-accent-foreground/20" : "bg-muted")}>{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Gast suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-card border border-border/50 shadow-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="p-3 text-left w-10"><Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gast</th>
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kanal</th>
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gruppe</th>
                  <th className="p-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(g => (
                  <tr key={g.id} className={cn("border-b border-border/30 transition-colors hover:bg-secondary/20", selected.includes(g.id) && "bg-accent/5")}>
                    <td className="p-3"><Checkbox checked={selected.includes(g.id)} onCheckedChange={() => toggleSelect(g.id)} /></td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">{g.firstName[0]}{g.lastName[0]}</div>
                        <div>
                          <p className="text-sm font-medium">{g.firstName} {g.lastName}</p>
                          <p className="text-xs text-muted-foreground">{g.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        {channelIcon(g.channel)}
                        <span className="text-xs capitalize">{g.channel}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", statusConfig[g.inviteStatus].dot)} />
                        <Badge className={cn("text-xs border-0", statusConfig[g.inviteStatus].color)}>
                          {statusConfig[g.inviteStatus].label}
                        </Badge>
                        {g.sentDate && g.inviteStatus !== "not_sent" && <span className="text-[10px] text-muted-foreground">{g.sentDate}</span>}
                      </div>
                    </td>
                    <td className="p-3"><Badge variant="outline" className="text-xs">{g.group}</Badge></td>
                    <td className="p-3 text-right">
                      {g.inviteStatus !== "rsvp_done" && (
                        <Button size="sm" variant="ghost" className="text-xs gap-1" onClick={() => toast({ title: "Erneut gesendet", description: `Einladung an ${g.firstName} erneut gesendet.` })}>
                          <RefreshCw className="h-3 w-3" /> Erneut
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions Floating Bar */}
        {selected.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border/50 shadow-elevated backdrop-blur-sm">
              <span className="text-sm font-medium">{selected.length} ausgewählt</span>
              <div className="w-px h-6 bg-border" />
              <Button size="sm" variant="outline" onClick={() => bulkAction("Erinnerung gesendet")} className="text-xs gap-1"><RefreshCw className="h-3 w-3" /> Erinnerung</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction("Erneut gesendet")} className="text-xs gap-1"><Send className="h-3 w-3" /> Erneut senden</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction("Als gesendet markiert")} className="text-xs gap-1"><Check className="h-3 w-3" /> Als gesendet</Button>
              <Button size="sm" variant="ghost" onClick={() => setSelected([])}><span className="text-xs">Abbrechen</span></Button>
            </div>
          </div>
        )}
      </div>

      {/* Template Designer Modal */}
      <Dialog open={showTemplateDesigner} onOpenChange={setShowTemplateDesigner}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-serif text-xl">Einladungs-Template Designer</DialogTitle></DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Template wählen</p>
              {invitationTemplates.map(t => (
                <button key={t.id} onClick={() => setSelectedTemplate(t.id)} className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  selectedTemplate === t.id ? "border-accent bg-accent/5" : "border-border/50 hover:border-accent/30"
                )}>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.preview}</p>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Vorschau</p>
              <div className="rounded-2xl border border-border/50 p-6 bg-background space-y-4 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Einladung zur Hochzeit</p>
                <h3 className="text-2xl font-serif font-semibold" style={{ color: theme.accentColor }}>{theme.coupleName.partner1} & {theme.coupleName.partner2}</h3>
                <p className="text-sm text-muted-foreground">laden herzlich ein zur Feier ihrer Vermählung</p>
                <div className="py-4 space-y-1">
                  <p className="font-medium">📅 {theme.eventDate ? new Date(theme.eventDate).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : "13. September 2025"}</p>
                  <p className="text-sm text-muted-foreground">📍 {theme.eventLocation}</p>
                </div>
                <Button size="sm" style={{ backgroundColor: theme.accentColor }} className="text-accent-foreground">Jetzt zusagen →</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Invitations;
