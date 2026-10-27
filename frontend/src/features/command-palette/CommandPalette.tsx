import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, profile } from "@/config/profile";
import { projects } from "@/data/projects";
import { useLockBody } from "@/hooks/useLockBody";
import { useTheme } from "@/hooks/useTheme";
import { playUiTone } from "@/lib/sound";
import { cn } from "@/lib/cn";

export interface PaletteAction {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onOpenTerminal,
  onOpenProject,
}: {
  open: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenProject: (slug: string) => void;
}) {
  const { setTheme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBody(open);

  const actions = useMemo<PaletteAction[]>(() => {
    const list: PaletteAction[] = [
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        label: `Go to ${item.label}`,
        hint: "Navigate",
        keywords: item.label,
        run: () => {
          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: `Open ${project.name}`,
        hint: "Project",
        keywords: `${project.name} ${project.tags.join(" ")}`,
        run: () => onOpenProject(project.slug),
      })),
      {
        id: "theme-toggle",
        label: "Toggle theme",
        hint: "Theme",
        run: toggleTheme,
      },
      {
        id: "theme-dark",
        label: "Use dark theme",
        hint: "Theme",
        run: () => setTheme("dark"),
      },
      {
        id: "theme-light",
        label: "Use light theme",
        hint: "Theme",
        run: () => setTheme("light"),
      },
      {
        id: "terminal",
        label: "Open terminal",
        hint: "Tools",
        run: onOpenTerminal,
      },
      {
        id: "github",
        label: "Visit GitHub",
        hint: "Social",
        keywords: "github",
        run: () => {
          if (profile.github) window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "help",
        label: "Show keyboard shortcuts",
        hint: "Help",
        keywords: "shortcuts help",
        run: () => undefined,
      },
    ];
    return list;
  }, [onOpenProject, onOpenTerminal, setTheme, toggleTheme]);

  const filtered = actions.filter((action) => {
    const haystack = `${action.label} ${action.hint ?? ""} ${action.keywords ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase().trim());
  });

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const action = filtered[index];
        if (action) {
          playUiTone("success");
          action.run();
          if (action.id !== "help") onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, index, onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-start bg-black/45 px-4 pt-[12vh]" role="presentation">
      <button type="button" className="absolute inset-0" aria-label="Close command palette" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] shadow-2xl"
      >
        <label className="sr-only" htmlFor="command-search">
          Search commands
        </label>
        <input
          id="command-search"
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
          }}
          placeholder="Search sections, projects, theme, terminal…"
          className="w-full border-b border-[var(--line)] bg-transparent px-4 py-4 outline-none"
        />
        <ul className="max-h-80 overflow-auto p-2" role="listbox">
          {filtered.length === 0 ? (
            <li className="px-3 py-4 text-sm text-[var(--fg-muted)]">No matching actions.</li>
          ) : (
            filtered.map((action, actionIndex) => (
              <li key={action.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={actionIndex === index}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm",
                    actionIndex === index && "bg-[var(--bg-muted)]",
                  )}
                  onMouseEnter={() => setIndex(actionIndex)}
                  onClick={() => {
                    playUiTone("success");
                    action.run();
                    if (action.id !== "help") onClose();
                  }}
                >
                  <span>{action.label}</span>
                  <span className="text-xs text-[var(--fg-muted)]">{action.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-[var(--line)] px-4 py-2 text-xs text-[var(--fg-muted)]">
          ↑↓ to move · Enter to run · Esc to close · Ctrl/Cmd K to toggle
        </p>
      </div>
    </div>
  );
}
