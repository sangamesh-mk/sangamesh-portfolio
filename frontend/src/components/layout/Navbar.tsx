import { Command, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/config/profile";
import { ProfileMark } from "@/components/profile/ProfileMark";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { SoundToggle } from "@/features/sound/SoundToggle";
import { useLockBody } from "@/hooks/useLockBody";
import { playUiTone } from "@/lib/sound";

export function Navbar({ onOpenPalette, onOpenTerminal }: { onOpenPalette: () => void; onOpenTerminal: () => void }) {
  const [open, setOpen] = useState(false);
  useLockBody(open);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="rounded-full" onClick={() => setOpen(false)}>
          <ProfileMark />
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-11 items-center gap-2 rounded-full border border-[var(--line)] px-3 text-xs text-[var(--fg-muted)] md:inline-flex"
            onClick={() => {
              playUiTone("open");
              onOpenPalette();
            }}
          >
            <Command size={14} />
            <span>Search</span>
            <kbd className="rounded bg-[var(--bg-muted)] px-1.5 py-0.5 font-mono">Ctrl K</kbd>
          </button>
          <SoundToggle />
          <ThemeToggle />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-[var(--line)] bg-[var(--bg)] px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="rounded-xl px-3 py-3 text-left"
              onClick={() => {
                setOpen(false);
                onOpenPalette();
              }}
            >
              Command palette
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-3 text-left"
              onClick={() => {
                setOpen(false);
                onOpenTerminal();
              }}
            >
              Open terminal
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
