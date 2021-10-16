import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateSkillsMap } from "../../types/translate";
import { SkillsMap } from "../../types/hero";

export class TranslateSkillsLoader extends Loader<
  TranslateSkillsMap<SkillsMap>
> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateSkillsMap<SkillsMap> {
    const sheet = this.workBook.Sheets.Skills;
    const translateSkillsMap: TranslateSkillsMap<SkillsMap> = {};
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
