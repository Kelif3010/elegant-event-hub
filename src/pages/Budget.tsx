import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { budgetCategories as initialCategories, budgetExpenses as initialExpenses } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Plus, TrendingUp, Wallet, CreditCard, CheckCircle2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState, { BudgetIllustration } from "@/components/EmptyState";

const Budget = () => {
  const [expenses, setExpenses] = useState(initialExpenses.map(e => ({ ...e })));
  const [categories, setCategories] = useState(initialCategories.map(c => ({ ...c })));
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPaid, setShowPaid] = useState<"all" | "paid" | "unpaid">("all");

  // New expense form
  const [newExp, setNewExp] = useState({ title: "", categoryId: "", amount: "", vendor: "", date: "", paid: false });
  const [newCat, setNewCat] = useState({ name: "", budget: "", color: "hsl(200 40% 60%)" });

  // Computed values
  const computedCategories = useMemo(() => {
    return categories.map(cat => {
      const spent = expenses.filter(e => e.categoryId === cat.id).reduce((s, e) => s + e.amount, 0);
      return { ...cat, spent };
    });
  }, [categories, expenses]);

  const totalBudget = computedCategories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = computedCategories.reduce((s, c) => s + c.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const paidTotal = expenses.filter(e => e.paid).reduce((s, e) => s + e.amount, 0);

  const pieData = computedCategories.map(c => ({ name: c.name, value: c.spent, color: c.color }));
  const barData = computedCategories.map(c => ({ name: c.name.split(" ")[0], budget: c.budget, spent: c.spent }));

  const filteredExpenses = expenses.filter(e => {
    if (selectedCategory && e.categoryId !== selectedCategory) return false;
    if (showPaid === "paid" && !e.paid) return false;
    if (showPaid === "unpaid" && e.paid) return false;
    return true;
  });

  const togglePaid = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, paid: !e.paid } : e));
  };

  const addExpense = () => {
    if (!newExp.title || !newExp.categoryId || !newExp.amount) return;
    const exp = {
      id: String(Date.now()),
      title: newExp.title,
      categoryId: newExp.categoryId,
      amount: parseFloat(newExp.amount),
      vendor: newExp.vendor,
      date: newExp.date || new Date().toISOString().split("T")[0],
      paid: newExp.paid,
    };
    setExpenses(prev => [exp, ...prev]);
    setNewExp({ title: "", categoryId: "", amount: "", vendor: "", date: "", paid: false });
    setShowAddExpense(false);
  };

  const addCategory = () => {
    if (!newCat.name || !newCat.budget) return;
    const cat = {
      id: String(Date.now()),
      name: newCat.name,
      budget: parseFloat(newCat.budget),
      spent: 0,
      color: newCat.color,
    };
    setCategories(prev => [...prev, cat]);
    setNewCat({ name: "", budget: "", color: "hsl(200 40% 60%)" });
    setShowAddCategory(false);
  };

  const summaryCards = [
    { label: "Gesamtbudget", value: totalBudget, icon: Wallet, color: "bg-champagne-light text-champagne" },
    { label: "Ausgegeben", value: totalSpent, icon: CreditCard, color: "bg-rose-light text-rose" },
    { label: "Verbleibend", value: totalRemaining, icon: TrendingUp, color: "bg-sage-light text-sage" },
    { label: "Bezahlt", value: paidTotal, icon: CheckCircle2, color: "bg-champagne-light text-champagne" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Finanzen im Überblick</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Budget</h1>
          </div>
          <Button onClick={() => setShowAddExpense(true)} className="bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="h-4 w-4" /> Ausgabe hinzufügen
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(c => (
            <div key={c.label} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">{c.label}</span>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.color)}>
                  <c.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-serif font-bold">€{c.value.toLocaleString("de-DE")}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="categories">Kategorien</TabsTrigger>
            <TabsTrigger value="expenses">Einzelposten</TabsTrigger>
          </TabsList>

          {/* Tab: Übersicht */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h2 className="text-lg font-serif font-semibold">Ausgabenverteilung</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `€${v.toLocaleString("de-DE")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {pieData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="truncate text-muted-foreground">{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
                <h2 className="text-lg font-serif font-semibold">Budget vs. Ausgaben</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 90%)" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                      <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                      <Tooltip formatter={(v: number) => `€${v.toLocaleString("de-DE")}`} />
                      <Bar dataKey="budget" fill="hsl(35 30% 93%)" radius={[4, 4, 0, 0]} name="Budget" />
                      <Bar dataKey="spent" fill="hsl(38 55% 62%)" radius={[4, 4, 0, 0]} name="Ausgegeben" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Kategorien */}
          <TabsContent value="categories">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif font-semibold">Kategorien</h2>
                <Button variant="outline" size="sm" onClick={() => setShowAddCategory(true)} className="gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Kategorie
                </Button>
              </div>
              <div className="space-y-3">
                {computedCategories.map(cat => {
                  const pct = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
                  const isOver = cat.spent > cat.budget;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl transition-colors",
                        selectedCategory === cat.id ? "bg-champagne-light ring-1 ring-champagne/30" : "bg-secondary/30 hover:bg-secondary/60"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                          <span className="font-medium text-sm">{cat.name}</span>
                        </div>
                        <div className="text-sm text-right">
                          <span className={cn("font-semibold", isOver && "text-destructive")}>
                            €{cat.spent.toLocaleString("de-DE")}
                          </span>
                          <span className="text-muted-foreground"> / €{cat.budget.toLocaleString("de-DE")}</span>
                        </div>
                      </div>
                      <Progress value={Math.min(pct, 100)} className={cn("h-2 bg-secondary", isOver ? "[&>div]:bg-destructive" : "[&>div]:bg-champagne")} />
                      <p className="text-xs text-muted-foreground mt-1">{pct}% ausgegeben</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Tab: Einzelposten */}
          <TabsContent value="expenses">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg font-serif font-semibold">
                  Einzelposten
                  {selectedCategory && (
                    <button onClick={() => setSelectedCategory(null)} className="text-sm font-sans text-muted-foreground ml-2 hover:text-foreground">
                      – {computedCategories.find(c => c.id === selectedCategory)?.name} ✕
                    </button>
                  )}
                </h2>
                <div className="flex gap-2">
                  {(["all", "paid", "unpaid"] as const).map(f => (
                    <Button
                      key={f}
                      variant={showPaid === f ? "default" : "outline"}
                      size="sm"
                      className={cn("text-xs", showPaid === f && "bg-foreground text-background")}
                      onClick={() => setShowPaid(f)}
                    >
                      {f === "all" ? "Alle" : f === "paid" ? "Bezahlt" : "Offen"}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 font-medium text-muted-foreground">Posten</th>
                      <th className="text-left py-3 font-medium text-muted-foreground hidden sm:table-cell">Anbieter</th>
                      <th className="text-left py-3 font-medium text-muted-foreground hidden md:table-cell">Datum</th>
                      <th className="text-right py-3 font-medium text-muted-foreground">Betrag</th>
                      <th className="text-center py-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map(exp => (
                      <tr key={exp.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 font-medium">{exp.title}</td>
                        <td className="py-3 text-muted-foreground hidden sm:table-cell">{exp.vendor}</td>
                        <td className="py-3 text-muted-foreground hidden md:table-cell">{new Date(exp.date).toLocaleDateString("de-DE")}</td>
                        <td className="py-3 text-right font-semibold">€{exp.amount.toLocaleString("de-DE")}</td>
                        <td className="py-3 text-center">
                          <button onClick={() => togglePaid(exp.id)} className="inline-block">
                            {exp.paid ? (
                              <Badge className="bg-sage-light text-sage border-0 text-xs cursor-pointer hover:bg-sage/20">Bezahlt</Badge>
                            ) : (
                              <Badge variant="outline" className="text-champagne border-champagne/30 text-xs cursor-pointer hover:bg-champagne-light">Offen</Badge>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredExpenses.length === 0 && (
                  selectedCategory || showPaid !== "all" ? (
                    <EmptyState illustration={<BudgetIllustration />} title="Keine Ausgaben gefunden" description="Ändere den Filter oder die Kategorie." />
                  ) : (
                    <EmptyState illustration={<BudgetIllustration />} title="Noch keine Ausgaben erfasst" description="Beginnt euer Budget zu tracken." actionLabel="Erste Ausgabe hinzufügen" onAction={() => setShowAddExpense(true)} />
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog: Ausgabe hinzufügen */}
      <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Ausgabe hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Titel</Label>
              <Input placeholder="z.B. Brautstrauß" value={newExp.title} onChange={e => setNewExp(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Kategorie</Label>
              <Select value={newExp.categoryId} onValueChange={v => setNewExp(p => ({ ...p, categoryId: v }))}>
                <SelectTrigger><SelectValue placeholder="Kategorie wählen" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Betrag (€)</Label>
                <Input type="number" placeholder="0" value={newExp.amount} onChange={e => setNewExp(p => ({ ...p, amount: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Datum</Label>
                <Input type="date" value={newExp.date} onChange={e => setNewExp(p => ({ ...p, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Anbieter</Label>
              <Input placeholder="z.B. Blütenwerk" value={newExp.vendor} onChange={e => setNewExp(p => ({ ...p, vendor: e.target.value }))} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Bereits bezahlt</Label>
              <Switch checked={newExp.paid} onCheckedChange={v => setNewExp(p => ({ ...p, paid: v }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExpense(false)}>Abbrechen</Button>
            <Button onClick={addExpense} className="bg-foreground text-background hover:bg-foreground/90">Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Kategorie hinzufügen */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Kategorie hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="z.B. Hochzeitstorte" value={newCat.name} onChange={e => setNewCat(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Budget (€)</Label>
              <Input type="number" placeholder="0" value={newCat.budget} onChange={e => setNewCat(p => ({ ...p, budget: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Farbe</Label>
              <div className="flex gap-2 flex-wrap">
                {["hsl(200 40% 60%)", "hsl(340 50% 65%)", "hsl(160 35% 55%)", "hsl(30 60% 60%)", "hsl(270 40% 65%)", "hsl(50 50% 55%)"].map(c => (
                  <button
                    key={c}
                    onClick={() => setNewCat(p => ({ ...p, color: c }))}
                    className={cn("w-8 h-8 rounded-full border-2 transition-transform", newCat.color === c ? "border-foreground scale-110" : "border-transparent")}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCategory(false)}>Abbrechen</Button>
            <Button onClick={addCategory} className="bg-foreground text-background hover:bg-foreground/90">Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Budget;
