import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "@/data/mockData";
import { formatMZN, formatDate } from "@/data/mockData";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured" | "compact";
}

const EventCard = ({ event, variant = "default" }: EventCardProps) => {
  if (variant === "featured") {
    return (
      <Link to={`/event/${event.id}`}>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative rounded-2xl overflow-hidden shadow-card group"
        >
          <div className="aspect-[16/10] relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            
            {/* Date badge */}
            <div className="absolute top-3 left-3 bg-primary rounded-lg px-2.5 py-1.5 text-center">
              <span className="text-primary-foreground text-xs font-bold block leading-none">
                {new Date(event.date).getDate()}
              </span>
              <span className="text-primary-foreground/80 text-[9px] font-medium uppercase">
                {new Date(event.date).toLocaleDateString("pt-MZ", { month: "short" })}
              </span>
            </div>

            {event.isSoldOut && (
              <div className="absolute top-3 right-3 bg-destructive rounded-full px-3 py-1">
                <span className="text-destructive-foreground text-xs font-bold">ESGOTADO</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-foreground font-bold text-lg leading-tight mb-1">{event.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{event.venue} · {event.city}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-subtle">{event.interestedCount} interessados</span>
              </div>
              <span className="text-primary font-bold text-sm">
                {formatMZN(event.price)}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/event/${event.id}`}>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="flex gap-3 p-3 rounded-xl bg-card hover:bg-card-hover transition-colors"
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-semibold mb-0.5">
              {formatDate(event.date)} · {event.time}
            </p>
            <h4 className="text-foreground font-bold text-sm truncate">{event.title}</h4>
            <p className="text-muted-foreground text-xs truncate">
              {event.venue} · {event.city}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{event.interestedCount}</span>
              </div>
              <span className="text-primary font-bold text-xs">{formatMZN(event.price)}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default card
  return (
    <Link to={`/event/${event.id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="rounded-xl overflow-hidden bg-card shadow-card group"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 bg-primary rounded-lg px-2 py-1 text-center">
            <span className="text-primary-foreground text-[10px] font-bold block leading-none">
              {new Date(event.date).getDate()}
            </span>
            <span className="text-primary-foreground/80 text-[8px] font-medium uppercase">
              {new Date(event.date).toLocaleDateString("pt-MZ", { month: "short" })}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h4 className="text-foreground font-bold text-sm leading-tight mb-0.5 truncate">{event.title}</h4>
          <p className="text-muted-foreground text-xs truncate mb-2">
            {event.venue} · {event.city}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{event.interestedCount}</span>
            </div>
            <span className="text-primary font-bold text-xs">{formatMZN(event.price)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCard;
