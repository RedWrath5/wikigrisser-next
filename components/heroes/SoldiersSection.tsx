import { Class, Hero } from "../../types/hero";
import { SoldiersSubSection } from "./SoldiersSubSection";

export function SoldiersSection({
  hero: { startingClass, spClass },
}: {
  hero: Hero;
}) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row bg-gray-200 justify-center">
        <div
          className="flex- flex-row w-full ml-2 mr-2"
          style={{ maxWidth: "1280px" }}
        >
          <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
            <div className="ml-2 text-2xl">Classes & Soldiers</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-col mt-2 mb-2">
            {startingClass.children.map((child) => (
              <SoldiersSubSection
                key={child.name}
                heroClass={child}
              ></SoldiersSubSection>
            ))}
            <SoldiersSubSection
              heroClass={startingClass}
              isStarting={true}
            ></SoldiersSubSection>
            {spClass && (
              <SoldiersSubSection
                heroClass={spClass}
                isSpClass={true}
              ></SoldiersSubSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
