import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-[hsl(var(--border-subtle))]"
          : "bg-transparent",
      ].join(" ")}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5" aria-label="Onda home">
          <img src="/onda-icon.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            ONDA
          </span>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <button className="flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
            EXPLORE
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </nav>

        {/* Right actions — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button className="min-h-[44px] px-4 py-2 text-sm font-medium text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] rounded-pill border border-[hsl(var(--border-active))]">
            LOGIN
          </button>
          <button className="min-h-[44px] rounded-pill bg-[hsl(var(--accent))] px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:bg-[hsl(var(--accent-glow))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
            GET THE APP
          </button>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <button className="rounded-pill bg-[hsl(var(--accent))] px-4 py-2 text-xs font-semibold text-white">
            GET THE APP
          </button>
          <button
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass border-t border-[hsl(var(--border-subtle))] md:hidden">
          <nav className="flex flex-col px-5 py-4 gap-2">
            <button className="flex items-center gap-1 py-3 text-sm font-medium text-[hsl(var(--text-muted))] hover:text-white text-left">
              EXPLORE <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="py-3 text-sm font-medium text-[hsl(var(--text-muted))] hover:text-white text-left">
              LOGIN
            </button>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
