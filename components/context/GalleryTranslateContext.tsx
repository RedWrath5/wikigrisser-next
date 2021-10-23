import React, { createContext, PropsWithChildren, useContext } from "react";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import { TranslateHeroLanguageMap } from "../../types/translate";
import { SkillsMap } from "../../types/hero";
import { HeroMap } from "../../util/databaseSingleton";

export interface GalleryTranslateContextInterface {
  getHeroInfo: (name: keyof HeroMap) => keyof HeroMap | null;
}
export const GalleryTranslateContext =
  createContext<GalleryTranslateContextInterface>(
    {} as GalleryTranslateContextInterface
  );

export function GalleryTranslateWrapper({
  children,
  translateHeroMap,
}: PropsWithChildren<{
  translateHeroMap: TranslateHeroLanguageMap<SkillsMap>;
}>) {
  const { language } = useLanguageSwitchContext();

  const getHeroInfo = (name: keyof HeroMap): keyof HeroMap | null => {
    if (translateHeroMap[language] && translateHeroMap[language][name])
      return translateHeroMap[language][name].name;
    else {
      return null;
    }
  };

  return (
    <GalleryTranslateContext.Provider value={{ getHeroInfo }}>
      {children}
    </GalleryTranslateContext.Provider>
  );
}

export function useGalleryTranslateContext() {
  return useContext(GalleryTranslateContext);
}
