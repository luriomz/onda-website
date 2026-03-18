import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Apple, Play, Star } from "lucide-react";

const floatVariants = (delay: number) => ({
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  },
});

export default function HeroSection() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const entrance = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { y: 60, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[580px] flex-col items-center justify-center overflow-hidden pb-20 pt-28 text-center"
      style={{
        background:
          "hsl(var(--bg-base))",
      }}
    >
      {/* Pink ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, hsl(338 80% 30% / 0.35), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-5 md:px-8">
        {/* Label pill */}
        <motion.div {...entrance(0.05)}>
          <span className="inline-flex items-center rounded-pill border border-[hsl(var(--border-active))] px-4 py-1.5 font-sans text-[11px] font-semibold tracking-editorial text-[hsl(var(--text-muted))] uppercase">
            Mozambique&apos;s #1 Event App
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...entrance(0.1)}
          className="font-display max-w-4xl font-bold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        >
          Grab Your Ticket,
          <br />
          Make Memories.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...entrance(0.18)}
          className="max-w-md font-sans text-[17px] leading-relaxed text-[hsl(var(--text-muted))]"
        >
          Find the best events in Maputo. Buy tickets with M-Pesa. Download Onda.
        </motion.p>

        {/* App store buttons */}
        <motion.div {...entrance(0.24)} className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="flex min-h-[48px] items-center gap-2.5 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-surface))] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--bg-elevated))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
            aria-label="Download on the App Store"
          >
            <Apple className="h-5 w-5" />
            App Store
          </button>
          <button
            className="flex min-h-[48px] items-center gap-2.5 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-surface))] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--bg-elevated))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
            aria-label="Get it on Google Play"
          >
            <Play className="h-4 w-4 fill-white" />
            Google Play
          </button>
        </motion.div>

        {/* Rating row */}
        <motion.div {...entrance(0.3)} className="flex items-center gap-2">
          <span className="font-display text-sm font-bold text-white">4.9</span>
          <div className="flex" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
            ))}
          </div>
          <span className="font-sans text-[13px] text-[hsl(var(--text-muted))]">50K+ ratings</span>
        </motion.div>
      </div>

      {/* Phone mockups */}
      <motion.div
        style={{ y: parallaxY }}
        className="relative z-10 mt-12 flex items-end justify-center"
      >
        {/* Left phone */}
        <motion.div
          {...(reduced ? {} : { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] } })}
          className="relative hidden md:block"
          style={{ marginRight: "-24px", zIndex: 1 }}
        >
          <motion.div {...(reduced ? {} : floatVariants(1))}>
            <PhoneMockup
              src="/hero-2.jpg"
              alt="Onda event discovery"
              height={400}
              style={{ transform: "rotate(-12deg)", transformOrigin: "bottom center" }}
            />
          </motion.div>
        </motion.div>

        {/* Center phone */}
        <motion.div
          {...(reduced ? {} : { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] } })}
          className="relative z-10"
        >
          <motion.div {...(reduced ? {} : floatVariants(0))}>
            <PhoneMockup
              src="/hero-1.jpg"
              alt="Onda featured events"
              height={520}
            />
          </motion.div>
        </motion.div>

        {/* Right phone */}
        <motion.div
          {...(reduced ? {} : { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] } })}
          className="relative hidden md:block"
          style={{ marginLeft: "-24px", zIndex: 1 }}
        >
          <motion.div {...(reduced ? {} : floatVariants(2))}>
            <PhoneMockup
              src="/hero-3.jpg"
              alt="Onda ticket screen"
              height={400}
              style={{ transform: "rotate(12deg)", transformOrigin: "bottom center" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PhoneMockup({
  src,
  alt,
  height,
  style,
}: {
  src: string;
  alt: string;
  height: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        height,
        width: height * 0.46,
        borderRadius: "32px",
        overflow: "hidden",
        border: "6px solid hsl(var(--border-active))",
        boxShadow: "0 32px 80px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(var(--border-subtle))",
        background: "hsl(var(--bg-surface))",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        loading="eager"
      />
    </div>
  );
}
