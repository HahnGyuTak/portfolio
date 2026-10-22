import content from "./content.json";
export type Project = {
  id: string;
  name: string;
  category: string;
  kicker: string;
  subtitle: string;
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
export const data = content;
export const projects = content.projects as Project[];
export const projectOrder = [
  "wallbaduk",
  "souf",
  "mote",
  "promptstyler",
  "writenow",
  "rested",
  "diff-svc",
  "lenfit",
  "stargan-ta",
];
