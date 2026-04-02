import { hotels } from "@/data/mockData";
import { Star, Bus, Car, Train, Plane, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Hotels = () => (
  <DashboardLayout>
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Hotels & Anreise</h1>
        <p className="text-muted-foreground">Unterkünfte und Transportoptionen für eure Gäste.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {hotels.map((h) => (
          <div key={h.name} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-serif font-semibold">{h.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {h.stars > 0 && <div className="flex">{Array.from({ length: h.stars }).map((_, i) => <Star key={i} className="h-3 w-3 fill-champagne text-champagne" />)}</div>}
                  <span className="text-sm text-muted-foreground">{h.priceRange}</span>
                </div>
              </div>
              <Badge variant="outline">{h.distance}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{h.description}</p>
            {h.contingent && <p className="text-xs bg-champagne-light text-champagne rounded-lg px-3 py-2">📋 {h.contingent}</p>}
            <div className="flex items-center gap-4">
              {h.shuttle && <Badge variant="secondary" className="text-xs"><Bus className="h-3 w-3 mr-1" /> Shuttle</Badge>}
              <Button variant="outline" size="sm">Website öffnen</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-6">
        <h2 className="text-xl font-serif font-semibold">Transportübersicht</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Car, title: "Parkplätze", desc: "Kostenlos am Schloss" },
            { icon: Bus, title: "Shuttle", desc: "Ab Hotels & Bahnhof" },
            { icon: Train, title: "Bahnhof", desc: "Rothenburg, 2 km" },
            { icon: Plane, title: "Flughafen", desc: "Nürnberg (NUE), 80 km" },
          ].map((t) => (
            <div key={t.title} className="p-4 rounded-xl bg-secondary/50 text-center space-y-2">
              <t.icon className="h-5 w-5 mx-auto text-champagne" />
              <p className="font-medium text-sm">{t.title}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-champagne-light/50 border border-champagne/10 space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-champagne" /> Shuttle-Zeiten</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>Hinfahrt: 14:30, 15:00, 15:15</div>
            <div>Rückfahrt: 23:00, 00:00, 01:00</div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Hotels;
