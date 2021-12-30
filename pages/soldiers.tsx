import React, { PropsWithRef } from "react";
import { Soldier } from "../types/hero";
import { DBSingleton, SoldierMap } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";
import { SoldierTranslateWrapper } from "../components/context/SoldierTranslateContext";
import {
  TranslateSoldiersLanguageMap,
  TranslateUILanguageMap,
} from "../types/translate";
import { TranslateWrapper } from "../components/context/TranslateContext";

const SoldierGalleryPage = ({
  soldiers,
  soldierMap,
  translateUIMap,
  translateSoldiersMap,
}: PropsWithRef<{
  soldiers: Soldier[];
  soldierMap: SoldierMap;
  translateUIMap: TranslateUILanguageMap;
  translateSoldiersMap: TranslateSoldiersLanguageMap;
}>) => (
  <TranslateWrapper translateMap={translateUIMap}>
    <Layout>
      <SoldierTranslateWrapper
        translateMap={translateSoldiersMap}
        soldierMap={soldierMap}
      >
        <SoldierPage soldiers={soldiers} />
      </SoldierTranslateWrapper>
    </Layout>
  </TranslateWrapper>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const soldiers = workbook.getSoldiers();
  const translateSoldiersMap = workbook.getTranslateSoldiersMap();
  const soldierMap = workbook.getSoldierMap();
  const translateUIMap = workbook.getTranslateUIMap();
  return {
    props: {
      soldiers,
      soldierMap,
      translateUIMap,
      translateSoldiersMap,
    },
  };
};

export default SoldierGalleryPage;
