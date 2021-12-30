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

    while (this.getCellValue(sheet["A" + rowCounter])) {
      translateSoldiersMap[
        this.getCellValue(sheet["A" + rowCounter]) as string
      ] = {
        name: this.getCellValue(sheet["B" + rowCounter]) as string,
        effect: this.getCellValue(sheet["C" + rowCounter]) as string,
      };
      rowCounter++;
    }
    return translateSoldiersMap;
  }
}
