import React, { PropsWithRef } from "react";
import { TranslateSoldiersMap, Soldier } from "../types/hero";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";

const SoldierGalleryPage = ({
  soldiers,
}: PropsWithRef<{
  soldiers: Soldier[];
  translateSoldiersMap: TranslateSoldiersMap;
}>) => (
  <Layout>
    <SoldierPage soldiers={soldiers} />
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
