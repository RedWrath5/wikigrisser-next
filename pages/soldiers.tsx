import React, { PropsWithRef } from "react";
import { Soldier, TranslateSoldiersLanguageMap} from "../types/hero";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";
import { SoldierTranslateWrapper } from "../components/context/SoldierTranslateContext";

const SoldierGalleryPage = ({
  soldiers,
  translateSoldiersMap,
}: PropsWithRef<{
  soldiers: Soldier[];
  translateSoldiersMap: TranslateSoldiersLanguageMap;
}>) => (
  <Layout>
    <SoldierTranslateWrapper translateMap={translateSoldiersMap}>
      <SoldierPage soldiers={soldiers} />
    </SoldierTranslateWrapper>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const soldiers = workbook.getSoldiers();
  const translateSoldiersMap = workbook.getTranslateSoldiersMap();
  return {
    props: {
      soldiers,
      translateSoldiersMap,
    },
  };
};

export default SoldierGalleryPage;
