import { HeroStats, UnitType } from "./hero";

export interface ClassWorkbookRow {
  name: string;
  tier: number;
  type: UnitType;
  damage: "Physical" | "Magic";
  range: number;
  move: number;
}

export interface MaxStatsWorkbookRow {
  name: string;
  class: string;
  stats: HeroStats;
}
