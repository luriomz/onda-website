import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import EventDetail from "./pages/EventDetail";
import SearchPage from "./pages/SearchPage";
import TicketsPage from "./pages/TicketsPage";
import ProfilePage from "./pages/ProfilePage";
import OrganizerPage from "./pages/OrganizerPage";
import ArtistPage from "./pages/ArtistPage";
import FavoritesPage from "./pages/FavoritesPage";
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
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/organizer/:id" element={<OrganizerPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
