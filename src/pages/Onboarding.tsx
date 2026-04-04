import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowRight, ArrowLeft, CalendarDays, MapPin, Users, Check, Sparkles, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Brautpaar", "Event-Details", "Stil & Extras"];

const themes = [
  { id: "classic", label: "Klassisch Elegant", colors: "from-amber-50 to-amber-100", emoji: "🏛️" },
  { id: "modern", label: "Modern Minimal", colors: "from-slate-50 to-gray-100", emoji: "✨" },
  { id: "garden", label: "Garden Romance", colors: "from-green-50 to-emerald-100", emoji: "🌿" },
  { id: "bohemian", label: "Bohemian", colors: "from-orange-50 to-amber-100", emoji: "🌻" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name1: "",
    name2: "",
    date: "",
    venue: "",
    venueAddress: "",
    guestCount: "",
    theme: "classic",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const canProceed = () => {
    if (step === 0) return form.name1.trim() && form.name2.trim();
    if (step === 1) return form.date.trim();
    return true;
  };

  const finish = () => {
    localStorage.setItem("onboarding-complete", "true");
    localStorage.setItem("wedding-setup", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-champagne-light via-background to-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8 animate-fade-up">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-champagne mx-auto flex items-center justify-center">
            <Heart className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-serif font-semibold">Willkommen bei Eventora</h1>
          <p className="text-muted-foreground text-sm">Lass uns eure Hochzeit einrichten – in nur 3 Schritten.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 justify-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all", i < step ? "bg-sage text-sage-foreground" : i === step ? "bg-champagne text-accent-foreground" : "bg-secondary text-muted-foreground")}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={cn("w-10 h-px", i < step ? "bg-sage" : "bg-border")} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground font-medium">{steps[step]}</p>

        {/* Form */}
        <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-elevated space-y-6">
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <Users className="h-6 w-6 text-champagne mx-auto" />
                <h2 className="font-serif font-semibold text-lg">Wer heiratet?</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Partner 1</Label>
                  <Input placeholder="Vorname" value={form.name1} onChange={e => update("name1", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Partner 2</Label>
                  <Input placeholder="Vorname" value={form.name2} onChange={e => update("name2", e.target.value)} className="mt-1" />
                </div>
              </div>
              {form.name1 && form.name2 && (
                <div className="text-center p-4 rounded-2xl bg-champagne-light/50 border border-champagne/20">
                  <p className="font-serif text-lg">{form.name1} <span className="text-champagne">&</span> {form.name2}</p>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <CalendarDays className="h-6 w-6 text-champagne mx-auto" />
                <h2 className="font-serif font-semibold text-lg">Wann & Wo?</h2>
              </div>
              <div>
                <Label>Hochzeitsdatum</Label>
                <Input type="date" value={form.date} onChange={e => update("date", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="z.B. Schloss Rothenburg" value={form.venue} onChange={e => update("venue", e.target.value)} className="pl-10" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Google Maps Verknüpfung wird nach Setup aktiviert</p>
              </div>
              <div>
                <Label>Adresse (optional)</Label>
                <Input placeholder="Straße, PLZ, Ort" value={form.venueAddress} onChange={e => update("venueAddress", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Geschätzte Gästeanzahl</Label>
                <Input type="number" placeholder="z.B. 120" value={form.guestCount} onChange={e => update("guestCount", e.target.value)} className="mt-1" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <Palette className="h-6 w-6 text-champagne mx-auto" />
                <h2 className="font-serif font-semibold text-lg">Euer Stil</h2>
                <p className="text-sm text-muted-foreground">Wählt ein Theme – ihr könnt es später ändern.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(t => (
                  <button key={t.id} onClick={() => update("theme", t.id)} className={cn("p-4 rounded-2xl border-2 text-left transition-all", form.theme === t.id ? "border-champagne shadow-elegant" : "border-border hover:border-champagne/40")}>
                    <div className={cn("w-full h-12 rounded-xl bg-gradient-to-r mb-3", t.colors)} />
                    <span className="text-lg mr-2">{t.emoji}</span>
                    <span className="text-sm font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-5 rounded-2xl bg-champagne-light/50 border border-champagne/20 space-y-2">
                <Sparkles className="h-5 w-5 text-champagne" />
                <h3 className="font-serif font-medium text-sm">Zusammenfassung</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>{form.name1} & {form.name2}</strong><br />
                  {form.date && <>📅 {new Date(form.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}<br /></>}
                  {form.venue && <>📍 {form.venue}<br /></>}
                  {form.guestCount && <>👥 ca. {form.guestCount} Gäste</>}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Zurück
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Weiter <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={finish} className="bg-champagne hover:bg-champagne/90 text-accent-foreground gap-2">
                <Sparkles className="h-4 w-4" /> Loslegen!
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">Du kannst alles später in den Einstellungen ändern.</p>
      </div>
    </div>
  );
};

export default Onboarding;
