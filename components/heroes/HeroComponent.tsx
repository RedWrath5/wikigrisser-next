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
        <div className="w-full px-4" style={{ maxWidth: "350px" }}>
          <Image
            src={"/heroes/" + hero.name + ".png"}
            width={550}
            height={770}
            layout="responsive"
          ></Image>
        </div>
      </div>
      <div className="flex bg-gray-900 text-white font-sans justify-center">
        <div className="flex flex-col" style={{ maxWidth: "1200px" }}>
          <TalentSection hero={hero}></TalentSection>
          {hero.threeCostSkill && (
            <SkillSection skill={hero.threeCostSkill}></SkillSection>
          )}
        </div>
      </div>
      <div className="flex" style={{ maxWidth: "1200px" }}>
        <ClassSection heroClass={hero.startingClass}></ClassSection>
      </div>
    </div>
  );
}
