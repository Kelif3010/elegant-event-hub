import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CommandPalette from "@/components/CommandPalette";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import RSVP from "./pages/RSVP";
import GuestLogin from "./pages/GuestLogin";
import GuestPortal from "./pages/GuestPortal";
import GuestPortalManager from "./pages/GuestPortalManager";
import EventPage from "./pages/EventPage";
import Hotels from "./pages/Hotels";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import TablePlan from "./pages/TablePlan";
import Tasks from "./pages/Tasks";
import Timeline from "./pages/Timeline";
import Vendors from "./pages/Vendors";
import Invitations from "./pages/Invitations";
import PhotoGallery from "./pages/PhotoGallery";
import MusicPlaylist from "./pages/MusicPlaylist";
import Wishlist from "./pages/Wishlist";
import Guestbook from "./pages/Guestbook";
import Onboarding from "./pages/Onboarding";
import ThemeStudio from "./pages/ThemeStudio";
import CheckIn from "./pages/CheckIn";
import AddressCollector from "./pages/AddressCollector";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandPalette />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/guest-login" element={<GuestLogin />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/guest-portal" element={<GuestPortal />} />
            <Route path="/guest-portal-manager" element={<GuestPortalManager />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/table-plan" element={<TablePlan />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/photos" element={<PhotoGallery />} />
            <Route path="/music" element={<MusicPlaylist />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/theme-studio" element={<ThemeStudio />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/address-collector" element={<AddressCollector />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
