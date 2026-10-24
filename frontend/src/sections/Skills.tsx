import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">Skills</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">Familiarity, not fabricated mastery.</h2>
          <p className="mt-4 max-w-2xl text-[var(--fg-muted)]">
            Labels mean Learning, Practicing, or Used in projects. They are editable in `src/data/skills.ts`.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2" data-reveal>
          {skillGroups.map((group, index) => (
            <article key={group.id} className="rounded-3xl border border-[var(--line)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl">{group.title}</h3>
                <span className="font-mono text-xs text-[var(--fg-muted)]">0{index + 1}</span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 text-sm">
                    <span>{item.name}</span>
                    <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]">
                      {item.familiarity}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
