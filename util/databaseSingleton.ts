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
      cost: "•••",
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
        this.getClassPath(rowNumber, "AB"),
        this.getClassPath(rowNumber, "AP"),
        this.getClassPath(rowNumber, "BD"),
      ],
      heroType: "Aquatic",
      soldiers: [],
    };
  }

  private getClassPath(rowNumber: number, startingCol: string): Class {
    const skill1 = this.getNextKey(startingCol);
    const name2 = this.getNextKey(skill1);
    const skill2 = this.getNextKey(name2);
    const skill3 = this.getNextKey(skill2);
    let children: Class[] = [
      {
        name: this.getWorkbookHeroRowValue(rowNumber, name2),
        skills: [
          this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill2)] ||
            null,
          this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill3)] ||
            null,
        ],
        heroType: "Aquatic",
        soldiers: [],
        children: [],
      },
    ];
    if (children[0].name === null) children = [];

    return {
      name: this.getWorkbookHeroRowValue(rowNumber, startingCol),
      skills: [
        this.skillsMap[this.getWorkbookHeroRowValue(rowNumber, skill1)] || null,
      ],
      heroType: "Aquatic",
      soldiers: [],
      children,
    };
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

export interface SkillsMap {
  [name: string]: Skill;
}

export interface HeroMap {
  [name: string]: Hero;
}
