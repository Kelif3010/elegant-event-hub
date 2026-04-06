import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { timelineEvents as initialEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Clock, MapPin, Edit, Sparkles, Heart, GlassWater, Utensils, Music, Pizza, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EmptyState, { TimelineIllustration } from "@/components/EmptyState";

const iconMap: Record<string, typeof Sparkles> = { sparkles: Sparkles, heart: Heart, "glass-water": GlassWater, utensils: Utensils, music: Music, pizza: Pizza };

const Timeline = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<typeof initialEvents[number] | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", time: "", endTime: "", description: "", location: "", icon: "sparkles" });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time) { toast.error("Titel und Uhrzeit sind Pflicht"); return; }
    setEvents(prev => [...prev, { ...newEvent, id: `e${Date.now()}` }].sort((a, b) => a.time.localeCompare(b.time)));
    setShowAddDialog(false);
    setNewEvent({ title: "", time: "", endTime: "", description: "", location: "", icon: "sparkles" });
    toast.success("Programmpunkt hinzugefügt");
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSelectedEvent(null);
    toast.success("Programmpunkt entfernt");
  };

  const totalDuration = events.reduce((acc, e) => {
    const [sh, sm] = e.time.split(":").map(Number);
    const [eh, em] = e.endTime.split(":").map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;
    return acc + diff;
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Euer großer Tag, Minute für Minute</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Zeitplan</h1>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="text-sm py-1.5 px-3">{events.length} Programmpunkte</Badge>
            <Badge variant="outline" className="text-sm py-1.5 px-3">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min gesamt</Badge>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Hinzufügen</Button>
          </div>
        </div>

        {events.length === 0 ? (
          <EmptyState illustration={<TimelineIllustration />} title="Noch kein Programm erstellt" description="Plant euren Tagesablauf – von der Trauung bis zum letzten Tanz." actionLabel="Programmpunkt hinzufügen" onAction={() => setShowAddDialog(true)} />
        ) : (
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {events.map((event, idx) => {
              const Icon = iconMap[event.icon] || Sparkles;
              const isLeft = idx % 2 === 0;
              return (
                <div key={event.id} className="relative animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10 mt-6" />
                  <div className={cn("ml-14 md:ml-0 md:w-[calc(50%-2rem)]", isLeft ? "md:mr-auto" : "md:ml-auto")}>
                    <button onClick={() => setSelectedEvent(event)} className="w-full text-left p-5 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Icon className="h-5 w-5 text-accent" /></div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif font-semibold">{event.title}</h3>
                            <Edit className="h-3.5 w-3.5 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors" />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time} – {event.endTime}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-secondary border border-accent/10 shadow-elegant">
          <div className="flex items-center gap-4 overflow-x-auto pb-1">
            {events.map((e, i) => {
              const Icon = iconMap[e.icon] || Sparkles;
              return (
                <div key={e.id} className="flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-background/60 flex items-center justify-center"><Icon className="h-3.5 w-3.5 text-accent" /></div>
                  <div><p className="text-xs font-medium whitespace-nowrap">{e.title}</p><p className="text-[10px] text-muted-foreground">{e.time}</p></div>
                  {i < events.length - 1 && <div className="w-6 h-px bg-border mx-1" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent>
          <SheetHeader><SheetTitle className="font-serif">{selectedEvent?.title}</SheetTitle></SheetHeader>
          {selectedEvent && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                {[{ label: "Uhrzeit", value: `${selectedEvent.time} – ${selectedEvent.endTime}` }, { label: "Ort", value: selectedEvent.location }].map(item => (
                  <div key={item.label} className="flex justify-between p-3 rounded-xl bg-secondary/30"><span className="text-sm text-muted-foreground">{item.label}</span><span className="text-sm font-medium">{item.value}</span></div>
                ))}
              </div>
              <div><p className="text-sm text-muted-foreground mb-2">Beschreibung</p><p className="text-sm">{selectedEvent.description}</p></div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-xs">Bearbeiten</Button>
                <Button variant="outline" className="text-xs text-destructive hover:text-destructive" onClick={() => deleteEvent(selectedEvent.id)}>Löschen</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">Neuer Programmpunkt</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titel *</Label><Input value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} placeholder="z.B. Trauung" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Beginn *</Label><Input type="time" value={newEvent.time} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} /></div>
              <div><Label>Ende</Label><Input type="time" value={newEvent.endTime} onChange={e => setNewEvent(p => ({ ...p, endTime: e.target.value }))} /></div>
            </div>
            <div><Label>Ort</Label><Input value={newEvent.location} onChange={e => setNewEvent(p => ({ ...p, location: e.target.value }))} placeholder="z.B. Schlossgarten" /></div>
            <div><Label>Beschreibung</Label><Input value={newEvent.description} onChange={e => setNewEvent(p => ({ ...p, description: e.target.value }))} /></div>
            <div><Label>Icon</Label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(iconMap).map(([key, Icon]) => (
                  <button key={key} onClick={() => setNewEvent(p => ({ ...p, icon: key }))} className={cn("p-2 rounded-lg border-2 transition-all", newEvent.icon === key ? "border-accent bg-accent/10" : "border-transparent hover:bg-secondary")}><Icon className="h-5 w-5" /></button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Abbrechen</Button>
            <Button onClick={addEvent}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Timeline;
