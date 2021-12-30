import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateUIMap } from "../../types/translate";

export class TranslateUILoader extends Loader<TranslateUIMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateUIMap {
    const sheet = this.workBook.Sheets.UI;
    const translateUIMap: any = {};
    let rowCounter = 2;

    while (this.getCellValue(sheet["A" + rowCounter])) {
      translateUIMap[this.getCellValue(sheet["A" + rowCounter]) as string] =
        this.getCellValue(sheet["B" + rowCounter]) as string;

      rowCounter++;
    }
    return translateUIMap;
  }
}
