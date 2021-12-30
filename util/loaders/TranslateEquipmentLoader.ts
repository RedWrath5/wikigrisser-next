import { Loader } from "./Loader";
import { WorkBook } from "xlsx";
import { TranslateEquipmentMap } from "../../types/translate";

export class TranslateEquipmentLoader extends Loader<TranslateEquipmentMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load(): TranslateEquipmentMap {
    const sheet = this.workBook.Sheets.Equipment;
    const translateEquipmentMap: TranslateEquipmentMap = {};
    let rowCounter = 2;

    while (this.getCellValue(sheet["A" + rowCounter])) {
      translateEquipmentMap[
        this.getCellValue(sheet["A" + rowCounter]) as string
      ] = {
        name: this.getCellValue(sheet["B" + rowCounter]) as string,
        effect: this.getCellValue(sheet["C" + rowCounter]) as string,
      };
      rowCounter++;
    }
    return translateEquipmentMap;
  }
}
