import { UnitType } from "./hero";

export interface ClassWorkbookRow {
  name: string;
  tier: number;
  type: UnitType;
  damage: "Physical" | "Magic";
  range: number;
  move: number;
}
