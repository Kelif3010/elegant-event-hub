import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EmptyState from "@/components/EmptyState";
import { useTheme } from "@/contexts/ThemeContext";
import { guests } from "@/data/mockData";
import {
  UtensilsCrossed, AlertTriangle, BookOpen, Plus, Search,
  Users, Leaf, Fish, Beef, Vegan, Wheat, Milk, Nut,
  Trash2, Edit2, Eye, ChefHat, Salad
} from "lucide-react";

interface MenuItem {
  id: string;
  course: string;
  name: string;
  description: string;
  dietaryTags: string[];
  allergens: string[];
}

interface GuestMeal {
  guestId: string;
  firstName: string;
  lastName: string;
  selectedMeal: string;
  allergies: string;
  dietaryNotes: string;
  confirmed: boolean;
}

const COURSES = ["Vorspeise", "Hauptgang", "Dessert", "Getränke"];

const DIETARY_TAGS = ["Vegetarisch", "Vegan", "Glutenfrei", "Laktosefrei", "Nussfrei"];

const COMMON_ALLERGENS = ["Gluten", "Laktose", "Nüsse", "Erdnüsse", "Soja", "Eier", "Fisch", "Schalentiere", "Sellerie", "Senf", "Sesam", "Sulfite"];

const INITIAL_MENU: MenuItem[] = [
  { id: "1", course: "Vorspeise", name: "Burrata auf Tomaten-Carpaccio", description: "Mit Basilikum-Pesto und geröstetem Ciabatta", dietaryTags: ["Vegetarisch"], allergens: ["Laktose", "Gluten"] },
  { id: "2", course: "Vorspeise", name: "Rote-Bete-Suppe", description: "Mit Meerrettich-Schaum und Dill", dietaryTags: ["Vegan", "Glutenfrei", "Laktosefrei"], allergens: [] },
  { id: "3", course: "Hauptgang", name: "Rinderfilet rosa gebraten", description: "Mit Trüffel-Kartoffelpüree, glasierten Möhren und Rotweinjus", dietaryTags: [], allergens: ["Laktose"] },
  { id: "4", course: "Hauptgang", name: "Lachs auf Zitronenbett", description: "Mit Spargel-Risotto und Safranschaum", dietaryTags: ["Glutenfrei"], allergens: ["Fisch", "Laktose"] },
  { id: "5", course: "Hauptgang", name: "Gefüllte Aubergine", description: "Mit Quinoa, Granatapfel und Tahini-Dressing", dietaryTags: ["Vegan", "Glutenfrei", "Laktosefrei"], allergens: ["Sesam"] },
  { id: "6", course: "Dessert", name: "Panna Cotta", description: "Mit marinierten Waldbeeren und Minze", dietaryTags: ["Vegetarisch", "Glutenfrei"], allergens: ["Laktose"] },
  { id: "7", course: "Dessert", name: "Schokoladen-Fondant", description: "Mit Vanilleeis und Haselnuss-Crumble", dietaryTags: ["Vegetarisch"], allergens: ["Laktose", "Gluten", "Nüsse", "Eier"] },
  { id: "8", course: "Dessert", name: "Sorbet-Trilogie", description: "Mango, Himbeere und Zitrone", dietaryTags: ["Vegan", "Glutenfrei", "Laktosefrei", "Nussfrei"], allergens: [] },
];

const MEAL_OPTIONS = ["Fleisch", "Fisch", "Vegetarisch", "Vegan"];

