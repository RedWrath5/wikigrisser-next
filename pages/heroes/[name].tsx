import React from "react";
import { Layout } from "../../components/Layout";
import { Hero, SkillsMap } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  DBSingleton,
  HeroMap,
  SkillToHeroMap,
  SoldierMap,
} from "../../util/databaseSingleton";
import skillToHeroContext from "../../util/skillToHeroContext";
import { HeroTranslateWrapper } from "../../components/context/HeroTranslateContext";
import {
  TranslateHeroLanguageMap,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
  TranslateSoldiersLanguageMap,
} from "../../types/translate";
import { SoldierTranslateWrapper } from "../../components/context/SoldierTranslateContext";

const HeroPage = ({
  heroData,
  skillsMap,
  soldierMap,
  translateMap,
  skillsToHeroMap,
  translateHeroMap,
  threeCostSkillMap,
  translateSoldiersMap,
}: {
  heroData: Hero;
  skillsMap: SkillsMap;
  soldierMap: SoldierMap;
  skillsToHeroMap: SkillToHeroMap;
  threeCostSkillMap: TranslateSkillsMap<SkillsMap>;
  translateSoldiersMap: TranslateSoldiersLanguageMap;
  translateMap: TranslateSkillsLanguageMap<SkillsMap>;
  translateHeroMap: TranslateHeroLanguageMap<HeroMap>;
}) => {
  return (
    <>
      <HeroTranslateWrapper
        translateSkillMap={translateMap}
        skillsMap={skillsMap}
        translateHeroMap={translateHeroMap}
        threeCostSkillMap={threeCostSkillMap}
        hero={heroData}
      >
        <SoldierTranslateWrapper
          translateMap={translateSoldiersMap}
          soldierMap={soldierMap}
        >
          <skillToHeroContext.Provider value={skillsToHeroMap}>
            <Layout>
              <HeroComponent hero={heroData}></HeroComponent>
            </Layout>
          </skillToHeroContext.Provider>
        </SoldierTranslateWrapper>
      </HeroTranslateWrapper>
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
  const translateSoldiersMap = db.getTranslateSoldiersMap();
  const soldierMap = db.getSoldierMap();

  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
      skillsMap,
      soldierMap,
      translateMap,
      skillsToHeroMap,
      translateHeroMap,
      threeCostSkillMap,
      translateSoldiersMap,
    },
  };
};

export default HeroPage;
