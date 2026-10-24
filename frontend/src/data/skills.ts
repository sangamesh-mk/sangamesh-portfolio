import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Programming languages",
    items: [
      { name: "C", familiarity: "Learning" },
      { name: "C++", familiarity: "Learning" },
      { name: "Java", familiarity: "Learning" },
      { name: "Python", familiarity: "Used in projects" },
      { name: "JavaScript", familiarity: "Practicing" },
      { name: "TypeScript", familiarity: "Practicing" },
      { name: "Dart", familiarity: "Used in projects" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend development",
    items: [
      { name: "React", familiarity: "Used in projects" },
      { name: "HTML/CSS", familiarity: "Practicing" },
    ],
  },
  {
    id: "backend",
    title: "Backend development",
    items: [
      { name: "FastAPI", familiarity: "Used in projects" },
      { name: "Django", familiarity: "Learning" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile development",
    items: [{ name: "Flutter", familiarity: "Used in projects" }],
  },
  {
    id: "ai",
    title: "AI and machine learning",
    items: [
      { name: "Gemini API experimentation", familiarity: "Used in projects" },
      { name: "AI agents", familiarity: "Practicing" },
    ],
  },
  {
    id: "data",
    title: "Databases",
    items: [{ name: "SQLite", familiarity: "Learning" }],
  },
  {
    id: "tools",
    title: "Developer tools",
    items: [
      { name: "Git", familiarity: "Used in projects" },
      { name: "GitHub", familiarity: "Used in projects" },
      { name: "VS Code / Cursor", familiarity: "Used in projects" },
    ],
  },
  {
    id: "hardware",
    title: "Hardware and IoT",
    items: [{ name: "ESP32", familiarity: "Used in projects" }],
  },
];
