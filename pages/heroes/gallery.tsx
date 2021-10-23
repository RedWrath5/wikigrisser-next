import React, { PropsWithRef } from "react";
import { DBSingleton, HeroMap } from "../../util/databaseSingleton";
import { Layout } from "../../components/Layout";
import { HeroGallery } from "../../components/HeroGallery";
import {
  TranslateHeroLanguageMap,
  TranslateUILanguageMap,
} from "../../types/translate";
import { SkillsMap } from "../../types/hero";
import { GalleryTranslateWrapper } from "../../components/context/GalleryTranslateContext";
import { TranslateWrapper } from "../../components/context/TranslateContext";

const HeroGalleryPage = ({
  heroes,
  translateUIMap,
  translateHeroMap,
}: PropsWithRef<{
  heroes: HeroMap;
  translateUIMap: TranslateUILanguageMap;
  translateHeroMap: TranslateHeroLanguageMap<SkillsMap>;
}>) => (
  <TranslateWrapper translateMap={translateUIMap}>
    <GalleryTranslateWrapper translateHeroMap={translateHeroMap}>
      <Layout>
        <HeroGallery heroMap={heroes}></HeroGallery>
      </Layout>
    </GalleryTranslateWrapper>
  </TranslateWrapper>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const heroes = workbook.getHeroesMap();
  const translateHeroMap = workbook.getTranslateHeroMap();
  const translateUIMap = workbook.getTranslateUIMap();

  return {
    props: {
      heroes,
      translateUIMap,
      translateHeroMap,
    },
  };
};

export default HeroGalleryPage;
