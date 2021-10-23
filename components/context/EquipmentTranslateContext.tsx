import React, { createContext, PropsWithChildren, useContext } from "react";
import {
  TranslateEquipment,
  TranslateEquipmentLanguageMap,
} from "../../types/translate";
import { Equipment } from "../../types/hero";
import {useTranslateContext} from "./TranslateContext";

export interface EquipmentTranslateContextInterface {
  getEquipmentInfo: (equipment: Equipment) => TranslateEquipment;
}
export const EquipmentTranslateContext =
  createContext<EquipmentTranslateContextInterface>(
    {} as EquipmentTranslateContextInterface
  );

export function EquipmentTranslateWrapper({
  translateMap,
  children,
}: PropsWithChildren<{
  translateMap: TranslateEquipmentLanguageMap;
}>) {
  const { language } = useTranslateContext();

  const getEquipmentInfo = (equipment: Equipment): TranslateEquipment => {
    if (translateMap[language] && translateMap[language][equipment.name])
      return translateMap[language][equipment.name];

    return equipment;
  };
  return (
    <EquipmentTranslateContext.Provider value={{ getEquipmentInfo }}>
      {children}
    </EquipmentTranslateContext.Provider>
  );
}

export function useEquipmentTranslateContext() {
  return useContext(EquipmentTranslateContext);
}
