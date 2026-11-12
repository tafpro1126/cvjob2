export type ActiveTab = 'stage' | 'digital';

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  type: 'education' | 'experience' | 'certification';
  description: string;
  highlights: string[];
  badgeColor?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    description: string;
    tag?: string;
  }[];
}

export interface ProjectCase {
  id: string;
  title: string;
  category: 'gestion' | 'web' | 'ecommerce' | 'automation';
  categoryLabel: string;
  badge: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  results: string[];
  mockupType: 'desktop' | 'mobile';
  featured?: boolean;
}

export interface ServiceOffering {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
