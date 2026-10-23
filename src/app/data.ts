import content from "./content.json";
import englishContent from "./content.en.json";
import type { Language } from "./locale";
export type Project = {
  id: string;
  name: string;
  category: string;
  kicker: string;
  subtitle: string;
  status?: string;
  period: string;
  role: string;
  organization?: string;
  summary: string;
  problem: string;
  contributions: string[];
  outcome: string;
  tags: string[];
  links: { label: string; url: string }[];
  metric?: { value: string; label: string };
};
export const getContent = (language: Language) =>
  language === "en" ? englishContent : content;
export const projectOrder = [
  "stable",
  "wallbaduk",
  "souf",
  "mote",
  "writenow",
  "rested",
  "diff-svc",
  "lenfit",
  "stargan-ta",
];
