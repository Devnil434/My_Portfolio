export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  link?: string;
  repoUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}
