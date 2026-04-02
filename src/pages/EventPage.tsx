import { weddingInfo, timelineEvents, hotels, faqItems } from "@/data/mockData";
import { Heart, MapPin, Clock, Calendar, Shirt, Gift, MessageCircle, ChevronRight, Star, Car, Bus, Plane, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";

const EventPage = () => (
  <div className="min-h-screen">
    <Header />

    {/* Hero */}
    <section className="py-24 md:py-32 text-center space-y-6 px-6">
      <Heart className="h-8 w-8 text-champagne mx-auto" />
      <h1 className="text-5xl md:text-7xl font-serif font-semibold">{weddingInfo.coupleName}</h1>
      <p className="text-xl text-muted-foreground">laden euch herzlich zu ihrer Hochzeit ein</p>
      <div className="flex flex-wrap justify-center gap-6 text-lg">
        <span className="flex items-center gap-2"><Calendar className="h-5 w-5 text-champagne" /> 13. September 2025</span>
        <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-champagne" /> ab 15:30 Uhr</span>
        <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-champagne" /> {weddingInfo.venue}</span>
      </div>
      <div className="pt-4">
        <Button asChild size="lg" className="bg-champagne hover:bg-champagne/90 text-accent-foreground shadow-elevated px-8">
          <Link to="/rsvp">Jetzt zusagen <ChevronRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>

    {/* Dresscode */}
    <section className="py-16 bg-secondary/50">
      <div className="container max-w-2xl text-center space-y-4">
        <Shirt className="h-6 w-6 text-champagne mx-auto" />
        <h2 className="text-2xl font-serif font-semibold">Dresscode</h2>
        <p className="text-muted-foreground">{weddingInfo.dressCode}</p>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 md:py-32">
      <div className="container max-w-2xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-champagne uppercase tracking-widest">Ablauf</p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold">Euer Tag mit uns</h2>
        </div>
        <div className="space-y-0">
          {timelineEvents.map((event, i) => (
            <div key={i} className="flex gap-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-champagne-light border border-champagne/20 flex items-center justify-center shrink-0 shadow-elegant">
                  <Heart className="h-5 w-5 text-champagne" />
                </div>
                {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-champagne/30 to-transparent min-h-[40px]" />}
              </div>
              <div className="pb-10">
                <span className="text-sm font-medium text-champagne">{event.time}</span>
                <h3 className="text-xl font-serif font-semibold mt-1">{event.title}</h3>
                <p className="text-muted-foreground mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Hotels */}
    <section className="py-24 md:py-32 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-champagne uppercase tracking-widest">Unterkunft</p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold">Übernachten</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Wir haben bei einigen Hotels Zimmerkontingente für euch reserviert.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                <Badge variant="outline" className="text-xs">{h.distance}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{h.description}</p>
              {h.contingent && <p className="text-xs bg-champagne-light text-champagne rounded-lg px-3 py-2">📋 {h.contingent}</p>}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {h.shuttle && <span className="flex items-center gap-1"><Bus className="h-3 w-3" /> Shuttle verfügbar</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Transport */}
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-champagne uppercase tracking-widest">Anreise</p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold">So kommt ihr zu uns</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: "Mit dem Auto", desc: "Parkplätze sind direkt am Schloss vorhanden. Adresse: Schlossallee 12, 91541 Rothenburg o.d.T." },
            { icon: Train, title: "Mit der Bahn", desc: "Nächster Bahnhof: Rothenburg o.d.T. (ca. 2 km). Vom Bahnhof gibt es einen Shuttle." },
            { icon: Bus, title: "Shuttle-Service", desc: "Wir organisieren Shuttles ab dem Bahnhof und den Hotels. Zeiten folgen." },
            { icon: Plane, title: "Per Flugzeug", desc: "Nächste Flughäfen: Nürnberg (NUE, 80 km) und Frankfurt (FRA, 200 km)." },
          ].map((t) => (
            <div key={t.title} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
              <t.icon className="h-6 w-6 text-champagne" />
              <h3 className="font-serif font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Gift */}
    <section className="py-16 bg-secondary/50">
      <div className="container max-w-2xl text-center space-y-4">
        <Gift className="h-6 w-6 text-champagne mx-auto" />
        <h2 className="text-2xl font-serif font-semibold">Geschenkhinweis</h2>
        <p className="text-muted-foreground">Das größte Geschenk ist eure Anwesenheit. Wenn ihr uns dennoch etwas schenken möchtet, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.</p>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 md:py-32">
      <div className="container max-w-2xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-serif font-semibold">Häufige Fragen</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Kann ich Kinder mitbringen?", a: "Natürlich! Bitte gebt bei der RSVP-Antwort an, wie viele Kinder dabei sein werden." },
            { q: "Gibt es eine Parkmöglichkeit?", a: "Ja, direkt am Schloss stehen kostenfreie Parkplätze zur Verfügung." },
            { q: "Ab wann kann ich im Hotel einchecken?", a: "Check-in ist in der Regel ab 14:00 Uhr. Bitte kontaktiert das Hotel direkt für Sonderwünsche." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant">
              <h3 className="font-serif font-semibold">{item.q}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact & CTA */}
    <section className="py-24 bg-gradient-to-br from-champagne-light to-secondary/50 text-center space-y-6 px-6">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold">Wir freuen uns auf euch!</h2>
      <p className="text-muted-foreground max-w-md mx-auto">Bei Fragen erreicht ihr uns jederzeit per E-Mail oder über das Kontaktformular.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" className="bg-champagne hover:bg-champagne/90 text-accent-foreground shadow-elevated">
          <Link to="/rsvp">Jetzt zusagen</Link>
        </Button>
        <Button variant="outline" size="lg">
          <MessageCircle className="mr-2 h-4 w-4" /> Nachricht senden
        </Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default EventPage;
