import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { vendors as initialVendors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Star, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EmptyState, { VendorsIllustration } from "@/components/EmptyState";

const Vendors = () => {
  const [vendorList, setVendorList] = useState(initialVendors);
  const [selected, setSelected] = useState<typeof initialVendors[number] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", category: "Catering", contact: "", email: "", phone: "", status: "pending", amount: 0, rating: 0, notes: "" });

  const categories = [...new Set(vendorList.map(v => v.category))];
  const filtered = categoryFilter === "all" ? vendorList : vendorList.filter(v => v.category === categoryFilter);

  const addVendor = () => {
    if (!newVendor.name) { toast.error("Name ist Pflichtfeld"); return; }
    setVendorList(prev => [...prev, { ...newVendor, id: `v${Date.now()}` }]);
    setShowAddDialog(false);
    setNewVendor({ name: "", category: "Catering", contact: "", email: "", phone: "", status: "pending", amount: 0, rating: 0, notes: "" });
    toast.success("Dienstleister hinzugefügt");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Eure Dienstleister im Überblick</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold">Dienstleister</h1>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="gap-2 min-h-[44px] md:min-h-0"><Plus className="h-4 w-4" /> Dienstleister hinzufügen</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Dienstleister", value: vendorList.length },
            { label: "Bestätigt", value: vendorList.filter(v => v.status === "confirmed").length },
            { label: "Gesamtkosten", value: `€${vendorList.reduce((s, v) => s + v.amount, 0).toLocaleString("de-DE")}` },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-1">
              <p className="text-2xl font-serif font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant={categoryFilter === "all" ? "default" : "outline"} size="sm" className="text-xs min-h-[40px] md:min-h-0" onClick={() => setCategoryFilter("all")}>Alle</Button>
          {categories.map(c => (
            <Button key={c} variant={categoryFilter === c ? "default" : "outline"} size="sm" className="text-xs min-h-[40px] md:min-h-0" onClick={() => setCategoryFilter(c)}>{c}</Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          categoryFilter !== "all" ? (
            <EmptyState illustration={<VendorsIllustration />} title="Keine Dienstleister gefunden" description="In dieser Kategorie gibt es noch keine Einträge." />
          ) : (
            <EmptyState illustration={<VendorsIllustration />} title="Noch keine Dienstleister" description="Fügt eure Dienstleister hinzu – von Catering bis Fotografie." actionLabel="Dienstleister hinzufügen" onAction={() => setShowAddDialog(true)} />
          )
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(v => (
            <button key={v.id} onClick={() => setSelected(v)} className="w-full text-left p-5 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all space-y-3">
              <div className="flex items-start justify-between">
                <div><h3 className="font-serif font-semibold">{v.name}</h3><p className="text-xs text-muted-foreground">{v.category} • {v.contact}</p></div>
                <Badge className={cn("text-xs border-0", v.status === "confirmed" ? "bg-sage-light text-sage" : "bg-accent/10 text-accent")}>{v.status === "confirmed" ? "Bestätigt" : "Ausstehend"}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{v.notes}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={cn("h-3.5 w-3.5", i < v.rating ? "text-accent fill-accent" : "text-border")} />))}</div>
                <span className="font-serif font-bold">€{v.amount.toLocaleString("de-DE")}</span>
              </div>
            </button>
          ))}
        </div>
        )}
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent>
          <SheetHeader><SheetTitle className="font-serif">{selected?.name}</SheetTitle></SheetHeader>
          {selected && (
            <div className="mt-6 space-y-4">
              {[{ label: "Kategorie", value: selected.category }, { label: "Kontakt", value: selected.contact }, { label: "Betrag", value: `€${selected.amount.toLocaleString("de-DE")}` }, { label: "Status", value: selected.status === "confirmed" ? "Bestätigt" : "Ausstehend" }].map(item => (
                <div key={item.label} className="flex justify-between p-3 rounded-xl bg-secondary/30"><span className="text-sm text-muted-foreground">{item.label}</span><span className="text-sm font-medium">{item.value}</span></div>
              ))}
              <div className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground">{selected.notes}</p>
                <div className="flex gap-2 pt-2"><Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1"><Mail className="h-3.5 w-3.5" />{selected.email}</Button></div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full"><Phone className="h-3.5 w-3.5" />{selected.phone}</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">Neuer Dienstleister</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name *</Label><Input value={newVendor.name} onChange={e => setNewVendor(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Kategorie</Label><Input value={newVendor.category} onChange={e => setNewVendor(p => ({ ...p, category: e.target.value }))} /></div>
              <div><Label>Kontaktperson</Label><Input value={newVendor.contact} onChange={e => setNewVendor(p => ({ ...p, contact: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>E-Mail</Label><Input value={newVendor.email} onChange={e => setNewVendor(p => ({ ...p, email: e.target.value }))} /></div>
              <div><Label>Telefon</Label><Input value={newVendor.phone} onChange={e => setNewVendor(p => ({ ...p, phone: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Betrag (€)</Label><Input type="number" value={newVendor.amount} onChange={e => setNewVendor(p => ({ ...p, amount: Number(e.target.value) }))} /></div>
              <div><Label>Status</Label>
                <Select value={newVendor.status} onValueChange={v => setNewVendor(p => ({ ...p, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="pending">Ausstehend</SelectItem><SelectItem value="confirmed">Bestätigt</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Notizen</Label><Input value={newVendor.notes} onChange={e => setNewVendor(p => ({ ...p, notes: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Abbrechen</Button>
            <Button onClick={addVendor}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Vendors;
