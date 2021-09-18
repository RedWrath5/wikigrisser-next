import { HeroStats, UnitType } from "./hero";

export interface ClassWorkbookRow {
  name: string;
  tier: number;
  type: UnitType;
  damage: "Physical" | "Magic";
  range: number;
  move: number;
  materials: Array<Array<Material>>;
}

export interface Material {
  name: string; // material name
  count: number; // how many need
  quality: number; // class quality (1,2,3)
}
export interface MaxStatsWorkbookRow {
  name: string;
  class: string;
  stats: HeroStats;
}
