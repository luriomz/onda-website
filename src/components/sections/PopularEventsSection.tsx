import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { viewportOnce } from "../../hooks/useScrollAnimation";

const CITIES = [
  { name: "Maputo", flag: "🇲🇿" },
  { name: "Beira", flag: "🇲🇿" },
  { name: "Nampula", flag: "🇲🇿" },
];

const EVENTS = [
  {
    id: "1",
    name: "Sunset Beach Rave",
    venue: "Praia da Costa do Sol, Maputo",
    date: "SÁB 22 MAR",
    time: "20:00",
    price: "500 MZN",
    tags: ["Vida Noturna", "Electrónica"],
    image: "/event-1.jpg",
  },
  {
    id: "2",
    name: "Afro House Sessions",
    venue: "Club Miramar, Maputo",
    date: "SEX 28 MAR",
    time: "22:00",
    price: "300 MZN",
    tags: ["Música", "Afro House"],
    image: "/event-2.jpg",
  },
  {
    id: "3",
    name: "Maputo Jazz Festival",
    venue: "Jardim dos Professores",
    date: "DOM 30 MAR",
    time: "17:00",
    price: "800 MZN",
    tags: ["Festival", "Jazz"],
    image: "/event-3.jpg",
  },
  {
    id: "4",
    name: "Polana Beach Vibes",
    venue: "Polana Beach Club",
    date: "SÁB 5 ABR",
    time: "16:00",
    price: "400 MZN",
    tags: ["Festa de Praia", "Música ao Vivo"],
    image: "/event-4.jpg",
  },
];

export default function PopularEventsSection() {
  const [city, setCity] = useState(CITIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-20 md:px-8">
      {/* Section heading */}
      <motion.div
        className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="font-display font-bold uppercase text-white"
          style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
        >
          Eventos Populares Em{" "}
          <span className="relative inline-block">
            <button
              className="inline-flex items-center gap-1.5 text-[hsl(var(--accent))] focus:outline-none focus-visible:underline"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              {city.flag} {city.name}
              <ChevronDown className="h-5 w-5" />
            </button>
            {dropdownOpen && (
              <ul
                role="listbox"
                className="absolute left-0 top-full z-20 mt-2 min-w-[160px] rounded-[12px] border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))] py-1 shadow-elevated"
              >
                {CITIES.map((c) => (
                  <li key={c.name}>
                    <button
                      role="option"
                      aria-selected={c.name === city.name}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[hsl(var(--text-muted))] transition-colors hover:bg-[hsl(var(--bg-elevated))] hover:text-white focus:outline-none"
                      onClick={() => {
                        setCity(c);
                        setDropdownOpen(false);
                      }}
                    >
                      {c.flag} {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </span>
        </h2>

        <a
          href="#"
          className="flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--accent))] hover:underline focus:outline-none focus-visible:underline"
        >
          MAIS EVENTOS <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {EVENTS.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof EVENTS)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href="#"
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] rounded-card"
        aria-label={`Ver ${event.name}`}
      >
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden rounded-card">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5 px-1">
          <h3 className="font-display text-[18px] font-semibold text-white line-clamp-2 leading-tight">
            {event.name}
          </h3>
          <p className="font-sans text-[13px] text-[hsl(var(--text-muted))]">{event.venue}</p>

          {/* Date row */}
          <div className="flex items-center gap-2 font-sans text-[13px]">
            <span className="font-semibold text-[hsl(var(--accent))]">{event.date}</span>
            <span className="text-[hsl(var(--border-active))]">|</span>
            <span className="text-[hsl(var(--text-muted))]">{event.time}</span>
            <span className="text-[hsl(var(--border-active))]">|</span>
            <span className="font-semibold text-white">{event.price}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill border border-[hsl(var(--border-active))] px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wide text-[hsl(var(--text-muted))]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.article>
  );
}
