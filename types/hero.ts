export interface Hero {
  name: string;
  prettyName: string;
  rarity: "SSR" | "SR" | "R" | "N→SSR" | "SR→SSR";
  talent?: Talent;
  threeCostSkill: Skill | null;
  SpClass?: Class;
  startingClass: Class;
  factions: Factions[];
  heroImageUrl?: string;
  bondRequirments: BondRequirements | null;
  soldierBonus: SoldierBonus | null;
  exclusiveEquipment: Equipment | null;
}

export interface Talent {
  name: string;
  description: string;
  descriptionUrl?: string;
  descriptionMarkdown?: string;
}

export interface Class {
  name: string;
  heroType: UnitType | null;
  skills: Skill[];
  soldiers: string[];
  children: Class[];
  maxStats: HeroStats | null;
}

export interface Skill {
  name: string;
  description?: string;
  descriptionMarkdown?: string;
  cost: "•" | "••" | "•••";
  cd?: number;
  range?: number;
  span?: number;
}

export interface HeroStats {
  hp: string;
  atk: string;
  int: string;
  def: string;
  mdef: string;
  skill: string;
}

export interface BondRequirements {
  bond2: string;
  bond3: string;
  bond4: string;
  bond5: string;
}

export interface SoldierBonus {
  hp: number;
  atk: number;
  def: number;
  mdef: number;
}

export interface Equipment {
  name: string;
  type: "Helmet" | "Armor" | "Weapon" | "Accessory";
  effect: string;
}

// export type Factions =
//   | "protagonist"
//   | "glory"
//   | "origin"
//   | "princess"
//   | "empire"
//   | "strategic"
//   | "dark"
//   | "meteor"
//   | "legends"
//   | "mythic"
//   | "tensei"
//   | "time";

export enum Factions {
  Protagonist = "protagonist",
  Glory = "glory",
  Origin = "origin",
  Princess = "princess",
  Empire = "empire",
  Strategic = "strategic",
  Dark = "dark",
  Meteor = "meteor",
  Legends = "legends",
  Mythic = "mythic",
  Tensei = "tensei",
  Time = "time",
}

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
  | "Demon"
  | "Dragon";
