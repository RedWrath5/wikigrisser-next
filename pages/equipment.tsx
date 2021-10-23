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

const EquipmentGalleryPage = ({
  equipment,
  translateUIMap,
  translateEquipmentMap,
}: PropsWithRef<{
  equipment: Equipment[];
  translateUIMap: TranslateUILanguageMap;
  translateEquipmentMap: TranslateEquipmentLanguageMap;
}>) => (
  <TranslateWrapper translateMap={translateUIMap}>
    <Layout>
      <EquipmentTranslateWrapper translateMap={translateEquipmentMap}>
        <EquipmentPage equipment={equipment} />
      </EquipmentTranslateWrapper>
    </Layout>
  </TranslateWrapper>
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
