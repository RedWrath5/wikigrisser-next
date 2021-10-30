import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { TranslateUILanguageMap } from "../../types/translate";

export interface UITranslateContextInterface {
  t: (name: string) => string;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
export const TranslateContext = createContext<UITranslateContextInterface>(
  {} as UITranslateContextInterface
);

export function TranslateWrapper({
  children,
  translateMap,
}: PropsWithChildren<{
  translateMap: TranslateUILanguageMap;
}>) {
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) setLanguage(lang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translate = (name: string): string => {
    if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name];

    return name;
  };
  return (
    <TranslateContext.Provider value={{ t: translate, language, setLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
}

export function useTranslateContext() {
  return useContext(TranslateContext);
}
