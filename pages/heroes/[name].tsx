import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  DBSingleton,
  HeroMap,
  SkillToHeroMap,
  SoldierMap,
} from "../../util/databaseSingleton";
import {
  TranslateClassLanguageMap,
  TranslateEquipmentLanguageMap,
  TranslateHeroLanguageMap,
  TranslateSkillsLanguageMap,
  TranslateSkillsMap,
  TranslateSoldiersLanguageMap,
  TranslateUILanguageMap,
} from "../../types/translate";

import { Layout } from "../../components/Layout";
import { Hero, SkillsMap } from "../../types/hero";
import { composeWrappers } from "../../util/composeWrappers";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { TranslateWrapper } from "../../components/context/TranslateContext";
import skillToHeroContext from "../../components/context/skillToHeroContext";
import { HeroTranslateWrapper } from "../../components/context/HeroTranslateContext";
import { ClassTranslateWrapper } from "../../components/context/ClassTranslateContext";
import { SoldierTranslateWrapper } from "../../components/context/SoldierTranslateContext";
import { EquipmentTranslateWrapper } from "../../components/context/EquipmentTranslateContext";

const HeroPage = ({
  heroData,
  skillsMap,
  soldierMap,
  translateUIMap,
  skillsToHeroMap,
  translateHeroMap,
  translateClassMap,
  threeCostSkillMap,
  translateSkillsMap,
  translateSoldiersMap,
  translateEquipmentMap,
}: {
  heroData: Hero;
  skillsMap: SkillsMap;
  soldierMap: SoldierMap;
  skillsToHeroMap: SkillToHeroMap;
  translateUIMap: TranslateUILanguageMap;
  translateClassMap: TranslateClassLanguageMap;
  threeCostSkillMap: TranslateSkillsMap<SkillsMap>;
  translateSoldiersMap: TranslateSoldiersLanguageMap;
  translateHeroMap: TranslateHeroLanguageMap<HeroMap>;
  translateEquipmentMap: TranslateEquipmentLanguageMap;
  translateSkillsMap: TranslateSkillsLanguageMap<SkillsMap>;
}) => {
  const MasterProvider = composeWrappers([
    (props) => (
      <TranslateWrapper translateMap={translateUIMap}>
        {props.children}
      </TranslateWrapper>
    ),
    (props) => (
      <HeroTranslateWrapper
        translateSkillMap={translateSkillsMap}
        skillsMap={skillsMap}
        translateHeroMap={translateHeroMap}
        threeCostSkillMap={threeCostSkillMap}
        hero={heroData}
      >
        {props.children}
      </HeroTranslateWrapper>
    ),
    (props) => (
      <SoldierTranslateWrapper
        translateMap={translateSoldiersMap}
        soldierMap={soldierMap}
      >
        {props.children}
      </SoldierTranslateWrapper>
    ),
    (props) => (
      <EquipmentTranslateWrapper translateMap={translateEquipmentMap}>
        {props.children}
      </EquipmentTranslateWrapper>
    ),
    (props) => (
      <ClassTranslateWrapper translateMap={translateClassMap}>
        {props.children}
      </ClassTranslateWrapper>
    ),
    (props) => (
      <skillToHeroContext.Provider value={skillsToHeroMap}>
        {props.children}
      </skillToHeroContext.Provider>
    ),
    (props) => <Layout>{props.children}</Layout>,
  ]);
  return (
    <>
      <MasterProvider>
        <HeroComponent hero={heroData}></HeroComponent>
      </MasterProvider>
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
  const translateSkillsMap = db.getTranslateSkillsMap();
  const skillsMap = db.getSkillsMap();
  const threeCostSkillMap = db.get3cSkillsMap();
  const translateHeroMap = db.getTranslateHeroMap();
  const translateSoldiersMap = db.getTranslateSoldiersMap();
  const soldierMap = db.getSoldierMap();
  const translateEquipmentMap = db.getTranslateEquipmentMap();
  const translateClassMap = db.getTranslateClassMap();
  const translateUIMap = db.getTranslateUIMap();

  const name = context.params?.name as string;
  const heroData: Hero = heroes[name];
  return {
    props: {
      heroData,
      skillsMap,
      soldierMap,
      translateUIMap,
      skillsToHeroMap,
      translateHeroMap,
      translateClassMap,
      threeCostSkillMap,
      translateSkillsMap,
      translateSoldiersMap,
      translateEquipmentMap,
    },
  };
};

export default HeroPage;
