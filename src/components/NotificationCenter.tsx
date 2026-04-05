import { useState } from "react";
import { Bell, Check, Users, ListTodo, Wallet, Camera, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const mockNotifications = [
  { id: "1", text: "Sophie Müller hat zugesagt 🎉", time: "vor 5 Min", type: "rsvp", read: false, link: "/guests", color: "text-sage" },
  { id: "2", text: "Aufgabe 'Catering bestätigen' fällig in 3 Tagen", time: "vor 1h", type: "task", read: false, link: "/tasks", color: "text-champagne" },
  { id: "3", text: "Thomas Weber hat sein Menü geändert", time: "vor 2h", type: "update", read: false, link: "/guests", color: "text-blue-500" },
  { id: "4", text: "Budget Kategorie 'Dekoration' bei 89%", time: "vor 3h", type: "budget", read: true, link: "/budget", color: "text-champagne" },
  { id: "5", text: "5 neue Fotos hochgeladen", time: "gestern", type: "photo", read: true, link: "/photos", color: "text-muted-foreground" },
  { id: "6", text: "2 neue Songvorschläge", time: "gestern", type: "music", read: true, link: "/music", color: "text-muted-foreground" },
];

const iconMap: Record<string, typeof Bell> = { rsvp: Users, task: ListTodo, update: Users, budget: Wallet, photo: Camera, music: Music };

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-fade-in">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-semibold">Benachrichtigungen</h3>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-champagne hover:underline">Alle gelesen</button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map(n => {
            const Icon = iconMap[n.type] || Bell;
            return (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => markRead(n.id)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/30 last:border-0",
                  !n.read && "bg-secondary/30"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", !n.read ? "bg-champagne-light" : "bg-secondary")}>
                  <Icon className={cn("h-4 w-4", n.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", !n.read && "font-medium")}>{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-champagne mt-2 shrink-0" />}
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
