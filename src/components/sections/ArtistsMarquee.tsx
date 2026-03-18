import { motion } from "framer-motion";
import { viewportOnce } from "../../hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

const ARTISTS = [
  {
    name: "Mr. Bow",
    genre: "Afropop",
    image: "/content/mr_bow.webp",
  },
  {
    name: "Lizha James",
    genre: "Marrabenta Pop",
    image: "/content/lizha_james.webp",
  },
  {
    name: "Major League DJz",
    genre: "Amapiano",
    image: "/content/major_league_djz.webp",
  },
  {
    name: "Kelvin Momo",
    genre: "Amapiano",
    image: "/content/kelvin_momo.webp",
  },
  {
    name: "Chunda Munki",
    genre: "Electronic",
    image: "/content/chunda_munki.webp",
  },
  {
    name: "Broken Bass",
    genre: "Electronic",
    image: "/content/broken_bass.webp",
  },
];

export default function ArtistsMarquee() {
  return (
    <section
      className="border-t border-[hsl(var(--border-subtle))]"
      aria-label="Artistas em Destaque"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* ── Section header ── */}
        <motion.div
          className="flex items-center justify-between py-7"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))]">
            Artistas em Destaque
          </p>
          <a
            href="#"
            className="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:underline"
          >
            Ver Todos <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>

        {/* ── Artist rows ── */}
        <ul>
          {ARTISTS.map((artist, index) => (
            <motion.li
              key={artist.name}
              initial={{ x: -32, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href="#"
                className="group relative flex items-center gap-4 border-t border-[hsl(var(--border-subtle))] py-5 transition-colors duration-200 hover:bg-[hsl(var(--bg-surface))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] -mx-5 px-5 md:-mx-8 md:px-8"
                aria-label={`Ver ${artist.name}`}
              >
                {/* ── Row index ── */}
                <span
                  className="hidden w-8 shrink-0 font-mono text-[11px] font-medium text-[hsl(var(--text-muted))] opacity-40 sm:block"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ── Artist name + animated underline ── */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span
                    className="font-display font-bold uppercase text-white transition-colors duration-200 group-hover:text-[hsl(var(--accent))] truncate"
                    style={{
                      fontSize: "clamp(36px, 5.5vw, 76px)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {artist.name}
                  </span>
                  {/* Sliding underline — scaleX 0→1 from left on hover */}
                  <span
                    className="mt-1.5 block h-[2px] origin-left scale-x-0 rounded-full bg-[hsl(var(--accent))] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>

                {/* ── Right side: genre pill + photo + arrow ── */}
                <div className="flex shrink-0 items-center gap-3 ml-4">
                  {/* Genre pill */}
                  <span
                    className="hidden sm:inline-flex items-center rounded-pill border border-[hsl(var(--border-active))] px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-[hsl(var(--text-muted))] transition-all duration-200 group-hover:border-[hsl(338_80%_55%_/_0.35)] group-hover:text-[hsl(var(--accent-glow))]"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {artist.genre}
                  </span>

                  {/* Circular photo */}
                  <div
                    className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105"
                    style={{
                      border: "2px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    {/* Pink ring glow on hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        boxShadow: "inset 0 0 0 2px hsl(338 80% 55% / 0.6)",
                      }}
                    />
                  </div>

                  {/* Arrow — fades in on hover */}
                  <ArrowUpRight
                    className="h-5 w-5 text-[hsl(var(--accent))] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* ── Bottom border ── */}
        <div className="border-b border-[hsl(var(--border-subtle))]" />
      </div>
    </section>
  );
}
