import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { wishlistItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gift, Plus, Trash2, Edit, Check, Search, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const Wishlist = () => {
  const [items, setItems] = useState(wishlistItems);
  const [search, setSearch] = useState("");

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
  );

  const reserved = items.filter(i => i.reservedBy).length;
  const totalValue = items.reduce((s, i) => s + (i.price || 0), 0);
  const reservedValue = items.filter(i => i.reservedBy).reduce((s, i) => s + (i.price || 0), 0);

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Wunschliste 🎁</h1>
            <p className="text-muted-foreground text-sm">Geschenkwünsche verwalten – Gäste können über das Portal reservieren</p>
          </div>
          <Button className="bg-champagne hover:bg-champagne/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-2" /> Wunsch hinzufügen
          </Button>
        </div>

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

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Wunsch suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        {/* Items */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(item => (
            <div key={item.id} className={cn(
              "p-5 rounded-2xl border shadow-elegant transition-all",
              item.reservedBy ? "bg-muted border-border/30" : "bg-card border-border/50"
            )}>
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
    </DashboardLayout>
  );
};

export default Wishlist;
