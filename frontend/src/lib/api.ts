import { apiBaseUrl } from "@/config/profile";
import type { ApiEnvelope, ChatResponse, ContactResponse, ProfileConfig, ProjectRecord, SkillGroup } from "@/types";

function resolveUrl(path: string) {
  if (!apiBaseUrl) return path;
  return `${apiBaseUrl}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(resolveUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const payload = (await response.json()) as ApiEnvelope<T> & { detail?: unknown };
  if (!response.ok || payload.ok === false) {
    const message =
      payload.error ??
      (typeof payload.detail === "string" ? payload.detail : `Request failed (${response.status})`);
    throw new Error(message);
  }
  return payload.data;
}

export const api = {
  health: () => request<{ status: string }>("/api/health"),
  profile: () => request<ProfileConfig>("/api/profile"),
  projects: () => request<ProjectRecord[]>("/api/projects"),
  skills: () => request<SkillGroup[]>("/api/skills"),
  chat: (message: string) =>
    request<ChatResponse>("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
  contact: (body: { name: string; email: string; message: string; website?: string }) =>
    request<ContactResponse>("/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
