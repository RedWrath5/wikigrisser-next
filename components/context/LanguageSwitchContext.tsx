import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LanguageSwitchContextInterface {
  language: string;
  setLanguage: (arg0: string) => void;
}
export const LanguageSwitchContext =
  createContext<LanguageSwitchContextInterface>(
    {} as LanguageSwitchContextInterface
  );

export function LanguageSwitchContextWrapper({
  children,
}: PropsWithChildren<{}>) {
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) setLanguage(lang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageSwitchContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageSwitchContext.Provider>
  );
}

export function useLanguageSwitchContext() {
  return useContext(LanguageSwitchContext);
}
