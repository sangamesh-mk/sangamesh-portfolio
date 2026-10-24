import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section id="journey" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">Journey</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">Learning milestones, not invented dates.</h2>
        </div>
        <ol className="relative mt-12 space-y-6 border-l border-[var(--line)] pl-6">
          {journey.map((item) => (
            <li key={item.id} className="relative" data-reveal>
              <span className="absolute top-1.5 -left-[1.62rem] h-3 w-3 rounded-full bg-[var(--accent)]" />
              <p className="font-mono text-xs text-[var(--fg-muted)]">{item.period}</p>
              <h3 className="mt-1 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-[var(--fg-muted)]">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
