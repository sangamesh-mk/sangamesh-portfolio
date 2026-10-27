import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Journey } from "@/sections/Journey";
import { Contact } from "@/sections/Contact";
import { CommandPalette } from "@/features/command-palette/CommandPalette";
import { TerminalPanel } from "@/features/terminal/TerminalPanel";
import { ChatAssistant } from "@/features/chat/ChatAssistant";
import { CustomCursor } from "@/features/cursor/CustomCursor";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { playUiTone } from "@/lib/sound";

const ParticleField = lazy(() => import("@/components/atmosphere/ParticleField").then((mod) => ({ default: mod.ParticleField })));

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(null);
  useScrollReveal();

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
        playUiTone("open");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative">
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenPalette={openPalette} onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Projects activeSlug={projectSlug} onOpen={setProjectSlug} onClose={() => setProjectSlug(null)} />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <button
        type="button"
        className="fixed bottom-4 left-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-4 text-sm"
        onClick={() => setTerminalOpen(true)}
      >
        <TerminalSquare size={16} />
        Terminal
      </button>
      <TerminalPanel open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      {paletteOpen ? (
        <CommandPalette
          open
          onClose={closePalette}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenProject={setProjectSlug}
        />
      ) : null}
      <ChatAssistant />
    </div>
  );
}
