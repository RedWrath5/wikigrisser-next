import React, { useContext, useEffect, useState } from "react";
import { TranslateSoldiersMap, Soldier } from "../../types/hero";
import { TrainingSkillSection } from "./TrainingSkillSection";
import { Collapse } from "@material-ui/core";
import { TranslateSoldiersLoader } from "../../util/loaders/TranslateSoldiersLoader";


export function SoldiersGallerySection({ soldier }: { soldier: Soldier }) {
  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState(soldier.name);
  const [effect, setEffect] = useState(soldier.effect);


  const handleShowMoreButton = () => {
    setShowMore(!showMore);
  };

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
        <p className="text-2xl">{name}</p>
        <p>
          HP: {soldier.baseHp} / ATK: {soldier.baseAtk} / DEF: {soldier.baseDef}{" "}
          / MDEF: {soldier.baseMdef}
        </p>
        <p>
          Move: {soldier.move} / Range: {soldier.range}
        </p>
        <p className="whitespace-pre-line">{effect}</p>
      </div>

      <div className="flex justify-center col-span-12 border-t-2 border-black border-solid mt-6">
        {soldier.trainingSkill && (
          <button onClick={handleShowMoreButton} className="">
            <img
              src="ui/arrow_down.svg"
              alt="arrow image"
              className={
                showMore
                  ? "transform -rotate-180 bg-white -mt-6"
                  : "bg-white -mt-6"
              }
            />
          </button>
        )}
      </div>

      <div className="mt-2 col-span-12 sm:col-span-11">
        {soldier.trainingSkill && (
          <Collapse timeout={750} key={soldier.name} in={showMore}>
            <TrainingSkillSection trainingSkill={soldier.trainingSkill} />
          </Collapse>
        )}
      </div>
    </div>
  );
}
