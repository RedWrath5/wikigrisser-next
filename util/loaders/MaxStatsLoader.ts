import { WorkBook } from "xlsx/types";
import { MaxStatsWorkbookRow } from "../../types/spreedsheet";
import { Loader } from "./Loader";

export class MaxStatsLoader extends Loader<MaxStatsWorkbookRow[]> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateMaxStats();
  }

  private generateMaxStats(): MaxStatsWorkbookRow[] {
    const maxStatsSheet = this.workBook.Sheets["Max Stats"];
    let notDone = true;
    let rowCounter = 2;
    let maxStatsArr: MaxStatsWorkbookRow[] = [];

    while (notDone) {
      const maxStats = {
        name: maxStatsSheet["A" + rowCounter].v || null,
        class: maxStatsSheet["B" + rowCounter].v || null,
        stats: {
          hp: maxStatsSheet["C" + rowCounter].w || null,
          atk: maxStatsSheet["D" + rowCounter].w || null,
          int: maxStatsSheet["E" + rowCounter].w || null,
          def: maxStatsSheet["F" + rowCounter].w || null,
          mdef: maxStatsSheet["G" + rowCounter].w || null,
          skill: maxStatsSheet["H" + rowCounter].w || null,
        },
      };
      maxStatsArr.push(maxStats);
      rowCounter++;
      if (!maxStatsSheet["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return maxStatsArr;
  }
}
