import { faqItems } from "@/data/mockData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => (
  <section id="faq" className="py-24 md:py-32">
    <div className="container max-w-3xl">
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm font-medium text-champagne uppercase tracking-widest">FAQ</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">Häufige Fragen</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-2xl px-6 bg-card shadow-elegant data-[state=open]:shadow-elevated transition-all">
            <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-5">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
