export interface Hero {
  name: string;
  prettyName: string;
  talent?: Talent;
  threeCostSkill?: Skill;
  SpClass?: Class;
  startingClass: Class;
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

export interface Class {
  name: string;
  heroType: UnitType;
  skills: Skill[];
  soldiers: string[];
  children: Class[];
}

export interface Skill {
  name: string;
  description?: string;
  descriptionMarkdown?: string;
  cost: 1 | 2 | 3;
  cd?: number;
  range?: number;
  span?: number;
}

export type Factions =
  | "protagonist"
  | "glory"
  | "origin"
  | "princess"
  | "empire"
  | "strategic"
  | "dark"
  | "meteor"
  | "legends"
  | "mythic"
  | "tensei"
  | "time";

export type UnitType =
  | "Infantry"
  | "Lancer"
  | "Cavalry"
  | "Flier"
  | "Aquatic"
  | "Archer"
  | "Assassin"
  | "Mage"
  | "Holy"
  | "Demon";
