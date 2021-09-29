import { WorkBook } from "xlsx/types";
import { TrainingMaterial, TrainingSKill } from "../../types/hero";
import {
  ANIKI_DROP_HEADERS,
  ANIKI_DROP_HEADERS_IDS,
  TRAINING_HEADERS,
  TRAINING_HEADERS_IDS,
} from "../columnHeaders";
import { Loader } from "./Loader";

export class TrainingLoader extends Loader<TrainingSKill[]> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateTraining();
  }

  generateTraining(): TrainingSKill[] {
    const ids = this.mapColumnHeadersToColumnIds(
      TRAINING_HEADERS,
      this.workBook.Sheets.Training
    ) as TRAINING_HEADERS_IDS;

    let notDone = true;
    let rowCounter = 9;
    let arrayCounter = -1; // counter for result array. We need push new levels into last element
    let type = ""; // training type (Infantry/Cavalry). Need save it here and update if find row with next type

    const result: TrainingSKill[] = [];
    //    let name: string;
    //  let text: string;

    while (notDone) {
      // get name and switch training type if name is new type of training
      const name = this.getTrainingRowValue(rowCounter, ids.name);
      type = this.getTypeFromName(name) || type;

      // get level value and check is this row we need to parse (we dont need rows without level value)
      const level = this.getTrainingRowValue(rowCounter, "D");
      if (!this.isValidTrainingRow(level)) {
        rowCounter++;
        continue;
      }

      // if name is not null, then this is new training talent, else its new level of previously parsed
      if (name !== null) {
        const text = this.getTrainingRowValue(rowCounter, "B");
        const item: any = {
          name,
          text,
          type,
          levels: [
            //first level
            {
              level: level,
              modX: this.getTrainingRowValue(rowCounter, "E"),
              modY: this.getTrainingRowValue(rowCounter, "F"),
              modZ: this.getTrainingRowValue(rowCounter, "G"),
              gold: this.getTrainingRowValue(rowCounter, ids.gold),
              books: this.getBooks(type, rowCounter, ids),
              materials: this.getMaterials(rowCounter),
            },
          ],
        };
        result.push(item);
        arrayCounter++;
      } else {
        // Parse rest data and it into levels property
        result[arrayCounter].levels.push({
          level: level,
          modX: this.getTrainingRowValue(rowCounter, "E"),
          modY: this.getTrainingRowValue(rowCounter, "F"),
          modZ: this.getTrainingRowValue(rowCounter, "G"),
          gold: this.getTrainingRowValue(rowCounter, ids.gold),
          books: this.getBooks(type, rowCounter, ids),
          materials: this.getMaterials(rowCounter),
        });
      }
      rowCounter++;

      notDone = !this.isLastRow(rowCounter, ids.name, ids.gold);
    }
    return result;
  }

  private getMaterials(rowCounter: number) {
    const ids = this.mapColumnHeadersToColumnIds(
      ANIKI_DROP_HEADERS,
      this.workBook.Sheets.Training
    ) as ANIKI_DROP_HEADERS_IDS;

    const keys = Object.keys(ANIKI_DROP_HEADERS) as Array<
      keyof typeof ANIKI_DROP_HEADERS
    >;

    const result: TrainingMaterial[] = [];
    for (const key of keys) {
      const count = this.getTrainingRowValue(rowCounter, ids[key]);

      if (count) {
        result.push({
          name: ANIKI_DROP_HEADERS[key][0],
          count: count,
        });
      }
    }
    return result;
  }

  private getBooks(
    type: string,
    rowCounter: number,
    ids: TRAINING_HEADERS_IDS
  ): TrainingMaterial[] {
    const result: TrainingMaterial[] = [];
    let prettyType = "";
    switch (type) {
      case "Infantry":
        prettyType = "infantry";
        break;
      case "Lancer":
        prettyType = "lancer";
        break;
      case "Cavalry":
        prettyType = "cavalry";
        break;
      case "Flier/Aquatic":
        prettyType = "flier";
        break;
      case "Archer/Assassin":
        prettyType = "archer";
        break;
      case "Holy/Mage/Demon":
        prettyType = "holy";
        break;
    }

    const bronze = this.getTrainingRowValue(rowCounter, ids.bronzeBooks);
    const silver = this.getTrainingRowValue(rowCounter, ids.silverBooks);
    const gold = this.getTrainingRowValue(rowCounter, ids.goldBooks);
    const epic = this.getTrainingRowValue(rowCounter, ids.epicBooks);

    if (bronze)
      result.push({
        name: `${prettyType}BronzeBooks`,
        count: bronze,
      });

    if (silver)
      result.push({
        name: `${prettyType}SilverBooks`,
        count: silver,
      });

    if (gold)
      result.push({
        name: `${prettyType}GoldBooks`,
        count: gold,
      });

    if (epic)
      result.push({
        name: `${prettyType}EpicBooks`,
        count: epic,
      });

    return result;
  }

  /*
   * Check if this row is real talent row, not just border between training type or something else
   * real talent contain valid level number (int).
   * */
  private isValidTrainingRow(level: string): boolean {
    return !isNaN(parseInt(level));
  }
  // Check is this row have data.
  private isLastRow(rowCounter: number, nameCol: string, goldCol: string) {
    const name = this.getCellValue(
      this.workBook.Sheets.Training[nameCol + rowCounter]
    ) as string;
    const gold = this.getCellValue(
      this.workBook.Sheets.Training[goldCol + rowCounter]
    ) as string;
    // if both values is null, then this line is data end.
    return name === null && gold === null;
  }

  /* Get training type from name column.
  Need check if name is real type of training, if no then we use previous type
  */
  private getTypeFromName(name: string): string | null {
    const types: { [key: string]: string } = {
      INFANTRY: "Infantry",
      LANCER: "Lancer",
      CAVALRY: "Cavalry",
      "FLIER & AQUATIC": "Flier/Aquatic",
      "ARCHER & ASSASSIN": "Archer/Assassin",
      "HOLY/MAGE/DEMON": "Holy/Mage/Demon",
    };
    if (Object.keys(types).includes(name)) {
      return types[name];
    } else return null;
  }

  private getTrainingRowValue(rowNumber: number, column: string): string {
    return this.getCellValue(
      this.workBook.Sheets.Training[column + rowNumber]
    ) as string;
  }
}
