import React, { createContext, PropsWithChildren, useContext } from "react";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import {
  TranslateHero,
  TranslateHeroLanguageMap,
  TranslateSkills,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
} from "../../types/translate";
import { Hero, RelatedBond, SkillsMap } from "../../types/hero";
import { HeroMap } from "../../util/databaseSingleton";

export interface HeroTranslateContextInterface {
  getSkillInfo: (name: string) => TranslateSkills;
  getHeroInfo: (name: string) => TranslateHero;
  getRelatedBond: (data: RelatedBond) => RelatedBond;
}
export const HeroTranslateContext =
  createContext<HeroTranslateContextInterface>(
    {} as HeroTranslateContextInterface
  );

export function HeroTranslateWrapper({
  threeCostSkillMap,
  translateHeroMap,
  translateSkillMap,
  skillsMap,
  hero,
  children,
}: PropsWithChildren<{
  hero: Hero;
  translateSkillMap: TranslateSkillsLanguageMap<SkillsMap>;
  skillsMap: SkillsMap;
  threeCostSkillMap: TranslateSkillsMap<SkillsMap>;
  translateHeroMap: TranslateHeroLanguageMap<HeroMap>;
}>) {
  const { language } = useLanguageSwitchContext();

  const getSkillInfo = (name: keyof SkillsMap): TranslateSkills => {
    if (translateSkillMap[language] && translateSkillMap[language][name])
      return translateSkillMap[language][name];
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

  const getHeroInfo = (name: keyof HeroMap): TranslateHero => {
    if (translateHeroMap[language] && translateHeroMap[language][name])
      return translateHeroMap[language][name];
    else {
      return {
        name: hero.prettyName,
        talentName: hero.talent?.name || "",
        talentDescription: hero.talent?.description || "",
        bond2: hero.bondRequirments?.bond2 || "",
        bond3: hero.bondRequirments?.bond3 || "",
        bond4: hero.bondRequirments?.bond4 || "",
        bond5: hero.bondRequirments?.bond5 || "",
      };
    }
  };

  const getRelatedBond = (relatedBond: RelatedBond): RelatedBond => {
    try {
      let text = relatedBond.text;
      if (
        relatedBond.type === "ATK" &&
        translateHeroMap[language][relatedBond.name]?.bond5
      )
        text = translateHeroMap[language][relatedBond.name]?.bond5;
      else if (
        relatedBond.type === "DEF" &&
        translateHeroMap[language][relatedBond.name]?.bond4
      )
        text = translateHeroMap[language][relatedBond.name]?.bond4;

      return {
        prettyName: translateHeroMap[language][relatedBond.name].name,
        name: relatedBond.name,
        text: text,
        type: relatedBond.type,
      };
    } catch {
      return relatedBond;
    }
  };

  return (
    <HeroTranslateContext.Provider
      value={{
        getSkillInfo,
        getHeroInfo,
        getRelatedBond,
      }}
    >
      {children}
    </HeroTranslateContext.Provider>
  );
}

export function useHeroTranslateContext() {
  return useContext(HeroTranslateContext);
}
