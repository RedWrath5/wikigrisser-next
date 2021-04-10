import Image from "next/image";
import React from "react";
import { Hero } from "../../types/hero";
import { ClassSection } from "./ClassSection";
import { SkillSection } from "./SkillSection";
import { TalentSection } from "./TalentSection";

export function HeroComponent({ hero }: { hero: Hero }) {
  return (
    <div className="bg-white text-gray-600 font-thin flex flex-grow justify-center flex-col">
      <h1 className="text-6xl text-center mb-10">{hero.prettyName}</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-3/12 sm:4/12 px-4">
          <Image
            src={"/heroes/" + hero.name + ".png"}
            width={1000}
            height={1000}
          ></Image>
        </div>
      </div>
      <div className="bg-gray-900 text-white font-sans pt-2 pb-2 flex flex-col pl-20 pr-20">
        <TalentSection hero={hero}></TalentSection>
        {hero.threeCostSkill && (
          <SkillSection skill={hero.threeCostSkill}></SkillSection>
        )}
      </div>
      <div className="flex">
        <ClassSection heroClass={hero.startingClass}></ClassSection>
      </div>
    </div>
  );
}
