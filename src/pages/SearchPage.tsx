import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";
import { events, cities } from "@/data/mockData";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = events.filter((e) => {
    const matchQuery = !query || 
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.venue.toLowerCase().includes(query.toLowerCase()) ||
      e.organizer.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCategory === "all" || e.category === selectedCategory;
    const matchCity = !selectedCity || e.city === selectedCity;
    return matchQuery && matchCat && matchCity;
  });

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <header className="sticky top-0 z-40 glass border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar eventos..."
              className="w-full bg-secondary rounded-xl pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl transition-colors ${showFilters ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Cidade</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCity(null)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      !selectedCity ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    Todas
                  </button>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                        selectedCity === city ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="px-4 pt-4 pb-4">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        
        <p className="text-xs text-muted-foreground mb-3 mt-3">{filtered.length} resultados</p>

        <div className="space-y-2">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-muted-foreground text-sm">Nenhum evento encontrado</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
