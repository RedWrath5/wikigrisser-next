import Link from "next/link";
import fs from "fs";
import { PropsWithRef } from "react";

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
  const files = fs.readdirSync("data/heroes");
  return {
    props: {
      heroes: files.map(filename => filename.replace(".json", ""))
    }
  };
};

export default Home;
