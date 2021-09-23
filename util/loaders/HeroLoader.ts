import { WorkBook } from "xlsx/types";
import {
  BondRequirements,
  Class,
  Equipment,
  Factions,
  Hero,
  Skill,
  SoldierBonus,
  SPClass,
  Talent,
  UnitType,
} from "../../types/hero";
import { MaxStatsWorkbookRow } from "../../types/spreedsheet";
import { HERO_COLUMN_HEADERS, HERO_COLUMN_IDS } from "../columnHeaders";
import { HeroMap } from "../databaseSingleton";
import { ClassesMap } from "./ClassesLoader";
import { Loader } from "./Loader";
import { SkillsMap } from "./SkillsLoader";

export class HeroLoader extends Loader<HeroMap> {
  constructor(
    workBook: WorkBook,
    private skillsMap: SkillsMap,
    private maxStats: MaxStatsWorkbookRow[],
    private classesMap: ClassesMap
  ) {
    super(workBook);
  }

  load() {
    return this.generateHeroesMap();
  }

  private generateHeroesMap = (): HeroMap => {
    const heroColumnMappings = this.mapColumnHeadersToColumnIds(
      HERO_COLUMN_HEADERS,
      this.workBook.Sheets.Heroes
    ) as HERO_COLUMN_IDS;
    const heroes = [];
    let rowNumber = 3;
    let cellValue = this.getCellValue(
      this.workBook.Sheets.Heroes[heroColumnMappings.name + rowNumber]
    );
    while (cellValue) {
      let heroName = cellValue.toString().toLowerCase();
      heroes.push(heroName);
      rowNumber++;
      cellValue = this.getCellValue(
        this.workBook.Sheets.Heroes[heroColumnMappings.name + rowNumber]
      );
    }

    return heroes.reduce((accumulator, heroName) => {
      accumulator[heroName] = this.getHeroData(heroName, heroColumnMappings);
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

  private getHeroData = (name: string, hcm: HERO_COLUMN_IDS): Hero => {
    let rowNumber = this.findMatchingRow(name, "Heroes", "A");

    const talent: Talent = {
      name: this.getHeroRowValue(rowNumber, hcm.talentName),
      description: this.getHeroRowValue(rowNumber, hcm.talentDescription),
    };

    const factions = this.getFactionsForHero(rowNumber);

    const startingClass = this.getStartingClass(rowNumber, hcm);

    let threeCostSkill: Skill | null = {
      name: this.getHeroRowValue(rowNumber, hcm.awakeningSkillName),
      cd: +this.getHeroRowValue(rowNumber, hcm.awakeningSkillCD),
      range: +this.getHeroRowValue(rowNumber, hcm.awakeningSkillRange),
      span: +this.getHeroRowValue(rowNumber, hcm.awakeningSkillSpan),
      description: this.getHeroRowValue(rowNumber, hcm.awakeningSkillEffect),
      cost: "•••",
    };

    if (threeCostSkill.name === null) threeCostSkill = null;

    let bondRequirments: BondRequirements | null = {
      bond2: this.getHeroRowValue(rowNumber, hcm.bond2ReqString),
      bond3: this.getHeroRowValue(rowNumber, hcm.bond3ReqString),
      bond4: this.getHeroRowValue(rowNumber, hcm.bond4ReqString),
      bond5: this.getHeroRowValue(rowNumber, hcm.bond5ReqString),
    };

    if (bondRequirments.bond2 === undefined) bondRequirments = null;

    let soldierBonus: SoldierBonus | null = {
      hp: +this.getHeroRowValue(rowNumber, hcm.soldierBonusHP),
      atk: +this.getHeroRowValue(rowNumber, hcm.soldierBonusATK),
      def: +this.getHeroRowValue(rowNumber, hcm.soldierBonusDEF),
      mdef: +this.getHeroRowValue(rowNumber, hcm.soldierBonusMDEF),
    };

    if (soldierBonus.hp === undefined) soldierBonus = null;

    let exclusiveEquipment: Equipment | null = {
      name: this.getHeroRowValue(rowNumber, hcm.exclusiveEquipmentName),
      slot: this.getHeroRowValue(rowNumber, hcm.exclusiveEquipmentType) as any,
      effect: this.getHeroRowValue(rowNumber, hcm.exclusiveEquipmentEffect),
      stat1: null,
      stat2: null,
      type: "",
    };

    if (exclusiveEquipment.name === undefined) exclusiveEquipment = null;

    let spClass = this.getSpClass(name) || null;

    return {
      name,
      prettyName: this.getHeroRowValue(rowNumber, hcm.name),
      rarity: this.getHeroRowValue(rowNumber, hcm.rarity) as any,
      talent,
      factions,
      startingClass,
      threeCostSkill,
      bondRequirments,
      soldierBonus,
      exclusiveEquipment,
      spClass,
      skinCount: +this.getHeroRowValue(rowNumber, hcm.skinCount) ?? 0,
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
        this.workBook.Sheets[sheetName][columnToMatch + rowNumber]?.v;

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
    return this.getCellValue(
      this.workBook.Sheets.Heroes[column + rowNumber]
    ) as string;
  }

  private getworkBookSpClassRowValue(rowNumber: number, column: string) {
    return this.workBook.Sheets["SP Heroes"][column + rowNumber]?.v || null;
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

  private getStartingClass(
    rowNumber: number,
    heroColumnMappings: HERO_COLUMN_IDS
  ): Class {
    const soldiers =
      this.getHeroRowValue(
        rowNumber,
        heroColumnMappings.trainingGroundUnlocks
      )?.split(",") || [];
    const name = this.getHeroRowValue(
      rowNumber,
      heroColumnMappings.startingClassName
    );
    return {
      name,
      skills: [
        this.skillsMap[
          this.getHeroRowValue(
            rowNumber,
            heroColumnMappings.startingClassSkill1
          )
        ] || null,
        this.skillsMap[
          this.getHeroRowValue(
            rowNumber,
            heroColumnMappings.startingClassSkill2
          )
        ] || null,
      ],
      children: [
        ...this.getTopLevelClassPath(
          rowNumber,
          heroColumnMappings.leftClassStartingPosition
        ),
        ...this.getTopLevelClassPath(
          rowNumber,
          heroColumnMappings.middleClassStartingPosition
        ),
        ...this.getTopLevelClassPath(
          rowNumber,
          heroColumnMappings.rightClassStartingPosition
        ),
      ],
      heroType: UnitType.Aquatic,
      soldiers: soldiers,
      maxStats: null,
      materials: this.classesMap[name]?.materials || [],
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
        materials: this.classesMap[name]?.materials || [],
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
        materials: this.classesMap[name]?.materials || [],
      },
    ];
    if (classes[0].name === null) classes = [];
    return classes;
  }

  private getSpClass(heroName: string): SPClass | undefined {
    const rowNumber = this.findMatchingRow(heroName, "SP Heroes", "A");

    if (rowNumber === 0) {
      return undefined;
    }

    const name = this.getworkBookSpClassRowValue(rowNumber, "S");

    const talent: Talent = {
      name: this.getworkBookSpClassRowValue(rowNumber, "C"),
      description: this.getworkBookSpClassRowValue(rowNumber, "D"),
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
        this.skillsMap[this.getworkBookSpClassRowValue(rowNumber, "T")] || null,
        this.skillsMap[this.getworkBookSpClassRowValue(rowNumber, "U")] || null,
      ],
      soldiers: [this.getworkBookSpClassRowValue(rowNumber, "V")],
      children: [],
      maxStats,
      materials: [],
    };
  }
}
