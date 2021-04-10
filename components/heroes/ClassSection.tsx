import Image from "next/image";
import { Class } from "../../types/hero";
import { SkillSection } from "./SkillSection";

export function ClassSection({ heroClass }: { heroClass: Class }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row bg-gray-500">{heroClass.name}</div>
      <div className="flex flex-col">
        {heroClass.skills.map(
          (skill) => skill && <SkillSection skill={skill}></SkillSection>
        )}
      </div>
      {heroClass.children.map((heroClassInner) => (
        <ClassSection heroClass={heroClassInner}></ClassSection>
      ))}
    </div>
  );
}