const FoodAllergies = () => {
  const { theme } = useTheme();
  const accentColor = `hsl(${theme.accentHSL})`;

  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [guestMeals, setGuestMeals] = useState<GuestMeal[]>(
    guests.filter(g => g.status === "confirmed").map(g => ({
      guestId: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      selectedMeal: g.meal || "",
      allergies: g.allergies || "",
      dietaryNotes: "",
      confirmed: !!g.meal,
    }))
  );
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showMenuPreview, setShowMenuPreview] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ course: "Vorspeise", name: "", description: "", dietaryTags: [], allergens: [] });
  const [searchGuest, setSearchGuest] = useState("");
  const [filterMeal, setFilterMeal] = useState("all");
  const [filterAllergy, setFilterAllergy] = useState("all");

  // Stats
  const confirmedMeals = guestMeals.filter(g => g.confirmed);
  const mealCounts = MEAL_OPTIONS.reduce((acc, m) => {
    acc[m] = confirmedMeals.filter(g => g.selectedMeal === m).length;
    return acc;
  }, {} as Record<string, number>);
  const allergyCounts = COMMON_ALLERGENS.reduce((acc, a) => {
    const count = guestMeals.filter(g => g.allergies.toLowerCase().includes(a.toLowerCase())).length;
    if (count > 0) acc[a] = count;
    return acc;
  }, {} as Record<string, number>);
  const noMealSelected = guestMeals.filter(g => !g.selectedMeal).length;

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case "Fleisch": return <Beef className="h-4 w-4" />;
      case "Fisch": return <Fish className="h-4 w-4" />;
      case "Vegetarisch": return <Salad className="h-4 w-4" />;
      case "Vegan": return <Leaf className="h-4 w-4" />;
      default: return <UtensilsCrossed className="h-4 w-4" />;
    }
  };

  const getAllergyIcon = (allergy: string) => {
    if (allergy.toLowerCase().includes("gluten")) return <Wheat className="h-3 w-3" />;
    if (allergy.toLowerCase().includes("laktose") || allergy.toLowerCase().includes("milch")) return <Milk className="h-3 w-3" />;
    if (allergy.toLowerCase().includes("nüsse") || allergy.toLowerCase().includes("nuss")) return <Nut className="h-3 w-3" />;
    return <AlertTriangle className="h-3 w-3" />;
  };

  const handleUpdateGuestMeal = (guestId: string, field: keyof GuestMeal, value: string | boolean) => {
    setGuestMeals(prev => prev.map(g =>
      g.guestId === guestId ? { ...g, [field]: value, confirmed: field === "selectedMeal" ? true : g.confirmed } : g
    ));
  };

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.course) return;
    const item: MenuItem = {
      id: Date.now().toString(),
      course: newItem.course!,
      name: newItem.name!,
      description: newItem.description || "",
      dietaryTags: newItem.dietaryTags || [],
      allergens: newItem.allergens || [],
    };
    setMenuItems(prev => [...prev, item]);
    setNewItem({ course: "Vorspeise", name: "", description: "", dietaryTags: [], allergens: [] });
    setShowAddMenu(false);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const filteredGuests = guestMeals.filter(g => {
    const matchesSearch = `${g.firstName} ${g.lastName}`.toLowerCase().includes(searchGuest.toLowerCase());
    const matchesMeal = filterMeal === "all" || g.selectedMeal === filterMeal || (filterMeal === "none" && !g.selectedMeal);
    const matchesAllergy = filterAllergy === "all" || g.allergies.toLowerCase().includes(filterAllergy.toLowerCase());
    return matchesSearch && matchesMeal && matchesAllergy;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground flex items-center gap-2">
              <UtensilsCrossed className="h-7 w-7" style={{ color: accentColor }} />
              Essen & Allergien
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Menükarte, Essenswahl und Allergien deiner Gäste</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowMenuPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Menükarte ansehen
            </Button>
            <Button onClick={() => setShowAddMenu(true)} style={{ backgroundColor: accentColor }}>
              <Plus className="h-4 w-4 mr-2" />
              Gericht hinzufügen
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{confirmedMeals.length}</p>
                  <p className="text-xs text-muted-foreground">Essen gewählt</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <AlertTriangle className="h-5 w-5" style={{ color: accentColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{noMealSelected}</p>
                  <p className="text-xs text-muted-foreground">Noch offen</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{Object.keys(allergyCounts).length}</p>
                  <p className="text-xs text-muted-foreground">Allergien</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <ChefHat className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{menuItems.length}</p>
                  <p className="text-xs text-muted-foreground">Gerichte</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="menu">Menükarte</TabsTrigger>
            <TabsTrigger value="guests">Gäste & Allergien</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meal Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Essenswahl</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MEAL_OPTIONS.map(meal => {
                    const count = mealCounts[meal] || 0;
                    const pct = confirmedMeals.length > 0 ? (count / confirmedMeals.length) * 100 : 0;
                    return (
                      <div key={meal} className="flex items-center gap-3">
                        <div className="flex items-center gap-2 w-28 shrink-0">
                          {getMealIcon(meal)}
                          <span className="text-sm font-medium text-foreground">{meal}</span>
                        </div>
                        <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: accentColor }}
                          />
                        </div>
                        <span className="text-sm font-bold text-foreground w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                  {noMealSelected > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-28 shrink-0">
                        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Offen</span>
                      </div>
                      <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-muted-foreground/30 transition-all duration-500"
                          style={{ width: `${(noMealSelected / guestMeals.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground w-8 text-right">{noMealSelected}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Allergies Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Allergien & Unverträglichkeiten</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(allergyCounts).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Keine Allergien gemeldet</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(allergyCounts)
                        .sort(([, a], [, b]) => b - a)
                        .map(([allergy, count]) => (
                          <div key={allergy} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-2">
                              {getAllergyIcon(allergy)}
                              <span className="text-sm font-medium text-foreground">{allergy}</span>
                            </div>
                            <Badge variant="secondary">{count} {count === 1 ? "Gast" : "Gäste"}</Badge>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="mt-6 space-y-6">
            {menuItems.length === 0 ? (
              <EmptyState
                illustration={<ChefHat className="h-16 w-16" />}
                title="Noch keine Gerichte"
                description="Erstelle deine Menükarte mit Vorspeisen, Hauptgängen und Desserts."
                actionLabel="Gericht hinzufügen"
                onAction={() => setShowAddMenu(true)}
              />
            ) : (
              COURSES.map(course => {
                const items = menuItems.filter(i => i.course === course);
                if (items.length === 0) return null;
                return (
                  <div key={course}>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="h-px flex-1 bg-border" />
                      <span>{course}</span>
                      <span className="h-px flex-1 bg-border" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map(item => (
                        <Card key={item.id} className="group relative overflow-hidden">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {item.dietaryTags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {item.allergens.map(a => (
                                    <Badge key={a} variant="destructive" className="text-xs">
                                      {a}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                onClick={() => handleDeleteMenuItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          {/* Guests & Allergies Tab */}
          <TabsContent value="guests" className="mt-6 space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Gast suchen..."
                  value={searchGuest}
                  onChange={e => setSearchGuest(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterMeal} onValueChange={setFilterMeal}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Essenswahl" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Essen</SelectItem>
                  {MEAL_OPTIONS.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                  <SelectItem value="none">Noch offen</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAllergy} onValueChange={setFilterAllergy}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Allergie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Allergien</SelectItem>
                  {Object.keys(allergyCounts).map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredGuests.length === 0 ? (
              <EmptyState
                illustration={<Users className="h-16 w-16" />}
                title="Keine Gäste gefunden"
                description="Passe deine Filter an oder füge Gäste hinzu."
              />
            ) : (
              <Card>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gast</TableHead>
                        <TableHead>Essenswahl</TableHead>
                        <TableHead>Allergien</TableHead>
                        <TableHead>Notizen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.map(guest => (
                        <TableRow key={guest.guestId}>
                          <TableCell className="font-medium text-foreground whitespace-nowrap">
                            {guest.firstName} {guest.lastName}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={guest.selectedMeal || "none"}
                              onValueChange={v => handleUpdateGuestMeal(guest.guestId, "selectedMeal", v === "none" ? "" : v)}
                            >
                              <SelectTrigger className="w-36">
                                <SelectValue placeholder="Auswählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">— Offen —</SelectItem>
                                {MEAL_OPTIONS.map(m => (
                                  <SelectItem key={m} value={m}>
                                    <span className="flex items-center gap-2">
                                      {getMealIcon(m)} {m}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={guest.allergies}
                              onChange={e => handleUpdateGuestMeal(guest.guestId, "allergies", e.target.value)}
                              placeholder="z.B. Laktose, Nüsse"
                              className="w-40 text-sm"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={guest.dietaryNotes}
                              onChange={e => handleUpdateGuestMeal(guest.guestId, "dietaryNotes", e.target.value)}
                              placeholder="Sonderwünsche..."
                              className="w-40 text-sm"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Menu Item Dialog */}
      <Dialog open={showAddMenu} onOpenChange={setShowAddMenu}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Gericht hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Gang</Label>
              <Select value={newItem.course} onValueChange={v => setNewItem(p => ({ ...p, course: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COURSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Name</Label>
              <Input value={newItem.name || ""} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="z.B. Rinderfilet rosa gebraten" />
            </div>
            <div>
              <Label>Beschreibung</Label>
              <Textarea value={newItem.description || ""} onChange={e => setNewItem(p => ({ ...p, description: e.target.value }))} placeholder="Mit Beilagen und Sauce..." />
            </div>
            <div>
              <Label>Diät-Tags</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {DIETARY_TAGS.map(tag => (
                  <label key={tag} className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <Checkbox
                      checked={newItem.dietaryTags?.includes(tag)}
                      onCheckedChange={checked => {
                        setNewItem(p => ({
                          ...p,
                          dietaryTags: checked
                            ? [...(p.dietaryTags || []), tag]
                            : (p.dietaryTags || []).filter(t => t !== tag),
                        }));
                      }}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label>Allergene</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {COMMON_ALLERGENS.map(a => (
                  <label key={a} className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <Checkbox
                      checked={newItem.allergens?.includes(a)}
                      onCheckedChange={checked => {
                        setNewItem(p => ({
                          ...p,
                          allergens: checked
                            ? [...(p.allergens || []), a]
                            : (p.allergens || []).filter(x => x !== a),
                        }));
                      }}
                    />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMenu(false)}>Abbrechen</Button>
            <Button onClick={handleAddMenuItem} style={{ backgroundColor: accentColor }}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Menu Preview Dialog */}
      <Dialog open={showMenuPreview} onOpenChange={setShowMenuPreview}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center font-serif text-2xl">Unsere Menükarte</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 py-4">
            {COURSES.map(course => {
              const items = menuItems.filter(i => i.course === course);
              if (items.length === 0) return null;
              return (
                <div key={course} className="text-center">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">{course}</h3>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id}>
                        <p className="font-serif font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground italic">{item.description}</p>
                        {item.dietaryTags.length > 0 && (
                          <div className="flex justify-center gap-1 mt-1">
                            {item.dietaryTags.map(t => (
                              <span key={t} className="text-xs text-muted-foreground">({t})</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 mx-auto w-12 h-px bg-border" />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FoodAllergies;
