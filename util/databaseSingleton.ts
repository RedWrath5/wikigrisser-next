import XLSX, { CellObject, WorkSheet } from "xlsx";
import {
  BondRequirements,
  Class,
  Equipment,
  Factions,
  Hero,
  Skill,
  SoldierBonus,
  SPClass as SpClass,
  Talent,
  UnitType,
} from "../types/hero";
import { ClassWorkbookRow, MaxStatsWorkbookRow } from "../types/spreedsheet";
import {
  ColIdMap,
  EQUIPMENT_COLUMN_HEADERS,
  EQUIPMENT_COLUMN_IDS,
  FINAL_COL_KEY,
  HERO_COLUMN_HEADERS,
  HERO_COLUMN_IDS,
} from "./columnHeaders";

export class DBSingleton {
  private static instance: DBSingleton;

  private workbook = XLSX.readFile("data/database.xlsx");
  private hCM: HERO_COLUMN_IDS;
  private eCM: EQUIPMENT_COLUMN_IDS;
  private skillsMap: SkillsMap;
  private maxStats: MaxStatsWorkbookRow[];
  private classesMap: ClassesMap;
  private heroMap: HeroMap;
  private skillToHeroMap: SkillToHeroMap;
  private patchMap: PatchMap;
  private equipment: Equipment[];

  private constructor() {
    this.hCM = this.mapColumnHeadersToColumnIds(
      HERO_COLUMN_HEADERS,
      this.workbook.Sheets.Heroes
    ) as HERO_COLUMN_IDS;
    this.eCM = this.mapColumnHeadersToColumnIds(
      EQUIPMENT_COLUMN_HEADERS,
      this.workbook.Sheets.Equipment
    ) as EQUIPMENT_COLUMN_IDS;
    this.skillsMap = this.generateSkillsMap();
    this.maxStats = this.generateMaxStats();
    this.classesMap = this.generateClassesMap();
    this.heroMap = this.generateHeroesMap();
    this.skillToHeroMap = this.generateSkillToHeroMap();
    this.patchMap = this.generatePatchMap();
    this.equipment = this.generateEquipment();
  }

