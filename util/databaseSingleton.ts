import XLSX from "xlsx";
import { Hero, SkillsMap, Soldier } from "../types/hero";
import { ClassesLoader, ClassesMap } from "./loaders/ClassesLoader";
import { EquipmentLoader } from "./loaders/EquipmentLoader";
import { HeroLoader } from "./loaders/HeroLoader";
import { MaxStatsLoader } from "./loaders/MaxStatsLoader";
import { PatchLoader } from "./loaders/PatchLoader";
import { SkillsLoader } from "./loaders/SkillsLoader";
import { SoldierLoader } from "./loaders/SoldierLoader";
import { SkillToHeroTransformer } from "./transformers/SkillToHeroTransformer";
import { TrainingLoader } from "./loaders/TrainingLoader";
import { TranslateSoldiersLoader } from "./loaders/TranslateSoldiersLoader";
import {
  TranslateHeroLanguageMap,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
  TranslateSoldiersLanguageMap,
} from "../types/translate";
import { TranslateSkillsLoader } from "./loaders/TranslateSkillsLoader";
import { TranslateHeroLoader } from "./loaders/TranslateHeroLoader";

export class DBSingleton {
  private static instance: DBSingleton;

  static getInstance(): DBSingleton {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private workBook = XLSX.readFile("data/database.xlsx");
  private russian = XLSX.readFile("data/russian.xlsx");
  private skillsMap = new SkillsLoader(this.workBook).load();
  private maxStats = new MaxStatsLoader(this.workBook).load();
  private classesMap = new ClassesLoader(this.workBook).load();
  private heroMap = new HeroLoader(
    this.workBook,
    this.skillsMap,
    this.maxStats,
    this.classesMap
  ).load();
  private patchMap = new PatchLoader(this.workBook).load();
  private equipment = new EquipmentLoader(this.workBook).load();
  private training = new TrainingLoader(this.workBook).load();
  private soldier = new SoldierLoader(this.workBook, this.training).load();
  private translateSoldiersMap: TranslateSoldiersLanguageMap = {
    russian: new TranslateSoldiersLoader(this.russian).load(),
  };
  private translateSkillsMap: TranslateSkillsLanguageMap<ClassesMap> = {
    russian: new TranslateSkillsLoader(this.russian).load(),
  };
  private translateHeroMap: TranslateHeroLanguageMap<HeroMap> = {
    russian: new TranslateHeroLoader(this.russian).load(),
  };
  private skillToHeroMap = new SkillToHeroTransformer(this.heroMap).transform();

  constructor() {
    console.log(this.heroMap,"this.heroMap");
  }

  getWorkBook() {
    return this.workBook;
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

  getSoldiers() {
    return this.soldier;
  }

  getSoldierMap(): SoldierMap {
    const soldierMap: SoldierMap = {};
    this.soldier.map((v) => (soldierMap[v.name] = v));
    return soldierMap;
  }

  get3cSkillsMap(): TranslateSkillsMap<SkillsMap> {
    return Object.keys(this.heroMap).reduce((accumulator, key) => {
      if (this.heroMap[key].threeCostSkill) {
        accumulator[this.heroMap[key].threeCostSkill?.name as string] = {
          name: this.heroMap[key].threeCostSkill?.name as string,
          description: this.heroMap[key].threeCostSkill?.description as string,
        };
      }
      return accumulator;
    }, {} as TranslateSkillsMap<SkillsMap>);
  }

  getTraining() {
    return this.training;
  }

  getTranslateSoldiersMap() {
    return this.translateSoldiersMap;
  }

  getTranslateSkillsMap() {
    return this.translateSkillsMap;
  }

  getTranslateHeroMap() {
    return this.translateHeroMap;
  }
}

export interface HeroMap {
  [name: string]: Hero;
}

export interface SkillToHeroMap {
  [name: string]: string[];
}

export interface SoldierMap {
  [name: string]: Soldier;
}

export interface Patch {
  id: number;
  releaseDate: string;
  formattedDate: string;
  type: "major" | "minor";
  newHeroes: string[];
  info: string;
  name: string;
}

export interface PatchMap {
  [id: number]: Patch;
}
