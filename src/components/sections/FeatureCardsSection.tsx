import { motion } from "framer-motion";
import { viewportOnce } from "../../hooks/useScrollAnimation";

const CARDS = [
  {
    label: "Descobre",
    heading: "Descobre Eventos Perto de Ti",
    body: "Explora eventos seleccionados em Maputo, Beira e Nampula. Filtra por género, data ou humor. A tua próxima noite favorita está a um toque de distância.",
    image: "/hero-1.jpg",
    alt: "Feed de descoberta de eventos Onda",
  },
  {
    label: "Os Teus Bilhetes",
    heading: "Os Teus Bilhetes, Sempre Prontos",
    body: "Os bilhetes vivem no teu bolso. Toca para mostrar o teu QR code na entrada. Sem impressão, sem espera — aparece e entra.",
    image: "/hero-4.jpg",
    alt: "Ecrã de QR code do bilhete Onda",
  },
];

export default function FeatureCardsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden"
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background:
                "linear-gradient(160deg, hsl(250 10% 9%) 0%, hsl(250 10% 6%) 100%)",
            }}
          >
            {/* ── Accent shimmer stripe at top edge ── */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(338 80% 55% / 0.7) 50%, transparent 100%)",
              }}
            />

            {/* ── Ambient glow — top-center of card ── */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at 50% -20%, hsl(338 80% 45% / 0.3), transparent 65%)",
              }}
            />

            {/* ── Pink border glow on hover ── */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow:
                  "inset 0 0 0 1px hsl(338 80% 55% / 0.35), 0 0 48px hsl(338 80% 55% / 0.08)",
              }}
            />

            {/* ── Text content ── */}
            <div className="relative z-10 px-8 pb-0 pt-9 text-center">
              {/* Label pill */}
              <span
                className="inline-flex items-center rounded-pill font-sans text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  padding: "4px 12px",
                  color: "hsl(338 80% 65%)",
                  background: "hsl(338 80% 55% / 0.12)",
                  border: "1px solid hsl(338 80% 55% / 0.25)",
                }}
              >
                {card.label}
              </span>

              <h3
                className="font-display mt-4 font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 34px)",
                  lineHeight: 1.08,
                }}
              >
                {card.heading}
              </h3>

              <p className="mx-auto mt-4 max-w-[340px] font-sans text-[14px] leading-relaxed text-[hsl(var(--text-muted))]">
                {card.body}
              </p>
            </div>

            {/* ── Phone mockup — overflows at card bottom ── */}
            <div className="relative z-10 mt-8 flex justify-center overflow-hidden">
              {/* Glow halo behind the phone */}
              <div
                aria-hidden
                className="absolute bottom-0 h-32 w-48 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, hsl(338 80% 55% / 0.35), transparent 70%)",
                  filter: "blur(12px)",
                }}
              />

              <div
                className="relative transition-transform duration-500 group-hover:-translate-y-1"
                style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div
                  style={{
                    width: 220,
                    height: 380,
                    borderRadius: "28px 28px 0 0",
                    overflow: "hidden",
                    border: "5px solid rgba(255,255,255,0.10)",
                    borderBottom: "none",
                    boxShadow:
                      "0 -20px 60px hsl(0 0% 0% / 0.45), 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
