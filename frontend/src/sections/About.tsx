import { profile } from "@/config/profile";
import { skillGroups } from "@/data/skills";

export function About() {
  const interests = skillGroups.flatMap((group) => group.items.map((item) => item.name)).slice(0, 12);

  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">About</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">A student builder with a systems curiosity.</h2>
        </div>
        <div className="space-y-5 text-[var(--fg-muted)]" data-reveal>
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="editorial text-lg leading-8">
              {paragraph}
            </p>
          ))}
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-[var(--line)] p-5">
              <h3 className="text-sm font-medium text-[var(--fg)]">Engineering philosophy</h3>
              <p className="mt-2 text-sm">{profile.philosophy}</p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] p-5">
              <h3 className="text-sm font-medium text-[var(--fg)]">Current focus</h3>
              <p className="mt-2 text-sm">{profile.currentFocus}</p>
            </article>
          </div>
          <ul className="flex flex-wrap gap-2 pt-2" aria-label="Technology interests">
            {interests.map((item) => (
              <li key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
