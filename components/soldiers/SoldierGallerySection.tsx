import React, { useState } from "react";
import { Soldier } from "../../types/hero";
import { TrainingSkillSection } from "./TrainingSkillSection";
import { Collapse } from "@material-ui/core";

export function SoldiersGallerySection({ soldier }: { soldier: Soldier }) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreButton = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2 w-full">
      <div className="col-span-12 text-center sm:col-span-1">
        <img
          src={"/soldier sprite/" + soldier.name + ".png"}
          className="inline"
        ></img>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left ml-2">
        <p className="text-2xl mb-2">{soldier.name}</p>

        <p className="flex text-xl mb-1">
          <img
            src={"/stats/HP.png"}
            className="inline mr-1"
            height={28}
            width={28}
          ></img>
          {soldier.baseHp}
          <img
            src={"/stats/ATK.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></img>
          {soldier.baseAtk}
          <img
            src={"/stats/DEF.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></img>
          {soldier.baseDef}
          <img
            src={"/stats/MDEF.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></img>
          {soldier.baseMdef}
        </p>
        <p className="flex lext-left text-xl mb-2">
          <img
            src={"/stats/Move_" + soldier.moveType + ".png"}
            className="inline mr-1"
            height={28}
            width={28}
          ></img>
          {soldier.move}{" "}
          <img
            src={"/stats/Range.png"}
            className="inline mr-1 ml-5"
            height={28}
            width={28}
          ></img>
          {soldier.range}
        </p>
        <p className="whitespace-pre-line">{soldier.effect}</p>
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
