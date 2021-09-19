import React, { PropsWithRef } from "react";
import { Equipment } from "../types/hero";
import { EquipmentPage } from "../components/equipment/EquipmentPage";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";

const EquipmentGalleryPage = ({
  equipment,
}: PropsWithRef<{ equipment: Equipment[] }>) => (
  <Layout>
    <EquipmentPage equipment={equipment}></EquipmentPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const equipment = workbook.getEquipment();

  return {
    props: {
      equipment,
    },
  };
};

export default EquipmentGalleryPage;
