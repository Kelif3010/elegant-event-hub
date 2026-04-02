import { useState } from "react";
import { guests } from "@/data/mockData";
import { Search, Filter, UserPlus, LayoutGrid, LayoutList, X, Mail, Phone, UtensilsCrossed, Hotel, Bus, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Zugesagt", class: "bg-sage-light text-sage border-sage/20" },
  pending: { label: "Ausstehend", class: "bg-champagne-light text-champagne border-champagne/20" },
  declined: { label: "Abgesagt", class: "bg-rose-light text-rose border-rose/20" },
};

const Guests = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"table" | "card">("table");
  const [selected, setSelected] = useState<typeof guests[0] | null>(null);

  const filtered = guests.filter((g) => {
    const matchesSearch = `${g.firstName} ${g.lastName} ${g.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || g.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-semibold">Gästeverwaltung</h1>
            <p className="text-muted-foreground">{guests.length} Gäste · {guests.filter(g => g.status === "confirmed").length} zugesagt</p>
          </div>
          <Button className="shadow-elegant"><UserPlus className="h-4 w-4 mr-2" /> Gast hinzufügen</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Gäste suchen..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2">
            {[{ key: "all", label: "Alle" }, { key: "confirmed", label: "Zugesagt" }, { key: "pending", label: "Ausstehend" }, { key: "declined", label: "Abgesagt" }].map((f) => (
              <Button key={f.key} variant={filter === f.key ? "default" : "outline"} size="sm" onClick={() => setFilter(f.key)}>
                {f.label}
              </Button>
            ))}
            <div className="flex border rounded-lg overflow-hidden ml-2">
              <button onClick={() => setView("table")} className={cn("p-2", view === "table" ? "bg-secondary" : "hover:bg-secondary/50")}>
                <LayoutList className="h-4 w-4" />
              </button>
              <button onClick={() => setView("card")} className={cn("p-2", view === "card" ? "bg-secondary" : "hover:bg-secondary/50")}>
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table View */}
        {view === "table" ? (
          <div className="rounded-2xl border border-border/50 shadow-elegant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">E-Mail</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Essen</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Gruppe</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Plus-One</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((g) => (
                    <tr key={g.id} className="border-t border-border/30 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => setSelected(g)}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-champagne-light flex items-center justify-center text-sm font-medium text-champagne">
                            {g.firstName[0]}{g.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{g.firstName} {g.lastName}</p>
                            {g.children > 0 && <p className="text-xs text-muted-foreground">{g.children} Kind(er)</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{g.email}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={statusMap[g.status].class}>{statusMap[g.status].label}</Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">{g.meal || "–"}</td>
                      <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">{g.group}</td>
                      <td className="p-4 text-sm hidden md:table-cell">{g.plusOne ? <Badge variant="outline" className="text-xs">+1{g.plusOneName ? `: ${g.plusOneName}` : ""}</Badge> : "–"}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="text-xs">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((g) => (
              <div key={g.id} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all cursor-pointer space-y-4" onClick={() => setSelected(g)}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-champagne-light flex items-center justify-center text-sm font-medium text-champagne">
                    {g.firstName[0]}{g.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{g.firstName} {g.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{g.email}</p>
                  </div>
                  <Badge variant="outline" className={statusMap[g.status].class}>{statusMap[g.status].label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground"><span className="font-medium text-foreground">Essen:</span> {g.meal || "–"}</div>
                  <div className="text-muted-foreground"><span className="font-medium text-foreground">Gruppe:</span> {g.group}</div>
                  {g.plusOne && <div className="col-span-2 text-muted-foreground"><span className="font-medium text-foreground">+1:</span> {g.plusOneName || "Unbenannt"}</div>}
                  {g.allergies && <div className="col-span-2"><Badge variant="outline" className="text-xs bg-rose-light text-rose border-rose/20">Allergie: {g.allergies}</Badge></div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Keine Gäste gefunden</h3>
            <p className="text-muted-foreground text-sm">Versucht einen anderen Suchbegriff oder Filter.</p>
          </div>
        )}

        {/* Guest Detail Drawer */}
        <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            {selected && (
              <>
                <SheetHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-champagne-light flex items-center justify-center text-lg font-medium text-champagne">
                      {selected.firstName[0]}{selected.lastName[0]}
                    </div>
                    <div>
                      <SheetTitle className="font-serif">{selected.firstName} {selected.lastName}</SheetTitle>
                      <Badge variant="outline" className={cn("mt-1", statusMap[selected.status].class)}>{statusMap[selected.status].label}</Badge>
                    </div>
                  </div>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Kontakt</h4>
                    <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{selected.email}</div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Details</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Gruppe</span><p className="font-medium">{selected.group}</p></div>
                      <div><span className="text-muted-foreground">Tisch</span><p className="font-medium">{selected.table || "–"}</p></div>
                      <div><span className="text-muted-foreground">Essen</span><p className="font-medium">{selected.meal || "–"}</p></div>
                      <div><span className="text-muted-foreground">Allergien</span><p className="font-medium">{selected.allergies || "Keine"}</p></div>
                      <div><span className="text-muted-foreground">Plus-One</span><p className="font-medium">{selected.plusOne ? (selected.plusOneName || "Ja") : "Nein"}</p></div>
                      <div><span className="text-muted-foreground">Kinder</span><p className="font-medium">{selected.children}</p></div>
                    </div>
                  </div>
                  {(selected.accommodation || selected.transport) && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Logistik</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2"><Hotel className="h-4 w-4 text-muted-foreground" /><span>{selected.accommodation ? "Unterkunft benötigt" : "Keine Unterkunft"}</span></div>
                        <div className="flex items-center gap-2"><Bus className="h-4 w-4 text-muted-foreground" /><span>{selected.transport || "–"}</span></div>
                      </div>
                    </div>
                  )}
                  {selected.notes && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notizen</h4>
                      <p className="text-sm bg-secondary/50 p-3 rounded-xl">{selected.notes}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default Guests;
