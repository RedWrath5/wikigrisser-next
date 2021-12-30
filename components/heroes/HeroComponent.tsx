import React, { useState, Fragment } from "react";
import { Hero } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { ClassSection } from "./ClassSection";
import ExclusiveEquipmentSection from "./ExclusiveEquipmentSection";
import { HeroSkinCarousel } from "./HeroSkinCarousel";
import { SkillSection } from "./SkillSection";
import { SoldiersSection } from "./SoldiersSection";
import { TalentSection } from "./TalentSection";
import { Tabs, Tab } from "@material-ui/core";
import { MaterialSection } from "./MaterialSection";
import { useHeroTranslateContext } from "../context/HeroTranslateContext";
import { useTranslateContext } from "../context/TranslateContext";

export function HeroComponent({ hero }: { hero: Hero }) {
  {
    /* tab value*/
  }
  const [tab, setTab] = useState("main");
  const handleChangeTab = (event: React.ChangeEvent<{}>, newTab: string) => {
    setTab(newTab);
  };

  const { getHeroInfo } = useHeroTranslateContext();
  const { t } = useTranslateContext();
  const { name } = getHeroInfo(hero.name);

  return (
    <div className="bg-white flex flex-grow justify-center flex-col">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        {name}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4" style={{ maxWidth: "500px" }}>
          <HeroSkinCarousel hero={hero}></HeroSkinCarousel>
        </div>
      </div>
      <div className="flex bg-gray-900 text-white font-sans font-normal justify-center">
        <BoundedColumn>
          <TalentSection hero={hero}></TalentSection>
          {hero.exclusiveEquipment?.name && (
            <ExclusiveEquipmentSection
              equipment={hero.exclusiveEquipment}
            ></ExclusiveEquipmentSection>
          )}
          {hero.threeCostSkill && (
            <SkillSection
              skill={hero.threeCostSkill}
              isAwakening={true}
            ></SkillSection>
          )}
        </BoundedColumn>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center">
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label={t("Classes & Soldiers")} value="main" />
            <Tab label={t("Materials")} value="materials" />
          </Tabs>
        </div>

        {tab === "main" && (
          <Fragment>
            <SoldiersSection hero={hero}></SoldiersSection>
            <ClassSection heroClass={hero.startingClass}></ClassSection>
            {hero.spClass && (
              <ClassSection heroClass={hero.spClass}></ClassSection>
            )}
          </Fragment>
        )}
        {tab === "materials" && (
          <MaterialSection heroClass={hero.startingClass} />
        )}
      </div>
    </div>
  );
}
