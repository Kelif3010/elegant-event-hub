import { Heart, Users } from "lucide-react";

const Audiences = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <p className="text-sm font-medium text-champagne uppercase tracking-widest">Für alle</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">Für Paare & Gäste</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-10 rounded-3xl bg-champagne-light/50 border border-champagne/10 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-champagne/20 flex items-center justify-center">
            <Heart className="h-7 w-7 text-champagne" />
          </div>
          <h3 className="text-2xl font-serif font-semibold">Für Paare</h3>
          <ul className="space-y-3 text-muted-foreground">
            {["Dashboard mit Echtzeit-Überblick", "Gästeliste & RSVP-Management", "Aufgaben- und Budgetplanung", "Individuelle Gästeseite erstellen", "Hotel- und Transportkoordination"].map((t) => (
              <li key={t} className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-champagne/20 flex items-center justify-center text-champagne text-xs shrink-0">✓</span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="p-10 rounded-3xl bg-sage-light/50 border border-sage/10 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-sage/20 flex items-center justify-center">
            <Users className="h-7 w-7 text-sage" />
          </div>
          <h3 className="text-2xl font-serif font-semibold">Für Gäste</h3>
          <ul className="space-y-3 text-muted-foreground">
            {["Einfache Online-Zusage", "Alle Event-Infos auf einen Blick", "Hotel- und Anreisehinweise", "Essenswahl & Allergien angeben", "Songwünsche & Nachrichten"].map((t) => (
              <li key={t} className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center text-sage text-xs shrink-0">✓</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Audiences;
