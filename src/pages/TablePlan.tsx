import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { seatingTables, guests } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Users, GripVertical, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Table = typeof seatingTables[number];

const TablePlan = () => {
  const [tables, setTables] = useState(seatingTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [dragGuest, setDragGuest] = useState<string | null>(null);

  const assignedGuestIds = tables.flatMap(t => t.guests);
  const unassigned = guests.filter(g => g.status !== "declined" && !assignedGuestIds.includes(g.id));

  const handleDropOnTable = (tableId: string) => {
    if (!dragGuest) return;
    setTables(prev => prev.map(t => {
      if (t.id === tableId && !t.guests.includes(dragGuest) && t.guests.length < t.seats) {
        return { ...t, guests: [...t.guests, dragGuest] };
      }
      return t;
    }));
    setDragGuest(null);
  };

  const removeGuestFromTable = (tableId: string, guestId: string) => {
    setTables(prev => prev.map(t =>
      t.id === tableId ? { ...t, guests: t.guests.filter(g => g !== guestId) } : t
    ));
  };

  const getGuest = (id: string) => guests.find(g => g.id === id);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Sitzordnung planen</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Tischplan</h1>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="text-sm py-1.5 px-3">
              {assignedGuestIds.length} zugewiesen
            </Badge>
            <Badge variant="outline" className="text-sm py-1.5 px-3 text-champagne border-champagne/30">
              {unassigned.length} offen
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Guest Pool */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 max-h-[75vh] overflow-y-auto">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Gäste zuweisen</h2>
            <p className="text-xs text-muted-foreground">Ziehe Gäste auf einen Tisch oder klicke auf einen Tisch.</p>
            <div className="space-y-2">
              {unassigned.map(g => (
                <div
                  key={g.id}
                  draggable
                  onDragStart={() => setDragGuest(g.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/70 cursor-grab active:cursor-grabbing transition-colors"
                >
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{g.firstName} {g.lastName}</p>
                    <p className="text-xs text-muted-foreground">{g.group}</p>
                  </div>
                  {g.plusOne && <Badge className="bg-champagne-light text-champagne border-0 text-[10px]">+1</Badge>}
                </div>
              ))}
              {unassigned.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-6 w-6 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Alle Gäste zugewiesen!</p>
                </div>
              )}
            </div>
          </div>

          {/* Floor Plan */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border/50 shadow-elegant">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tables.map(table => {
                const tableGuests = table.guests.map(id => getGuest(id)).filter(Boolean);
                const isFull = table.guests.length >= table.seats;
                return (
                  <div
                    key={table.id}
                    onDragOver={e => { e.preventDefault(); }}
                    onDrop={() => handleDropOnTable(table.id)}
                    onClick={() => setSelectedTable(table)}
                    className={cn(
                      "relative p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:shadow-elevated group",
                      isFull
                        ? "border-sage/30 bg-sage-light/30"
                        : "border-border/50 bg-secondary/20 hover:border-champagne/40"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif font-semibold text-sm">{table.name}</h3>
                      <span className="text-xs text-muted-foreground">{table.guests.length}/{table.seats}</span>
                    </div>

                    {/* Visual table */}
                    <div className={cn(
                      "mx-auto mb-3 flex items-center justify-center",
                      table.shape === "round"
                        ? "w-16 h-16 rounded-full bg-secondary border border-border/50"
                        : "w-24 h-10 rounded-lg bg-secondary border border-border/50"
                    )}>
                      <Users className="h-4 w-4 text-muted-foreground/50" />
                    </div>

                    <div className="space-y-1">
                      {tableGuests.slice(0, 3).map(g => g && (
                        <p key={g.id} className="text-xs truncate text-muted-foreground">
                          {g.firstName} {g.lastName}
                        </p>
                      ))}
                      {tableGuests.length > 3 && (
                        <p className="text-xs text-champagne">+{tableGuests.length - 3} weitere</p>
                      )}
                      {tableGuests.length === 0 && (
                        <p className="text-xs text-muted-foreground/50 italic">Noch leer</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Table Detail Sheet */}
      <Sheet open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-serif">{selectedTable?.name}</SheetTitle>
          </SheetHeader>
          {selectedTable && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Plätze</span>
                <span className="font-medium">{selectedTable.guests.length} / {selectedTable.seats}</span>
              </div>
              <div className="space-y-2">
                {selectedTable.guests.map(gId => {
                  const g = getGuest(gId);
                  if (!g) return null;
                  return (
                    <div key={gId} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                      <div>
                        <p className="text-sm font-medium">{g.firstName} {g.lastName}</p>
                        <p className="text-xs text-muted-foreground">{g.group}{g.meal ? ` • ${g.meal}` : ""}</p>
                      </div>
                      <button
                        onClick={() => {
                          removeGuestFromTable(selectedTable.id, gId);
                          setSelectedTable(prev => prev ? { ...prev, guests: prev.guests.filter(x => x !== gId) } : null);
                        }}
                        className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
                {selectedTable.guests.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Ziehe Gäste hierher oder weise sie über die Liste zu.
                  </p>
                )}
              </div>

              {/* Quick assign from unassigned */}
              {unassigned.length > 0 && selectedTable.guests.length < selectedTable.seats && (
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Schnell zuweisen</p>
                  {unassigned.slice(0, 5).map(g => (
                    <button
                      key={g.id}
                      onClick={() => {
                        const updated = { ...selectedTable, guests: [...selectedTable.guests, g.id] };
                        setTables(prev => prev.map(t => t.id === selectedTable.id ? updated : t));
                        setSelectedTable(updated);
                      }}
                      className="flex items-center justify-between w-full p-2.5 rounded-xl bg-secondary/20 hover:bg-champagne-light transition-colors"
                    >
                      <span className="text-sm">{g.firstName} {g.lastName}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default TablePlan;
