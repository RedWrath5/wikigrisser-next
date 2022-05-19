import React, { useState } from "react";
import { Soldier } from "../../types/hero";
import { TrainingSkillSection } from "./TrainingSkillSection";
import { Collapse } from "@material-ui/core";
import { RelatedHeroesSection } from "./RelatedHeroesSection";
import { Img } from "../layout/Img";

export function SoldiersGallerySection({ soldier }: { soldier: Soldier }) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreButton = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="grid grid-cols-12 items-center mt-2 mb-2 w-full">
      <div className="col-span-12 text-center sm:col-span-1">
        <Img
          src={"/soldier sprite/" + soldier.name + ".png"}
          className="inline"
        ></Img>
      </div>
      <div className="col-span-12 text-center sm:col-span-11 sm:text-left ml-2">
        <p className="text-2xl mb-2">{soldier.name}</p>

        <p className="flex text-xl mb-1">
          <Img
            src={"/stats/HP.png"}
            className="inline mr-1"
            height={28}
            width={28}
          ></Img>
          {soldier.baseHp}
          <Img
            src={"/stats/ATK.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></Img>
          {soldier.baseAtk}
          <Img
            src={"/stats/DEF.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></Img>
          {soldier.baseDef}
          <Img
            src={"/stats/MDEF.png"}
            className="inline mr-1 ml-2"
            height={28}
            width={28}
          ></Img>
          {soldier.baseMdef}
        </p>
        <p className="flex lext-left text-xl mb-2">
          <Img
            src={"/stats/Move_" + soldier.moveType + ".png"}
            className="inline mr-1"
            height={28}
            width={28}
          ></Img>
          {soldier.move}{" "}
          <Img
            src={"/stats/Range.png"}
            className="inline mr-1 ml-5"
            height={28}
            width={28}
          ></Img>
          {soldier.range}
        </p>
        <p className="whitespace-pre-line">{soldier.effect}</p>
      </div>

      <div className="flex justify-center col-span-12 border-t-2 border-black border-solid mt-6">
        {soldier.trainingSkill && (
          <button onClick={handleShowMoreButton} className="">
            <Img
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
            <RelatedHeroesSection heroNames={soldier.relatedHeroes} />
            <TrainingSkillSection trainingSkill={soldier.trainingSkill} />
          </Collapse>
        )}
      </div>
    </div>
  );
}
