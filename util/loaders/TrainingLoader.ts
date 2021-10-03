import { WorkBook } from "xlsx/types";
import {
  prettyAnikiTypes,
  TrainingMaterial,
  TrainingSkill,
  TrainingSkillMap,
} from "../../types/hero";
import {
  ANIKI_DROP_HEADERS,
  ANIKI_DROP_HEADERS_IDS,
  TRAINING_HEADERS,
  TRAINING_HEADERS_IDS,
} from "../columnHeaders";
import { Loader } from "./Loader";

export class TrainingLoader extends Loader<TrainingSkillMap> {
  trainingHeadersIds = this.mapColumnHeadersToColumnIds(
    TRAINING_HEADERS,
    this.workBook.Sheets.Training
  ) as TRAINING_HEADERS_IDS;

  anikiDropHeadersIds = this.mapColumnHeadersToColumnIds(
    ANIKI_DROP_HEADERS,
    this.workBook.Sheets.Training
  ) as ANIKI_DROP_HEADERS_IDS;

  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateTraining();
  }

  generateTraining(): TrainingSkillMap {
    let notDone = true;
    let rowCounter = 9;
    let arrayCounter = -1; // counter for result array. We need push new levels into last element
    let type: keyof typeof prettyAnikiTypes = "Infantry"; // training type (Infantry/Cavalry). Need save it here and update if find row with next type

    const resultArray: TrainingSkill[] = [];

    while (notDone) {
      // get name and switch training type if name is new type of training
      const name = this.getTrainingRowValue(
        rowCounter,
        this.trainingHeadersIds.name
      );
      type = this.getTypeFromName(type, name);

      // get level value and check is this row we need to parse (we dont need rows without level value)
      const level = this.getTrainingRowValue(rowCounter, "D");
      if (!this.isValidTrainingRow(level)) {
        rowCounter++;
        continue;
      }

      // if name is not null, then this is new training talent, else its new level of previously parsed
      if (name !== null) {
        const text = this.getTrainingRowValue(rowCounter, "B");
        const item: TrainingSkill = {
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
              gold: this.getTrainingRowValue(
                rowCounter,
                this.trainingHeadersIds.gold
              ),
              books: this.getBooks(type, rowCounter, this.trainingHeadersIds),
              materials: this.getMaterials(rowCounter),
            },
          ],
        };
        resultArray.push(item);
        arrayCounter++;
      } else {
        // Parse rest data and it into levels property
        resultArray[arrayCounter].levels.push({
          level: level,
          modX: this.getTrainingRowValue(rowCounter, "E"),
          modY: this.getTrainingRowValue(rowCounter, "F"),
          modZ: this.getTrainingRowValue(rowCounter, "G"),
          gold: this.getTrainingRowValue(
            rowCounter,
            this.trainingHeadersIds.gold
          ),
          books: this.getBooks(type, rowCounter, this.trainingHeadersIds),
          materials: this.getMaterials(rowCounter),
        });
      }
      rowCounter++;

      notDone = !this.isLastRow(
        rowCounter,
        this.trainingHeadersIds.name,
        this.trainingHeadersIds.gold
      );
    }

    return this.generateMap(resultArray);
  }

  private generateMap(TrainingSKillArray: TrainingSkill[]): TrainingSkillMap {
    const trainingSKillMap: TrainingSkillMap = {};

    for (const skill of TrainingSKillArray) {
      trainingSKillMap[skill.name] = skill;
    }
    return trainingSKillMap;
  }
  private getMaterials(rowCounter: number) {
    const keys = Object.keys(ANIKI_DROP_HEADERS) as Array<
      keyof typeof ANIKI_DROP_HEADERS
    >;

    const result: TrainingMaterial[] = [];
    for (const key of keys) {
      const count = this.getTrainingRowValue(
        rowCounter,
        this.anikiDropHeadersIds[key]
      );

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
    type: keyof typeof prettyAnikiTypes,
    rowCounter: number,
    ids: TRAINING_HEADERS_IDS
  ): TrainingMaterial[] {
    const result: TrainingMaterial[] = [];
    const prettyType = prettyAnikiTypes[type];

    const bronze = this.getTrainingRowValue(rowCounter, ids.bronzeBooks);
    const silver = this.getTrainingRowValue(rowCounter, ids.silverBooks);
    const gold = this.getTrainingRowValue(rowCounter, ids.goldBooks);
    const epic = this.getTrainingRowValue(rowCounter, ids.epicBooks);

    if (bronze)
      result.push({
        name: `${prettyType}BronzeBook`,
        count: bronze,
      });

    if (silver)
      result.push({
        name: `${prettyType}SilverBook`,
        count: silver,
      });

    if (gold)
      result.push({
        name: `${prettyType}GoldBook`,
        count: gold,
      });
    if (epic)
      result.push({
        name: `${prettyType}EpicBook`,
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
  private getTypeFromName(
    currentType: keyof typeof prettyAnikiTypes,
    name: string
  ): keyof typeof prettyAnikiTypes {
    const types: { [key: string]: keyof typeof prettyAnikiTypes } = {
      INFANTRY: "Infantry",
      LANCER: "Lancer",
      CAVALRY: "Cavalry",
      "FLIER & AQUATIC": "Flier/Aquatic",
      "ARCHER & ASSASSIN": "Archer/Assassin",
      "HOLY/MAGE/DEMON": "Holy/Mage/Demon",
    };
    return types[name] || currentType;
  }

  private getTrainingRowValue(rowNumber: number, column: string): string {
    return this.getCellValue(
      this.workBook.Sheets.Training[column + rowNumber]
    ) as string;
  }
}
