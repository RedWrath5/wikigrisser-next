import XLSX, { WorkBook } from "xlsx";
import {
  BondRequirements,
  Class,
  Equipment,
  Factions,
  Hero,
  Skill,
  SoldierBonus,
  Talent,
  UnitType,
} from "../types/hero";
import { ClassWorkbookRow, MaxStatsWorkbookRow } from "../types/spreedsheet";

export class DBSingleton {
  private static instance: DBSingleton;

  private workbook: WorkBook;
  private skillsMap: SkillsMap;
  private maxStats: MaxStatsWorkbookRow[];
  private classesMap: ClassesMap;
  private heroMap: HeroMap;

  private constructor() {
    this.workbook = XLSX.readFile("data/database.xlsx");
    this.skillsMap = this.generateSkillsMap();
    this.maxStats = this.getMaxStats();
    this.classesMap = this.generateClassesMap();
    this.heroMap = this.generateHeroesMap();
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

  getMaxStats(): MaxStatsWorkbookRow[] {
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
      "INDEX(Images!$A$1:$K$1, 1, 1)": "Infantry",
      "INDEX(Images!$A$1:$K$1, 1, 2)": "Lancer",
      "INDEX(Images!$A$1:$K$1, 1, 3)": "Cavalry",
      "INDEX(Images!$A$1:$K$1, 1, 4)": "Flier",
      "INDEX(Images!$A$1:$K$1, 1, 5)": "Aquatic",
      "INDEX(Images!$A$1:$K$1, 1, 6)": "Archer",
      "INDEX(Images!$A$1:$K$1, 1, 7)": "Assassin",
      "INDEX(Images!$A$1:$K$1, 1, 8)": "Holy",
      "INDEX(Images!$A$1:$K$1, 1, 9)": "Mage",
      "INDEX(Images!$A$1:$K$1, 1, 10)": "Demon",
      "INDEX(Images!$A$1:$K$1, 1, 11)": "Dragon",
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

  private generateHeroesMap(): HeroMap {
    const heroes = [];
    let rowNumber = 3;
    while (this.workbook.Sheets.Heroes["A" + rowNumber]?.v) {
      let heroName: string = this.workbook.Sheets.Heroes["A" + rowNumber].v;
      heroName = heroName.toLowerCase();
      heroes.push(heroName);
      rowNumber++;
    }

    return heroes.reduce((accumulator, heroName) => {
      accumulator[heroName] = this.getHeroData(heroName);
      return accumulator;
    }, {} as HeroMap);
  }

  private getHeroData(name: string): Hero {
    let rowNumber = this.findHeroRow(name);

    const talent: Talent = {
      name: this.getWorkbookHeroRowValue(rowNumber, "C"),
      description: this.getWorkbookHeroRowValue(rowNumber, "D"),
    };

    const factions = this.getFactionsForHero(rowNumber);

    const startingClass = this.getStartingClass(rowNumber);

    let threeCostSkill: Skill | null = {
      name: this.getWorkbookHeroRowValue(rowNumber, "CM"),
      cd: this.getWorkbookHeroRowValue(rowNumber, "CO"),
      range: this.getWorkbookHeroRowValue(rowNumber, "CP"),
      span: this.getWorkbookHeroRowValue(rowNumber, "CQ"),
      description: this.getWorkbookHeroRowValue(rowNumber, "CR"),
      cost: "•••",
    };

    if (threeCostSkill.name === null) threeCostSkill = null;

    let bondRequirments: BondRequirements | null = {
      bond2: this.getWorkbookHeroRowValue(rowNumber, "BX"),
      bond3: this.getWorkbookHeroRowValue(rowNumber, "BY"),
      bond4: this.getWorkbookHeroRowValue(rowNumber, "BZ"),
      bond5: this.getWorkbookHeroRowValue(rowNumber, "CA"),
    };

    if (bondRequirments.bond2 === undefined) bondRequirments = null;

    let soldierBonus: SoldierBonus | null = {
      hp: this.getWorkbookHeroRowValue(rowNumber, "BR"),
      atk: this.getWorkbookHeroRowValue(rowNumber, "BS"),
      def: this.getWorkbookHeroRowValue(rowNumber, "BT"),
      mdef: this.getWorkbookHeroRowValue(rowNumber, "BU"),
    };

    if (soldierBonus.hp === undefined) soldierBonus = null;

    let exclusiveEquipment: Equipment | null = {
      name: this.getWorkbookHeroRowValue(rowNumber, "CJ"),
      type: this.getWorkbookHeroRowValue(rowNumber, "CK"),
      effect: this.getWorkbookHeroRowValue(rowNumber, "CL"),
    };

    if (exclusiveEquipment.name === undefined) exclusiveEquipment = null;

    return {
      name,
      prettyName: this.getWorkbookHeroRowValue(rowNumber, "A"),
      talent,
      factions,
      startingClass,
      threeCostSkill,
      bondRequirments,
      soldierBonus,
      exclusiveEquipment,
    };
  }

  private findHeroRow = (heroName: string): number => {
    let rowNumber = 3;
    let matchNotFound = true;

    while (matchNotFound) {
      let heroNameInner = this.workbook.Sheets.Heroes["A" + rowNumber].v;
      heroNameInner = heroNameInner.toLowerCase();
      rowNumber++;
      matchNotFound = heroName !== heroNameInner;
    }
    rowNumber--;

    return rowNumber;
  };

  private getWorkbookHeroRowValue(rowNumber: number, column: string) {
    return this.workbook.Sheets.Heroes[column + rowNumber]?.v || null;
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
      const cellValue = this.getWorkbookHeroRowValue(rowNumber, key);
      if (cellValue === "✓" || cellValue === "✓+") factions.push(value);
    });

    return factions;
  }

  private getStartingClass(rowNumber: number): Class {
    const soldiers =
      this.getWorkbookHeroRowValue(rowNumber, "BV")?.split(",") || [];
    return {
      name: this.getWorkbookHeroRowValue(rowNumber, "X"),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "Y")] || null,
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "Z")] || null,
      ],
      children: [
        ...this.getTopLevelClassPath(rowNumber, "AB"),
        ...this.getTopLevelClassPath(rowNumber, "AP"),
        ...this.getTopLevelClassPath(rowNumber, "BD"),
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
    const name = this.getWorkbookHeroRowValue(rowNumber, startingCol);
    let outerClass: Class[] = [
      {
        name,
        skills: [
          this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill1)] ||
            null,
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
    const name = this.getWorkbookHeroRowValue(rowNumber, startingCol);
    const heroName = this.getWorkbookHeroRowValue(rowNumber, "A");
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
          this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill1Pos)] ||
            null,
          this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill2Pos)] ||
            null,
        ],
        heroType: classInstance?.type || null,
        soldiers: [
          this.getWorkbookHeroRowValue(rowNumber, soldier1Pos),
          this.getWorkbookHeroRowValue(rowNumber, soldier2Pos),
        ],
        children: [],
        maxStats,
      },
    ];
    if (classes[0].name === null) classes = [];
    return classes;
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
