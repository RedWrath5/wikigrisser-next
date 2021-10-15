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

export interface TranslateSkillsLanguageMap {
  [key: string]: TranslateSkillsMap;
}

export type TranslateSkillsMap = {
  [key in string | number]: TranslateSkills;
};

export interface TranslateSkills {
  name: string;
  description: string;
}
