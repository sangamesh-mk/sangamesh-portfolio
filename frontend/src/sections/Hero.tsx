import { lazy, Suspense, useRef, type PointerEvent } from "react";
import { ArrowDown, Github } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/config/profile";
import { ProfilePortrait } from "@/components/profile/ProfileMark";
import { Button } from "@/components/ui/Button";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const HeroScene = lazy(() => import("@/components/3d/HeroScene").then((mod) => ({ default: mod.HeroScene })));

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const frame = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!fine || reduced || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  return (
    <section id="home" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-xl opacity-70">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            className="font-mono text-xs tracking-[0.22em] text-[var(--accent-2)] uppercase"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {profile.identity}
            {profile.organization ? ` · ${profile.organization}` : ""}
          </motion.p>
          <motion.h1
            className="section-title mt-4 text-[clamp(2.4rem,7vw,6.2rem)]"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {profile.name}
          </motion.h1>
          <motion.p
            className="editorial mt-5 max-w-xl text-xl text-[var(--fg-muted)] sm:text-2xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {profile.positioning}
          </motion.p>
          <p className="mt-5 max-w-xl text-[var(--fg-muted)]">{profile.introduction}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button>Explore My Work</Button>
            </a>
            <a href="#about">
              <Button variant="secondary">About Me</Button>
            </a>
            {profile.github ? (
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Button variant="ghost">
                  <Github size={16} />
                  GitHub
                </Button>
              </a>
            ) : null}
          </div>
        </div>
        <div
          ref={frame}
          className="relative"
          onPointerMove={onPointerMove}
          onPointerLeave={() => {
            if (frame.current) frame.current.style.transform = "rotateY(0) rotateX(0)";
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <ProfilePortrait />
        </div>
      </div>
      <a href="#about" className="mx-auto mt-16 flex w-fit items-center gap-2 text-sm text-[var(--fg-muted)]">
        <ArrowDown size={16} />
        Scroll
      </a>
    </section>
  );
}
