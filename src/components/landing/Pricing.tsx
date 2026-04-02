import { pricingPlans } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Pricing = () => (
  <section id="pricing" className="py-24 md:py-32 bg-secondary/50">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <p className="text-sm font-medium text-champagne uppercase tracking-widest">Pricing</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">Transparent & fair</h2>
        <p className="text-muted-foreground text-lg">Startet kostenlos. Upgradet, wenn ihr bereit seid.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={cn(
            "relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1",
            plan.highlighted
              ? "bg-primary border-primary shadow-elevated"
              : "bg-card border-border/50 shadow-elegant hover:shadow-elevated"
          )}>
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-champagne text-xs font-semibold text-accent-foreground">
                Beliebteste Wahl
              </div>
            )}
            <div className="space-y-6">
              <div>
                <h3 className={cn("text-xl font-serif font-semibold", plan.highlighted && "text-primary-foreground")}>{plan.name}</h3>
                <p className={cn("text-sm mt-1", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>{plan.description}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-4xl font-serif font-bold", plan.highlighted && "text-primary-foreground")}>
                  {plan.price === "0" ? "Gratis" : `€${plan.price}`}
                </span>
                {plan.price !== "0" && <span className={cn("text-sm", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className={cn("flex items-center gap-3 text-sm", plan.highlighted ? "text-primary-foreground/90" : "text-muted-foreground")}>
                    <Check className={cn("h-4 w-4 shrink-0", plan.highlighted ? "text-champagne" : "text-champagne")} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={cn("w-full", plan.highlighted ? "bg-champagne hover:bg-champagne/90 text-accent-foreground" : "")} variant={plan.highlighted ? "default" : "outline"} size="lg">
                {plan.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
