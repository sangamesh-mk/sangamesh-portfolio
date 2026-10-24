import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { projects } from "@/data/projects";
import type { ProjectRecord } from "@/types";
import { useLockBody } from "@/hooks/useLockBody";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function FeatureList({ project }: { project: ProjectRecord }) {
  return (
    <ul className="mt-3 space-y-1 text-sm">
      {project.features.map((feature) => (
        <li key={feature.label} className="flex gap-2">
          <span className="text-[var(--fg-muted)]">{feature.kind}</span>
          <span>{feature.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function Projects({
  activeSlug,
  onOpen,
  onClose,
}: {
  activeSlug: string | null;
  onOpen: (slug: string) => void;
  onClose: () => void;
}) {
  const active = useMemo(() => projects.find((project) => project.slug === activeSlug) ?? null, [activeSlug]);
  useLockBody(Boolean(active));

  return (
    <section id="projects" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">Projects</p>
          <h2 className="section-title mt-3 max-w-3xl text-4xl sm:text-5xl">Selected work, described as it actually is.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              data-reveal
              data-cursor="interactive"
              className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg-elevated)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="h-36"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}33, transparent 62%), var(--bg-muted)`,
                }}
              />
              <div className="space-y-3 p-5">
                <p className="text-xs text-[var(--fg-muted)]">{project.category}</p>
                <h3 className="font-display text-2xl tracking-tight">{project.name}</h3>
                <p className="text-sm text-[var(--fg-muted)]">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--line)] px-2 py-1 text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs uppercase">{project.status}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button onClick={() => onOpen(project.slug)}>View Details</Button>
                  {project.repositoryUrl ? (
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary">Repository</Button>
                    </a>
                  ) : null}
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <Button variant="ghost">Live Demo</Button>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {active ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 md:place-items-center" role="presentation">
          <button type="button" className="absolute inset-0" aria-label="Close project details" onClick={onClose} />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className={cn(
              "relative max-h-[90vh] w-full overflow-auto rounded-t-3xl border border-[var(--line)] bg-[var(--bg)] p-6 md:max-w-2xl md:rounded-3xl",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[var(--fg-muted)]">{active.category}</p>
                <h3 id="project-title" className="section-title mt-1 text-3xl">
                  {active.name}
                </h3>
              </div>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)]" onClick={onClose} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="mt-5 space-y-4 text-sm text-[var(--fg-muted)]">
              <section>
                <h4 className="text-[var(--fg)]">Overview</h4>
                <p className="mt-1">{active.overview}</p>
              </section>
              <section>
                <h4 className="text-[var(--fg)]">Problem</h4>
                <p className="mt-1">{active.problem}</p>
              </section>
              <section>
                <h4 className="text-[var(--fg)]">Proposed solution</h4>
                <p className="mt-1">{active.solution}</p>
              </section>
              <section>
                <h4 className="text-[var(--fg)]">Features</h4>
                <FeatureList project={active} />
              </section>
              <section>
                <h4 className="text-[var(--fg)]">Technology stack</h4>
                <p className="mt-1">{active.stack.join(", ")}</p>
              </section>
              <p>Status: {active.status}</p>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

export function useProjectModal() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  return {
    activeSlug,
    open: (slug: string) => setActiveSlug(slug),
    close: () => setActiveSlug(null),
  };
}
