import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface SoldierTranslateContextInterface {
  language: string;
  setLanguage: (arg0: string) => void;
}
export const SoldierTranslateContext =
  createContext<SoldierTranslateContextInterface>(
    {} as SoldierTranslateContextInterface
  );

export function SoldierTranslateWrapper({ children }: PropsWithChildren<{}>) {
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) setLanguage(lang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <SoldierTranslateContext.Provider value={{ language, setLanguage }}>
      {children}
    </SoldierTranslateContext.Provider>
  );
}

export function useSoldierTranslateContext() {
  return useContext(SoldierTranslateContext);
}
