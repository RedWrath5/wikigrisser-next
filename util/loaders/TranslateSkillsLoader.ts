import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateSkillsMap } from "../../types/translate";

export class TranslateSkillsLoader extends Loader<TranslateSkillsMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateSkillsMap {
    const sheet = this.workBook.Sheets.Skills;
    const translateSkillsMap: TranslateSkillsMap = {};
    let rowCounter = 2;
    let notDone = true;

    while (notDone) {
      translateSkillsMap[sheet["A" + rowCounter]?.v] = {
        name: sheet["B" + rowCounter]?.v || null,
        description: sheet["C" + rowCounter]?.v || null,
      };
      rowCounter++;

      if (!sheet["A" + rowCounter]?.v) {
        notDone = false;
      }
    }
    return translateSkillsMap;
  }
}
