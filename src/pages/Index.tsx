import { useState, useMemo } from "react";
import { Search, MapPin, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";
import { events, cities } from "@/data/mockData";
import NotificationsSheet from "@/components/NotificationsSheet";
import { useNotificationStore } from "@/stores/notificationStore";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("Maputo");
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  const featuredEvents = events.filter((e) => e.isFeatured);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const catMatch = selectedCategory === "all" || e.category === selectedCategory;
      const cityMatch = e.city === selectedCity;
      return catMatch && cityMatch;
    });
  }, [selectedCategory, selectedCity]);

  const allFiltered = useMemo(() => {
    if (selectedCategory === "all") return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight text-gradient">MUVUE</h1>
            <button className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3" />
              <span>{selectedCity}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <NotificationsSheet>
              <button className="relative p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
                <Bell className="h-5 w-5 text-foreground" />
                {unreadCount() > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            </NotificationsSheet>
          </div>
        </div>

        {/* City selector */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {cities.slice(0, 5).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCity === city
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4 pb-4 space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar eventos, artistas, venues..."
            className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Categories */}
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Featured events carousel */}
        {selectedCategory === "all" && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Em Destaque 🔥</h2>
              <button className="text-xs text-primary font-semibold">Ver tudo</button>
            </div>
            <div className="flex gap-4 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              {featuredEvents.map((event) => (
                <div key={event.id} className="min-w-[85vw] max-w-[340px] snap-start">
                  <EventCard event={event} variant="featured" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Events grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">
              {selectedCategory === "all" ? "Próximos Eventos" : `Eventos`}
            </h2>
            <span className="text-xs text-muted-foreground">{allFiltered.length} eventos</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {allFiltered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Index;
