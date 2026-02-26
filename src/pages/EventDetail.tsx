import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, Clock, Users, Calendar, Music, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { events, formatMZN, formatDateFull } from "@/data/mockData";
import { useState } from "react";
import TicketPurchaseFlow from "@/components/TicketPurchaseFlow";
import { useFavoritesStore } from "@/stores/favoritesStore";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const liked = id ? favoriteIds.has(id) : false;
  const [showPurchase, setShowPurchase] = useState(false);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Evento não encontrado</p>
      </div>
    );
  }

  const shareToWhatsApp = () => {
    const text = `🎉 Vou ao ${event.title}!\n📍 ${event.venue}, ${event.city}\n📅 ${formatDateFull(event.date)}\n💰 ${formatMZN(event.price)}\n\nCompra o teu bilhete no MUVUE!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative">
        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full glass"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              data-testid="favorite-btn"
              onClick={() => id && toggleFavorite(id)}
              className="p-2 rounded-full glass"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${liked ? "text-primary fill-primary" : "text-foreground"}`}
              />
            </button>
            <button onClick={shareToWhatsApp} className="p-2 rounded-full glass">
              <Share2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-12 relative z-10 pb-32">
        {/* Category badge */}
        <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>

        <h1 className="text-2xl font-black text-foreground mb-2">{event.title}</h1>

        {/* Organizer */}
        <Link to={`/organizer/${event.organizer.id}`} className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">
              {event.organizer.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{event.organizer.name}</p>
            <p className="text-xs text-muted-foreground">
              {event.organizer.followerCount.toLocaleString()} seguidores
            </p>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="ml-auto text-xs font-bold text-primary border border-primary rounded-full px-4 py-1.5 hover:bg-primary/10 transition-colors"
          >
            Seguir
          </button>
        </Link>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-3 flex items-start gap-2.5">
            <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Data</p>
              <p className="text-sm font-semibold text-foreground">{formatDateFull(event.date)}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-3 flex items-start gap-2.5">
            <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Hora</p>
              <p className="text-sm font-semibold text-foreground">{event.time}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-3 flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Local</p>
              <p className="text-sm font-semibold text-foreground">{event.venue}</p>
              <p className="text-xs text-muted-foreground">{event.city}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-3 flex items-start gap-2.5">
            <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Interessados</p>
              <p className="text-sm font-semibold text-foreground">{(event.interestedCount + (liked ? 1 : 0)).toLocaleString()}</p>
            </div>
          </div>
        </div>




        {/* Lineup */}
        {event.lineup && event.lineup.length > 0 && (
          <section className="mb-6">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <Music className="h-4 w-4 text-primary" />
              Lineup
            </h3>
            <div className="space-y-2">
              {event.lineup.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="flex items-center gap-3 bg-card rounded-xl p-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">{artist.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground flex-1">{artist.name}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        <section className="mb-6">
          <h3 className="text-base font-bold text-foreground mb-2">Sobre</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        </section>

        {/* Share WhatsApp */}
        <button
          onClick={shareToWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-semibold text-sm mb-4"
        >
          <Share2 className="h-4 w-4" />
          Partilhar no WhatsApp
        </button>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4 z-50" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">A partir de</p>
            <p className="text-xl font-black text-foreground">{formatMZN(event.price)}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPurchase(true)}
            className="bg-gradient-primary text-primary-foreground font-bold py-3 px-8 rounded-xl text-sm shadow-elevated"
          >
            Comprar Bilhete
          </motion.button>
        </div>
      </div>

      {/* Purchase Flow */}
      <AnimatePresence>
        {showPurchase && (
          <TicketPurchaseFlow event={event} onClose={() => setShowPurchase(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetail;
