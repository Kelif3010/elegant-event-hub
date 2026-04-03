import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { weddingInfo } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Lock, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";

const GuestLogin = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: any non-empty code works, in production this would validate against backend
    if (code.trim().length >= 4) {
      // Store guest session in localStorage (mock)
      localStorage.setItem("guestAccessCode", code.toUpperCase());
      localStorage.setItem("guestName", "Maria Müller"); // Mock
      navigate("/rsvp");
    } else {
      setError("Bitte gib deinen persönlichen Zugangscode ein.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-champagne-light mx-auto flex items-center justify-center">
              <Heart className="h-7 w-7 text-champagne" />
            </div>
            <h1 className="text-3xl font-serif font-semibold">{weddingInfo.coupleName}</h1>
            <p className="text-muted-foreground">
              Wir laden euch herzlich zu unserer Hochzeit ein!<br />
              Bitte gebt euren persönlichen Zugangscode ein.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-elevated space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="accessCode" className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  Zugangscode
                </Label>
                <Input
                  id="accessCode"
                  placeholder="z.B. MARIA2025"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(""); }}
                  className="text-center text-lg tracking-widest uppercase"
                  autoFocus
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-champagne hover:bg-champagne/90 text-accent-foreground">
                Weiter zum RSVP <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Den Code findest du auf deiner Einladungskarte oder in der E-Mail.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            13. September 2025 · Schloss Rothenburg
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuestLogin;
