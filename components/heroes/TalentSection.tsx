import React from "react";
import { Class, Hero, HeroStats } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import { Img } from "../layout/Img";
import SoldierBonusSection from "./SoldierBonusSection";

export function TalentSection({
  hero: {
    factions,
    talent,
    name,
    prettyName,
    startingClass,
    bondRequirments,
    soldierBonus,
    spClass,
  },
}: {
  hero: Hero;
}) {
  let maxStats = findMaxStats(startingClass);
  if (spClass)
    maxStats = maxStats.concat({
      className: spClass.name,
      stats: spClass.maxStats || STATSTEMP,
    });
  return (
    <div className="mb-2 p-4 grid grid-cols-12 gap-2">
      <div className="col-span-12 sm:col-span-1 text-center align-middle">
        {factions.map((faction) => (
          <span key={faction}>
            <Img
              src={"/factions/" + faction + ".png"}
              className="inline"
              width={50}
              height={50}
            ></Img>
          </span>
        ))}
      </div>
      <div className="col-span-12 sm:col-span-2 text-center align-middle">
        <Img
          src={"/talents/" + prettyName + ".png"}
          className="inline"
          width={175}
          height={158}
          onError={(err) => addDefaultSrc(err, "/404/talents.png")}
        ></Img>
        {spClass && (
          <Img
            src={"/talents/" + prettyName + " SP.png"}
            className="inline ml-3 sm:ml-0 sm:mt-3"
            width={175}
            height={158}
            onError={addDefaultSrc}
          ></Img>
        )}
      </div>
      <div className="col-span-12 sm:col-span-9 pt-2">
        <p className="text-2xl">Talent: {talent?.name}</p>
        <p className="whitespace-pre-line">{talent?.description}</p>
        {spClass && (
          <>
            <p className="text-2xl mt-3">SP Talent: {spClass.talent?.name}</p>
            <p className="whitespace-pre-line">{spClass.talent?.description}</p>
          </>
        )}
        {bondRequirments && (
          <>
            <p className="pt-5 font-bold">Bond Requirement:</p>
            <li>Glory: Level 5 Intimacy.</li>
            <li>Light: Level 10 Intimacy + {bondRequirments.bond2}</li>
            <li>Honor: Level 15 Intimacy + {bondRequirments.bond3}</li>
            <li>Toughness: Level 23 Intimacy + {bondRequirments.bond4}</li>
            <li>Strength: Level 25 Intimacy + {bondRequirments.bond5}</li>
          </>
        )}
        {bondRequirments && bondRequirments.relatedBonds.length > 0 && (
          <>
            <p className="pt-5 font-bold">Related Bonds</p>
            {bondRequirments.relatedBonds.map((bond) => (
              <li key={bond.name + bond.text}>
                <a href={"/heroes/" + bond.name} className="underline">
                  {bond.prettyName}
                </a>
                <span className="ml-1">
                  {bond.type}: {bond.text}
                </span>
              </li>
            ))}
          </>
        )}
        {maxStats.length > 0 && (
          <p className="pt-5 font-bold">Level 70 Max Stats:</p>
        )}
        <table>
          <tbody>
            {maxStats.map((maxStats) => (
              <tr key={maxStats.className} className="list-disc">
                <td>
                  <li className="mr-2">{maxStats.className}</li>
                </td>
                <td>
                  HP: {maxStats.stats.hp} | ATK: {maxStats.stats.atk} | INT:{" "}
                  {maxStats.stats.int} | DEF: {maxStats.stats.def} | MDEF:
                  {maxStats.stats.mdef} | SKL: {maxStats.stats.skill}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {soldierBonus && (
          <>
            <p className="pt-5 font-bold">Soldier Bonus:</p>
            <table>
              <tbody>
                <SoldierBonusSection
                  name={maxStats
                    .map((stat) => stat.className)
                    .filter((className) => className !== spClass?.name)
                    .join(" / ")}
                  bonus={soldierBonus}
                />

                {spClass && (
                  <SoldierBonusSection
                    name={spClass.name}
                    bonus={spClass.soldierBonus}
                  />
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

function findMaxStats(inputClass: Class): ClassWithMaxStats[] {
  if (!inputClass.children) {
    return [];
  }
  let maxStatsArr: ClassWithMaxStats[] = [];
  if (inputClass.maxStats)
    maxStatsArr = maxStatsArr.concat({
      className: inputClass.name,
      stats: inputClass.maxStats,
    });
  return inputClass.children.reduce(
    (accumulator, child) => accumulator.concat(findMaxStats(child)),
    maxStatsArr
  );
}

interface ClassWithMaxStats {
  className: string;
  stats: HeroStats;
}

const STATSTEMP: HeroStats = {
  atk: "0",
  def: "0",
  hp: "0",
  int: "0",
  mdef: "0",
  skill: "0",
};
