import React from "react";
import { Skill } from "../../types/hero";
import { SkillIcon } from "./SkillIcon";
import { useHeroTranslateContext } from "../context/HeroTranslateContext";

export function SkillSection({
  skill,
  isAwakening,
}: {
  skill: Skill;
  isAwakening?: boolean;
}) {
  const { getSkillInfo } = useHeroTranslateContext();
  const { name, description } = getSkillInfo(skill.name);
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2">
      <div className="col-span-12 text-center sm:col-span-1">
        <SkillIcon skill={skill}></SkillIcon>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
        <p className="text-2xl">
          {isAwakening && "Awakening: "}
          {name}
        </p>
        <p>
          Cost: {skill.cost} / CD:{skill.cd} / Range:{skill.range} / Span:
          {skill.span}
        </p>
        <p className="whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}
