import { WorkBook } from "xlsx/types";
import { PATCHES_HEADERS, PATCHES_IDS } from "../columnHeaders";
import { Patch, PatchMap } from "../databaseSingleton";
import { Loader } from "./Loader";

export class PatchLoader extends Loader<PatchMap> {
  sheet = this.workBook.Sheets.Patches;
  headers = this.mapColumnHeadersToColumnIds(
    PATCHES_HEADERS,
    this.sheet
  ) as PATCHES_IDS;

  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generatePatchMap();
  }

  private generatePatchMap(): PatchMap {
    const patchMap: PatchMap = {};
    let rowCounter = 2;
    let notDone = true;

    while (notDone) {
      const patch: Patch = {
        cnReleaseDate: this.getPatchRowValue(
          rowCounter,
          this.headers.cnReleaseDate
        ),
        info: this.getPatchRowValue(rowCounter, this.headers.info),
        releaseDate: this.getPatchRowValue(
          rowCounter,
          this.headers.globalReleaseDate
        ),
        id: +this.getPatchRowValue(rowCounter, this.headers.id),
        name: this.getPatchRowValue(rowCounter, this.headers.patchName),
        type: this.getPatchRowValue(
          rowCounter,
          this.headers.patchType
        ) as "major",
        newHeroes: [],
      };

      const hero1 =
        this.getPatchRowValue(rowCounter, this.headers.newHero1) || null;
      hero1 && patch.newHeroes.push(hero1);
      const hero2 =
        this.getPatchRowValue(rowCounter, this.headers.newHero2) || null;
      hero2 && patch.newHeroes.push(hero2);
      const hero3 =
        this.getPatchRowValue(rowCounter, this.headers.newHero3) || null;
      hero3 && patch.newHeroes.push(hero3);
      const hero4 =
        this.getPatchRowValue(rowCounter, this.headers.newHero4) || null;
      hero4 && patch.newHeroes.push(hero4);

      patchMap[patch.id] = patch;

      rowCounter++;
      if (!this.getPatchRowValue(rowCounter, this.headers.id)) {
        notDone = false;
      }
    }

    return patchMap;
  }

  private getPatchRowValue(rowNumber: number, column: string): string {
    return this.getCellValue(this.sheet[column + rowNumber]) as string;
  }
}
