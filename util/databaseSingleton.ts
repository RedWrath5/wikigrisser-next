import XLSX, { WorkBook } from "xlsx";
import { Class, Factions, Hero, Skill, Talent } from "../types/hero";

export class DBSingleton {
  private static instance: DBSingleton;

  private workbook: WorkBook;
  private skillsMap: SkillsMap;
  private heroMap: HeroMap;

  private constructor() {
    this.workbook = XLSX.readFile("data/database.xlsx");
    this.skillsMap = this.generateSkillsMap();
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
        name: skillsSheat["A" + rowCounter].v,
        cost: skillsSheat["C" + rowCounter]?.v,
        cd: skillsSheat["D" + rowCounter]?.v,
        range: skillsSheat["E" + rowCounter]?.v,
        span: skillsSheat["F" + rowCounter]?.v,
        description: skillsSheat["G" + rowCounter]?.v,
      };

      skillsMap[skill.name] = skill;

      rowCounter++;
      if (!skillsSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return skillsMap;
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

    const threeCostSkill: Skill = {
      name: this.getWorkbookHeroRowValue(rowNumber, "CL"),
      cd: this.getWorkbookHeroRowValue(rowNumber, "CN"),
      range: this.getWorkbookHeroRowValue(rowNumber, "CO"),
      span: this.getWorkbookHeroRowValue(rowNumber, "CP"),
      description: this.getWorkbookHeroRowValue(rowNumber, "CQ"),
      cost: 3,
    };

    return {
      name,
      prettyName: this.getWorkbookHeroRowValue(rowNumber, "A"),
      talent,
      factions,
      startingClass,
      threeCostSkill,
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
      K: "protagonist",
      L: "glory",
      M: "origin",
      N: "princess",
      O: "empire",
      P: "strategic",
      Q: "dark",
      R: "meteor",
      S: "legends",
      T: "mythic",
      U: "tensei",
      V: "time",
    };
    const factions: Factions[] = [];

    Object.entries(FACTION_TO_COL_MAP).forEach(([key, value]) => {
      const cellValue = this.getWorkbookHeroRowValue(rowNumber, key);
      if (cellValue === "✓" || cellValue === "✓+") factions.push(value);
    });

    return factions;
  }

  private getStartingClass(rowNumber: number): Class {
    return {
      name: this.getWorkbookHeroRowValue(rowNumber, "X"),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "Y")] || null,
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "Z")] || null,
      ],
      children: [
        this.getFirstClassPath(rowNumber),
        this.getSecondClassPath(rowNumber),
        this.getThirdClassPath(rowNumber),
      ],
      heroType: "Aquatic",
      soldiers: [],
    };
  }

  private getFirstClassPath(rowNumber: number): Class {
    return {
      name: this.getWorkbookHeroRowValue(rowNumber, "AB"),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AC")] || null,
      ],
      heroType: "Aquatic",
      soldiers: [],
      children: [
        {
          name: this.getWorkbookHeroRowValue(rowNumber, "AD"),
          skills: [
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AE")] ||
              null,
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AF")] ||
              null,
          ],
          heroType: "Aquatic",
          soldiers: [],
          children: [],
        },
      ],
    };
  }

  private getSecondClassPath(rowNumber: number): Class {
    return {
      name: this.getWorkbookHeroRowValue(rowNumber, "AP"),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AQ")] || null,
      ],
      heroType: "Aquatic",
      soldiers: [],
      children: [
        {
          name: this.getWorkbookHeroRowValue(rowNumber, "AR"),
          skills: [
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AS")] ||
              null,
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "AT")] ||
              null,
          ],
          heroType: "Aquatic",
          soldiers: [],
          children: [],
        },
      ],
    };
  }

  private getThirdClassPath(rowNumber: number): Class {
    return {
      name: this.getWorkbookHeroRowValue(rowNumber, "BD"),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "BE")] || null,
      ],
      heroType: "Aquatic",
      soldiers: [],
      children: [
        {
          name: this.getWorkbookHeroRowValue(rowNumber, "BF"),
          skills: [
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "BG")] ||
              null,
            this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, "BH")] ||
              null,
          ],
          heroType: "Aquatic",
          soldiers: [],
          children: [],
        },
      ],
    };
  }
}

export interface SkillsMap {
  [name: string]: Skill;
}

export interface HeroMap {
  [name: string]: Hero;
}
