import React from "react";
import { Layout } from "../../components/Layout";
import { Hero, SkillsMap } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import { DBSingleton, SkillToHeroMap } from "../../util/databaseSingleton";
import skillToHeroContext from "../../util/skillToHeroContext";
import { SkillTranslateWrapper } from "../../components/context/SkillTranslateContext";
import {
  TranslateSkillsLanguageMap,
} from "../../types/translate";

const HeroPage = ({
  heroData,
  skillsMap,
  translateMap,
  skillsToHeroMap,
}: {
  heroData: Hero;
  skillsMap: SkillsMap;
  translateMap: TranslateSkillsLanguageMap<SkillsMap>;
  skillsToHeroMap: SkillToHeroMap;
}) => {
  return (
    <>
      <SkillTranslateWrapper translateMap={translateMap} skillsMap={skillsMap}>
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
  const heroes = DBSingleton.getInstance().getHeroesMap();
  const skillsToHeroMap = DBSingleton.getInstance().getSkillsToHeroMap();
  const translateMap = DBSingleton.getInstance().getTranslateSkillsMap();
  const skillsMap = DBSingleton.getInstance().getSkillsMap();

  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
      skillsToHeroMap,
      translateMap,
      skillsMap,
    },
  };
};

export default HeroPage;
