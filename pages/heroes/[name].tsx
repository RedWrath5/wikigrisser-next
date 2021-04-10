import React from "react";
import { Layout } from "../../components/Layout";
import { Hero } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import { DBSingleton } from "../../util/databaseSingleton";

const HeroPage = ({ heroData }: { heroData: Hero }) => {
  return (
    <>
      <Layout>
        <HeroComponent hero={heroData}></HeroComponent>
      </Layout>
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

  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
    },
  };
};

export default HeroPage;
