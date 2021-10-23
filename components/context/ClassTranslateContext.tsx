import React, { createContext, PropsWithChildren, useContext } from "react";
import { TranslateClassLanguageMap } from "../../types/translate";
import {useTranslateContext} from "./TranslateContext";

export interface ClassTranslateContextInterface {
  getClassInfo: (name: string) => string;
}
export const ClassTranslateContext =
  createContext<ClassTranslateContextInterface>(
    {} as ClassTranslateContextInterface
  );

export function ClassTranslateWrapper({
  translateMap,
  children,
}: PropsWithChildren<{
  translateMap: TranslateClassLanguageMap;
}>) {
  const { language } = useTranslateContext();
  const getClassInfo = (name: string): string => {
    if (!name) return "";

    if (translateMap[language] && translateMap[language][name])
      return translateMap[language][name].name;

    if (name.includes("→")) {
      return name
        .split(" → ")
        .map((v) => getClassInfo(v))
        .join(" → ");
    }

    return name;
  };
  return (
    <ClassTranslateContext.Provider value={{ getClassInfo }}>
      {children}
    </ClassTranslateContext.Provider>
  );
}

export function useClassTranslateContext() {
  return useContext(ClassTranslateContext);
}
