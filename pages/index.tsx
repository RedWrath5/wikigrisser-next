import Link from "next/link";
import fs from "fs";
import { PropsWithRef } from "react";
import { DBSingleton } from "../util/databaseSingleton";

const Home = ({ heroes }: PropsWithRef<{heroes: string[]}>) => (
  <div>
    heroes:
    {heroes.map(heroe => {
      return (
        <div key={heroe}>
          <Link href={"/heroes/" + heroe}>
            <a>{"/heroes/" + heroe}</a>
          </Link>
        </div>
      );
    })}
  </div>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance().getWorkBook();
  const heroes = [];
  let rowNumber = 3;
  while(workbook.Sheets.Heroes["A" + rowNumber]?.v) {
    let heroName:string = workbook.Sheets.Heroes["A" + rowNumber].v;
    heroName = heroName.toLowerCase();
    heroes.push(heroName);
    rowNumber++
  }
  
  return {
    props: {
      heroes
    }
  };
};

export default Home;
