import React from "react";
import { Hero } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { ClassSection } from "./ClassSection";
import { EquipmentSection } from "../equipment/EquipmentSection";
import { HeroSkinCarousel } from "./HeroSkinCarousel";
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
          <HeroSkinCarousel hero={hero}></HeroSkinCarousel>
        </div>
      </div>
      <div className="flex bg-gray-900 text-white font-sans font-normal justify-center">
        <BoundedColumn>
          <TalentSection hero={hero}></TalentSection>
          {hero.exclusiveEquipment?.name && (
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
        </BoundedColumn>
      </div>
      <div className="flex flex-col">
        <SoldiersSection hero={hero}></SoldiersSection>
        <ClassSection heroClass={hero.startingClass}></ClassSection>
        {hero.spClass && <ClassSection heroClass={hero.spClass}></ClassSection>}
      </div>
    </div>
  );
}
