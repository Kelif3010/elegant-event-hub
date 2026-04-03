import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import RSVP from "./pages/RSVP";
import EventPage from "./pages/EventPage";
import Hotels from "./pages/Hotels";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import TablePlan from "./pages/TablePlan";
import Tasks from "./pages/Tasks";
import Timeline from "./pages/Timeline";
import Vendors from "./pages/Vendors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/table-plan" element={<TablePlan />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
