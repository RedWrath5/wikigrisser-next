import { ClassWorkbookRow, Material } from "./spreedsheet";

export interface Hero {
  name: string;
  prettyName: string;
  rarity: "SSR" | "SR" | "R" | "N→SSR" | "SR→SSR";
  talent?: Talent;
  threeCostSkill: Skill | null;
  spClass: SPClass | null;
  startingClass: Class;
  factions: Factions[];
  heroImageUrl?: string;
  bondRequirments: BondRequirements | null;
  soldierBonus: SoldierBonus | null;
  exclusiveEquipment: Equipment | null;
  skinCount: number;
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
  materials: Array<Array<Material>>;
}

export interface SPClass extends Class {
  talent?: Talent;
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

export interface Equipment {
  name: string;
  slot: EquipmentSlot;
  type: EquipmentType;
  effect: string;
  stat1: string | null;
  stat2: string | null;
}

export enum EquipmentSlot {
  Head = "Head",
  Body = "Body",
  Weapon = "Weapon",
  Accessory = "Accessory",
}

export type EquipmentType =
  | "Bow"
  | "Dagger"
  | "Sword"
  | "Axe"
  | "Lance"
  | "Hammer"
  | "Staff"
  | "Cloth"
  | "Leather"
  | "Heavy"
  | "";

export interface Soldier {
  name: string;
  type: UnitType;
  effect: string;
  move: number;
  range: number;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  baseMdef: number;
}
