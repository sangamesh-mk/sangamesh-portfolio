import type { ProfileConfig } from "@/types";

export const profile: ProfileConfig = {
  name: "Sangamesh M Kuri",
  shortName: "Sangamesh",
  initials: "SMK",
  identity: "Hybrid Technology Innovator",
  organization: "Matured Mind Technologies (M²TECHS)",
  positioning: "Building at the intersection of AI, software, and human-centered technology.",
  introduction:
    "I’m a Computer Science and Engineering student exploring practical software, AI agents, and usable digital experiences. I learn by building.",
  about: [
    "I’m Sangamesh M Kuri, a Computer Science and Engineering student interested in building practical software and exploring the possibilities of artificial intelligence. I enjoy learning by creating projects, experimenting with new technologies, and turning ideas into usable experiences.",
    "My interests span application development, AI agents, intelligent interfaces, and human-centered technology. I approach each project as an opportunity to understand a problem, design a solution, and improve my engineering skills.",
  ],
  philosophy:
    "Start with a real problem, ship a usable slice, then refine. I prefer honest prototypes over unproven claims.",
  currentFocus:
    "Improving full-stack application skills, experimenting with AI-agent workflows, and documenting project work clearly.",
  profileImageAlt: "Placeholder portrait frame for Sangamesh M Kuri. Replace src in profile configuration when a photo is available.",
  github: "https://github.com/sangamesh-mk",
  instagram: "https://www.instagram.com/sangamesh.mk_94/",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/sangamesh-mk" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/sangamesh.mk_94/" },
  ],
};

export const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
