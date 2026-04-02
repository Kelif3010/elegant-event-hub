const stats = [
  { value: "2.400+", label: "Organisierte Hochzeiten" },
  { value: "98%", label: "Zufriedene Paare" },
  { value: "180.000+", label: "Verwaltete Gäste" },
  { value: "4.9 ★", label: "Durchschnittliche Bewertung" },
];

const SocialProof = () => (
  <section className="py-16 border-y border-border/50 bg-secondary/30">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center space-y-1">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
