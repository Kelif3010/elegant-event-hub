import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { guests, tasks, vendors } from "@/data/mockData";
import { Users, ListTodo, Store, LayoutDashboard, CalendarDays, Wallet, Grid3X3, Camera, Music, Gift, BookOpen, Send, Settings, Palette, Globe, UserPlus, QrCode, Search } from "lucide-react";

const pages = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Gäste", path: "/guests", icon: Users },
  { label: "Aufgaben", path: "/tasks", icon: ListTodo },
  { label: "Budget", path: "/budget", icon: Wallet },
  { label: "Tischplan", path: "/table-plan", icon: Grid3X3 },
  { label: "Zeitplan", path: "/timeline", icon: CalendarDays },
  { label: "Dienstleister", path: "/vendors", icon: Store },
  { label: "Einladungen", path: "/invitations", icon: Send },
  { label: "Fotogalerie", path: "/photos", icon: Camera },
  { label: "Musik", path: "/music", icon: Music },
  { label: "Wunschliste", path: "/wishlist", icon: Gift },
  { label: "Gästebuch", path: "/guestbook", icon: BookOpen },
  { label: "Theme Studio", path: "/theme-studio", icon: Palette },
  { label: "Einstellungen", path: "/settings", icon: Settings },
  { label: "Check-in", path: "/checkin", icon: Users },
  { label: "Anreise & Hotels", path: "/hotels", icon: Globe },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => { navigate(path); setOpen(false); };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Suche nach Gästen, Aufgaben, Seiten..." />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
        <CommandGroup heading="Schnellaktionen">
          <CommandItem onSelect={() => go("/guests")}><UserPlus className="mr-2 h-4 w-4" /> Gast hinzufügen</CommandItem>
          <CommandItem onSelect={() => go("/table-plan")}><Grid3X3 className="mr-2 h-4 w-4" /> Tisch erstellen</CommandItem>
          <CommandItem onSelect={() => go("/theme-studio")}><Palette className="mr-2 h-4 w-4" /> Theme Studio öffnen</CommandItem>
          <CommandItem onSelect={() => go("/guest-portal")}><Globe className="mr-2 h-4 w-4" /> Gästeportal öffnen</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Seiten">
          {pages.map(p => (
            <CommandItem key={p.path} onSelect={() => go(p.path)}>
              <p.icon className="mr-2 h-4 w-4" /> {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Gäste">
          {guests.slice(0, 6).map(g => (
            <CommandItem key={g.id} onSelect={() => go("/guests")}>
              <Users className="mr-2 h-4 w-4" /> {g.firstName} {g.lastName}
              <span className="ml-auto text-xs text-muted-foreground">Gast</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Aufgaben">
          {tasks.filter(t => t.status !== "done").slice(0, 4).map(t => (
            <CommandItem key={t.id} onSelect={() => go("/tasks")}>
              <ListTodo className="mr-2 h-4 w-4" /> {t.title}
              <span className="ml-auto text-xs text-muted-foreground">Aufgabe</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Dienstleister">
          {vendors.slice(0, 4).map(v => (
            <CommandItem key={v.id} onSelect={() => go("/vendors")}>
              <Store className="mr-2 h-4 w-4" /> {v.name}
              <span className="ml-auto text-xs text-muted-foreground">Vendor</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
