import React from "react";
import { Layout } from "../../components/Layout";
import { Factions, Hero, Talent } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import { GetStaticPaths, GetStaticProps } from "next";
import XLSX, { WorkBook } from "xlsx";
import { DBSingleton } from "../../util/databaseSingleton";

const HeroPage = ({ heroData }: {heroData: Hero}) => {
  return (
    <>
      <Layout>
        <HeroComponent hero={heroData}></HeroComponent>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  var workbook = XLSX.readFile('data/database.xlsx');
  const heroes = [];
  let rowNumber = 3;
  while(workbook.Sheets.Heroes["A" + rowNumber]?.v) {
    let heroName:string = workbook.Sheets.Heroes["A" + rowNumber].v;
    heroName = heroName.toLowerCase();
    heroes.push(heroName);
    rowNumber++
  }

  const paths = heroes.map(heroName => ({
    params: {
      name: heroName
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps  = async (context) => {
  var workbook = DBSingleton.getInstance().getWorkBook();

  const name = context.params?.name as string;
  const heroData: Hero = getHeroData(workbook, name)
  return {
    props: {
      heroData
    }
  };
};

function getHeroData (workbook:WorkBook, name: string): Hero {

  let rowNumber = findHeroRow(workbook, name);
  
  const talent:Talent = {
    name: getWorkbookHeroRowValue(workbook, rowNumber, "C"),
    description: getWorkbookHeroRowValue(workbook, rowNumber, "D"), 
  }

  const factions = getFactionsForHero(workbook, rowNumber);

  return {
    name,
    prettyName: getWorkbookHeroRowValue(workbook, rowNumber, "A"),
    talent,
    factions,
  }
}

const findHeroRow = (workbook:WorkBook, heroName: string):number => {
  let rowNumber = 3;
  let matchNotFound = true;

  while(matchNotFound) {
    let heroNameInner = workbook.Sheets.Heroes["A" + rowNumber].v;
    heroNameInner = heroNameInner.toLowerCase();
    rowNumber++
    matchNotFound = heroName !== heroNameInner
  }
  rowNumber--;

  return rowNumber;
}

function getWorkbookHeroRowValue (workbook: WorkBook, rowNumber: number, column: string) {
  return workbook.Sheets.Heroes[column + rowNumber]?.v || null;
}

function getFactionsForHero(workbook: WorkBook, rowNumber: number): Factions[] {
  const FACTION_TO_COL_MAP:{[key:string]: Factions} = {
    K: 'protagonist',
    L: 'glory',
    M: 'origin',
    N: 'princess',
    O: 'empire',
    P: 'strategic',
    Q: 'dark',
    R: 'meteor',
    S: 'legends',
    T: 'mythic',
    U: 'tensei',
    V: 'time',
  }
  const factions:Factions[] = [];

  Object.entries(FACTION_TO_COL_MAP).forEach(([key, value]) => {
    const cellValue = getWorkbookHeroRowValue(workbook, rowNumber, key);
    if(cellValue === '✓' || cellValue === '✓+')
      factions.push(value)
  });


  return factions;
}


export default HeroPage;


