import { Skill } from "../../types/hero";

export function SkillSection({
  skill,
  isAwakening,
}: {
  skill: Skill;
  isAwakening?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2">
      <div className="col-span-12 text-center sm:col-span-1">
        <div className="mb-3">
          <img
            src={"/skills/" + skill.name + ".png"}
            className="inline"
            width={70}
            height={70}
          ></img>
        </div>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
        <p className="text-2xl">
          {isAwakening && "Awakening: "}
          {skill.name}
        </p>
        <p>
          Cost: {skill.cost} / CD:{skill.cd} / Range:{skill.range} / Span:
          {skill.span}
        </p>
        <p className="whitespace-pre-line">{skill.description}</p>
      </div>
    </div>
  );
}
