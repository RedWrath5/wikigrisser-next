import Image from "next/image";
import React from "react";
import { EquipmentSection } from "./EquipmentSection";
import { Class, Hero, HeroStats } from "../../types/hero";

export function TalentSection({
  hero: {
    factions,
    talent,
    name,
    startingClass,
    bondRequirments,
    soldierBonus,
    exclusiveEquipment,
  },
}: {
  hero: Hero;
}) {
  const maxStats = findMaxStats(startingClass);
  return (
    <div className="mb-2 p-4 grid grid-cols-12 gap-2">
      <div className="col-span-12 sm:col-span-1 text-center align-middle">
        {factions.map((faction) => (
          <span key={faction}>
            <Image
              src={"/factions/" + faction + ".png"}
              width={50}
              height={50}
            ></Image>
          </span>
        ))}
      </div>
      <div className="col-span-12 sm:col-span-2 text-center align-middle">
        <Image
          src={"/talents/" + name + ".png"}
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="col-span-12 sm:col-span-9 pt-2">
        <p className="text-2xl">Talent: {talent?.name}</p>
        <p className="whitespace-pre-line">{talent?.description}</p>
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
        {maxStats.length > 0 && (
          <p className="pt-5 font-bold">Level 70 Max Stats:</p>
        )}
        {maxStats.map((maxStats) => (
          <li key={name}>
            <span>{maxStats.className}: </span>
            <span>
              HP: {maxStats.stats.hp} | ATK: {maxStats.stats.atk} | INT:{" "}
              {maxStats.stats.int} | DEF: {maxStats.stats.def} | MDEF:
              {maxStats.stats.mdef} | SKL: {maxStats.stats.skill}
            </span>
          </li>
        ))}
        {soldierBonus && (
          <>
            <p className="pt-5 font-bold">Soldier Bonus:</p>
            <li>
              HP: {soldierBonus.hp}% | ATK: {soldierBonus.atk}% | DEF:{" "}
              {soldierBonus.def}% | MDEF: {soldierBonus.mdef}%
            </li>
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
