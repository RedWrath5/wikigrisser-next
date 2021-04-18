import React, { PropsWithRef } from "react";
import { DBSingleton, HeroMap } from "../../util/databaseSingleton";
import { Layout } from "../../components/Layout";
import { HeroGallery } from "../../components/HeroGallery";

const HeroGalleryPage = ({ heroes }: PropsWithRef<{ heroes: HeroMap }>) => (
  <Layout>
    <HeroGallery heroMap={heroes}></HeroGallery>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const heroes = workbook.getHeroesMap();

  return {
    props: {
      heroes,
    },
  };
};

export default HeroGalleryPage;
