import { WorkBook } from "xlsx/types";
import { Skin, SkinsMap } from "../../types/hero";
import { SKINS_HEADERS, SKINS_IDS } from "../columnHeaders";
import { Loader } from "./Loader";

export class SkinsLoader extends Loader<SkinsMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateSkins();
  }

  private generateSkins() {
    let rowCounter = 2;
    const result: SkinsMap = {};

    const skinColumnMappings = this.mapColumnHeadersToColumnIds(
      SKINS_HEADERS,
      this.workBook.Sheets.Skins
    ) as SKINS_IDS;

    while (this.getSkinCellValue(rowCounter, skinColumnMappings.hero)) {
      const hero = this.getSkinCellValue(
        rowCounter,
        skinColumnMappings.hero
      )?.toLowerCase() as string;

      const skin: Skin = {
        index: this.getSkinCellValue(
          rowCounter,
          skinColumnMappings.index
        ) as string,
        name: this.getSkinCellValue(rowCounter, skinColumnMappings.name),
        source: this.getSkinCellValue(rowCounter, skinColumnMappings.source),
        cost: this.getSkinCellValue(rowCounter, skinColumnMappings.cost),
        notes: this.getSkinCellValue(rowCounter, skinColumnMappings.notes),
      };

      if (result[hero]) {
        result[hero].push(skin);
      } else {
        result[hero] = [skin];
      }

      rowCounter++;
    }

    return result;
  }

  private getSkinCellValue(rowNumber: number, column: string): string | null {
    const cellValue = this.getCellValue(
      this.workBook.Sheets.Skins[column + rowNumber]
    );
    return cellValue?.toString() ? cellValue.toString() : null;
  }
}
