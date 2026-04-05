import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, GripVertical, Trash2, Eye, Settings2, ArrowRight, ChevronDown, ChevronUp, Copy, ToggleLeft, X, User, Utensils, Hotel, Train } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldType = "text" | "email" | "radio" | "checkbox" | "select" | "textarea" | "number";

interface FormField {
  id: string; label: string; type: FieldType; required: boolean; options?: string[]; placeholder?: string;
  condition?: { fieldId: string; value: string }; section: string;
}

const defaultFields: FormField[] = [
  { id: "f1", label: "Vorname", type: "text", required: true, placeholder: "Vorname", section: "Zusage" },
  { id: "f2", label: "Nachname", type: "text", required: true, placeholder: "Nachname", section: "Zusage" },
  { id: "f3", label: "E-Mail", type: "email", required: true, placeholder: "email@example.de", section: "Zusage" },
  { id: "f4", label: "Könnt ihr dabei sein?", type: "radio", required: true, options: ["Ja, wir kommen! 🎉", "Leider nicht 😢"], section: "Zusage" },
  { id: "f5", label: "Begleitung mitbringen?", type: "checkbox", required: false, section: "Zusage", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f6", label: "Name der Begleitung", type: "text", required: false, placeholder: "Name", section: "Zusage", condition: { fieldId: "f5", value: "true" } },
  { id: "f7", label: "Essenswahl", type: "radio", required: true, options: ["Fleisch 🥩", "Fisch 🐟", "Vegetarisch 🥗", "Vegan 🌱"], section: "Essen", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f8", label: "Allergien", type: "text", required: false, placeholder: "z.B. Laktose, Gluten...", section: "Essen", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f9", label: "Unterkunft benötigt?", type: "radio", required: false, options: ["Ja, bitte 🏨", "Nein, danke 🏠"], section: "Logistik", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f10", label: "Anreiseart", type: "radio", required: false, options: ["Auto 🚗", "Bahn 🚆", "Shuttle 🚌"], section: "Logistik", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f11", label: "Aufenthaltsdauer", type: "radio", required: false, options: ["Nur Feier", "1 Nacht", "2 Nächte"], section: "Logistik", condition: { fieldId: "f4", value: "Ja, wir kommen! 🎉" } },
  { id: "f12", label: "Songwunsch 🎵", type: "text", required: false, placeholder: "Welches Lied?", section: "Extras" },
  { id: "f13", label: "Nachricht ans Brautpaar 💌", type: "textarea", required: false, placeholder: "Ein paar liebe Worte...", section: "Extras" },
  { id: "f14", label: "Flitterwochen-Empfehlung ✈️", type: "text", required: false, placeholder: "Wohin sollen wir reisen?", section: "Extras" },
];

const fieldTypeLabels: Record<FieldType, string> = { text: "Text", email: "E-Mail", radio: "Auswahl", checkbox: "Checkbox", select: "Dropdown", textarea: "Freitext", number: "Zahl" };

interface PersonaState { plusOne: boolean; vegetarian: boolean; hotel: boolean; train: boolean; }

const RSVPManager = () => {
  const [fields, setFields] = useState<FormField[]>(defaultFields);
  const [editField, setEditField] = useState<FormField | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [persona, setPersona] = useState<PersonaState>({ plusOne: false, vegetarian: false, hotel: false, train: false });

  const sections = [...new Set(fields.map(f => f.section))];

  const addField = () => {
    const nf: FormField = { id: `f${Date.now()}`, label: "Neues Feld", type: "text", required: false, section: sections[0] || "Zusage", placeholder: "" };
    setFields(prev => [...prev, nf]);
    setEditField(nf);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    if (editField?.id === id) setEditField(prev => prev ? { ...prev, ...updates } : null);
  };

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
    if (editField?.id === id) setEditField(null);
  };

  const moveField = (idx: number, dir: -1 | 1) => {
    const next = [...fields];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= next.length) return;
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setFields(next);
  };

  const duplicateField = (f: FormField) => {
    const nf = { ...f, id: `f${Date.now()}`, label: `${f.label} (Kopie)` };
    setFields(prev => [...prev, nf]);
  };

  // Drag and Drop
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragEnd = () => {
    if (dragIdx !== null && dragOverIdx !== null && dragIdx !== dragOverIdx) {
      const next = [...fields];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(dragOverIdx, 0, moved);
      setFields(next);
    }
    setDragIdx(null);
    setDragOverIdx(null);
  };

  // Persona-aware field visibility
  const isFieldVisibleForPersona = (f: FormField): boolean => {
    // Plus-one fields
    if (f.id === "f5" || f.id === "f6") return persona.plusOne;
    // Vegetarian: show all food fields but highlight
    if (f.id === "f9") return persona.hotel;
    if (f.id === "f10" && persona.train) return true;
    return true;
  };

  const activePersonaChips = [
    persona.plusOne && "Mit Plus-One",
    persona.vegetarian && "Vegetarisch",
    persona.hotel && "Hotel benötigt",
    persona.train && "Anreise Bahn",
  ].filter(Boolean);

  const renderPreviewField = (f: FormField) => {
    const isVegHighlight = persona.vegetarian && f.id === "f7";
    switch (f.type) {
      case "radio":
        return (
          <div className="grid grid-cols-2 gap-3">
            {f.options?.map(opt => {
              const isVeg = opt.includes("Vegetarisch") || opt.includes("Vegan");
              const isMeat = opt.includes("Fleisch") || opt.includes("Fisch");
              return (
                <label key={opt} className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                  isVegHighlight && isVeg ? "border-accent bg-accent/5" : "",
                  isVegHighlight && isMeat ? "opacity-40 border-border" : "border-border hover:border-accent/40"
                )}>
                  <div className={cn("w-4 h-4 rounded-full border-2", isVegHighlight && isVeg ? "border-accent bg-accent" : "border-muted-foreground")} />
                  <span className="text-sm font-medium">{opt}</span>
                </label>
              );
            })}
          </div>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={cn("w-5 h-5 rounded border-2", persona.plusOne ? "border-accent bg-accent" : "border-muted-foreground")} />
            <span className="text-sm">{f.label}</span>
          </label>
        );
      case "textarea":
        return <div className="h-24 rounded-xl border border-input bg-background px-3 py-2 text-sm text-muted-foreground">{f.placeholder}</div>;
      default:
        return <div className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">{f.placeholder}</div>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Formular-Editor</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">RSVP verwalten</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { setPreviewStep(0); setShowPreview(true); }} className="gap-2"><Eye className="h-4 w-4" /> Vorschau</Button>
            <Button onClick={addField} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> Feld hinzufügen</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Builder */}
          <div className="lg:col-span-2 space-y-6">
            {sections.map(section => (
              <div key={section} className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section}</h2>
                <div className="space-y-2">
                  {fields.filter(f => f.section === section).map((f) => {
                    const globalIdx = fields.indexOf(f);
                    return (
                      <div
                        key={f.id}
                        draggable
                        onDragStart={() => setDragIdx(globalIdx)}
                        onDragOver={e => { e.preventDefault(); setDragOverIdx(globalIdx); }}
                        onDragEnd={handleDragEnd}
                        onClick={() => setEditField(f)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group",
                          editField?.id === f.id ? "border-accent bg-accent/5" : "border-transparent hover:bg-secondary/40",
                          dragOverIdx === globalIdx && dragIdx !== globalIdx && "ring-2 ring-accent",
                          dragIdx === globalIdx && "opacity-50"
                        )}
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate">{f.label}</span>
                            {f.required && <Badge className="bg-rose-light text-rose border-0 text-[10px]">Pflicht</Badge>}
                            {f.condition && <Badge variant="outline" className="text-[10px]">Bedingt</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{fieldTypeLabels[f.type]}{f.options ? ` · ${f.options.length} Optionen` : ""}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={e => { e.stopPropagation(); moveField(globalIdx, -1); }} className="p-1 rounded hover:bg-secondary"><ChevronUp className="h-3.5 w-3.5" /></button>
                          <button onClick={e => { e.stopPropagation(); moveField(globalIdx, 1); }} className="p-1 rounded hover:bg-secondary"><ChevronDown className="h-3.5 w-3.5" /></button>
                          <button onClick={e => { e.stopPropagation(); duplicateField(f); }} className="p-1 rounded hover:bg-secondary"><Copy className="h-3.5 w-3.5" /></button>
                          <button onClick={e => { e.stopPropagation(); deleteField(f.id); }} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Field Editor */}
          <div className="lg:col-span-1">
            {editField ? (
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5 sticky top-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-semibold">Feld bearbeiten</h3>
                  <button onClick={() => setEditField(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
                </div>
                <div><Label>Label</Label><Input value={editField.label} onChange={e => updateField(editField.id, { label: e.target.value })} /></div>
                <div>
                  <Label>Typ</Label>
                  <Select value={editField.type} onValueChange={v => updateField(editField.id, { type: v as FieldType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(fieldTypeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Sektion</Label>
                  <Select value={editField.section} onValueChange={v => updateField(editField.id, { section: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{sections.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {editField.placeholder !== undefined && <div><Label>Placeholder</Label><Input value={editField.placeholder || ""} onChange={e => updateField(editField.id, { placeholder: e.target.value })} /></div>}
                <div className="flex items-center justify-between"><Label>Pflichtfeld</Label><Switch checked={editField.required} onCheckedChange={v => updateField(editField.id, { required: v })} /></div>
                {(editField.type === "radio" || editField.type === "select") && (
                  <div className="space-y-2">
                    <Label>Optionen</Label>
                    {editField.options?.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={opt} onChange={e => { const opts = [...(editField.options || [])]; opts[i] = e.target.value; updateField(editField.id, { options: opts }); }} />
                        <button onClick={() => { const opts = editField.options?.filter((_, j) => j !== i); updateField(editField.id, { options: opts }); }} className="p-2 rounded-lg hover:bg-destructive/10"><X className="h-3.5 w-3.5 text-destructive" /></button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => updateField(editField.id, { options: [...(editField.options || []), "Neue Option"] })}>+ Option</Button>
                  </div>
                )}
                <div className="space-y-3 pt-3 border-t border-border/50">
                  <Label className="flex items-center gap-2"><ToggleLeft className="h-4 w-4" /> Bedingte Anzeige</Label>
                  {editField.condition ? (
                    <div className="space-y-2 p-3 rounded-xl bg-secondary/30">
                      <div>
                        <Label className="text-xs">Zeige wenn Feld...</Label>
                        <Select value={editField.condition.fieldId} onValueChange={v => updateField(editField.id, { condition: { ...editField.condition!, fieldId: v } })}>
                          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                          <SelectContent>{fields.filter(f2 => f2.id !== editField.id).map(f2 => <SelectItem key={f2.id} value={f2.id}>{f2.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">...den Wert hat</Label>
                        <Input value={editField.condition.value} onChange={e => updateField(editField.id, { condition: { ...editField.condition!, value: e.target.value } })} className="h-8" />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => updateField(editField.id, { condition: undefined })}>Bedingung entfernen</Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => updateField(editField.id, { condition: { fieldId: fields[0]?.id || "", value: "" } })}>Bedingung hinzufügen</Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant text-center text-muted-foreground space-y-3">
                <Settings2 className="h-8 w-8 mx-auto opacity-40" />
                <p className="text-sm">Klicke auf ein Feld um es zu bearbeiten</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview with Persona Toggles */}
      <Sheet open={showPreview} onOpenChange={setShowPreview}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader><SheetTitle className="font-serif">RSVP Persona-Vorschau</SheetTitle></SheetHeader>
          <div className="mt-4 space-y-4">
            {/* Persona Toggles */}
            <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Persona simulieren</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "plusOne", label: "Mit Plus-One", icon: User },
                  { key: "vegetarian", label: "Vegetarisch", icon: Utensils },
                  { key: "hotel", label: "Hotel benötigt", icon: Hotel },
                  { key: "train", label: "Anreise Bahn", icon: Train },
                ].map(p => (
                  <button
                    key={p.key}
                    onClick={() => setPersona(prev => ({ ...prev, [p.key]: !prev[p.key as keyof PersonaState] }))}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border-2 text-xs font-medium transition-all",
                      persona[p.key as keyof PersonaState] ? "border-accent bg-accent/10 text-accent" : "border-border/50 text-muted-foreground"
                    )}
                  >
                    <p.icon className="h-3.5 w-3.5" />
                    {p.label}
                  </button>
                ))}
              </div>
              {activePersonaChips.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] text-muted-foreground">Vorschau für:</span>
                  {activePersonaChips.map(c => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                </div>
              )}
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 justify-center">
              {sections.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium", i <= previewStep ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground")}>{i + 1}</div>
                  {i < sections.length - 1 && <div className={cn("w-6 h-px", i < previewStep ? "bg-accent" : "bg-border")} />}
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-medium">{sections[previewStep]}</p>

            <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-5">
              {fields.filter(f => f.section === sections[previewStep]).map(f => {
                if (!isFieldVisibleForPersona(f)) return null;
                return (
                  <div key={f.id} className="space-y-2 animate-fade-in">
                    {f.type !== "checkbox" && (
                      <div className="flex items-center gap-1">
                        <Label>{f.label}</Label>
                        {f.required && <span className="text-rose text-xs">*</span>}
                      </div>
                    )}
                    {renderPreviewField(f)}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setPreviewStep(Math.max(0, previewStep - 1))} disabled={previewStep === 0}>Zurück</Button>
              {previewStep < sections.length - 1 ? (
                <Button onClick={() => setPreviewStep(previewStep + 1)}>Weiter <ArrowRight className="h-4 w-4 ml-1" /></Button>
              ) : (
                <Button className="bg-accent text-accent-foreground">Absenden 🎉</Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default RSVPManager;
