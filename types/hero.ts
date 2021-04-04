export interface Hero {
  name: string;
  talent: Talent;
  threeCostSkill?: Skill;
  classTree: ClassTree;
  factions: Factions[];
  heroImageUrl: string;
  //bondRequirments
  //SoliderBonus
  //3C: HeroSkill
}

export interface Talent {
  name: string;
  description: string;
  descriptionUrl?: string;
  descriptionMarkdown?: string;
}

export interface ClassTree {
  classes: null
}

export interface Skill {
  name: string;
  description?: string;
  descriptionUrl?: string;
  descriptionMarkdown?: string;
  cost: 1 | 2 | 3;
  cd?: number;
  range?: number;
  span?: number;
  iconUrls: string[];
}

export type Factions = 'dark' | 'time' | 'tensei';