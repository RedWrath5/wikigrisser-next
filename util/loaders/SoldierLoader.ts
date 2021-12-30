import { WorkBook } from "xlsx/types";
import { Soldier, TrainingSkillMap } from "../../types/hero";
import { SOLDIER_COLUMN_HEADERS, SOLDIER_COLUMN_IDS } from "../columnHeaders";
import { IMAGE_TO_CLASS_MAP } from "../mappers/IMAGE_TO_CLASS_MAP";
import { Loader } from "./Loader";

export class SoldierLoader extends Loader<Soldier[]> {
  constructor(workBook: WorkBook, private trainingInfo: TrainingSkillMap) {
    super(workBook);
  }

  load() {
    const soldiers = this.generateSoldiers();
    return this.addTrainingInfo(soldiers);
  }

  generateSoldiers(): Soldier[] {
    const scm = this.mapColumnHeadersToColumnIds(
      SOLDIER_COLUMN_HEADERS,
      this.workBook.Sheets.Soldiers
    ) as SOLDIER_COLUMN_IDS;
    let notDone = true;
    let rowCounter = 2;
    const soldierArr: Soldier[] = [];

    while (notDone) {
      const soldier: Soldier = {
        name: this.getSoldierRowValue(rowCounter, scm.name),
        tier: +this.getSoldierRowValue(rowCounter, scm.tier),
        effect: this.getSoldierRowValue(rowCounter, scm.effect),
        move: +this.getSoldierRowValue(rowCounter, scm.move),
        range: +this.getSoldierRowValue(rowCounter, scm.range),
        type: IMAGE_TO_CLASS_MAP[this.getSoldierRowValue(rowCounter, scm.type)],
        baseAtk: +this.getSoldierRowValue(rowCounter, scm.baseAtk),
        baseDef: +this.getSoldierRowValue(rowCounter, scm.baseDef),
        baseHp: +this.getSoldierRowValue(rowCounter, scm.baseHp),
        baseMdef: +this.getSoldierRowValue(rowCounter, scm.baseMdef),
        trainingSkill: null,
        searchKeywords: [],
        moveType: this.getSoldierRowValue(rowCounter, scm.moveType),
        relatedHeroes: [],
      };
      soldierArr.push(soldier);
      rowCounter++;
      if (!this.getSoldierRowValue(rowCounter, scm.name)) {
        notDone = false;
      }
    }

    return soldierArr;
  }

  private getSoldierRowValue(rowNumber: number, column: string): string {
    return this.getCellValue(
      this.workBook.Sheets.Soldiers[column + rowNumber]
    ) as string;
  }

  private addTrainingInfo(soldiers: Soldier[]): Soldier[] {
    return soldiers.map((v) => {
      return { ...v, trainingSkill: this.trainingInfo[v?.name] || null };
    });
  }
}
