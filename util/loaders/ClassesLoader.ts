import { WorkBook, WorkSheet } from "xlsx/types";
import { ClassWorkbookRow, Material } from "../../types/spreedsheet";
import { CLASS_UPGDARE_MATERIALS_COLUMN_HEADERS } from "../columnHeaders";
import { IMAGE_TO_CLASS_MAP } from "../mappers/IMAGE_TO_CLASS_MAP";
import { Loader } from "./Loader";

export class ClassesLoader extends Loader<ClassesMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateClassesMap();
  }

  private generateClassesMap() {
    const classesSheat = this.workBook.Sheets.Classes;
    const classesMap: ClassesMap = {};
    let rowCounter = 3;
    let notDone = true;

    while (notDone) {
      const heroClass: ClassWorkbookRow = {
        name: classesSheat["A" + rowCounter].v || null,
        tier: classesSheat["B" + rowCounter]?.v || null,
        type: IMAGE_TO_CLASS_MAP[classesSheat["C" + rowCounter]?.f] || null,
        damage: classesSheat["D" + rowCounter]?.v || null,
        range: classesSheat["E" + rowCounter]?.v || null,
        move: classesSheat["F" + rowCounter]?.v || null,
        materials: [],
      };

      // Check values in possible columns
      const materials: Material[] = [];
      for (const letter of CLASS_UPGDARE_MATERIALS_COLUMN_HEADERS) {
        if (classesSheat[letter + rowCounter] !== undefined) {
          const material: Material = {
            count: classesSheat[letter + rowCounter].v,
            name: classesSheat[letter + 1].v,
            quality: this.getClassQuality(letter, classesSheat),
          };
          materials.push(material);
        }
      }

      // split into two dimensional array
      for (const v of materials) {
        if (!heroClass.materials[v.quality]) {
          heroClass.materials[v.quality] = [];
        }
        heroClass.materials[v.quality].push(v);
      }
      // remove 0 element, because it always empty
      heroClass.materials.shift();

      classesMap[heroClass.name] = heroClass;

      rowCounter++;
      if (!classesSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return classesMap;
  }

  // Get quality from column caption.
  private getClassQuality = (column: string, classesSheat: WorkSheet) => {
    let index = CLASS_UPGDARE_MATERIALS_COLUMN_HEADERS.indexOf(column);
    while (index >= 0) {
      /* Check header of current column. If nothing, check previous, until get value */
      if (
        classesSheat[CLASS_UPGDARE_MATERIALS_COLUMN_HEADERS[index] + 2] !==
        undefined
      ) {
        // Caption always like "Tier 2 Upgrade 3 (Level 35)". Return upgrade number in integer format
        return parseInt(
          classesSheat[
            CLASS_UPGDARE_MATERIALS_COLUMN_HEADERS[index] + 2
          ].v.charAt(15)
        );
      } else index = index - 1;
    }
    return 0;
  };
}

export interface ClassesMap {
  [name: string]: ClassWorkbookRow;
}
