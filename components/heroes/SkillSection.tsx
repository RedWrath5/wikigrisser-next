import React from "react";
import { Skill } from "../../types/hero";
import { SkillIcon } from "./SkillIcon";
import { useHeroTranslateContext } from "../context/HeroTranslateContext";
import { useTranslateContext } from "../context/TranslateContext";

export function SkillSection({
  skill,
  isAwakening,
}: {
  skill: Skill;
  isAwakening?: boolean;
}) {
  const { getSkillInfo } = useHeroTranslateContext();
  const { t } = useTranslateContext();
  const { name, description } = getSkillInfo(skill.name);
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2">
      <div className="col-span-12 text-center sm:col-span-1">
        <SkillIcon skill={skill}></SkillIcon>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
        <p className="text-2xl">
          {isAwakening && t("Awakening") + ": "}
          {name}
        </p>
        <p>
          {t("Cost")}: {skill.cost} / {t("CD")}:{skill.cd} / {t("Range")}:
          {skill.range} / {t("Span")}:{skill.span && t(skill.span.toString())}
        </p>
        <p className="whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}
