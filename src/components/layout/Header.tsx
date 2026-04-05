import { Heart, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Demo", href: "/event" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 glass-subtle">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-serif font-semibold">
          <Heart className="h-5 w-5 text-champagne" /> Eventora
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild><Link to="/dashboard">Login</Link></Button>
          <Button size="sm" asChild className="shadow-elegant"><Link to="/dashboard">Jetzt starten</Link></Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background p-4 space-y-3 animate-fade-in">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground">
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" asChild className="flex-1"><Link to="/dashboard">Login</Link></Button>
            <Button size="sm" asChild className="flex-1"><Link to="/dashboard">Starten</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
