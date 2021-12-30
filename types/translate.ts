export interface TranslateSoldiersLanguageMap {
  [key: string]: TranslateSoldiersMap;
}

export interface TranslateSoldiersMap {
  [key: string]: TranslateSoldiers;
}

export interface TranslateSoldiers {
  name: string;
  effect: string;
}

//  skills

export interface TranslateSkillsLanguageMap<T> {
  [key: string]: TranslateSkillsMap<T>;
}

export type TranslateSkillsMap<T> = {
  [key in keyof T]: TranslateSkills;
};

export interface TranslateSkills {
  name: string;
  description: string;
}

// hero

export interface TranslateHeroLanguageMap<T> {
  [key: string]: TranslateHeroMap<T>;
}

export type TranslateHeroMap<T> = {
  [key in keyof T]: TranslateHero;
};

export interface TranslateHero {
  name: string;
  talentName: string;
  talentDescription: string;
  bond2: string;
  bond3: string;
  bond4: string;
  bond5: string;
}

// Equipment

export interface TranslateEquipmentLanguageMap {
  [key: string]: TranslateEquipmentMap;
}

export interface TranslateEquipmentMap {
  [key: string]: TranslateEquipment;
}

export interface TranslateEquipment {
  name: string;
  effect: string;
}

// Class

export interface TranslateClassLanguageMap {
  [key: string]: TranslateClassMap;
}

export interface TranslateClassMap {
  [key: string]: TranslateClass;
}

export interface TranslateClass {
  name: string;
}

// UI

export interface TranslateUILanguageMap {
  [key: string]: TranslateUIMap;
}

export interface TranslateUIMap {
  [key: string]: string;
}
