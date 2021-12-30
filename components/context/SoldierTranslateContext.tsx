import React, { createContext, PropsWithChildren, useContext } from "react";
import { SoldierMap } from "../../util/databaseSingleton";
import {
  TranslateSoldiers,
  TranslateSoldiersLanguageMap,
} from "../../types/translate";
import { useTranslateContext } from "./TranslateContext";

export interface SoldierTranslateContextInterface {
  getSoldierInfo: (name: string) => TranslateSoldiers;
}
export const SoldierTranslateContext =
  createContext<SoldierTranslateContextInterface>(
    {} as SoldierTranslateContextInterface
  );

export function SoldierTranslateWrapper({
  translateMap,
  soldierMap,
  children,
}: PropsWithChildren<{
  translateMap: TranslateSoldiersLanguageMap;
  soldierMap: SoldierMap;
}>) {
  const { language } = useTranslateContext();

  const getSoldierInfo = (name: string): TranslateSoldiers => {
    if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name];
    else {
      if (soldierMap[name])
        return {
          name: soldierMap[name].name,
          effect: soldierMap[name].effect,
        };
    }

    return {
      name: name,
      effect: "",
    };
  };
  return (
    <SoldierTranslateContext.Provider value={{ getSoldierInfo }}>
      {children}
    </SoldierTranslateContext.Provider>
  );
}

export function useSoldierTranslateContext() {
  return useContext(SoldierTranslateContext);
}
