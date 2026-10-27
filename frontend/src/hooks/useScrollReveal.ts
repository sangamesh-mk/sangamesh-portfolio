import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function useScrollReveal(enabled = true) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || import.meta.env.MODE === "test") return;

    let cancelled = false;
    let cleanup = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, scrollMod]) => {
      if (cancelled) return;
      const gsap = gsapMod.default;
      const { ScrollTrigger } = scrollMod;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0.35, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });
      cleanup = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, reduced]);
}
