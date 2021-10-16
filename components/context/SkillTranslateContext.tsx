import React, { createContext, PropsWithChildren, useContext } from "react";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import {
  TranslateSkills,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
} from "../../types/translate";
import { SkillsMap } from "../../types/hero";

export interface SkillTranslateContextInterface {
  getSkillInfo: (name: string) => TranslateSkills;
}
export const SkillTranslateContext =
  createContext<SkillTranslateContextInterface>(
    {} as SkillTranslateContextInterface
  );

export function SkillTranslateWrapper({
  translateMap,
  skillsMap,
  children,
}: PropsWithChildren<{
  translateMap: TranslateSkillsLanguageMap<SkillsMap>;
  skillsMap: SkillsMap;
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
