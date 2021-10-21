import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateHeroMap } from "../../types/translate";
import { HeroMap } from "../databaseSingleton";

export class TranslateHeroLoader extends Loader<TranslateHeroMap<HeroMap>> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateHeroMap<HeroMap> {
    const sheet = this.workBook.Sheets.Heroes;
    const translateHeroMap: TranslateHeroMap<HeroMap> = {};
    let rowCounter = 2;
    let notDone = true;

    while (notDone) {
      translateHeroMap[this.getCellValue(sheet["A" + rowCounter]) as string] = {
        name: this.getCellValue(sheet["B" + rowCounter]) as string,
        talentName: this.getCellValue(sheet["C" + rowCounter]) as string,
        talentDescription: this.getCellValue(sheet["D" + rowCounter]) as string,
        bond2: this.getCellValue(sheet["E" + rowCounter]) as string,
        bond3: this.getCellValue(sheet["F" + rowCounter]) as string,
        bond4: this.getCellValue(sheet["G" + rowCounter]) as string,
        bond5: this.getCellValue(sheet["H" + rowCounter]) as string,
        uniqueEquipmentName: this.getCellValue(
          sheet["I" + rowCounter]
        ) as string,
        uniqueEquipmentDescription: this.getCellValue(
          sheet["J" + rowCounter]
        ) as string,
      };
      rowCounter++;

      if (!this.getCellValue(sheet["A" + rowCounter])) {
        notDone = false;
      }
    }
    return translateHeroMap;
  }
}
