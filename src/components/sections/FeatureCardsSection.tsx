import { motion } from "framer-motion";
import { viewportOnce } from "../../hooks/useScrollAnimation";

const CARDS = [
  {
    label: "Discover",
    heading: "Discover Events Near You",
    body: "Browse curated events across Maputo, Beira & Nampula. Filter by genre, date, or mood. Your next favourite night out is one tap away.",
    image: "/hero-1.jpg",
    alt: "Onda event discovery feed",
  },
  {
    label: "Your Tickets",
    heading: "Your Tickets, Always Ready",
    body: "Tickets live in your pocket. Tap to show your QR code at the door. No printing, no waiting — just show up and get in.",
    image: "/hero-4.jpg",
    alt: "Onda ticket QR code screen",
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
