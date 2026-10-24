import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { profile } from "@/config/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { journey } from "@/data/journey";

const HELP = [
  "help       list commands",
  "about      short introduction",
  "projects   featured projects",
  "skills     skill categories",
  "journey    timeline",
  "contact    jump to contact",
  "github     open GitHub if configured",
  "clear      reset output",
  "exit       close terminal",
];

export function TerminalPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<string[]>(["Portfolio terminal. Type `help` to begin."]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(
    () => ({
      help: () => HELP,
      about: () => [profile.introduction],
      projects: () => projects.map((project) => `${project.name} — ${project.status}. ${project.summary}`),
      skills: () => skillGroups.map((group) => `${group.title}: ${group.items.map((item) => item.name).join(", ")}`),
      journey: () => journey.map((item) => `${item.title} (${item.period})`),
      contact: () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        return ["Scrolling to contact."];
      },
      github: () => {
        if (!profile.github) return ["GitHub is not configured."];
        window.open(profile.github, "_blank", "noopener,noreferrer");
        return [`Opening ${profile.github}`];
      },
      clear: () => {
        setLines([]);
        return [];
      },
      exit: () => {
        onClose();
        return ["Closed."];
      },
    }),
    [onClose],
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, open]);

  if (!open) return null;

  function run(raw: string) {
    const input = raw.trim().toLowerCase();
    if (!input) return;
    setLines((current) => [...current, `> ${raw}`]);
    if (input === "clear") {
      setLines([]);
      return;
    }
    const command = commands[input as keyof typeof commands];
    const output = command ? command() : [`Command not found: ${raw}. Try help.`];
    if (output.length) setLines((current) => [...current, ...output]);
  }

  return (
    <section
      className="fixed right-4 bottom-24 z-40 w-[min(100%-2rem,32rem)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0c0d11] text-[#d7e0d2] shadow-2xl"
      aria-label="Portfolio terminal"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-xs">
        <span>smk@portfolio — safe command surface</span>
        <button type="button" className="grid h-8 w-8 place-items-center" aria-label="Close terminal" onClick={onClose}>
          <X size={14} />
        </button>
      </div>
      <div className="max-h-64 overflow-auto px-3 py-3 font-mono text-[12px] leading-6">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className="whitespace-pre-wrap">
            {line}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="flex items-center gap-2 border-t border-white/10 px-3 py-2"
        onSubmit={(event) => {
          event.preventDefault();
          run(value);
          setValue("");
        }}
      >
        <span className="font-mono text-xs text-[#3ecfc0]">$</span>
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-10 w-full bg-transparent font-mono text-sm outline-none"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </section>
  );
}
