import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { guestbookEntries } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trash2, Heart, Download } from "lucide-react";
import EmptyState, { GuestbookIllustration } from "@/components/EmptyState";

const Guestbook = () => {
  const [entries, setEntries] = useState(guestbookEntries);

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Gästebuch 📖</h1>
            <p className="text-muted-foreground text-sm">{entries.length} Einträge von euren Gästen</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Als PDF exportieren
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Einträge", value: entries.length, icon: "📝" },
            { label: "Dieser Monat", value: entries.filter(e => e.date >= "2025-04-01").length, icon: "📅" },
            { label: "Lieblingswünsche", value: "💕", icon: "❤️" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {entries.length === 0 ? (
          <EmptyState illustration={<GuestbookIllustration />} title="Noch keine Einträge" description="Sobald eure Gäste Nachrichten hinterlassen, erscheinen sie hier." actionLabel="Zum Gästebuch einladen" onAction={() => {}} />
        ) : (
        <div className="space-y-4 max-w-2xl">
          {entries.map(entry => (
            <div key={entry.id} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{entry.emoji}</span>
                  <span className="font-medium">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Heart className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeEntry(entry.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Guestbook;
