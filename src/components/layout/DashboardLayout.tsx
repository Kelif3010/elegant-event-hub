import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Users, Mail, CalendarDays, Hotel, Settings, ChevronLeft, ChevronRight, LogOut, Wallet, Grid3X3, ListTodo, Clock, Store, Send, Camera, Music, Gift, BookOpen, Palette, UserCheck, MapPin, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationCenter from "@/components/NotificationCenter";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

const navSections = [
  {
    label: "Planung",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "Gäste", to: "/guests", icon: Users },
      { label: "Tischplan", to: "/table-plan", icon: Grid3X3 },
      { label: "Aufgaben", to: "/tasks", icon: ListTodo },
      { label: "Zeitplan", to: "/timeline", icon: Clock },
      { label: "Budget", to: "/budget", icon: Wallet },
      { label: "Dienstleister", to: "/vendors", icon: Store },
    ],
  },
  {
    label: "Kommunikation",
    items: [
      { label: "Einladungen", to: "/invitations", icon: Send },
      { label: "RSVP", to: "/rsvp", icon: Mail },
      { label: "Gästeportal", to: "/guest-portal-manager", icon: CalendarDays },
      { label: "Kontaktdaten", to: "/address-collector", icon: MapPin },
    ],
  },
  {
    label: "Extras",
    items: [
      { label: "Fotogalerie", to: "/photos", icon: Camera },
      { label: "Musik & Playlist", to: "/music", icon: Music },
      { label: "Wunschliste", to: "/wishlist", icon: Gift },
      { label: "Gästebuch", to: "/guestbook", icon: BookOpen },
    ],
  },
  {
    label: "Hochzeitstag",
    items: [
      { label: "Check-in", to: "/checkin", icon: UserCheck },
    ],
  },
  {
    label: "Sonstiges",
    items: [
      { label: "Event-Infos", to: "/event", icon: CalendarDays },
      { label: "Hotels & Anreise", to: "/hotels", icon: Hotel },
      { label: "Theme Studio", to: "/theme-studio", icon: Palette },
      { label: "Einstellungen", to: "/settings", icon: Settings },
    ],
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const daysLeft = Math.max(0, Math.ceil((new Date(theme.eventDate).getTime() - Date.now()) / 86400000));

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      <div className="p-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-accent shrink-0" />
          {(!collapsed || isMobile) && <span className="font-serif font-semibold truncate">Eventora</span>}
        </div>
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto overscroll-contain">
        {navSections.map((section) => (
          <div key={section.label}>
            {(!collapsed || isMobile) && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">{section.label}</p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to} className={cn(
                    "flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-xl text-sm transition-colors min-h-[44px] md:min-h-0",
                    active ? "bg-accent/10 text-foreground font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {(!collapsed || isMobile) && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-border/50 space-y-1">
        {!isMobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4 shrink-0" /> : <><ChevronLeft className="h-4 w-4 shrink-0" /><span>Einklappen</span></>}
          </button>
        )}
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground min-h-[44px] md:min-h-0">
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || isMobile) && <span>Zurück zur Website</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className={cn(
          "sticky top-0 h-screen border-r border-border/50 bg-card flex flex-col transition-all duration-300 shrink-0",
          collapsed ? "w-16" : "w-60"
        )}>
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border/50 flex flex-col animate-fade-in shadow-elevated">
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 h-14 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            {isMobile && (
              <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            )}
            <button onClick={() => { const e = new KeyboardEvent("keydown", { key: "k", metaKey: true }); document.dispatchEvent(e); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-muted-foreground text-sm hover:bg-secondary transition-colors">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Suche...</span>
              <kbd className="hidden md:inline text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Countdown</p>
              <p className="text-sm font-serif font-bold" style={{ color: `hsl(${theme.accentHSL})` }}>{daysLeft} Tage</p>
            </div>
            <NotificationCenter />
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
              {theme.coupleName.partner1[0]}{theme.coupleName.partner2[0]}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
