import React, { PropsWithRef } from "react";
import { Equipment } from "../types/hero";
import { EquipmentPage } from "../components/equipment/EquipmentPage";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { TranslateEquipmentLanguageMap } from "../types/translate";
import { EquipmentTranslateWrapper } from "../components/context/EquipmentTranslateContext";

const EquipmentGalleryPage = ({
  equipment,
  translateEquipmentMap,
}: PropsWithRef<{
  equipment: Equipment[];
  translateEquipmentMap: TranslateEquipmentLanguageMap;
}>) => (
  <Layout>
    <EquipmentTranslateWrapper translateMap={translateEquipmentMap}>
      <EquipmentPage equipment={equipment} />
    </EquipmentTranslateWrapper>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const equipment = workbook.getEquipment();
  const translateEquipmentMap = workbook.getTranslateEquipmentMap();

  return {
    props: {
      equipment,
      translateEquipmentMap,
    },
  };
};

export default EquipmentGalleryPage;
