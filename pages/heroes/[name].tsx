import React from "react";
import { Layout } from "../../components/Layout";
import { Hero } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import { DBSingleton, SkillToHeroMap } from "../../util/databaseSingleton";
import skillToHeroContext from "../../util/skillToHeroContext";
const HeroPage = ({
  heroData,
  skillsToHeroMap,
}: {
  heroData: Hero;
  skillsToHeroMap: SkillToHeroMap;
}) => {
  return (
    <>
      <skillToHeroContext.Provider value={skillsToHeroMap}>
        <Layout>
          <HeroComponent hero={heroData}></HeroComponent>
        </Layout>
      </skillToHeroContext.Provider>
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
  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
      skillsToHeroMap,
    },
  };
};
export default HeroPage;
