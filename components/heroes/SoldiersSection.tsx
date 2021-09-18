import React from "react";
import { Class, Hero } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SoldiersSubSection } from "./SoldiersSubSection";

export function SoldiersSection({
  hero: { startingClass, spClass },
}: {
  hero: Hero;
}) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row bg-gray-200 justify-center">
        <BoundedColumn>
          <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
            <div className="ml-2 text-2xl">Classes & Soldiers</div>
          </div>
        </BoundedColumn>
      </div>
      <div className="flex flex-row justify-center">
        <BoundedColumn>
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
        </BoundedColumn>
      </div>
    </div>
  );
}
