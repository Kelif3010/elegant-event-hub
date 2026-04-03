import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { weddingInfo } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";

const steps = ["Zusage", "Essen", "Logistik", "Extras"];

const RSVP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    attending: "",
    firstName: "",
    lastName: "",
    email: "",
    meal: "",
    allergies: "",
    accommodation: "",
    transport: "",
    stayDuration: "",
    songWish: "",
    message: "",
    plusOne: false,
    plusOneName: "",
  });

  const update = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-6 animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-sage-light mx-auto flex items-center justify-center">
              <Check className="h-8 w-8 text-sage" />
            </div>
            <h1 className="text-3xl font-serif font-semibold">Vielen Dank!</h1>
            <p className="text-muted-foreground">Eure Antwort wurde gespeichert. {form.attending === "yes" ? "Wir freuen uns auf euch!" : "Schade, dass ihr nicht dabei sein könnt."}</p>
            <Button variant="outline" onClick={() => { setSubmitted(false); setStep(0); }}>Antwort bearbeiten</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8 animate-fade-up">
          <div className="text-center space-y-2">
            <Heart className="h-6 w-6 text-champagne mx-auto" />
            <h1 className="text-3xl font-serif font-semibold">{weddingInfo.coupleName}</h1>
            <p className="text-muted-foreground">13. September 2025 · Schloss Rothenburg</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 justify-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  i <= step ? "bg-champagne text-accent-foreground" : "bg-secondary text-muted-foreground"
                )}>{i + 1}</div>
                {i < steps.length - 1 && <div className={cn("w-8 h-px", i < step ? "bg-champagne" : "bg-border")} />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">{steps[step]}</p>

          <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-elevated space-y-6">
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Vorname</Label><Input placeholder="Vorname" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></div>
                  <div><Label>Nachname</Label><Input placeholder="Nachname" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></div>
                </div>
                <div><Label>E-Mail</Label><Input type="email" placeholder="email@example.de" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                <div className="space-y-3">
                  <Label>Könnt ihr dabei sein?</Label>
                  <RadioGroup value={form.attending} onValueChange={(v) => update("attending", v)} className="grid grid-cols-2 gap-4">
                    {[{ value: "yes", label: "Ja, wir kommen!", emoji: "🎉" }, { value: "no", label: "Leider nicht", emoji: "😢" }].map((o) => (
                      <label key={o.value} className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                        form.attending === o.value ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40"
                      )}>
                        <RadioGroupItem value={o.value} />
                        <span className="text-xl">{o.emoji}</span>
                        <span className="font-medium text-sm">{o.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox checked={form.plusOne} onCheckedChange={(v) => update("plusOne", !!v)} />
                  <Label>Ich bringe eine Begleitung mit</Label>
                </div>
                {form.plusOne && (
                  <div><Label>Name der Begleitung</Label><Input placeholder="Name" value={form.plusOneName} onChange={(e) => update("plusOneName", e.target.value)} /></div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Essenswahl</Label>
                  <RadioGroup value={form.meal} onValueChange={(v) => update("meal", v)} className="grid grid-cols-2 gap-3">
                    {[{ value: "meat", label: "Fleisch", icon: "🥩" }, { value: "fish", label: "Fisch", icon: "🐟" }, { value: "vegetarian", label: "Vegetarisch", icon: "🥗" }, { value: "vegan", label: "Vegan", icon: "🌱" }].map((o) => (
                      <label key={o.value} className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                        form.meal === o.value ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40"
                      )}>
                        <RadioGroupItem value={o.value} />
                        <span className="text-xl">{o.icon}</span>
                        <span className="font-medium text-sm">{o.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label>Allergien oder Unverträglichkeiten</Label>
                  <Input placeholder="z.B. Laktose, Gluten, Nüsse..." value={form.allergies} onChange={(e) => update("allergies", e.target.value)} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Benötigt ihr eine Unterkunft?</Label>
                  <RadioGroup value={form.accommodation} onValueChange={(v) => update("accommodation", v)} className="grid grid-cols-2 gap-3">
                    {[{ value: "yes", label: "Ja, bitte", icon: "🏨" }, { value: "no", label: "Nein, danke", icon: "🏠" }].map((o) => (
                      <label key={o.value} className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                        form.accommodation === o.value ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40"
                      )}>
                        <RadioGroupItem value={o.value} />
                        <span className="text-xl">{o.icon}</span>
                        <span className="font-medium text-sm">{o.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label>Wie reist ihr an?</Label>
                  <RadioGroup value={form.transport} onValueChange={(v) => update("transport", v)} className="grid grid-cols-3 gap-3">
                    {[{ value: "car", label: "Auto", icon: "🚗" }, { value: "train", label: "Bahn", icon: "🚆" }, { value: "shuttle", label: "Shuttle", icon: "🚌" }].map((o) => (
                      <label key={o.value} className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all text-center",
                        form.transport === o.value ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40"
                      )}>
                        <RadioGroupItem value={o.value} className="sr-only" />
                        <span className="text-xl">{o.icon}</span>
                        <span className="font-medium text-xs">{o.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label>Aufenthaltsdauer</Label>
                  <RadioGroup value={form.stayDuration} onValueChange={(v) => update("stayDuration", v)} className="grid grid-cols-3 gap-3">
                    {["Nur Feier", "1 Nacht", "2 Nächte"].map((o) => (
                      <label key={o} className={cn(
                        "p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-sm font-medium",
                        form.stayDuration === o ? "border-champagne bg-champagne-light" : "border-border hover:border-champagne/40"
                      )}>
                        <RadioGroupItem value={o} className="sr-only" />
                        {o}
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Songwunsch für die Party 🎵</Label>
                  <Input placeholder="Welches Lied bringt euch auf die Tanzfläche?" value={form.songWish} onChange={(e) => update("songWish", e.target.value)} />
                </div>
                <div>
                  <Label>Nachricht an das Brautpaar 💌</Label>
                  <Textarea placeholder="Ein paar liebe Worte..." value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Zurück
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)}>
                  Weiter <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => setSubmitted(true)} className="bg-champagne hover:bg-champagne/90 text-accent-foreground">
                  <Sparkles className="h-4 w-4 mr-2" /> Absenden
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RSVP;
