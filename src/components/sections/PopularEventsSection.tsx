import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
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

      {/* Card grid — 2 cols desktop, 1 col mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
        className="group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
        aria-label={`Ver ${event.name}`}
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Full-bleed image ── */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-500 will-change-transform"
            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.05)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform =
                "scale(1)")
            }
            loading="lazy"
          />
        </div>

        {/* ── Pink border glow on hover ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              "inset 0 0 0 1px hsl(338 80% 55% / 0.45), 0 0 48px hsl(338 80% 55% / 0.1)",
          }}
        />

        {/* ── Glassmorphism genre tags — top-left ── */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill font-sans text-[10px] font-semibold uppercase tracking-wider text-white"
              style={{
                padding: "4px 10px",
                background: "rgba(10, 8, 20, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── "Ver detalhes" badge — top-right, appears on hover ── */}
        <div
          aria-hidden
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{
            background: "hsl(338 80% 55%)",
            boxShadow: "0 4px 16px hsl(338 80% 55% / 0.45)",
          }}
        >
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>

        {/* ── Cinematic gradient overlay + info ── */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{
            background:
              "linear-gradient(to top, hsl(250 12% 3% / 0.98) 0%, hsl(250 12% 5% / 0.72) 38%, transparent 62%)",
          }}
        >
          <div className="space-y-1.5">
            <h3
              className="font-display font-semibold text-white line-clamp-2 leading-tight"
              style={{ fontSize: "clamp(16px, 2.2vw, 19px)" }}
            >
              {event.name}
            </h3>

            <p className="font-sans text-[12px] text-[hsl(var(--text-muted))]">
              {event.venue}
            </p>

            {/* Date / time / price row */}
            <div className="flex items-center gap-2 pt-1 font-sans text-[12px]">
              <span className="font-semibold text-[hsl(var(--accent))]">
                {event.date}
              </span>
              <span
                aria-hidden
                className="h-[3px] w-[3px] rounded-full bg-[hsl(250_8%_35%)]"
              />
              <span className="text-[hsl(var(--text-muted))]">{event.time}</span>
              <span
                aria-hidden
                className="h-[3px] w-[3px] rounded-full bg-[hsl(250_8%_35%)]"
              />
              <span className="ml-auto font-semibold text-white">
                {event.price}
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
