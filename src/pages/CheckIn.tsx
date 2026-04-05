import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { guests } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, QrCode, CheckCircle2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CheckIn = () => {
  const [search, setSearch] = useState("");
  const [checkedIn, setCheckedIn] = useState<string[]>([]);
  const [showQR, setShowQR] = useState(false);

  const confirmedGuests = guests.filter(g => g.status === "confirmed");
  const filtered = confirmedGuests.filter(g =>
    `${g.firstName} ${g.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCheckIn = (id: string) => {
    setCheckedIn(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const checkedInCount = checkedIn.length;
  const totalConfirmed = confirmedGuests.length;
  const pct = Math.round((checkedInCount / totalConfirmed) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-semibold">Check-in</h1>
          <p className="text-muted-foreground">Gäste einchecken am Hochzeitstag</p>
        </div>

        {/* Stats bar */}
        <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{checkedInCount} / {totalConfirmed} eingecheckt</span>
            <span className="text-sm font-bold text-accent">{pct}%</span>
          </div>
          <Progress value={pct} className="h-3 bg-secondary [&>div]:bg-accent" />
        </div>

        {/* Search + QR */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Gast suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-12 h-14 text-lg rounded-2xl" />
          </div>
          <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl" onClick={() => setShowQR(true)}>
            <QrCode className="h-6 w-6" />
          </Button>
        </div>

        {/* Guest list */}
        <div className="space-y-2">
          {filtered.map(g => {
            const isChecked = checkedIn.includes(g.id);
            return (
              <div key={g.id} className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-all", isChecked ? "bg-accent/5 border-accent/30" : "bg-card border-border/50 shadow-elegant")}>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-medium shrink-0">
                  {g.firstName[0]}{g.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{g.firstName} {g.lastName}</p>
                  <div className="flex gap-2 mt-1">
                    {g.table && <Badge variant="outline" className="text-xs">{g.table}</Badge>}
                    <Badge variant="secondary" className="text-xs">{g.group}</Badge>
                  </div>
                </div>
                <Button
                  onClick={() => toggleCheckIn(g.id)}
                  variant={isChecked ? "default" : "outline"}
                  className={cn("h-12 px-6 rounded-xl text-sm font-medium transition-all", isChecked && "bg-accent hover:bg-accent/90")}
                >
                  {isChecked ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Eingecheckt</> : "Einchecken"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">QR-Code Scanner</DialogTitle></DialogHeader>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-48 h-48 rounded-2xl bg-secondary border-2 border-dashed border-border flex items-center justify-center">
              <QrCode className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground text-center">QR-Code-Scanner wird bei Kamerafreigabe aktiviert</p>
            <Button variant="outline" onClick={() => setShowQR(false)}>Schließen</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CheckIn;
