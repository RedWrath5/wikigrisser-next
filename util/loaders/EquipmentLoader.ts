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

    let rowCounter = 2;
    let equipmentArr: Equipment[] = [];

    while (this.getEquipmentRowValue(rowCounter, ecm.name)) {
      const equipment: Equipment = {
        name: this.getEquipmentRowValue(rowCounter, ecm.name),
        notes: this.getEquipmentRowValue(rowCounter, ecm.notes),
        slot: this.getEquipmentRowValue(rowCounter, ecm.slot) as any,
        type: this.getEquipmentRowValue(rowCounter, ecm.type) as any,
        quality: this.getEquipmentRowValue(rowCounter, ecm.quality) as any,
        stat1: null,
        stat2: null,
        exclusiveForHero: this.getEquipmentRowValue(
          rowCounter,
          ecm.exclusiveForHero
        ),
        effect: {
          lvl1: "",
          lvl10: this.getEquipmentRowValue(rowCounter, ecm.equipSkill10),
          lvl20: this.getEquipmentRowValue(rowCounter, ecm.equipSkill20),
          lvl30: this.getEquipmentRowValue(rowCounter, ecm.equipSkill30),
          lvl40: this.getEquipmentRowValue(rowCounter, ecm.equipSkill40),
          lvl50: this.getEquipmentRowValue(rowCounter, ecm.equipSkill50),
        },
      };

      if (this.getEquipmentRowValue(rowCounter, ecm.stat1Type)) {
        equipment.stat1 = {
          type: this.getEquipmentRowValue(rowCounter, ecm.stat1Type),
          lvl1: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl1Value),
          lvl10: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl10Value),
          lvl20: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl20Value),
          lvl30: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl30Value),
          lvl40: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl40Value),
          lvl50: this.getEquipmentRowValue(rowCounter, ecm.stat1Lvl50Value),
        };
      }

      if (this.getEquipmentRowValue(rowCounter, ecm.stat2Type)) {
        equipment.stat2 = {
          type: this.getEquipmentRowValue(rowCounter, ecm.stat2Type),
          lvl1: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl1Value),
          lvl10: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl10Value),
          lvl20: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl20Value),
          lvl30: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl30Value),
          lvl40: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl40Value),
          lvl50: this.getEquipmentRowValue(rowCounter, ecm.stat2Lvl50Value),
        };
      }

      console.log(equipment, "equipment");
      equipmentArr.push(equipment);
      rowCounter++;
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
