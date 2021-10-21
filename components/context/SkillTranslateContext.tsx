import React, { createContext, PropsWithChildren, useContext } from "react";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import {
  TranslateHeroLanguageMap,
  TranslateSkills,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
} from "../../types/translate";
import { SkillsMap } from "../../types/hero";
import { HeroMap } from "../../util/databaseSingleton";

export interface SkillTranslateContextInterface {
  getSkillInfo: (name: string) => TranslateSkills;
}
export const SkillTranslateContext =
  createContext<SkillTranslateContextInterface>(
    {} as SkillTranslateContextInterface
  );

export function SkillTranslateWrapper({
  threeCostSkillMap,
  translateHeroMap,
  translateMap,
  skillsMap,
  children,
}: PropsWithChildren<{
  translateMap: TranslateSkillsLanguageMap<SkillsMap>;
  skillsMap: SkillsMap;
  threeCostSkillMap: TranslateSkillsMap<SkillsMap>;
  translateHeroMap: TranslateHeroLanguageMap<HeroMap>;
}>) {
  const { language } = useLanguageSwitchContext();

  const getSkillInfo = (name: keyof SkillsMap): TranslateSkills => {
    if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name];
    else {
      if (skillsMap[name])
        return {
          name: skillsMap[name].name,
          description: skillsMap[name].description || "",
        };
      else if (threeCostSkillMap[name])
        return {
          name: threeCostSkillMap[name].name,
          description: threeCostSkillMap[name].description || "",
        };
    }
    // Just for TS check. He dont know, we always find what we need.
    return {
      name: "",
      description: "",
    };
  };
  return (
    <SkillTranslateContext.Provider value={{ getSkillInfo: getSkillInfo }}>
      {children}
    </SkillTranslateContext.Provider>
  );
}

export function useSkillTranslateContext() {
  return useContext(SkillTranslateContext);
}
