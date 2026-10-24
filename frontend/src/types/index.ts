export type Familiarity = "Learning" | "Practicing" | "Used in projects";

export type ProjectStatus = "Prototype" | "In development" | "Exploratory";

export type FeatureKind = "implemented" | "in-progress" | "planned";

export interface SocialLink {
  id: string;
  label: string;
  href?: string;
}

export interface ProfileConfig {
  name: string;
  shortName: string;
  initials: string;
  identity: string;
  organization?: string;
  positioning: string;
  introduction: string;
  about: string[];
  philosophy: string;
  currentFocus: string;
  locationNote?: string;
  email?: string;
  resumeUrl?: string;
  siteUrl?: string;
  profileImageSrc?: string;
  profileImageAlt: string;
  github?: string;
  instagram?: string;
  socials: SocialLink[];
}

export interface ProjectFeature {
  label: string;
  kind: FeatureKind;
}

export interface ProjectRecord {
  slug: string;
  name: string;
  category: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  status: ProjectStatus;
  tags: string[];
  features: ProjectFeature[];
  stack: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  accent: string;
}

export interface SkillItem {
  name: string;
  familiarity: Familiarity;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: SkillItem[];
}

export interface JourneyItem {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface ApiEnvelope<T> {
  ok: boolean;
  data: T;
  error?: string;
}

export interface ChatResponse {
  reply: string;
  mode: "demo" | "llm";
  provider?: string;
}

export interface ContactResponse {
  accepted: boolean;
  delivery: "none" | "mailto" | "stored" | "email";
  message: string;
  mailto?: string;
}
