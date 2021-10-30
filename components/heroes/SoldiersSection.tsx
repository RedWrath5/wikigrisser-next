import React from "react";
import { Hero } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SoldiersSubSection } from "./SoldiersSubSection";
import { useTranslateContext } from "../context/TranslateContext";

export function SoldiersSection({
  hero: { startingClass, spClass },
}: {
  hero: Hero;
}) {
  const { t } = useTranslateContext();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row bg-gray-200 justify-center">
        <BoundedColumn>
          <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
            <div className="ml-2 text-2xl">{t("Classes & Soldiers")}</div>
          </div>
        </BoundedColumn>
      </div>
      <div className="flex flex-row justify-center ">
        <BoundedColumn>
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
        </BoundedColumn>
      </div>
    </div>
  );
}
