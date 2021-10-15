import React, { PropsWithRef } from "react";
import { Soldier} from "../types/hero";
import { DBSingleton, SoldierMap } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";
import { SoldierTranslateWrapper } from "../components/context/SoldierTranslateContext";
import {TranslateSoldiersLanguageMap} from "../types/translate";

const SoldierGalleryPage = ({
  soldiers,
  soldierMap,
  translateSoldiersMap,
}: PropsWithRef<{
  soldiers: Soldier[];
  soldierMap: SoldierMap;
  translateSoldiersMap: TranslateSoldiersLanguageMap;
}>) => (
  <Layout>
    <SoldierTranslateWrapper
      translateMap={translateSoldiersMap}
      soldierMap={soldierMap}
    >
      <SoldierPage soldiers={soldiers} />
    </SoldierTranslateWrapper>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const soldiers = workbook.getSoldiers();
  const translateSoldiersMap = workbook.getTranslateSoldiersMap();
  const soldierMap = workbook.getSoldierMap();
  return {
    props: {
      soldiers,
      soldierMap,
      translateSoldiersMap,
    },
  };
};

export default SoldierGalleryPage;
