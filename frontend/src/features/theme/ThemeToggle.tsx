import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { playUiTone } from "@/lib/sound";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)]"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        toggleTheme();
        playUiTone("tap");
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
