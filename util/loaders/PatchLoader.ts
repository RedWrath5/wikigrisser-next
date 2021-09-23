import { WorkBook } from "xlsx/types";
import { Patch, PatchMap } from "../databaseSingleton";
import { Loader } from "./Loader";

export class PatchLoader extends Loader<PatchMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generatePatchMap();
  }

  private generatePatchMap(): PatchMap {
    const patchSheat = this.workBook.Sheets["News Page"];
    const patchMap: PatchMap = {};
    let rowCounter = 3;
    let notDone = true;

    while (notDone) {
      const patch: Patch = {
        formattedDate: patchSheat["A" + rowCounter].v,
        info: patchSheat["B" + rowCounter].v,
        releaseDate: patchSheat["C" + rowCounter].w,
        id: patchSheat["D" + rowCounter].v,
        type: patchSheat["E" + rowCounter].v,
        newHeroes: [],
      };

      const hero1 = patchSheat["E" + rowCounter]?.v || null;
      hero1 && patch.newHeroes.push(hero1);
      const hero2 = patchSheat["F" + rowCounter]?.v || null;
      hero2 && patch.newHeroes.push(hero2);
      const hero3 = patchSheat["G" + rowCounter]?.v || null;
      hero3 && patch.newHeroes.push(hero3);
      const hero4 = patchSheat["H" + rowCounter]?.v || null;
      hero4 && patch.newHeroes.push(hero4);

      patchMap[patch.id] = patch;

      rowCounter++;
      if (!patchSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return patchMap;
  }
}