  static getInstance(): DBSingleton {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  getWorkBook() {
    return this.workbook;
  }

  getSkillsMap() {
    return this.skillsMap;
  }

  getHeroesMap() {
    return this.heroMap;
  }

  getSkillsToHeroMap() {
    return this.skillToHeroMap;
  }

  getPatchMap() {
    return this.patchMap;
  }

  getEquipment() {
    return this.equipment;
  }

  private generateSkillsMap() {
    const skillsSheat = this.workbook.Sheets.Skills;
    const skillsMap: SkillsMap = {};
    let rowCounter = 6;
    let notDone = true;

    while (notDone) {
      const skill: Skill = {
        name: skillsSheat["A" + rowCounter].v || null,
        cost: skillsSheat["C" + rowCounter]?.v || null,
        cd: skillsSheat["D" + rowCounter]?.v || null,
        range: skillsSheat["E" + rowCounter]?.v || null,
        span: skillsSheat["F" + rowCounter]?.v || null,
        description: skillsSheat["G" + rowCounter]?.v || null,
      };

      skillsMap[skill.name] = skill;

      rowCounter++;
      if (!skillsSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return skillsMap;
  }

  private generateMaxStats(): MaxStatsWorkbookRow[] {
    const maxStatsSheet = this.workbook.Sheets["Max Stats"];
    let notDone = true;
    let rowCounter = 2;
    let maxStatsArr: MaxStatsWorkbookRow[] = [];

    while (notDone) {
      const maxStats = {
        name: maxStatsSheet["A" + rowCounter].v || null,
        class: maxStatsSheet["B" + rowCounter].v || null,
        stats: {
          hp: maxStatsSheet["C" + rowCounter].w || null,
          atk: maxStatsSheet["D" + rowCounter].w || null,
          int: maxStatsSheet["E" + rowCounter].w || null,
          def: maxStatsSheet["F" + rowCounter].w || null,
          mdef: maxStatsSheet["G" + rowCounter].w || null,
          skill: maxStatsSheet["H" + rowCounter].w || null,
        },
      };
      maxStatsArr.push(maxStats);
      rowCounter++;
      if (!maxStatsSheet["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return maxStatsArr;
  }

  private generateClassesMap() {
    const classesSheat = this.workbook.Sheets.Classes;
    const classesMap: ClassesMap = {};
    let rowCounter = 3;
    let notDone = true;
    const imageToClassMap: { [image: string]: UnitType } = {
      "index(Images!$A$1:$K$1, 1, 1)": "Infantry",
      "index(Images!$A$1:$K$1, 1, 2)": "Lancer",
      "index(Images!$A$1:$K$1, 1, 3)": "Cavalry",
      "index(Images!$A$1:$K$1, 1, 4)": "Flier",
      "index(Images!$A$1:$K$1, 1, 5)": "Aquatic",
      "index(Images!$A$1:$K$1, 1, 6)": "Archer",
      "index(Images!$A$1:$K$1, 1, 7)": "Assassin",
      "index(Images!$A$1:$K$1, 1, 8)": "Holy",
      "index(Images!$A$1:$K$1, 1, 9)": "Mage",
      "index(Images!$A$1:$K$1, 1, 10)": "Demon",
      "index(Images!$A$1:$K$1, 1, 11)": "Dragon",
    };

    while (notDone) {
      const heroClass: ClassWorkbookRow = {
        name: classesSheat["A" + rowCounter].v || null,
        tier: classesSheat["B" + rowCounter]?.v || null,
        type: imageToClassMap[classesSheat["C" + rowCounter]?.f] || null,
        damage: classesSheat["D" + rowCounter]?.v || null,
        range: classesSheat["E" + rowCounter]?.v || null,
        move: classesSheat["F" + rowCounter]?.v || null,
      };

      classesMap[heroClass.name] = heroClass;

      rowCounter++;
      if (!classesSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return classesMap;
  }

  private generateHeroesMap = (): HeroMap => {
    const heroes = [];
    let rowNumber = 3;
    let cellValue = getCellValue(this.workbook.Sheets.Heroes["A" + rowNumber]);
    while (cellValue) {
      let heroName = cellValue.toString().toLowerCase();
      heroes.push(heroName);
      rowNumber++;
      cellValue = getCellValue(this.workbook.Sheets.Heroes["A" + rowNumber]);
    }

    return heroes.reduce((accumulator, heroName) => {
      accumulator[heroName] = this.getHeroData(heroName);
      accumulator[heroName] = this.fixMatthew(
        accumulator[heroName],
        accumulator
      );
      return accumulator;
    }, {} as HeroMap);
  };

  private fixMatthew(hero: Hero, heroMap: HeroMap): Hero {
    if (hero.name.includes("matthew")) {
      const masterMatthew = heroMap["matthew (cavalry)"];
      return {
        ...hero,
        bondRequirments: masterMatthew.bondRequirments,
        rarity: masterMatthew.rarity,
        talent: masterMatthew.talent,
        threeCostSkill: masterMatthew.threeCostSkill,
        soldierBonus: masterMatthew.soldierBonus,
        exclusiveEquipment: masterMatthew.exclusiveEquipment,
      };
    }
    return hero;
  }

  private getHeroData = (name: string): Hero => {
    let rowNumber = this.findMatchingRow(name, "Heroes", "A");

    const talent: Talent = {
      name: this.getHeroRowValue(rowNumber, this.hCM.talentName),
      description: this.getHeroRowValue(rowNumber, this.hCM.talentDescription),
    };

    const factions = this.getFactionsForHero(rowNumber);

    const startingClass = this.getStartingClass(rowNumber);

    let threeCostSkill: Skill | null = {
      name: this.getHeroRowValue(rowNumber, this.hCM.awakeningSkillName),
      cd: +this.getHeroRowValue(rowNumber, this.hCM.awakeningSkillCD),
      range: +this.getHeroRowValue(rowNumber, this.hCM.awakeningSkillRange),
      span: +this.getHeroRowValue(rowNumber, this.hCM.awakeningSkillSpan),
      description: this.getHeroRowValue(
        rowNumber,
        this.hCM.awakeningSkillEffect
      ),
      cost: "•••",
    };

    if (threeCostSkill.name === null) threeCostSkill = null;

    let bondRequirments: BondRequirements | null = {
      bond2: this.getHeroRowValue(rowNumber, this.hCM.bond2ReqString),
      bond3: this.getHeroRowValue(rowNumber, this.hCM.bond3ReqString),
      bond4: this.getHeroRowValue(rowNumber, this.hCM.bond4ReqString),
      bond5: this.getHeroRowValue(rowNumber, this.hCM.bond5ReqString),
    };

    if (bondRequirments.bond2 === undefined) bondRequirments = null;

    let soldierBonus: SoldierBonus | null = {
      hp: +this.getHeroRowValue(rowNumber, this.hCM.soldierBonusHP),
      atk: +this.getHeroRowValue(rowNumber, this.hCM.soldierBonusATK),
      def: +this.getHeroRowValue(rowNumber, this.hCM.soldierBonusDEF),
      mdef: +this.getHeroRowValue(rowNumber, this.hCM.soldierBonusMDEF),
    };

    if (soldierBonus.hp === undefined) soldierBonus = null;

    let exclusiveEquipment: Equipment | null = {
      name: this.getHeroRowValue(rowNumber, this.hCM.exclusiveEquipmentName),
      slot: this.getHeroRowValue(
        rowNumber,
        this.hCM.exclusiveEquipmentType
      ) as any,
      effect: this.getHeroRowValue(
        rowNumber,
        this.hCM.exclusiveEquipmentEffect
      ),
      stat1: null,
      stat2: null,
      type: "",
    };

    if (exclusiveEquipment.name === undefined) exclusiveEquipment = null;

    let spClass = this.getSpClass(name) || null;

    return {
      name,
      prettyName: this.getHeroRowValue(rowNumber, this.hCM.name),
      rarity: this.getHeroRowValue(rowNumber, this.hCM.rarity) as any,
      talent,
      factions,
      startingClass,
      threeCostSkill,
      bondRequirments,
      soldierBonus,
      exclusiveEquipment,
      spClass,
      skinCount: +this.getHeroRowValue(rowNumber, this.hCM.skinCount) ?? 0,
    };
  };

  private findMatchingRow = (
    matchingString: string,
    sheetName: string,
    columnToMatch: string
  ): number => {
    let rowNumber = 3;
    let matchNotFound = true;

    while (matchNotFound) {
      let heroNameInner: string | undefined =
        this.workbook.Sheets[sheetName][columnToMatch + rowNumber]?.v;

      if (heroNameInner) {
        heroNameInner = heroNameInner.toLowerCase();
        rowNumber++;
        matchNotFound = matchingString !== heroNameInner;
      } else {
        rowNumber = 1;
        matchNotFound = false;
      }
    }
    rowNumber--;

    return rowNumber;
  };

  private getHeroRowValue(rowNumber: number, column: string): string {
    return getCellValue(
      this.workbook.Sheets.Heroes[column + rowNumber]
    ) as string;
  }

  private getWorkbookSpClassRowValue(rowNumber: number, column: string) {
    return this.workbook.Sheets["SP Heroes"][column + rowNumber]?.v || null;
  }

  private getFactionsForHero(rowNumber: number): Factions[] {
    const FACTION_TO_COL_MAP: { [key: string]: Factions } = {
      K: Factions.Protagonist,
      L: Factions.Glory,
      M: Factions.Origin,
      N: Factions.Princess,
      O: Factions.Empire,
      P: Factions.Strategic,
      Q: Factions.Dark,
      R: Factions.Meteor,
      S: Factions.Legends,
      T: Factions.Mythic,
      U: Factions.Tensei,
      V: Factions.Time,
    };
    const factions: Factions[] = [];

    Object.entries(FACTION_TO_COL_MAP).forEach(([key, value]) => {
      const cellValue = this.getHeroRowValue(rowNumber, key);
      if (cellValue === "✓" || cellValue === "✓+") factions.push(value);
    });

    return factions;
  }

  private getStartingClass(rowNumber: number): Class {
    const soldiers =
      this.getHeroRowValue(rowNumber, this.hCM.trainingGroundUnlocks)?.split(
        ","
      ) || [];
    return {
      name: this.getHeroRowValue(rowNumber, this.hCM.startingClassName),
      skills: [
        this.skillsMap[
          this.getHeroRowValue(rowNumber, this.hCM.startingClassSkill1)
        ] || null,
        this.skillsMap[
          this.getHeroRowValue(rowNumber, this.hCM.startingClassSkill2)
        ] || null,
      ],
      children: [
        ...this.getTopLevelClassPath(
          rowNumber,
          this.hCM.leftClassStartingPosition
        ),
        ...this.getTopLevelClassPath(
          rowNumber,
          this.hCM.middleClassStartingPosition
        ),
        ...this.getTopLevelClassPath(
          rowNumber,
          this.hCM.rightClassStartingPosition
        ),
      ],
      heroType: "Aquatic",
      soldiers: soldiers,
      maxStats: null,
    };
  }

  private getTopLevelClassPath(
    rowNumber: number,
    startingCol: string
  ): Class[] {
    const skill1 = this.getNextKey(startingCol);
    const children = this.getSecondLevelClassPath(
      rowNumber,
      this.getNextKey(skill1)
    );
    const name = this.getHeroRowValue(rowNumber, startingCol);
    let outerClass: Class[] = [
      {
        name,
        skills: [
          this.skillsMap[this.getHeroRowValue(rowNumber, skill1)] || null,
        ],
        heroType: this.classesMap[name]?.type || null,
        soldiers: [],
        children,
        maxStats: null,
      },
    ];
    if (outerClass[0].name === null) outerClass = [];

    return outerClass;
  }

  private getSecondLevelClassPath(
    rowNumber: number,
    startingCol: string
  ): Class[] {
    const skill1Pos = this.getNextKey(startingCol);
    const soldier1Pos = this.getNextKey(skill1Pos);
    const skill2Pos = this.getNextKey(soldier1Pos);
    const soldier2Pos = this.getNextKey(skill2Pos);
    const name = this.getHeroRowValue(rowNumber, startingCol);
    const heroName = this.getHeroRowValue(rowNumber, "A");
    const maxStats =
      this.maxStats.find(
        (stats) => stats.class === name && stats.name === heroName
      )?.stats || null;
    const classInstance = Object.entries(this.classesMap).find(
      (entry) => entry[0].indexOf(name) > -1
    )?.[1];

    let classes: Class[] = [
      {
        name,
        skills: [
          this.skillsMap[this.getHeroRowValue(rowNumber, skill1Pos)] || null,
          this.skillsMap[this.getHeroRowValue(rowNumber, skill2Pos)] || null,
        ],
        heroType: classInstance?.type || null,
        soldiers: [
          this.getHeroRowValue(rowNumber, soldier1Pos),
          this.getHeroRowValue(rowNumber, soldier2Pos),
        ],
        children: [],
        maxStats,
      },
    ];
    if (classes[0].name === null) classes = [];
    return classes;
  }

  private getSpClass(heroName: string): SpClass | undefined {
    const rowNumber = this.findMatchingRow(heroName, "SP Heroes", "A");

    if (rowNumber === 0) {
      return undefined;
    }

    const name = this.getWorkbookSpClassRowValue(rowNumber, "S");

    const talent: Talent = {
      name: this.getWorkbookSpClassRowValue(rowNumber, "C"),
      description: this.getWorkbookSpClassRowValue(rowNumber, "D"),
    };

    const maxStats =
      this.maxStats.find(
        (stats) =>
          stats.class === name && stats.name.toLocaleLowerCase() === heroName
      )?.stats || null;

    return {
      name,
      talent,
      heroType: this.classesMap[name]?.type || null,
      skills: [
        this.skillsMap[this.getWorkbookSpClassRowValue(rowNumber, "T")] || null,
        this.skillsMap[this.getWorkbookSpClassRowValue(rowNumber, "U")] || null,
      ],
      soldiers: [this.getWorkbookSpClassRowValue(rowNumber, "V")],
      children: [],
      maxStats,
    };
  }

  private generateSkillToHeroMap(): SkillToHeroMap {
    return Object.values(this.heroMap)
      .map((hero) => this.getSkillsPerHero(hero))
      .reduce(this.reduceHeroSkillsTouplesToSkillMap, {} as SkillToHeroMap);
  }

  private getSkillsPerHero(hero: Hero): HeroSkillsTouple {
    return [
      hero.prettyName,
      [
        ...(hero.spClass?.skills || []),
        ...this.getSkillsPerClass(hero.startingClass),
      ],
    ];
  }

  private getSkillsPerClass(classVar: Class): Skill[] {
    return [
      ...classVar.skills,
      ...classVar.children.flatMap((child) => this.getSkillsPerClass(child)),
    ];
  }

  private reduceHeroSkillsTouplesToSkillMap(
    accumulator: SkillToHeroMap,
    [heroName, skills]: HeroSkillsTouple
  ) {
    skills.forEach((skill) => {
      if (skill) {
        accumulator[skill.name] = [
          ...(accumulator[skill.name] || []),
          heroName,
        ];
      }
    });
    return accumulator;
  }

  private generatePatchMap(): PatchMap {
    const patchSheat = this.workbook.Sheets["News Page"];
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

  private generateEquipment() {
    let notDone = true;
    let rowCounter = 2;
    let equipmentArr: Equipment[] = [];

    while (notDone) {
      const equipment: Equipment = {
        name: this.getEquipmentRowValue(rowCounter, this.eCM.name),
        effect: this.getEquipmentRowValue(rowCounter, this.eCM.equipSkill),
        slot: this.getEquipmentRowValue(rowCounter, this.eCM.slot) as any,
        stat1: this.getEquipmentRowValue(rowCounter, this.eCM.stat1),
        stat2: this.getEquipmentRowValue(rowCounter, this.eCM.stat2),
        type: this.getEquipmentRowValue(rowCounter, this.eCM.type) as any,
      };
      equipmentArr.push(equipment);
      rowCounter++;
      if (!this.getEquipmentRowValue(rowCounter, this.eCM.name)) {
        notDone = false;
      }
    }

    return equipmentArr;
  }

  private getEquipmentRowValue(rowNumber: number, column: string): string {
    return getCellValue(
      this.workbook.Sheets.Equipment[column + rowNumber]
    ) as string;
  }

  private mapColumnHeadersToColumnIds(
    columnHeaders: { [key: string]: string[] },
    sheet: WorkSheet
  ) {
    return Object.keys(columnHeaders).reduce((accumulator, key) => {
      const value = columnHeaders[key];
      let rowNumber = 1;
      let columnId = "A";
      value.forEach((columnIdToFind) => {
        columnId = this.scanForHeaderString(
          columnIdToFind,
          sheet,
          rowNumber,
          columnId
        );
        rowNumber++;
      });
      accumulator[key] = columnId;
      return accumulator;
    }, {} as ColIdMap);
  }

  private scanForHeaderString(
    headerToFind: string,
    sheet: WorkSheet,
    rowNumberToScan: number,
    colIdToStartOn: string = "A"
  ): string {
    let currentCol = colIdToStartOn;
    let notDone = true;

    while (notDone) {
      const cellId = currentCol + rowNumberToScan;
      const cellValue = getCellValue(sheet[cellId]);

      if (cellValue === FINAL_COL_KEY) {
        notDone = false;
        console.error("Column Key not Found", headerToFind);
      }

      if (cellValue === headerToFind) {
        notDone = false;
        return currentCol;
      }
      currentCol = this.getNextKey(currentCol);
    }

    return "";
  }

  private getNextKey(key: string): string {
    // https://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
    if (key === "Z" || key === "z") {
      return (
        String.fromCharCode(key.charCodeAt(0) - 25) +
        String.fromCharCode(key.charCodeAt(0) - 25)
      ); // AA or aa
    } else {
      var lastChar = key.slice(-1);
      var sub = key.slice(0, -1);
      if (lastChar === "Z" || lastChar === "z") {
        // If a string of length > 1 ends in Z/z,
        // increment the string (excluding the last Z/z) recursively,
        // and append A/a (depending on casing) to it
        return (
          this.getNextKey(sub) +
          String.fromCharCode(lastChar.charCodeAt(0) - 25)
        );
      } else {
        // (take till last char) append with (increment last char)
        return sub + String.fromCharCode(lastChar.charCodeAt(0) + 1);
      }
    }
  }
}

interface SkillsMap {
  [name: string]: Skill;
}

export interface HeroMap {
  [name: string]: Hero;
}

interface ClassesMap {
  [name: string]: ClassWorkbookRow;
}

export interface SkillToHeroMap {
  [name: string]: string[];
}

type HeroSkillsTouple = [string, Skill[]];

export interface Patch {
  id: number;
  releaseDate: string;
  formattedDate: string;
  type: "major" | "minor";
  newHeroes: string[];
  info: string;
}

export interface PatchMap {
  [id: number]: Patch;
}

function getCellValue(cellObj: CellObject | undefined) {
  if (!cellObj) return null;
  if (cellObj.w) return cellObj.w;

  if (cellObj.v) return cellObj.v;

  if (cellObj.f) return cellObj.f;

  return null;
}
