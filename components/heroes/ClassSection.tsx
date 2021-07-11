import { Class } from "../../types/hero";
import { SkillSection } from "./SkillSection";

export function ClassSection({ heroClass }: { heroClass: Class }) {
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row bg-gray-200 justify-center">
          <div
            className="flex- flex-row w-full ml-2 mr-2"
            style={{ maxWidth: "1280px" }}
          >
            <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
              <img
                src={"/classes/" + heroClass.name + ".png"}
                className="inline"
                width={70}
                height={75}
              ></img>
              <div>
                <div className="ml-2 text-2xl">{heroClass.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full" style={{ maxWidth: "1280px" }}>
            <div className="flex flex-col mt-2 mb-2">
              {heroClass.skills.map(
                (skill) =>
                  skill && (
                    <SkillSection key={skill.name} skill={skill}></SkillSection>
                  )
              )}
            </div>
          </div>
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
