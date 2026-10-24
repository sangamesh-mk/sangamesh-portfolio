import { useState, type FormEvent } from "react";
import { profile } from "@/config/profile";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [mailto, setMailto] = useState<string | undefined>();

  const socials = profile.socials.filter((item) => item.href);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const result = await api.contact({ name, email, message, website: honeypot });
      setStatus("success");
      setFeedback(result.message);
      setMailto(result.mailto);
    } catch (caught) {
      setStatus("error");
      setFeedback(caught instanceof Error ? caught.message : "Unable to submit right now.");
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase">Contact</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">If a project resonates, start a conversation.</h2>
          <p className="mt-4 max-w-md text-[var(--fg-muted)]">
            I’m open to discussing ideas, student collaborations, and technology projects. Availability for work is not listed here because it has not been confirmed.
          </p>
          <ul className="mt-6 space-y-2">
            {socials.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
            {profile.email ? (
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            ) : (
              <li className="text-sm text-[var(--fg-muted)]">Email is not configured.</li>
            )}
          </ul>
        </div>
        <form className="space-y-4 rounded-3xl border border-[var(--line)] p-6" onSubmit={onSubmit} data-reveal>
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input id="website" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-[var(--line)] bg-transparent px-3"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-[var(--line)] bg-transparent px-3"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              required
              minLength={8}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-1 min-h-32 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
            />
          </div>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </Button>
          {feedback ? (
            <p className={status === "error" ? "text-sm text-red-500" : "text-sm"} role="status">
              {feedback}
            </p>
          ) : null}
          {mailto ? (
            <a className="inline-block text-sm underline" href={mailto}>
              Continue with your email client
            </a>
          ) : null}
        </form>
      </div>
    </section>
  );
}
