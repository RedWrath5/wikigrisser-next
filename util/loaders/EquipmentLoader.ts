import { WorkBook } from "xlsx/types";
import { Equipment, Skill } from "../../types/hero";
import {
  EQUIPMENT_COLUMN_HEADERS,
  EQUIPMENT_COLUMN_IDS,
} from "../columnHeaders";
import { Loader } from "./Loader";

export class EquipmentLoader extends Loader<Equipment[]> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateEquipment();
  }

  private generateEquipment() {
    const ecm = this.mapColumnHeadersToColumnIds(
      EQUIPMENT_COLUMN_HEADERS,
      this.workBook.Sheets.Equipment
    ) as EQUIPMENT_COLUMN_IDS;
    let notDone = true;
    let rowCounter = 2;
    let equipmentArr: Equipment[] = [];

    while (notDone) {
      const equipment: Equipment = {
        name: this.getEquipmentRowValue(rowCounter, ecm.name),
        effect: this.getEquipmentRowValue(rowCounter, ecm.equipSkill),
        slot: this.getEquipmentRowValue(rowCounter, ecm.slot) as any,
        stat1: this.getEquipmentRowValue(rowCounter, ecm.stat1),
        stat2: this.getEquipmentRowValue(rowCounter, ecm.stat2),
        type: this.getEquipmentRowValue(rowCounter, ecm.type) as any,
        searchKeywords: [],
      };
      equipmentArr.push(equipment);
      rowCounter++;
      if (!this.getEquipmentRowValue(rowCounter, ecm.name)) {
        notDone = false;
      }
    }

    return equipmentArr;
  }

  private getEquipmentRowValue(rowNumber: number, column: string): string {
    return this.getCellValue(
      this.workBook.Sheets.Equipment[column + rowNumber]
    ) as string;
  }
}

export interface SkillsMap {
  [name: string]: Skill;
}
