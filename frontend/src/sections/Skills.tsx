import { skillGroups } from "@/data/skills";

const RING = [
  { left: "50%", top: "8%" },
  { left: "82%", top: "22%" },
  { left: "90%", top: "52%" },
  { left: "74%", top: "82%" },
  { left: "26%", top: "82%" },
  { left: "10%", top: "52%" },
  { left: "18%", top: "22%" },
  { left: "50%", top: "92%" },
];

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">Skills</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">Familiarity, not fabricated mastery.</h2>
          <p className="mt-4 max-w-2xl text-[var(--fg-muted)]">
            Labels mean Learning, Practicing, or Used in projects. Edit the list in `src/data/skills.ts`.
          </p>
        </div>
        <div
          className="relative mx-auto mt-12 hidden min-h-[28rem] max-w-3xl md:block"
          aria-hidden="true"
          data-reveal
        >
          <div className="absolute inset-[8%] rounded-full border border-[var(--line)]" />
          <div className="absolute inset-[22%] rounded-full border border-dashed border-[var(--line)]" />
          <div className="absolute top-1/2 left-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-center">
            <span className="font-display text-lg tracking-tight">SMK</span>
          </div>
          {skillGroups.map((group, index) => (
            <article
              key={group.id}
              className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 shadow-sm"
              style={RING[index] ?? { left: "50%", top: "50%" }}
            >
              <p className="font-mono text-[10px] tracking-wider text-[var(--accent-2)] uppercase">{group.title}</p>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">{group.items.map((item) => item.name).join(" · ")}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <article key={group.id} className="rounded-3xl border border-[var(--line)] p-5" data-reveal>
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
