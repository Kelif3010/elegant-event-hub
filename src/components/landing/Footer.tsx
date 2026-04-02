import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-16">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-xl font-serif font-semibold">
            <Heart className="h-5 w-5 text-champagne" /> Eventora
          </div>
          <p className="text-sm text-muted-foreground">Euer digitales Hochzeits-Headquarter. Alles planen, alles verwalten, alles genießen.</p>
        </div>
        {[
          { title: "Produkt", links: ["Features", "Pricing", "Demo", "Changelog"] },
          { title: "Ressourcen", links: ["Hilfe-Center", "Blog", "Guides", "API Docs"] },
          { title: "Legal", links: ["Datenschutz", "Impressum", "AGB", "Cookie-Richtlinie"] },
        ].map((col) => (
          <div key={col.title} className="space-y-4">
            <h4 className="font-semibold text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2025 Eventora. Mit Liebe gebaut.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
