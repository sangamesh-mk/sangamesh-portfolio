import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { isSoundEnabled, loadSoundPreference, playUiTone, setSoundEnabled } from "@/lib/sound";

export function SoundToggle() {
  const [on, setOn] = useState(() => loadSoundPreference());

  return (
    <button
      type="button"
      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)]"
      aria-pressed={on}
      aria-label={on ? "Disable sound effects" : "Enable sound effects"}
      onClick={() => {
        const next = !isSoundEnabled();
        setSoundEnabled(next);
        setOn(next);
        if (next) playUiTone("open");
      }}
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
