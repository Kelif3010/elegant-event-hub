import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { tasks as initialTasks } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, CheckCircle2, Circle, Clock, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TaskStatus = "all" | "open" | "in-progress" | "done";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Circle }> = {
  open: { label: "Offen", color: "text-accent bg-accent/10", icon: Circle },
  "in-progress": { label: "In Arbeit", color: "text-blue-600 bg-blue-50", icon: Clock },
  done: { label: "Erledigt", color: "text-sage bg-sage-light", icon: CheckCircle2 },
};

const priorityColors: Record<string, string> = {
  high: "text-rose bg-rose-light",
  medium: "text-accent bg-accent/10",
  low: "text-muted-foreground bg-secondary",
};

const Tasks = () => {
  const [taskList, setTaskList] = useState(initialTasks);
  const [filter, setFilter] = useState<TaskStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", due: "", category: "Planung", priority: "medium", assignee: "", status: "open" });

  const categories = [...new Set(taskList.map(t => t.category))];
  const filtered = taskList.filter(t => {
    if (filter !== "all" && t.status !== filter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  });

  const doneCount = taskList.filter(t => t.status === "done").length;
  const completionPct = Math.round((doneCount / taskList.length) * 100);

  const toggleTask = (id: string) => {
    setTaskList(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.status === "done") return { ...t, status: "open" };
      if (t.status === "open") return { ...t, status: "in-progress" };
      return { ...t, status: "done" };
    }));
  };

  const addTask = () => {
    if (!newTask.title) { toast.error("Titel ist Pflichtfeld"); return; }
    setTaskList(prev => [...prev, { ...newTask, id: `t${Date.now()}` }]);
    setShowAddDialog(false);
    setNewTask({ title: "", due: "", category: "Planung", priority: "medium", assignee: "", status: "open" });
    toast.success("Aufgabe hinzugefügt");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Alles im Blick behalten</p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Aufgaben</h1>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Aufgabe hinzufügen</Button>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-elegant space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-semibold">Fortschritt</h2>
            <span className="text-2xl font-serif font-bold text-gradient-gold">{completionPct}%</span>
          </div>
          <Progress value={completionPct} className="h-3 bg-secondary [&>div]:bg-accent" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: "Offen", value: taskList.filter(t => t.status === "open").length, color: "text-accent" },
              { label: "In Arbeit", value: taskList.filter(t => t.status === "in-progress").length, color: "text-blue-600" },
              { label: "Erledigt", value: doneCount, color: "text-sage" },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-secondary/50">
                <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "open", "in-progress", "done"] as const).map(s => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setFilter(s)}>
              {s === "all" ? "Alle" : statusConfig[s]?.label}
            </Button>
          ))}
          <div className="w-px bg-border mx-1" />
          <Button variant={categoryFilter === "all" ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setCategoryFilter("all")}>Alle Kategorien</Button>
          {categories.map(c => (
            <Button key={c} variant={categoryFilter === c ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setCategoryFilter(c)}>{c}</Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(task => {
            const sc = statusConfig[task.status] || statusConfig.open;
            return (
              <div key={task.id} className={cn("p-4 rounded-2xl bg-card border border-border/50 shadow-elegant flex items-center gap-4 transition-all hover:shadow-elevated group", task.status === "done" && "opacity-60")}>
                <button onClick={() => toggleTask(task.id)} className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  task.status === "done" ? "bg-sage border-sage text-background" : task.status === "in-progress" ? "border-blue-400 text-blue-600" : "border-accent/40 hover:border-accent"
                )}>
                  {task.status === "done" && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {task.status === "in-progress" && <Clock className="h-3 w-3" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium text-sm", task.status === "done" && "line-through")}>{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">Fällig: {new Date(task.due).toLocaleDateString("de-DE")}</span>
                    <span className="text-xs text-muted-foreground">• {task.assignee}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-[10px] border-0", priorityColors[task.priority])}>{task.priority === "high" ? "Hoch" : task.priority === "medium" ? "Mittel" : "Niedrig"}</Badge>
                  <Badge variant="outline" className="text-[10px]">{task.category}</Badge>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <ListTodo className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-serif text-lg">Keine Aufgaben gefunden</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-serif">Neue Aufgabe</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Titel *</Label><Input value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))} placeholder="z.B. Blumen bestellen" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Fällig am</Label><Input type="date" value={newTask.due} onChange={e => setNewTask(p => ({ ...p, due: e.target.value }))} /></div>
              <div><Label>Zuständig</Label><Input value={newTask.assignee} onChange={e => setNewTask(p => ({ ...p, assignee: e.target.value }))} placeholder="z.B. Sophie" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Kategorie</Label><Input value={newTask.category} onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))} /></div>
              <div><Label>Priorität</Label>
                <Select value={newTask.priority} onValueChange={v => setNewTask(p => ({ ...p, priority: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="high">Hoch</SelectItem><SelectItem value="medium">Mittel</SelectItem><SelectItem value="low">Niedrig</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Abbrechen</Button>
            <Button onClick={addTask}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Tasks;
