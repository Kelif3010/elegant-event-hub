import { useState, useRef, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { seatingTables, guests } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, GripVertical, X, ArrowRight, List, LayoutGrid, Circle, Square, RectangleHorizontal, Trash2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState, { TablePlanIllustration } from "@/components/EmptyState";

type TableShape = "round" | "rectangle" | "square";
type Table = { id: string; name: string; shape: TableShape; seats: number; x: number; y: number; guests: string[] };

const TablePlan = () => {
  const [tables, setTables] = useState<Table[]>(seatingTables as Table[]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [dragGuest, setDragGuest] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "room">("list");
  const [draggingTable, setDraggingTable] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState({ name: "", shape: "round" as TableShape, seats: 8 });
  const [editingTable, setEditingTable] = useState<string | null>(null);
  const roomRef = useRef<HTMLDivElement>(null);

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
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: t.guests.filter(g => g !== guestId) } : t));
  };

  const getGuest = (id: string) => guests.find(g => g.id === id);

  const addTable = () => {
    if (!newTable.name.trim()) return;
    const id = String(Date.now());
    setTables(prev => [...prev, { id, name: newTable.name, shape: newTable.shape, seats: newTable.seats, x: 100 + Math.random() * 400, y: 100 + Math.random() * 300, guests: [] }]);
    setNewTable({ name: "", shape: "round", seats: 8 });
    setShowAddTable(false);
  };

  const deleteTable = (id: string) => {
    setTables(prev => prev.filter(t => t.id !== id));
    if (selectedTable?.id === id) setSelectedTable(null);
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleRoomMouseDown = (e: React.MouseEvent, tableId: string) => {
    if (view !== "room") return;
    const rect = roomRef.current?.getBoundingClientRect();
    if (!rect) return;
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    setDraggingTable(tableId);
    setDragOffset({ x: e.clientX - rect.left - table.x, y: e.clientY - rect.top - table.y });
  };

  const handleRoomMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingTable || !roomRef.current) return;
    const rect = roomRef.current.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left - dragOffset.x));
    const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top - dragOffset.y));
    setTables(prev => prev.map(t => t.id === draggingTable ? { ...t, x, y } : t));
  }, [draggingTable, dragOffset]);

  const handleRoomMouseUp = () => setDraggingTable(null);

  const renderTableShape = (table: Table, size: "sm" | "lg") => {
    const s = size === "lg" ? { round: "w-20 h-20", rect: "w-28 h-14", sq: "w-18 h-18" } : { round: "w-14 h-14", rect: "w-20 h-10", sq: "w-14 h-14" };
    const cls = table.shape === "round" ? `${s.round} rounded-full` : table.shape === "rectangle" ? `${s.rect} rounded-lg` : `${s.sq} rounded-lg`;
    return (
      <div className={cn(cls, "bg-secondary border-2 border-border/50 flex items-center justify-center transition-colors", table.guests.length >= table.seats ? "border-sage/40 bg-sage-light/30" : "border-champagne/20")}>
        <span className="text-xs font-medium text-muted-foreground">{table.guests.length}/{table.seats}</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Sitzordnung planen</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold">Tischplan</h1>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            <Badge variant="outline" className="text-xs md:text-sm py-1 md:py-1.5 px-2 md:px-3">{assignedGuestIds.length} zugewiesen</Badge>
            <Badge variant="outline" className="text-xs md:text-sm py-1 md:py-1.5 px-2 md:px-3 text-champagne border-champagne/30">{unassigned.length} offen</Badge>
            <div className="flex rounded-xl border border-border/50 overflow-hidden ml-auto">
              <button onClick={() => setView("list")} className={cn("px-3 py-2 text-xs md:text-sm flex items-center gap-1.5 transition-colors min-h-[44px] md:min-h-0", view === "list" ? "bg-champagne text-accent-foreground" : "hover:bg-secondary")}>
                <List className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Liste</span>
              </button>
              <button onClick={() => setView("room")} className={cn("px-3 py-2 text-xs md:text-sm flex items-center gap-1.5 transition-colors min-h-[44px] md:min-h-0", view === "room" ? "bg-champagne text-accent-foreground" : "hover:bg-secondary")}>
                <LayoutGrid className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Raumansicht</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6">
          {/* Guest Pool */}
          <div className="lg:col-span-1 p-4 md:p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4 max-h-[40vh] lg:max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Gäste</h2>
              <Button variant="outline" size="sm" onClick={() => setShowAddTable(true)} className="gap-1 text-xs h-7">
                <Plus className="h-3 w-3" /> Tisch
              </Button>
            </div>
            <div className="space-y-2">
              {unassigned.map(g => (
                <div key={g.id} draggable onDragStart={() => setDragGuest(g.id)} className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/70 cursor-grab active:cursor-grabbing transition-colors">
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

          {/* List / Room View */}
          <div className="lg:col-span-3">
            {tables.length === 0 ? (
              <EmptyState illustration={<TablePlanIllustration />} title="Noch keine Tische erstellt" description="Erstellt euren ersten Tisch und beginnt mit der Sitzordnung." actionLabel="Ersten Tisch erstellen" onAction={() => setShowAddTable(true)} />
            ) : view === "list" ? (
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tables.map(table => {
                    const tableGuests = table.guests.map(id => getGuest(id)).filter(Boolean);
                    return (
                      <div key={table.id}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDropOnTable(table.id)}
                        onClick={() => setSelectedTable(table)}
                        className={cn(
                          "relative p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:shadow-elevated group",
                          table.guests.length >= table.seats ? "border-sage/30 bg-sage-light/30" : "border-border/50 bg-secondary/20 hover:border-champagne/40"
                        )}
                      >
                        <button onClick={e => { e.stopPropagation(); deleteTable(table.id); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-serif font-semibold text-sm">{table.name}</h3>
                          <span className="text-xs text-muted-foreground">{table.guests.length}/{table.seats}</span>
                        </div>
                        <div className="flex justify-center mb-3">{renderTableShape(table, "sm")}</div>
                        <div className="space-y-1">
                          {tableGuests.slice(0, 3).map(g => g && <p key={g.id} className="text-xs truncate text-muted-foreground">{g.firstName} {g.lastName}</p>)}
                          {tableGuests.length > 3 && <p className="text-xs text-champagne">+{tableGuests.length - 3} weitere</p>}
                          {tableGuests.length === 0 && <p className="text-xs text-muted-foreground/50 italic">Noch leer</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Room View */
              <div
                ref={roomRef}
                className="relative rounded-2xl bg-card border-2 border-dashed border-border/50 shadow-elegant overflow-hidden select-none"
                style={{ height: "600px" }}
                onMouseMove={handleRoomMouseMove}
                onMouseUp={handleRoomMouseUp}
                onMouseLeave={handleRoomMouseUp}
              >
                {/* Room background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--secondary)/0.3)_100%)]" />
                <div className="absolute top-4 left-4 text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">Raumansicht · Tische verschieben</div>
                
                {/* Door indicators */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-champagne/30 rounded-t-full" />
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40">Eingang</p>

                {tables.map(table => {
                  const tableGuests = table.guests.map(id => getGuest(id)).filter(Boolean);
                  const isFull = table.guests.length >= table.seats;
                  return (
                    <div
                      key={table.id}
                      className={cn("absolute cursor-grab active:cursor-grabbing group", draggingTable === table.id && "z-20")}
                      style={{ left: table.x, top: table.y, transform: "translate(-50%, -50%)" }}
                      onMouseDown={e => handleRoomMouseDown(e, table.id)}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDropOnTable(table.id)}
                      onClick={e => { if (!draggingTable) { e.stopPropagation(); setSelectedTable(table); } }}
                    >
                      {/* Table visual */}
                      <div className="flex flex-col items-center gap-1">
                        {/* Chairs around table */}
                        <div className="relative">
                          {renderTableShape(table, "lg")}
                          {/* Mini guest dots */}
                          {table.shape === "round" && tableGuests.map((_, i) => {
                            const angle = (i / table.seats) * Math.PI * 2 - Math.PI / 2;
                            const r = 48;
                            return (
                              <div key={i} className={cn("absolute w-3 h-3 rounded-full border", isFull ? "bg-sage-light border-sage/40" : "bg-champagne-light border-champagne/40")}
                                style={{ left: `calc(50% + ${Math.cos(angle) * r}px - 6px)`, top: `calc(50% + ${Math.sin(angle) * r}px - 6px)` }} />
                            );
                          })}
                          {/* Edit button */}
                          <button onClick={e => { e.stopPropagation(); setEditingTable(table.id); setSelectedTable(table); }} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-card border border-border shadow-sm flex items-center justify-center transition-opacity">
                            <Edit3 className="h-2.5 w-2.5 text-muted-foreground" />
                          </button>
                        </div>
                        <p className="text-xs font-medium text-center whitespace-nowrap">{table.name}</p>
                        <p className="text-[10px] text-muted-foreground">{table.guests.length}/{table.seats}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Table Dialog */}
      <Sheet open={showAddTable} onOpenChange={setShowAddTable}>
        <SheetContent>
          <SheetHeader><SheetTitle className="font-serif">Neuer Tisch</SheetTitle></SheetHeader>
          <div className="mt-6 space-y-5">
            <div><Label>Tischname</Label><Input placeholder="z.B. Tisch 7" value={newTable.name} onChange={e => setNewTable(p => ({ ...p, name: e.target.value }))} /></div>
            <div>
              <Label>Form</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {([["round", "Rund", Circle], ["rectangle", "Rechteckig", RectangleHorizontal], ["square", "Quadratisch", Square]] as const).map(([val, label, Icon]) => (
                  <button key={val} onClick={() => setNewTable(p => ({ ...p, shape: val }))} className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all", newTable.shape === val ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40")}>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Anzahl Plätze</Label>
              <Select value={String(newTable.seats)} onValueChange={v => setNewTable(p => ({ ...p, seats: Number(v) }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[4, 6, 8, 10, 12].map(n => <SelectItem key={n} value={String(n)}>{n} Plätze</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addTable} className="w-full bg-champagne hover:bg-champagne/90 text-accent-foreground">Tisch hinzufügen</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Table Detail Sheet */}
      <Sheet open={!!selectedTable && !showAddTable} onOpenChange={() => { setSelectedTable(null); setEditingTable(null); }}>
        <SheetContent>
          <SheetHeader><SheetTitle className="font-serif">{selectedTable?.name}</SheetTitle></SheetHeader>
          {selectedTable && (
            <div className="mt-6 space-y-4">
              {/* Edit table properties */}
              {editingTable === selectedTable.id && (
                <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div><Label className="text-xs">Name</Label><Input value={selectedTable.name} onChange={e => { const n = e.target.value; updateTable(selectedTable.id, { name: n }); setSelectedTable(prev => prev ? { ...prev, name: n } : null); }} /></div>
                  <div>
                    <Label className="text-xs">Form</Label>
                    <div className="flex gap-2 mt-1">
                      {(["round", "rectangle", "square"] as const).map(s => (
                        <button key={s} onClick={() => { updateTable(selectedTable.id, { shape: s }); setSelectedTable(prev => prev ? { ...prev, shape: s } : null); }} className={cn("px-3 py-1.5 rounded-lg text-xs border transition-all", selectedTable.shape === s ? "border-champagne bg-champagne-light" : "border-border")}>
                          {s === "round" ? "Rund" : s === "rectangle" ? "Rechteck" : "Quadrat"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Plätze</Label>
                    <Select value={String(selectedTable.seats)} onValueChange={v => { const n = Number(v); updateTable(selectedTable.id, { seats: n }); setSelectedTable(prev => prev ? { ...prev, seats: n } : null); }}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>{[4, 6, 8, 10, 12].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setEditingTable(null)}>Fertig</Button>
                </div>
              )}
              {editingTable !== selectedTable.id && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Plätze</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedTable.guests.length} / {selectedTable.seats}</span>
                    <button onClick={() => setEditingTable(selectedTable.id)} className="p-1 rounded-lg hover:bg-secondary"><Edit3 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {selectedTable.guests.map(gId => {
                  const g = getGuest(gId);
                  if (!g) return null;
                  return (
                    <div key={gId} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                      <div>
                        <p className="text-sm font-medium">{g.firstName} {g.lastName}</p>
                        <p className="text-xs text-muted-foreground">{g.group}{g.meal ? ` · ${g.meal}` : ""}</p>
                      </div>
                      <button onClick={() => { removeGuestFromTable(selectedTable.id, gId); setSelectedTable(prev => prev ? { ...prev, guests: prev.guests.filter(x => x !== gId) } : null); }} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><X className="h-4 w-4" /></button>
                    </div>
                  );
                })}
              </div>
              {unassigned.length > 0 && selectedTable.guests.length < selectedTable.seats && (
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Schnell zuweisen</p>
                  {unassigned.slice(0, 5).map(g => (
                    <button key={g.id} onClick={() => { const updated = { ...selectedTable, guests: [...selectedTable.guests, g.id] }; setTables(prev => prev.map(t => t.id === selectedTable.id ? updated : t)); setSelectedTable(updated); }} className="flex items-center justify-between w-full p-2.5 rounded-xl bg-secondary/20 hover:bg-champagne-light transition-colors">
                      <span className="text-sm">{g.firstName} {g.lastName}</span><ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
              <div className="pt-4 border-t border-border/50">
                <Button variant="destructive" size="sm" onClick={() => deleteTable(selectedTable.id)} className="w-full gap-2">
                  <Trash2 className="h-3.5 w-3.5" /> Tisch löschen
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default TablePlan;
