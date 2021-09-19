import React from "react";
import { Soldier } from "../../types/hero";

export function SoldiersGallerySection({ soldier }: { soldier: Soldier }) {
  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2 w-full">
      <div className="col-span-12 text-center sm:col-span-1">
        <img
          src={"/soldier card/" + soldier.name + ".png"}
          className="inline"
          width={70}
          height={70}
        ></img>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
        <p className="text-2xl">{soldier.name}</p>
        <p>
          HP: {soldier.baseHp} / ATK: {soldier.baseAtk} / DEF: {soldier.baseDef}{" "}
          / MDEF: {soldier.baseMdef}
        </p>
        <p>
          Move: {soldier.move} / Range: {soldier.range}
        </p>
        <p className="whitespace-pre-line">{soldier.effect}</p>
      </div>
    </div>
  );
}
