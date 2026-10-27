import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";

const SUGGESTIONS = [
  "Tell me about Sangamesh.",
  "Explain the Connect Campus project.",
  "What is AURA?",
  "What technologies does he explore?",
  "How can I view his GitHub projects?",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFailed = useRef<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi — I’m Sangamesh’s portfolio assistant. I can talk about his background, projects, and configured public details. If no model key is configured, I answer in local demo mode.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setError(null);
    setInput("");
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setPending(true);
    try {
      const data = await api.chat(trimmed);
      lastFailed.current = null;
      const prefix = data.mode === "demo" ? "Demo mode: " : "";
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", text: `${prefix}${data.reply}` },
      ]);
    } catch (caught) {
      lastFailed.current = trimmed;
      const message = caught instanceof Error ? caught.message : "The assistant is unavailable.";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="fixed right-4 bottom-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-lg"
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open portfolio assistant"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
      {open ? (
        <section
          className="fixed right-4 bottom-20 z-40 flex h-[min(32rem,70vh)] w-[min(100%-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] shadow-2xl"
          aria-label="Portfolio assistant"
        >
          <header className="border-b border-[var(--line)] px-4 py-3">
            <h2 className="text-sm font-medium">Portfolio assistant</h2>
            <p className="text-xs text-[var(--fg-muted)]">Grounded in configured public profile data.</p>
          </header>
          <div ref={listRef} className="flex-1 space-y-3 overflow-auto px-4 py-3" aria-live="polite">
            {messages.map((message) => (
              <p
                key={message.id}
                className={cn(
                  "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                  message.role === "user" ? "ml-auto bg-[var(--fg)] text-[var(--bg)]" : "bg-[var(--bg-muted)]",
                )}
              >
                {message.text}
              </p>
            ))}
            {pending ? <p className="text-xs text-[var(--fg-muted)]">Thinking…</p> : null}
            {error ? (
              <div className="rounded-xl border border-red-400/40 px-3 py-2 text-sm">
                <p>{error}</p>
                <button
                  type="button"
                  className="mt-2 underline"
                  onClick={() => {
                    const retry = lastFailed.current;
                    setError(null);
                    if (retry) void send(retry);
                  }}
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {SUGGESTIONS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px]"
                onClick={() => void send(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-[var(--line)] p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message the assistant
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-11 flex-1 rounded-full border border-[var(--line)] bg-transparent px-3"
              placeholder="Ask about projects, skills, or GitHub"
            />
            <button
              type="submit"
              className="grid h-11 w-11 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)]"
              aria-label="Send message"
              disabled={pending}
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
