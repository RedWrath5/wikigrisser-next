import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateClassMap } from "../../types/translate";

export class TranslateClassLoader extends Loader<TranslateClassMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateClassMap {
    const sheet = this.workBook.Sheets.Class;
    const translateSkillsMap: TranslateClassMap = {};
    let rowCounter = 2;

    while (this.getCellValue(sheet["A" + rowCounter])) {
      translateSkillsMap[this.getCellValue(sheet["A" + rowCounter]) as string] =
        {
          name: this.getCellValue(sheet["B" + rowCounter]) as string,
        };
      rowCounter++;
    }
    return translateSkillsMap;
  }
}
