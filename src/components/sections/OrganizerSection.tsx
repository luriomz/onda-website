import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { viewportOnce } from "../../hooks/useScrollAnimation";

export default function OrganizerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[hsl(var(--border-subtle))] py-24 text-center"
    >
      {/* Top ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(338 80% 20% / 0.2), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4 }}
          className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--accent))]"
        >
          For Organizers
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mx-auto mt-4 max-w-3xl font-bold uppercase text-white"
          style={{ fontSize: "clamp(30px, 5vw, 60px)", lineHeight: 1.0 }}
        >
          Launching an Event?
          <br />
          Your Event Deserves
          <br />
          the Best Crowd.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-[560px] font-sans text-[16px] leading-relaxed text-[hsl(var(--text-muted))]"
        >
          Real-time crowd analytics, M-Pesa ticket sales, and zero-friction check-in.
          All in one dashboard.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <button className="min-h-[48px] rounded-[6px] border-2 border-white px-8 py-3 font-sans text-sm font-semibold text-white transition-all duration-150 hover:bg-white hover:text-[hsl(var(--bg-base))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
            LIST MY EVENT
          </button>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          style={{ y: reduced ? 0 : dashboardY }}
          className="relative mt-16"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Dashboard visual — styled representation of command center */}
            <DashboardMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div
      className="mx-auto max-w-[900px] overflow-hidden rounded-[16px] border border-[hsl(var(--border-active))] shadow-elevated"
      style={{ background: "hsl(250 12% 5%)" }}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 border-b border-[hsl(var(--border-subtle))] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[hsl(0 72% 51%)]" />
          <div className="h-3 w-3 rounded-full bg-[hsl(38 92% 50%)]" />
          <div className="h-3 w-3 rounded-full bg-[hsl(142 71% 45%)]" />
        </div>
        <div className="mx-auto flex-1 max-w-[280px]">
          <div className="rounded-[6px] bg-[hsl(var(--bg-elevated))] px-3 py-1 text-center font-sans text-[11px] text-[hsl(var(--text-muted))]">
            command.onda.mz
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-3 gap-0">
        {/* Sidebar */}
        <div className="border-r border-[hsl(var(--border-subtle))] p-4 space-y-3">
          <div className="font-display text-xs font-bold text-[hsl(var(--accent))] uppercase tracking-wider">
            ONDA CMD
          </div>
          {["Overview", "Events", "Analytics", "Finance", "Settings"].map((item) => (
            <div
              key={item}
              className={`rounded-[6px] px-3 py-2 font-sans text-[12px] ${
                item === "Overview"
                  ? "bg-[hsl(var(--bg-elevated))] text-white font-semibold"
                  : "text-[hsl(var(--text-muted))]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-span-2 p-5 space-y-4">
          {/* Stat cards row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tickets Sold", value: "1,247" },
              { label: "Revenue", value: "623,500 MZN" },
              { label: "Checked In", value: "89%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[8px] border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))] p-3"
              >
                <div className="font-sans text-[10px] text-[hsl(var(--text-muted))]">
                  {stat.label}
                </div>
                <div className="font-display text-[14px] font-bold text-white mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="rounded-[8px] border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))] p-4">
            <div className="font-sans text-[11px] text-[hsl(var(--text-muted))] mb-3">
              Ticket Sales Velocity
            </div>
            <div className="flex items-end gap-1.5 h-[80px]">
              {[30, 55, 45, 70, 60, 85, 90, 75, 95, 100, 88, 92].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[3px]"
                  style={{
                    height: `${h}%`,
                    background:
                      i >= 9
                        ? "hsl(var(--accent))"
                        : "hsl(var(--border-active))",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Live feed */}
          <div className="rounded-[8px] border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-[hsl(142 71% 45%)] animate-pulse" />
              <span className="font-sans text-[11px] text-[hsl(var(--text-muted))]">Live Check-ins</span>
            </div>
            {["VIP — 2 checked in", "General — 15 checked in", "Early Bird — sold out"].map((entry) => (
              <div key={entry} className="font-sans text-[11px] text-[hsl(var(--text-muted))] py-1 border-b border-[hsl(var(--border-subtle))] last:border-0">
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
