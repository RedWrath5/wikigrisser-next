import React from "react";
import { Class } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SkillSection } from "./SkillSection";
import { HeroIcon } from "./HeroIcon";

export function ClassSection({ heroClass }: { heroClass: Class }) {
  return (
    <>
      <div className="flex flex-col justify-center">
        <HeroIcon name={heroClass.name} />
        <div className="flex flex-row justify-center">
          <BoundedColumn>
            <div className="flex flex-col mt-2 mb-2">
              {heroClass.skills.map(
                (skill) =>
                  skill && (
                    <SkillSection key={skill.name} skill={skill}></SkillSection>
                  )
              )}
            </div>
          </BoundedColumn>
        </div>
        {heroClass.children.map((heroClassInner) => (
          <ClassSection
            key={heroClassInner.name}
            heroClass={heroClassInner}
          ></ClassSection>
        ))}
      </div>
    </>
  );
}
