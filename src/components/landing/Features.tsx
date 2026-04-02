import { Users, ClipboardList, MapPin, CalendarDays, MessageSquareHeart, ShieldCheck } from "lucide-react";

const features = [
  { icon: Users, title: "Gästemanagement", desc: "Gästeliste, RSVP-Tracking, Allergien, Plus-Ones und Essenswünsche – alles an einem Ort." },
  { icon: ClipboardList, title: "Aufgabenplanung", desc: "Behaltet den Überblick über alle To-dos mit Deadlines, Kategorien und Fortschritt." },
  { icon: CalendarDays, title: "Tagesablauf", desc: "Erstellt euren perfekten Zeitplan und teilt ihn direkt mit euren Gästen." },
  { icon: MapPin, title: "Hotel & Anreise", desc: "Hotelempfehlungen, Shuttle-Zeiten und Anfahrtsbeschreibungen für eure Gäste." },
  { icon: MessageSquareHeart, title: "Gästeseite", desc: "Eine elegante Infoseite mit allem, was eure Gäste wissen müssen." },
  { icon: ShieldCheck, title: "Datenschutz", desc: "DSGVO-konform, verschlüsselt und sicher – eure Daten sind bei uns geschützt." },
];

const Features = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <p className="text-sm font-medium text-champagne uppercase tracking-widest">Features</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">Alles, was ihr braucht</h2>
        <p className="text-muted-foreground text-lg">Eine Plattform, die euch den Rücken freihält – damit ihr euch auf das Wesentliche konzentrieren könnt.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group p-8 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-champagne-light flex items-center justify-center mb-5 group-hover:bg-champagne/20 transition-colors">
              <f.icon className="h-6 w-6 text-champagne" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
