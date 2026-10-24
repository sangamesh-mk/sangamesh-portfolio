import { profile } from "@/config/profile";

export function Footer() {
  const year = new Date().getFullYear();
  const links = profile.socials.filter((item) => item.href);

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-[var(--fg-muted)]">
          © {year} {profile.name}. Built as a personal portfolio — not a claim of professional seniority.
        </p>
        <ul className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
