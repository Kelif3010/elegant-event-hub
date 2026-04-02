import { PenLine, Settings2, Send, PartyPopper } from "lucide-react";

const steps = [
  { icon: PenLine, title: "Planen", desc: "Event anlegen, Gästeliste importieren, Ablauf definieren." },
  { icon: Settings2, title: "Verwalten", desc: "RSVP-Tracking, Aufgaben, Budget und Dienstleister im Blick." },
  { icon: Send, title: "Kommunizieren", desc: "Gästeseite teilen, Updates senden, Fragen beantworten." },
  { icon: PartyPopper, title: "Feiern", desc: "Alles organisiert – genießt euren großen Tag stressfrei." },
];

const Workflow = () => (
  <section className="py-24 md:py-32 bg-secondary/50">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <p className="text-sm font-medium text-champagne uppercase tracking-widest">So funktioniert's</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">In 4 Schritten zur stressfreien Hochzeit</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={s.title} className="relative text-center space-y-4">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-champagne/40 to-transparent" />
            )}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-card border border-border shadow-elegant flex items-center justify-center">
              <s.icon className="h-7 w-7 text-champagne" />
            </div>
            <div className="text-sm font-medium text-champagne">Schritt {i + 1}</div>
            <h3 className="text-xl font-serif font-semibold">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Workflow;
