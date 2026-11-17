export type ActiveTab = 'stage' | 'digital';

export type SkillLevelTier = 1 | 2 | 3; // 1 = Notions, 2 = Bases, 3 = À l'aise

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  type: 'education' | 'experience' | 'workshop';
  current?: boolean;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    tier: SkillLevelTier;
    levelLabel: 'Notions' | 'Bases' | 'À l’aise';
    description: string;
    contextNote?: string;
  }[];
}

export interface ProjectCase {
  id: string;
  title: string;
  category: 'automation' | 'ads' | 'web';
  categoryLabel: string;
  badge: 'Projet réel' | 'Démonstration';
  summary: string;
  workDone: string;
  honestResult: string;
  stack: string[];
  mockupType: 'desktop' | 'mobile';
}

export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  tag: string;
}
