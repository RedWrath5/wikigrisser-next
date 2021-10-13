import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  TranslateSoldiers,
  TranslateSoldiersLanguageMap,
} from "../../types/hero";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";

export interface SoldierTranslateContextInterface {
  translateMap: TranslateSoldiersLanguageMap;
  getSoldierInfo: (name: string) => TranslateSoldiers;
}
export const SoldierTranslateContext =
  createContext<SoldierTranslateContextInterface>(
    {} as SoldierTranslateContextInterface
  );

export function SoldierTranslateWrapper({
  translateMap,
  children,
}: PropsWithChildren<{ translateMap: TranslateSoldiersLanguageMap }>) {
  const { language } = useLanguageSwitchContext();

  const getSoldierInfo = (name: string): TranslateSoldiers => {
    try {
      return translateMap[language][name];
    } catch (e) {
      return translateMap["english"][name];
    } finally {
      if (!translateMap[language][name] && !translateMap["english"][name]) {
        return {
          name: "text not found",
          effect: "text not found",
        };
      }
    }
  };
  return (
    <SoldierTranslateContext.Provider value={{ translateMap, getSoldierInfo }}>
      {children}
    </SoldierTranslateContext.Provider>
  );
}

export function useSoldierTranslateContext() {
  return useContext(SoldierTranslateContext);
}
