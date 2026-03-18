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
            className="flex flex-col overflow-hidden rounded-feature border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))]"
          >
            {/* Text content */}
            <div className="px-8 pb-0 pt-8 text-center">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--accent))]">
                {card.label}
              </span>
              <h3
                className="font-display mt-3 font-bold uppercase text-white"
                style={{ fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.1 }}
              >
                {card.heading}
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-[hsl(var(--text-muted))]">
                {card.body}
              </p>
            </div>

            {/* Phone mockup — overflows at bottom */}
            <div className="mt-8 flex justify-center overflow-hidden">
              <div
                style={{
                  width: 220,
                  height: 380,
                  borderRadius: "28px 28px 0 0",
                  overflow: "hidden",
                  border: "5px solid hsl(var(--border-active))",
                  borderBottom: "none",
                  boxShadow: "0 -16px 60px hsl(0 0% 0% / 0.4)",
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
