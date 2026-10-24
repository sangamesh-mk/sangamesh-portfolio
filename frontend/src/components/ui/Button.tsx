import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--fg)] text-[var(--bg)] hover:opacity-90",
  secondary:
    "border border-[var(--line)] bg-transparent text-[var(--fg)] hover:bg-[var(--bg-muted)]",
  ghost: "text-[var(--fg-muted)] hover:text-[var(--fg)]",
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-opacity",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
