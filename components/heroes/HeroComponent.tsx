import Image from "next/image";
import React from "react";
import { Hero } from "../../types/hero";
import { ClassSection } from "./ClassSection";
import { EquipmentSection } from "./EquipmentSection";
import { SkillSection } from "./SkillSection";
import { SoldiersSection } from "./SoldiersSection";
import { TalentSection } from "./TalentSection";

export function HeroComponent({ hero }: { hero: Hero }) {
  return (
    <div className="bg-white flex flex-grow justify-center flex-col">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        {hero.prettyName}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4" style={{ maxWidth: "500px" }}>
          <Image
            src={"/heroes/" + hero.prettyName + ".png"}
            width={1280}
            height={1280}
          ></Image>
        </div>
      </div>
      <div className="flex bg-gray-900 text-white font-sans font-normal justify-center">
        <div className="flex flex-col" style={{ maxWidth: "1280px" }}>
          <TalentSection hero={hero}></TalentSection>
          {hero.exclusiveEquipment && (
            <EquipmentSection
              equipment={hero.exclusiveEquipment}
              isExclusive={true}
            ></EquipmentSection>
          )}
          {hero.threeCostSkill && (
            <SkillSection
              skill={hero.threeCostSkill}
              isAwakening={true}
            ></SkillSection>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {/* <SoldiersSection startingClass={hero.startingClass}></SoldiersSection> */}
        <ClassSection heroClass={hero.startingClass}></ClassSection>
      </div>
    </div>
  );
}
