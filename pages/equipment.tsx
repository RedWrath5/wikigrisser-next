import React, { PropsWithRef } from "react";
import { Equipment } from "../types/hero";
import { EquipmentPage } from "../components/equipment/EquipmentPage";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import {
  TranslateEquipmentLanguageMap,
  TranslateUILanguageMap,
} from "../types/translate";
import { EquipmentTranslateWrapper } from "../components/context/EquipmentTranslateContext";
import { TranslateWrapper } from "../components/context/TranslateContext";
import { composeWrappers } from "../util/composeWrappers";

const EquipmentGalleryPage = ({
  equipment,
  translateUIMap,
  translateEquipmentMap,
}: PropsWithRef<{
  equipment: Equipment[];
  translateUIMap: TranslateUILanguageMap;
  translateEquipmentMap: TranslateEquipmentLanguageMap;
}>) => {
  const MasterProvider = composeWrappers([
    (props) => (
      <TranslateWrapper translateMap={translateUIMap}>
        {props.children}
      </TranslateWrapper>
    ),
    (props) => (
      <EquipmentTranslateWrapper translateMap={translateEquipmentMap}>
        {props.children}
      </EquipmentTranslateWrapper>
    ),
    (props) => <Layout>{props.children}</Layout>,
  ]);

  return (
    <MasterProvider>
      <EquipmentPage equipment={equipment} />
    </MasterProvider>
  );
};

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const equipment = workbook.getEquipment();
  const translateEquipmentMap = workbook.getTranslateEquipmentMap();
  const translateUIMap = workbook.getTranslateUIMap();

  return {
    props: {
      equipment,
      translateUIMap,
      translateEquipmentMap,
    },
  };
};

export default EquipmentGalleryPage;
