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

    while (this.getCellValue(sheet["A" + rowCounter])) {
      translateSkillsMap[this.getCellValue(sheet["A" + rowCounter]) as string] =
        {
          name: this.getCellValue(sheet["B" + rowCounter]) as string,
          description: this.getCellValue(sheet["C" + rowCounter]) as string,
        };
      rowCounter++;
    }
    return translateSkillsMap;
  }
}
