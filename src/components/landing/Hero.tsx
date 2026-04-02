import heroImage from "@/assets/hero-wedding.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Elegante Hochzeitslocation" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
    </div>
    <div className="container relative z-10 py-20 md:py-32">
      <div className="max-w-2xl space-y-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne-light border border-champagne/20">
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">Wedding OS – Euer digitales Planungszentrum</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.1] tracking-tight">
          Eure Hochzeit.{" "}
          <span className="text-gradient-gold">Perfekt organisiert.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
          Von RSVP bis Sitzordnung, von Gästeliste bis Hotelplanung – alles an einem Ort.
          Weniger Stress, mehr Vorfreude.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button asChild size="lg" className="text-base px-8 h-13 shadow-elevated hover:shadow-elegant transition-all">
            <Link to="/dashboard">Jetzt starten <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 h-13 border-border hover:bg-secondary">
            <Link to="/event"><Play className="mr-2 h-4 w-4" /> Demo ansehen</Link>
          </Button>
        </div>
        <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center text-sage text-xs">✓</span> Kostenlos testen</span>
          <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center text-sage text-xs">✓</span> DSGVO-konform</span>
          <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center text-sage text-xs">✓</span> Keine Kreditkarte nötig</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
