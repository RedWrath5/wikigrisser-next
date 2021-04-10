export interface Hero {
  name: string;
  prettyName: string;
  talent?: Talent;
  threeCostSkill?: Skill;
  SpClass?: Class;
  classTree?: ClassTree;
  factions: Factions[];
  heroImageUrl?: string;
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
  classes: Class[];
}

export interface Class {
  name: string;
  iconUrls: string;
  heroType: UnitType;
  skills: string[];
  soldiers: string[];
  children: Class[];
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

export type Factions =  'protagonist' | 'glory' | 'origin'| 'princess'| 'empire'| 'strategic'|  'dark' | 'meteor'| 'legends'| 'mythic'|   'tensei' | 'time';

export type UnitType = 'Infantry' | 'Lancer' | 'Cavalry' | 'Flier' | 'Aquatic' | 'Archer' | 'Assassin' | 'Mage' | 'Holy' | 'Demon';