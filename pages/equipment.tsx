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

const EquipmentGalleryPage = ({
  equipment,
  translateUIMap,
  translateEquipmentMap,
}: PropsWithRef<{
  equipment: Equipment[];
  translateUIMap: TranslateUILanguageMap;
  translateEquipmentMap: TranslateEquipmentLanguageMap;
}>) => (
  <Layout translateUIMap={translateUIMap}>
    <EquipmentTranslateWrapper translateMap={translateEquipmentMap}>
      <EquipmentPage equipment={equipment} />
    </EquipmentTranslateWrapper>
  </Layout>
);

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
