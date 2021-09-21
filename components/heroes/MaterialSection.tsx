import React from "react";
import { Class } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { Material } from "../../types/spreedsheet";
import { HeroIcon } from "./HeroIcon";

{
  /* Hero class icon + material tiers list*/
}
export function HeroCard({ heroClass }: { heroClass: Class }) {
  return (
    <>
      <HeroIcon name={heroClass.name} />
      <div className="flex flex-row justify-center">
        <BoundedColumn>
          <div className="flex flex-col mt-2 mb-2">
            {heroClass.materials.map((list, index) => (
              <MaterialList materials={list} tier={index + 1} key={index} />
            ))}
          </div>
        </BoundedColumn>
      </div>
      <div>
        {heroClass.children.map((hero) => (
          <HeroCard heroClass={hero} key={hero.name} />
        ))}
      </div>
    </>
  );
}

/* Materials row for materials tier list */
export function MaterialList({
  materials,
  tier,
}: {
  materials: Material[];
  tier: number;
}) {
  return (
    <div className="flex- flex-row w-full">
      <p className="mb-3 text-center sm:text-left">
        <b>{`Tier ${tier}`}</b>
      </p>
      <div className="flex flex-wrap justify-start mb-2">
        {materials.map((v) => (
          <MaterialItem material={v} key={v.name} />
        ))}
      </div>
    </div>
  );
}

{
  /* Material icon + counter */
}
export function MaterialItem({ material }: { material: Material }) {
  return (
    <div className="w-20 ml-1">
      <img
        src={"/job material/" + material.name + ".png"}
        className="block"
        width={70}
        height={75}
        alt={material.name}
      />
      <div>
        <b>x {material.count}</b>
      </div>
    </div>
  );
}
{/* Main page */}
export function MaterialSection({ heroClass }: { heroClass: Class }) {
  return (
    <div className="flex flex-col justify-center ">
      <HeroCard heroClass={heroClass} />
    </div>
  );
}
