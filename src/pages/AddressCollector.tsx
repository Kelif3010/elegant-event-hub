import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { guests } from "@/data/mockData";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Send, Check, Link2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AddressCollector = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState("admin");
  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState("");

  const collectUrl = "https://eventora.de/collect/SOPHIE-ALEX-2025";
  const filledCount = 67;
  const totalCount = guests.length;

  const contactStatuses = guests.map(g => ({
    ...g,
    addressFilled: Math.random() > 0.45,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Kontaktdaten sammeln</h1>
          <p className="text-muted-foreground text-sm">Einladungsadressen eurer Gäste bequem einsammeln</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="admin">Verwaltung</TabsTrigger>
            <TabsTrigger value="preview">Gästeansicht (Vorschau)</TabsTrigger>
          </TabsList>

          <TabsContent value="admin" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-1">
                <p className="text-2xl font-serif font-bold">{totalCount}</p>
                <p className="text-xs text-muted-foreground">Eingeladen</p>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-1">
                <p className="text-2xl font-serif font-bold text-accent">{filledCount}</p>
                <p className="text-xs text-muted-foreground">Ausgefüllt</p>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant text-center space-y-1">
                <p className="text-2xl font-serif font-bold">{totalCount - filledCount}</p>
                <p className="text-xs text-muted-foreground">Ausstehend</p>
              </div>
            </div>

            <Progress value={(filledCount / totalCount) * 100} className="h-2 bg-secondary [&>div]:bg-accent" />

            {/* Link + QR */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
              <h3 className="font-serif font-semibold">Kontaktdaten-Link</h3>
              <div className="flex gap-2">
                <Input readOnly value={collectUrl} className="font-mono text-xs" />
                <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(collectUrl); toast.success("Link kopiert!"); }}><Copy className="h-4 w-4" /></Button>
              </div>
              <div className="flex justify-center py-4">
                <div className="p-4 bg-background rounded-2xl border border-border/50">
                  <QRCodeSVG value={collectUrl} size={160} />
                </div>
              </div>
            </div>

            {/* Guest status table */}
            <div className="rounded-2xl border border-border/50 shadow-elegant overflow-hidden">
              <table className="w-full">
                <thead><tr className="bg-secondary/50">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="p-3"></th>
                </tr></thead>
                <tbody>
                  {contactStatuses.map(g => (
                    <tr key={g.id} className="border-t border-border/30">
                      <td className="p-3 text-sm">{g.firstName} {g.lastName}</td>
                      <td className="p-3">
                        <Badge variant="outline" className={cn("text-xs", g.addressFilled ? "bg-sage-light text-sage" : "bg-champagne-light text-champagne")}>
                          {g.addressFilled ? "Ausgefüllt" : "Ausstehend"}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        {!g.addressFilled && <Button variant="ghost" size="sm" className="text-xs"><Send className="h-3 w-3 mr-1" /> Erinnerung</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="max-w-lg mx-auto">
            {!submitted ? (
              <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elevated space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-xl font-serif font-bold">{theme.coupleName.partner1} & {theme.coupleName.partner2}</p>
                  <p className="text-sm text-muted-foreground">bitten um eure Kontaktdaten</p>
                </div>
                <div className="space-y-4">
                  {["Vollständiger Name", "Straße + Hausnummer", "PLZ", "Stadt", "Land", "Telefon", "E-Mail"].map(field => (
                    <div key={field}><Label className="text-xs">{field}</Label><Input placeholder={field} /></div>
                  ))}
                  <div><Label className="text-xs">Geburtsdatum (optional)</Label><Input type="date" /></div>
                  <div><Label className="text-xs">Essensbesonderheiten (optional)</Label><Input placeholder="z.B. Vegetarisch, Laktosefrei..." /></div>
                </div>
                <Button className="w-full" style={{ backgroundColor: theme.accentColor }} onClick={() => setSubmitted(true)}>Absenden</Button>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elevated text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold">Danke!</h3>
                <p className="text-sm text-muted-foreground">Wir freuen uns auf dich. 💕</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Zurück</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AddressCollector;
