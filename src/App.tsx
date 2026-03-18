const starterCards = [
  {
    title: "Single entry point",
    description: "The previous product shell is gone. You now have one focused screen to reshape however you want.",
  },
  {
    title: "Minimal tooling",
    description: "React, Vite, Tailwind, ESLint, and Vitest stay in place so you can rebuild without infrastructure churn.",
  },
  {
    title: "Low-friction reset",
    description: "Old pages, stores, integrations, and assets were removed so the repo stops fighting the next direction.",
  },
];

const commands = ["pnpm dev", "pnpm test", "pnpm build", "pnpm lint"];

const App = () => (
  <main className="min-h-screen px-6 py-10 text-slate-950 sm:px-10 lg:px-12">
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between gap-12 rounded-[2rem] border border-white/70 bg-white/72 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:p-12">
      <section className="max-w-3xl space-y-8">
        <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
          Clean slate
        </div>

        <div className="space-y-5">
          <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">
            Start over with a calm, minimal baseline.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            This project has been stripped back to a single React screen with Tailwind styling and the core developer tooling
            still wired up. Replace this shell with the new product direction when you are ready.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-4 md:grid-cols-3">
          {starterCards.map((card) => (
            <article key={card.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700">{card.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>

        <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-slate-50">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-300">Starter commands</p>
          <div className="mt-5 space-y-3">
            {commands.map((command) => (
              <div key={command} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm">
                {command}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  </main>
);

export default App;
