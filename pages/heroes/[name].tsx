import React from "react";
import { Layout } from "../../components/Layout";
import { Hero, SkillsMap } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  DBSingleton,
  HeroMap,
  SkillToHeroMap,
} from "../../util/databaseSingleton";
import skillToHeroContext from "../../util/skillToHeroContext";
import { SkillTranslateWrapper } from "../../components/context/SkillTranslateContext";
import {
  TranslateHeroLanguageMap,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
} from "../../types/translate";

const HeroPage = ({
  heroData,
  skillsMap,
  translateMap,
  skillsToHeroMap,
  translateHeroMap,
  threeCostSkillMap,
}: {
  heroData: Hero;
  skillsMap: SkillsMap;
  translateMap: TranslateSkillsLanguageMap<SkillsMap>;
  skillsToHeroMap: SkillToHeroMap;
  threeCostSkillMap: TranslateSkillsMap<SkillsMap>;
  translateHeroMap: TranslateHeroLanguageMap<HeroMap>;
}) => {
  return (
    <>
      <SkillTranslateWrapper
        translateMap={translateMap}
        skillsMap={skillsMap}
        translateHeroMap={translateHeroMap}
        threeCostSkillMap={threeCostSkillMap}
      >
        <skillToHeroContext.Provider value={skillsToHeroMap}>
          <Layout>
            <HeroComponent hero={heroData}></HeroComponent>
          </Layout>
        </skillToHeroContext.Provider>
      </SkillTranslateWrapper>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const heroes = DBSingleton.getInstance().getHeroesMap();

  const paths = Object.keys(heroes).map((heroName) => ({
    params: {
      name: heroName,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const db = DBSingleton.getInstance();
  const heroes = db.getHeroesMap();
  const skillsToHeroMap = db.getSkillsToHeroMap();
  const translateMap = db.getTranslateSkillsMap();
  const skillsMap = db.getSkillsMap();
  const threeCostSkillMap = db.get3cSkillsMap();
  const translateHeroMap = db.getTranslateHeroMap();

  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
      skillsToHeroMap,
      translateMap,
      skillsMap,
      threeCostSkillMap,
      translateHeroMap,
    },
  };
};

export default HeroPage;
