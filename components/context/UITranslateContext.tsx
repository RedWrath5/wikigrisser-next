import React, { createContext, PropsWithChildren, useContext } from "react";
import { useLanguageSwitchContext } from "./LanguageSwitchContext";
import { TranslateUILanguageMap } from "../../types/translate";

export interface UITranslateContextInterface {
  translate: (name: string) => string;
}
export const UITranslateContext = createContext<UITranslateContextInterface>(
  {} as UITranslateContextInterface
);

export function UITranslateWrapper({
  children,
  translateMap,
}: PropsWithChildren<{
  translateMap: TranslateUILanguageMap;
}>) {
  const { language } = useLanguageSwitchContext();
  const translate = (name: string): string => {
    if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name];

    return name;
  };
  return (
    <UITranslateContext.Provider value={{ translate }}>
      {children}
    </UITranslateContext.Provider>
  );
}

export function useUITranslateContext() {
  return useContext(UITranslateContext);
}
