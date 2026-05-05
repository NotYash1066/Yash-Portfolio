export interface Project {
  title: string;
  slug: string;
  date: string;
  type: "selected-work" | "archive" | "experiment";
  stack: string[];
  role: string;
  status: "Completed" | "In Progress" | "Paused" | "Abandoned" | "Prototype";
  featured: boolean;
  summary: string;
  github: string;
  demo: string;
  cover: string;
  team: string;
  teamName?: string;
  readme: boolean;
  hackathon?: string;
  hackathonResult?: string;
  content?: string;
}

export interface FieldNote {
  title: string;
  slug: string;
  date: string;
  type: "field-note";
  category: string;
  tags: string[];
  status: "published" | "draft" | "private";
  visibility: "public" | "private";
  mood: string;
  excerpt: string;
  relatedProject: string;
  relatedCrashReport: string;
  readingTime: string;
  content: string;
}

export interface CrashReport {
  title: string;
  slug: string;
  date: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  system: string;
  status: "published" | "draft" | "private";
  lesson: string;
  tags: string[];
  relatedProject: string;
  readingTime: string;
  content: string;
}

export interface ArchiveItem {
  name: string;
  type: string;
  year: string;
  stack: string[];
  status: "Shipped" | "Paused" | "Abandoned" | "Rebuilt" | "Learning Experiment" | "Prototype";
  note: string;
  link: string;
}
