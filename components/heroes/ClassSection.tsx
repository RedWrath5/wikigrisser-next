import Image from "next/image";
import { Class } from "../../types/hero";
import { SkillSection } from "./SkillSection";

export function ClassSection({ heroClass }: { heroClass: Class }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row bg-gray-200 justify-center">
        <div className="flex- flex-row w-full" style={{ maxWidth: "1280px" }}>
          <div className="flex mt-2 mb-2 items-center">
            <Image
              src={"/classes/" + heroClass.name + ".png"}
              width={70}
              height={75}
            ></Image>
            <div className="ml-2 text-2xl">{heroClass.name}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-col mt-2 mb-2">
            {heroClass.skills.map(
              (skill) => skill && <SkillSection skill={skill}></SkillSection>
            )}
          </div>
        </div>
      </div>
      {heroClass.children.map((heroClassInner) => (
        <ClassSection heroClass={heroClassInner}></ClassSection>
      ))}
    </div>
  );
}
