import XLSX from "xlsx";
import { Hero, Soldier } from "../types/hero";
import { ClassesLoader } from "./loaders/ClassesLoader";
import { EquipmentLoader } from "./loaders/EquipmentLoader";
import { HeroLoader } from "./loaders/HeroLoader";
import { MaxStatsLoader } from "./loaders/MaxStatsLoader";
import { PatchLoader } from "./loaders/PatchLoader";
import { SkillsLoader } from "./loaders/SkillsLoader";
import { SoldierLoader } from "./loaders/SoldierLoader";
import { SkillToHeroTransformer } from "./transformers/SkillToHeroTransformer";
import { TrainingLoader } from "./loaders/TrainingLoader";
import { SoldierToHeroTransformer } from "./transformers/SoldierToHeroTransformer";
import { SkinsLoader } from "./loaders/SkinsLoader";
import { FaqLoader } from './loaders/FaqLoader';
import { FAQ } from '../types/faq';
import faqDataRaw from '../data/FAQ.json';
const faqData: FAQ[] = faqDataRaw as FAQ[];

export class DBSingleton {
  private static instance: DBSingleton;

  static getInstance(): DBSingleton {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private workBook = XLSX.readFile("data/database.xlsx");
  private skillsMap = new SkillsLoader(this.workBook).load();
  private maxStats = new MaxStatsLoader(this.workBook).load();
  private classesMap = new ClassesLoader(this.workBook).load();
  private skinsMap = new SkinsLoader(this.workBook).load();
  private heroMap = new HeroLoader(
    this.workBook,
    this.skillsMap,
    this.maxStats,
    this.classesMap,
    this.skinsMap
  ).load();
  private patchMap = new PatchLoader(this.workBook).load();
  private equipment = new EquipmentLoader(this.workBook).load();
  private training = new TrainingLoader(this.workBook).load();
  private soldier = new SoldierLoader(this.workBook, this.training).load();
  private faqs: FAQ[] = faqData;
  private skillToHeroMap = new SkillToHeroTransformer(this.heroMap).transform();

  constructor() {
    this.soldier = new SoldierToHeroTransformer(
      this.soldier,
      this.heroMap
    ).transform();
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

  getTraining() {
    return this.training;
  }

  getFaqs(): FAQ[] {
    return this.faqs;
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
  cnReleaseDate: string;
  releaseDate: string;
  type: "major" | "minor";
  newHeroes: string[];
  info: string;
  name: string;
}

export interface PatchMap {
  [id: number]: Patch;
}
