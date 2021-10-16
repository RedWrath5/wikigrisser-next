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
