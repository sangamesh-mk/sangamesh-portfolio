import type { ProjectRecord } from "@/types";

export const projects: ProjectRecord[] = [
  {
    slug: "connect-campus",
    name: "Connect Campus",
    category: "Campus community / Flutter application",
    status: "In development",
    accent: "#7c6cff",
    tags: ["Flutter", "Dart", "Mobile UI"],
    stack: ["Flutter", "Dart", "shared_preferences"],
    summary: "A campus communication and community application with screens for identity, feed, chat, and discovery.",
    overview:
      "Connect Campus is a campus community app concept focused on helping students share updates, discover people, and communicate in a familiar social layout.",
    problem:
      "Campus communities often split conversations across informal chats and disconnected notice boards, making it harder to keep academic and social context in one place.",
    solution:
      "The project explores a mobile-first community surface with dedicated flows for onboarding, posting, comments, chat, discovery, and profile management.",
    features: [
      { label: "Splash screen", kind: "implemented" },
      { label: "Login and signup screens", kind: "implemented" },
      { label: "OTP verification screen", kind: "implemented" },
      { label: "Home screen", kind: "implemented" },
      { label: "Chat screen", kind: "implemented" },
      { label: "Feed", kind: "implemented" },
      { label: "Create-post flow", kind: "implemented" },
      { label: "Comments", kind: "implemented" },
      { label: "Discover", kind: "implemented" },
      { label: "Profile", kind: "implemented" },
      { label: "Edit-profile functionality", kind: "implemented" },
      { label: "Production authentication backend", kind: "planned" },
      { label: "Live deployed user community", kind: "planned" },
    ],
  },
  {
    slug: "jarvis",
    name: "JARVIS",
    category: "Personal AI assistant",
    status: "In development",
    accent: "#3ecfc0",
    tags: ["Python", "AI assistant", "Automation"],
    stack: ["Python"],
    summary: "A personal AI-assistant project exploring voice interaction, computer automation, search, and memory.",
    overview:
      "JARVIS is a personal assistant project in development. The direction is a helpful local companion for everyday computing tasks, not a finished commercial product.",
    problem:
      "Common computer tasks still require switching between apps, search, and notes. A personal assistant can reduce that friction if it stays transparent about what it can actually do.",
    solution:
      "The project is structured around assistant capabilities that can grow over time: voice-enabled help, automation, web search, persistent memory, and optional mobile or hardware access.",
    features: [
      { label: "Personal assistant architecture", kind: "in-progress" },
      { label: "Voice-enabled assistance", kind: "planned" },
      { label: "Computer automation", kind: "planned" },
      { label: "Web search", kind: "planned" },
      { label: "Persistent memory", kind: "planned" },
      { label: "Flutter mobile access", kind: "planned" },
      { label: "ESP32 and IoT integration", kind: "planned" },
    ],
  },
  {
    slug: "aura",
    name: "AURA",
    category: "AI-agent / hackathon preparation",
    status: "Exploratory",
    accent: "#d9a441",
    tags: ["Python", "AI agents", "Gemini API"],
    stack: ["Python", "Gemini API"],
    summary: "An AI-agent experiment for tool use, function calling, and hackathon preparation.",
    overview:
      "AURA is an AI-agent project under development. Local work includes a Python agent engine for registered tools, calculator-style function testing, a datetime tool, memory and task-planner modules, and initial Gemini API experiments while preparing for an AI-agent hackathon.",
    problem:
      "Building reliable agents requires more than a prompt. Tool calling, constrained actions, and honest failure handling need to be practiced in small, testable pieces.",
    solution:
      "AURA treats agent capabilities as reusable components. Current modules cover tool registration, arithmetic tools, datetime lookup, and early planner/memory experiments.",
    features: [
      { label: "Python agent engine for registered tools", kind: "implemented" },
      { label: "Calculator-style tool/function testing", kind: "implemented" },
      { label: "Current datetime tool", kind: "implemented" },
      { label: "Memory and task-planner modules", kind: "in-progress" },
      { label: "Initial Gemini API experimentation", kind: "implemented" },
      { label: "Hackathon preparation", kind: "in-progress" },
      { label: "Autonomous production agent", kind: "planned" },
    ],
  },
  {
    slug: "alertxband",
    name: "AlertXBand",
    category: "Wearable safety / IoT prototype",
    status: "Prototype",
    accent: "#ef6b6b",
    tags: ["ESP32", "IoT", "Hardware prototype"],
    stack: ["ESP32"],
    summary: "A wearable safety prototype assembled around an ESP32, with sensing now and broader emergency features proposed next.",
    overview:
      "AlertXBand is a wearable safety concept. A hardware prototype has been assembled. Some sensing is part of the current direction; location and GSM alerting remain proposed integrations unless separately verified.",
    problem:
      "Personal safety tools are most useful when they are wearable, immediate, and able to communicate context. Hardware prototypes are a way to test that idea before claiming a finished product.",
    solution:
      "The current prototype centers on an ESP32 wearable form. Motion sensing is part of the known scope. GPS sharing, GSM emergency notifications, and additional environmental or health sensors are proposed integrations.",
    features: [
      { label: "ESP32-based wearable hardware prototype assembled", kind: "implemented" },
      { label: "Motion sensing", kind: "in-progress" },
      { label: "GPS location sharing", kind: "planned" },
      { label: "GSM emergency notifications", kind: "planned" },
      { label: "Environmental and health-related sensors", kind: "planned" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
