import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { guests, weddingInfo } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Mail, MessageCircle, QrCode, Link2, Send, Check, Search, Download, Eye, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Invitations = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(guests[0]);
  const [sentInvites, setSentInvites] = useState<Record<string, string[]>>({
    "1": ["email"], "2": ["whatsapp"], "6": ["email", "whatsapp"],
  });

  const baseUrl = "https://sophie-und-alex.eventora.de";
  const guestLink = `${baseUrl}/rsvp?code=${selectedGuest.accessCode}`;

  const filteredGuests = guests.filter(g =>
    `${g.firstName} ${g.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const copyLink = () => {
    navigator.clipboard.writeText(guestLink);
    toast({ title: "Link kopiert!", description: "Der persönliche Einladungslink wurde kopiert." });
  };

  const markSent = (guestId: string, channel: string) => {
    setSentInvites(prev => ({
      ...prev,
      [guestId]: [...(prev[guestId] || []), channel],
    }));
    toast({ title: "Einladung vermerkt", description: `Einladung per ${channel === "email" ? "E-Mail" : channel === "whatsapp" ? "WhatsApp" : "QR-Code"} als gesendet markiert.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Einladungen</h1>
          <p className="text-muted-foreground text-sm">QR-Codes, persönliche Links und Versand-Optionen</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Gäste gesamt", value: guests.length, icon: "👥" },
            { label: "Eingeladen", value: Object.keys(sentInvites).length, icon: "✉️" },
            { label: "Ausstehend", value: guests.length - Object.keys(sentInvites).length, icon: "⏳" },
            { label: "RSVP erhalten", value: guests.filter(g => g.status !== "pending").length, icon: "✅" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 shadow-elegant text-center">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Guest List */}
          <div className="rounded-2xl bg-card border border-border/50 shadow-elegant p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Gast suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredGuests.map(guest => (
                <button
                  key={guest.id}
                  onClick={() => setSelectedGuest(guest)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                    selectedGuest.id === guest.id ? "bg-champagne-light" : "hover:bg-secondary"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">
                    {guest.firstName[0]}{guest.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{guest.firstName} {guest.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{guest.email}</p>
                  </div>
                  <div className="flex gap-1">
                    {sentInvites[guest.id]?.map(ch => (
                      <div key={ch} className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-sage" />
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Invitation Detail */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border/50 shadow-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-serif font-semibold">{selectedGuest.firstName} {selectedGuest.lastName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedGuest.email}</p>
                </div>
                <Badge variant={selectedGuest.status === "confirmed" ? "default" : selectedGuest.status === "declined" ? "destructive" : "secondary"}>
                  {selectedGuest.status === "confirmed" ? "Zugesagt" : selectedGuest.status === "declined" ? "Abgesagt" : "Ausstehend"}
                </Badge>
              </div>

              <Tabs defaultValue="qr">
                <TabsList className="w-full">
                  <TabsTrigger value="qr" className="flex-1 gap-1"><QrCode className="h-3.5 w-3.5" /> QR-Code</TabsTrigger>
                  <TabsTrigger value="link" className="flex-1 gap-1"><Link2 className="h-3.5 w-3.5" /> Link</TabsTrigger>
                  <TabsTrigger value="whatsapp" className="flex-1 gap-1"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</TabsTrigger>
                  <TabsTrigger value="email" className="flex-1 gap-1"><Mail className="h-3.5 w-3.5" /> E-Mail</TabsTrigger>
                </TabsList>

                <TabsContent value="qr" className="space-y-4 pt-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-6 bg-background rounded-2xl border border-border/50">
                      <QRCodeSVG value={guestLink} size={200} level="M" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Persönlicher QR-Code für {selectedGuest.firstName}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1" /> Herunterladen</Button>
                      <Button size="sm" variant="outline" onClick={() => markSent(selectedGuest.id, "qr")}><Check className="h-3.5 w-3.5 mr-1" /> Als gesendet markieren</Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-champagne-light/50 border border-champagne/20">
                    <p className="text-xs text-muted-foreground">
                      <strong>Zugangscode:</strong> <span className="font-mono text-foreground">{selectedGuest.accessCode}</span>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="link" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Persönlicher Einladungslink:</p>
                    <div className="flex gap-2">
                      <Input readOnly value={guestLink} className="font-mono text-xs" />
                      <Button size="icon" variant="outline" onClick={copyLink}><Copy className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => markSent(selectedGuest.id, "link")}>
                    <Check className="h-3.5 w-3.5 mr-1" /> Als geteilt markieren
                  </Button>
                </TabsContent>

                <TabsContent value="whatsapp" className="space-y-4 pt-4">
                  <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
                    <p className="text-sm font-medium">Nachrichtenvorschau:</p>
                    <div className="p-4 rounded-xl bg-[hsl(var(--sage-light))] text-sm space-y-2">
                      <p>Liebe/r {selectedGuest.firstName},</p>
                      <p>wir laden dich herzlich zu unserer Hochzeit ein! 💒✨</p>
                      <p>📅 13. September 2025<br />📍 Schloss Rothenburg</p>
                      <p>Bitte bestätige deine Teilnahme hier:<br />{guestLink}</p>
                      <p>Dein Zugangscode: <strong>{selectedGuest.accessCode}</strong></p>
                      <p>Wir freuen uns auf dich! 💕<br />{weddingInfo.coupleName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] text-primary-foreground" onClick={() => markSent(selectedGuest.id, "whatsapp")}>
                      <MessageCircle className="h-3.5 w-3.5 mr-1" /> Via WhatsApp senden
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyLink}>
                      <Copy className="h-3.5 w-3.5 mr-1" /> Text kopieren
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4 pt-4">
                  <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
                    <div className="space-y-1.5 text-sm">
                      <p><strong>An:</strong> {selectedGuest.email}</p>
                      <p><strong>Betreff:</strong> Einladung zur Hochzeit von {weddingInfo.coupleName} 💒</p>
                    </div>
                    <div className="border-t border-border/50 pt-3">
                      <div className="p-4 rounded-xl bg-background text-sm space-y-2">
                        <p>Liebe/r {selectedGuest.firstName},</p>
                        <p>wir freuen uns riesig, dich zu unserer Hochzeit einladen zu dürfen!</p>
                        <p>📅 <strong>13. September 2025</strong><br />📍 <strong>Schloss Rothenburg</strong><br />⏰ <strong>Beginn: 15:30 Uhr</strong></p>
                        <p>Bitte bestätige deine Teilnahme über deinen persönlichen Link:<br /><span className="text-champagne underline">{guestLink}</span></p>
                        <p>Dein persönlicher Zugangscode: <strong>{selectedGuest.accessCode}</strong></p>
                        <p>Herzliche Grüße,<br />{weddingInfo.coupleName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => markSent(selectedGuest.id, "email")}>
                      <Send className="h-3.5 w-3.5 mr-1" /> E-Mail senden
                    </Button>
                    <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5 mr-1" /> Vorschau</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bulk Actions */}
            <div className="rounded-2xl bg-card border border-border/50 shadow-elegant p-6 space-y-4">
              <h3 className="font-serif font-medium">Massen-Versand</h3>
              <p className="text-sm text-muted-foreground">Sende Einladungen an alle Gäste, die noch keine erhalten haben.</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5 mr-1" /> Alle per E-Mail einladen</Button>
                <Button variant="outline" size="sm"><Smartphone className="h-3.5 w-3.5 mr-1" /> Alle QR-Codes herunterladen</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Invitations;
