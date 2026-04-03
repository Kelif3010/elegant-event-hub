import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Users, Mail, CalendarDays, Hotel, Settings, ChevronLeft, ChevronRight, LogOut, Wallet, Grid3X3, ListTodo, Clock, Store, Send, Camera, Music, Gift, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
      { label: "Gästeportal", to: "/guest-portal", icon: CalendarDays },
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
    label: "Sonstiges",
    items: [
      { label: "Event-Infos", to: "/event", icon: CalendarDays },
      { label: "Hotels & Anreise", to: "/hotels", icon: Hotel },
      { label: "Einstellungen", to: "/settings", icon: Settings },
    ],
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "sticky top-0 h-screen border-r border-border/50 bg-card flex flex-col transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <Heart className="h-5 w-5 text-champagne shrink-0" />
          {!collapsed && <span className="font-serif font-semibold truncate">Eventora</span>}
        </div>
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">{section.label}</p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link key={item.to} to={item.to} className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                      active ? "bg-champagne-light text-foreground font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-border/50 space-y-1">
          <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4 shrink-0" /> : <><ChevronLeft className="h-4 w-4 shrink-0" /><span>Einklappen</span></>}
          </button>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Zurück zur Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
