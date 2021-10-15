import React, { createContext, PropsWithChildren, useContext } from "react";

import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import { SoldierMap } from "../../util/databaseSingleton";
import { TranslateSkills, TranslateSkillsMap } from "../../types/translate";

export interface SkillTranslateContextInterface {
  getSkillInfo: (name: string) => TranslateSkills;
}
export const SkillTranslateContext =
  createContext<SkillTranslateContextInterface>(
    {} as SkillTranslateContextInterface
  );

export function SkillTranslateWrapper({
  children,
}: PropsWithChildren<{
  translateMap: TranslateSkillsMap;
  soldierMap: SoldierMap;
}>) {
  const { language } = useLanguageSwitchContext();

  const getSkillInfo = (name: string): TranslateSkills => {
    /*  if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name];
    else {
      if (soldierMap[name])
        return {
          name: soldierMap[name].name,
          effect: soldierMap[name].effect,
        };
    }*/
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
