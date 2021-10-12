import React, { PropsWithRef } from "react";
import { LanguageMap, Soldier } from "../types/hero";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";

const SoldierGalleryPage = ({
  soldiers,
  langMap,
}: PropsWithRef<{ soldiers: Soldier[]; langMap: LanguageMap }>) => (
  <Layout langMap={langMap}>
    <SoldierPage soldiers={soldiers}></SoldierPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const soldiers = workbook.getSoldiers();
  const langMap = workbook.getLang();
  return {
    props: {
      soldiers,
      langMap,
    },
  };
};

export default SoldierGalleryPage;
