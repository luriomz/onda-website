import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Apple, Play } from "lucide-react";
import { viewportOnce } from "../../hooks/useScrollAnimation";

export default function AppCTASection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center">
        {/* Subtle glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[300px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(338 80% 30% / 0.12), transparent 65%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
          <motion.h2
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mx-auto max-w-[680px] font-bold uppercase text-white"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05 }}
          >
            Queres Sair?
            <br />
            Todos os Eventos que Adoras
            <br />
            Estão Mesmo Aqui!
          </motion.h2>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="min-h-[48px] rounded-pill border-2 border-[hsl(var(--accent))] px-8 py-3 font-sans text-sm font-semibold text-[hsl(var(--accent-glow))] transition-all duration-150 hover:bg-[hsl(var(--accent))] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
            >
              BAIXA O ONDA
            </button>
          </motion.div>
        </div>
      </section>

      {/* Download modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Baixar a App Onda"
          >
            <div
              className="absolute inset-0 bg-[hsl(250 12% 3% / 0.85)] backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              className="relative z-10 mx-auto w-full max-w-sm rounded-feature border border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-surface))] p-8 text-center shadow-elevated"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
                onClick={() => setModalOpen(false)}
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <img src="/onda-icon.svg" alt="Onda" className="mx-auto mb-4 h-14 w-14" />
              <h3 className="font-display text-xl font-bold text-white">Baixa o Onda</h3>
              <p className="mt-2 font-sans text-sm text-[hsl(var(--text-muted))]">
                Lê o QR code ou escolhe a tua plataforma
              </p>

              {/* QR code placeholder */}
              <div className="mx-auto my-6 flex h-36 w-36 items-center justify-center rounded-[12px] bg-white p-3">
                <div className="h-full w-full rounded-sm bg-[hsl(250 12% 10%)] flex items-center justify-center">
                  <span className="font-display text-xs font-bold text-[hsl(var(--accent))]">QR</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-elevated))] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--accent))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
                  <Apple className="h-5 w-5" /> App Store
                </button>
                <button className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-elevated))] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--accent))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
                  <Play className="h-4 w-4 fill-white" /> Google Play
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
