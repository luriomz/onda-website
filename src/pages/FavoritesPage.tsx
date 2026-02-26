import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { events } from "@/data/mockData";
import EventCard from "@/components/EventCard";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const favoriteEvents = events.filter((e) => favoriteIds.has(e.id));

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <header className="sticky top-0 z-40 glass border-b border-border px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-secondary">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-xl font-black text-foreground">Eventos Favoritos</h1>
      </header>

      <main className="px-4 pt-6 pb-24">
        {favoriteEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">Sem favoritos</h2>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Toca no coração de um evento para o guardar aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="compact" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
