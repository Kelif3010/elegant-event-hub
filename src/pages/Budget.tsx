import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { budgetCategories, budgetExpenses } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Plus, TrendingUp, Wallet, CreditCard, CheckCircle2, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState, { BudgetIllustration } from "@/components/EmptyState";

const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
const totalRemaining = totalBudget - totalSpent;

const pieData = budgetCategories.map(c => ({ name: c.name, value: c.spent, color: c.color }));
const barData = budgetCategories.map(c => ({ name: c.name.split(" ")[0], budget: c.budget, spent: c.spent }));

const Budget = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPaid, setShowPaid] = useState<"all" | "paid" | "unpaid">("all");

  const filteredExpenses = budgetExpenses.filter(e => {
    if (selectedCategory && e.categoryId !== selectedCategory) return false;
    if (showPaid === "paid" && !e.paid) return false;
    if (showPaid === "unpaid" && e.paid) return false;
    return true;
  });

  const paidTotal = budgetExpenses.filter(e => e.paid).reduce((s, e) => s + e.amount, 0);
  const unpaidTotal = budgetExpenses.filter(e => !e.paid).reduce((s, e) => s + e.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Finanzen im Überblick</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Budget</h1>
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="h-4 w-4" /> Ausgabe hinzufügen
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gesamtbudget", value: totalBudget, icon: Wallet, color: "bg-champagne-light text-champagne" },
            { label: "Ausgegeben", value: totalSpent, icon: CreditCard, color: "bg-rose-light text-rose" },
            { label: "Verbleibend", value: totalRemaining, icon: TrendingUp, color: "bg-sage-light text-sage" },
            { label: "Bezahlt", value: paidTotal, icon: CheckCircle2, color: "bg-champagne-light text-champagne" },
          ].map(c => (
            <div key={c.label} className="p-5 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{c.label}</span>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.color)}>
                  <c.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-serif font-bold">€{c.value.toLocaleString("de-DE")}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
            <h2 className="text-lg font-serif font-semibold">Ausgabenverteilung</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
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

          {/* Bar Chart */}
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

        {/* Categories */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
          <h2 className="text-lg font-serif font-semibold">Kategorien</h2>
          <div className="space-y-4">
            {budgetCategories.map(cat => {
              const pct = Math.round((cat.spent / cat.budget) * 100);
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
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-sm">{cat.name}</span>
                    </div>
                    <div className="text-sm text-right">
                      <span className={cn("font-semibold", isOver ? "text-destructive" : "")}>
                        €{cat.spent.toLocaleString("de-DE")}
                      </span>
                      <span className="text-muted-foreground"> / €{cat.budget.toLocaleString("de-DE")}</span>
                    </div>
                  </div>
                  <Progress
                    value={Math.min(pct, 100)}
                    className={cn("h-2 bg-secondary", isOver ? "[&>div]:bg-destructive" : "[&>div]:bg-champagne")}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{pct}% ausgegeben</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expenses Table */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-serif font-semibold">
              Einzelposten
              {selectedCategory && (
                <span className="text-sm font-sans text-muted-foreground ml-2">
                  – {budgetCategories.find(c => c.id === selectedCategory)?.name}
                </span>
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
                  <th className="text-right py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(exp => (
                  <tr key={exp.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 font-medium">{exp.title}</td>
                    <td className="py-3 text-muted-foreground hidden sm:table-cell">{exp.vendor}</td>
                    <td className="py-3 text-muted-foreground hidden md:table-cell">{new Date(exp.date).toLocaleDateString("de-DE")}</td>
                    <td className="py-3 text-right font-semibold">€{exp.amount.toLocaleString("de-DE")}</td>
                    <td className="py-3 text-right">
                      {exp.paid ? (
                        <Badge className="bg-sage-light text-sage border-0 text-xs">Bezahlt</Badge>
                      ) : (
                        <Badge variant="outline" className="text-champagne border-champagne/30 text-xs">Offen</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredExpenses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <CreditCard className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p>Keine Ausgaben gefunden.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
