import { Apple, Play } from "lucide-react";

const LINKS = {
  SOBRE: ["A Nossa História", "Imprensa", "Carreiras", "Blog"],
  EXPLORAR: ["Maputo", "Beira", "Nampula", "Todas as Cidades"],
  SUPORTE: ["Centro de Ajuda", "Contacta-nos", "Política de Reembolso", "Acessibilidade"],
};

// Inline SVG icons to avoid external deps
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "TikTok", icon: TikTokIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "Spotify", icon: SpotifyIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--bg-base))]">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
        {/* Top row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Onda home">
            <img src="/onda-icon.svg" alt="" className="h-7 w-7" />
            <span className="font-display text-xl font-bold tracking-tight text-white">ONDA</span>
          </a>
          <a
            href="#"
            className="inline-flex min-h-[44px] items-center rounded-[6px] border border-[hsl(var(--border-active))] px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
          >
            PUBLICAR O TEU EVENTO ↗
          </a>
        </div>

        {/* Link columns + App/Social */}
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))]">
                {section}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App download */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))]">
              Junta-te à Comunidade
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              <button className="flex min-h-[44px] items-center gap-2 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-surface))] px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--bg-elevated))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
                <Apple className="h-4 w-4" /> App Store
              </button>
              <button className="flex min-h-[44px] items-center gap-2 rounded-pill border border-[hsl(var(--border-active))] bg-[hsl(var(--bg-surface))] px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--bg-elevated))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]">
                <Play className="h-4 w-4 fill-white" /> Google Play
              </button>
            </div>
          </div>

          {/* Social */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-editorial text-[hsl(var(--text-muted))]">
              Somos Sociais :)
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {SOCIALS.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[hsl(var(--border-active))] text-[hsl(var(--text-muted))] transition-colors hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[hsl(var(--border-subtle))] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] text-[hsl(var(--text-muted))]">
            &copy; 2026 Onda. Todos os direitos reservados.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            {["Termos", "Privacidade", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-[11px] text-[hsl(var(--text-muted))] transition-colors hover:text-white focus:outline-none focus-visible:underline"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
