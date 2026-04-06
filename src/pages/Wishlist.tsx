import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { wishlistItems as initialItems } from "@/data/mockData";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gift, Plus, Trash2, Edit, Check, Search, CreditCard, Tag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EmptyState, { WishlistIllustration } from "@/components/EmptyState";

const Wishlist = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItem, setNewItem] = useState({ title: "", description: "", price: 0, image: "🎁", category: "Küche", link: "#" });

  const allCategories = [...new Set([...items.map(i => i.category), ...customCategories])];

  const filtered = items.filter(item =>
    (categoryFilter === "all" || item.category === categoryFilter) &&
    (item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
  );

  const reserved = items.filter(i => i.reservedBy).length;
  const totalValue = items.reduce((s, i) => s + (i.price || 0), 0);
  const reservedValue = items.filter(i => i.reservedBy).reduce((s, i) => s + (i.price || 0), 0);

  const addItem = () => {
    if (!newItem.title) { toast.error("Titel ist Pflichtfeld"); return; }
    setItems(prev => [...prev, { ...newItem, id: `w${Date.now()}`, reservedBy: null }]);
    setShowAddItem(false);
    setNewItem({ title: "", description: "", price: 0, image: "🎁", category: "Küche", link: "#" });
    toast.success("Wunsch hinzugefügt");
  };

  const addCategory = () => {
    if (!newCategoryName) return;
    setCustomCategories(prev => [...prev, newCategoryName]);
    setNewCategoryName("");
    setShowAddCategory(false);
    toast.success(`Kategorie "${newCategoryName}" hinzugefügt`);
  };

  const removeItem = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); toast.success("Wunsch entfernt"); };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Wunschliste 🎁</h1>
            <p className="text-muted-foreground text-sm">Geschenkwünsche verwalten – Gäste können über das Portal reservieren</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAddCategory(true)}><Tag className="h-4 w-4 mr-2" /> Kategorie</Button>
            <Button onClick={() => setShowAddItem(true)}><Plus className="h-4 w-4 mr-2" /> Wunsch hinzufügen</Button>
          </div>
        </div>

        {/* PayPal info */}
        {theme.paypalLink && (
          <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-accent" />
              <div><p className="text-sm font-medium">PayPal für Geldgeschenke aktiv</p><p className="text-xs text-muted-foreground">Gäste sehen den PayPal-Link im Gästeportal</p></div>
            </div>
            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-0">Aktiv</Badge>
          </div>
        )}
        {!theme.paypalLink && (
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div><p className="text-sm font-medium">PayPal-Link hinzufügen?</p><p className="text-xs text-muted-foreground">Unter Einstellungen → Event kannst du einen PayPal-Link hinterlegen</p></div>
            </div>
            <Button variant="outline" size="sm" asChild><a href="/settings">Einrichten</a></Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Wünsche", value: items.length, icon: "🎁" },
            { label: "Reserviert", value: reserved, icon: "✅" },
            { label: "Offen", value: items.length - reserved, icon: "⏳" },
            { label: "Wert reserviert", value: `${reservedValue.toLocaleString()} €`, icon: "💰" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Wunsch suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button variant={categoryFilter === "all" ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setCategoryFilter("all")}>Alle</Button>
          {allCategories.map(c => (
            <Button key={c} variant={categoryFilter === c ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setCategoryFilter(c)}>{c}</Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          search || categoryFilter !== "all" ? (
            <EmptyState illustration={<WishlistIllustration />} title="Keine Wünsche gefunden" description="Versuche einen anderen Filter oder Suchbegriff." />
          ) : (
            <EmptyState illustration={<WishlistIllustration />} title="Noch keine Wünsche" description="Erstellt eure Wunschliste – Gäste können Geschenke über das Portal reservieren." actionLabel="Ersten Wunsch hinzufügen" onAction={() => setShowAddItem(true)} />
          )
        ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(item => (
            <div key={item.id} className={cn("p-5 rounded-2xl border shadow-elegant transition-all hover:shadow-elevated", item.reservedBy ? "bg-muted border-border/30" : "bg-card border-border/50")}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex gap-1 shrink-0">
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {item.price && <Badge variant="outline" className="text-xs">{item.price} €</Badge>}
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  </div>
                  <div className="mt-3">
                    {item.reservedBy ? (
                      <Badge className="bg-sage/20 text-sage border-0 text-xs"><Check className="h-3 w-3 mr-1" /> Reserviert von {item.reservedBy}</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Noch verfügbar</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">Neuer Wunsch</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titel *</Label><Input value={newItem.title} onChange={e => setNewItem(p => ({ ...p, title: e.target.value }))} /></div>
            <div><Label>Beschreibung</Label><Input value={newItem.description} onChange={e => setNewItem(p => ({ ...p, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Preis (€)</Label><Input type="number" value={newItem.price || ""} onChange={e => setNewItem(p => ({ ...p, price: Number(e.target.value) }))} /></div>
              <div><Label>Emoji</Label><Input value={newItem.image} onChange={e => setNewItem(p => ({ ...p, image: e.target.value }))} /></div>
            </div>
            <div><Label>Kategorie</Label>
              <Select value={newItem.category} onValueChange={v => setNewItem(p => ({ ...p, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{allCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Link</Label><Input value={newItem.link} onChange={e => setNewItem(p => ({ ...p, link: e.target.value }))} placeholder="https://..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddItem(false)}>Abbrechen</Button>
            <Button onClick={addItem}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">Neue Kategorie</DialogTitle></DialogHeader>
          <div><Label>Kategoriename</Label><Input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="z.B. Garten, Reise, Technik..." /></div>
          <div className="flex flex-wrap gap-1">
            <p className="text-xs text-muted-foreground w-full mb-1">Bestehende Kategorien:</p>
            {allCategories.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCategory(false)}>Abbrechen</Button>
            <Button onClick={addCategory}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Wishlist;
