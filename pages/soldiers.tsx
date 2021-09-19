import React, { PropsWithRef } from "react";
import { Soldier } from "../types/hero";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { SoldierPage } from "../components/soldiers/SoldierPage";

const SoldierGalleryPage = ({
  soldiers,
}: PropsWithRef<{ soldiers: Soldier[] }>) => (
  <Layout>
    <SoldierPage soldiers={soldiers}></SoldierPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const soldiers = workbook.getSoldiers();

  return {
    props: {
      soldiers,
    },
  };
};

export default SoldierGalleryPage;
