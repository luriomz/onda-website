import { motion } from "framer-motion";
import { viewportOnce } from "../../hooks/useScrollAnimation";

const ARTISTS = [
  { name: "Dj Ngwazi", genre: "Afro House", initials: "DN" },
  { name: "Lizha James", genre: "Marrabenta Pop", initials: "LJ" },
  { name: "Dj Tarico", genre: "Afro House", initials: "DT" },
  { name: "Marllen", genre: "R&B Soul", initials: "ML" },
  { name: "Dama do Bling", genre: "Marrabenta", initials: "DB" },
  { name: "Dj Breezy", genre: "Electronic", initials: "DB" },
];

export default function ArtistsMarquee() {
  return (
    <section className="border-t border-[hsl(var(--border-subtle))]" aria-label="Artistas em Destaque">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <motion.div
          className="py-6"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4 }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))]">
            Artistas em Destaque
          </p>
        </motion.div>

        <ul>
          {ARTISTS.map((artist, index) => (
            <motion.li
              key={artist.name}
              initial={{ x: -32, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#"
                className="group flex items-center justify-between border-t border-[hsl(var(--border-subtle))] py-5 transition-colors hover:bg-[hsl(var(--bg-surface))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] rounded-sm px-2 -mx-2"
                aria-label={`Ver ${artist.name}`}
              >
                <span
                  className="font-display font-bold text-white transition-colors group-hover:text-[hsl(var(--accent-glow))]"
                  style={{ fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 1 }}
                >
                  {artist.name}
                </span>

                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <span className="hidden sm:inline-block rounded-pill border border-[hsl(var(--border-active))] px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-[hsl(var(--text-muted))]">
                    {artist.genre}
                  </span>
                  <div
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[hsl(var(--bg-elevated))] font-display text-sm font-bold text-[hsl(var(--accent))]"
                    aria-hidden
                  >
                    {artist.initials}
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Bottom border */}
        <div className="border-b border-[hsl(var(--border-subtle))] pb-2" />
      </div>
    </section>
  );
}
