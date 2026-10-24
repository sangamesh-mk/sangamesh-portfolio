import { profile } from "@/config/profile";
import { cn } from "@/lib/cn";

export function ProfileMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-sm tracking-tight", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] text-[11px] font-semibold">
        {profile.initials}
      </span>
      <span className="hidden sm:inline">{profile.name}</span>
    </span>
  );
}

export function ProfilePortrait({ interactive = true }: { interactive?: boolean }) {
  const src = profile.profileImageSrc;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem]">
      <div className="absolute inset-[-8%] rounded-[2rem] border border-[var(--line)] opacity-70" />
      <div className="portrait-ring absolute inset-[-3%] rounded-[1.7rem] border border-[color-mix(in_oklab,var(--accent)_55%,transparent)]" />
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[1.45rem] border border-[var(--line)] bg-[var(--bg-elevated)]",
          interactive && "transition-transform duration-500 will-change-transform",
        )}
      >
        {src ? (
          <img src={src} alt={profile.profileImageAlt} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_42%),linear-gradient(180deg,var(--bg-muted),var(--bg-elevated))] p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--fg-muted)] uppercase">Portrait pending</p>
            <div>
              <p className="font-display text-5xl tracking-tight">{profile.initials}</p>
              <p className="mt-3 max-w-[16ch] text-sm text-[var(--fg-muted)]">
                Replaceable profile frame. Add `profileImageSrc` in `src/config/profile.ts`.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
