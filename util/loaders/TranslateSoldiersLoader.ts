import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateSoldiersMap } from "../../types/translate";

export class TranslateSoldiersLoader extends Loader<TranslateSoldiersMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateSoldiersMap {
    const sheet = this.workBook.Sheets.Soldiers;
    const translateSoldiersMap: TranslateSoldiersMap = {};
    let rowCounter = 2;
    let notDone = true;

    while (notDone) {
      translateSoldiersMap[sheet["A" + rowCounter]?.v] = {
        name: sheet["B" + rowCounter]?.v || null,
        effect: sheet["C" + rowCounter]?.v || null,
      };
      rowCounter++;

      if (!sheet["A" + rowCounter]?.v) {
        notDone = false;
      }
    }
    return translateSoldiersMap;
  }
}
