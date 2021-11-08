import React from "react";
import { Class, Hero, HeroStats } from "../../types/hero";
import { useHeroTranslateContext } from "../context/HeroTranslateContext";
import { useTranslateContext } from "../context/TranslateContext";

export function TalentSection({
  hero: {
    factions,
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
  const { getHeroInfo, getRelatedBond } = useHeroTranslateContext();
  const { t } = useTranslateContext();
  const { talentName, talentDescription, bond2, bond3, bond4, bond5 } =
    getHeroInfo(name);

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
            <img
              src={"/factions/" + faction + ".png"}
              className="inline"
              width={50}
              height={50}
            ></img>
          </span>
        ))}
      </div>
      <div className="col-span-12 sm:col-span-2 text-center align-middle">
        <img
          src={"/talents/" + prettyName + ".png"}
          className="inline"
          width={175}
          height={158}
        ></img>
        {spClass && (
          <img
            src={"/talents/" + prettyName + " SP.png"}
            className="inline ml-3 sm:ml-0 sm:mt-3"
            width={175}
            height={158}
          ></img>
        )}
      </div>
      <div className="col-span-12 sm:col-span-9 pt-2">
        <p className="text-2xl">Talent: {talentName}</p>
        <p className="whitespace-pre-line">{talentDescription}</p>
        {spClass && (
          <>
            <p className="text-2xl mt-3">SP Talent: {spClass.talent?.name}</p>
            <p className="whitespace-pre-line">{spClass.talent?.description}</p>
          </>
        )}
        {bondRequirments && (
          <>
            <p className="pt-5 font-bold">{t("Bond Requirement")}:</p>
            <li>{`${t("Glory: Level 5 Intimacy.")}`}</li>
            <li>{`${t("Light: Level 10 Intimacy")} + ${bond2}`}</li>
            <li>{`${t("Honor: Level 15 Intimacy")} + ${bond3}`}</li>
            <li>{`${t("Toughness: Level 23 Intimacy")} + ${bond4}`}</li>
            <li>{`${t("Strength: Level 25 Intimacy")} + ${bond5}`}</li>
          </>
        )}

        {bondRequirments && bondRequirments.relatedBonds.length > 0 && (
          <>
            <p className="pt-5 font-bold">{t("Related Bonds")}</p>
            {bondRequirments.relatedBonds.map((bond) => {
              const { name, prettyName, type, text } = getRelatedBond(bond);
              return (
                <li key={name}>
                  <a href={"/heroes/" + name} className="underline">
                    {prettyName}
                  </a>
                  <span className="ml-1">
                    {t(type)}: {text}
                  </span>
                </li>
              );
            })}
          </>
        )}
        {maxStats.length > 0 && (
          <p className="pt-5 font-bold">{t("Level 70 Max Stats")}:</p>
        )}
        {maxStats.map((maxStats) => (
          <li key={maxStats.className}>
            <span>{t(maxStats.className)}: </span>
            <span>
              {t("HP")}: {maxStats.stats.hp} | {t("ATK")}: {maxStats.stats.atk}{" "}
              | {t("INT")}: {maxStats.stats.int} | {t("DEF")}:{" "}
              {maxStats.stats.def} | {t("MDEF")}:{maxStats.stats.mdef} |{" "}
              {t("SKL")}: {maxStats.stats.skill}
            </span>
          </li>
        ))}
        {soldierBonus && (
          <>
            <p className="pt-5 font-bold">{t("Soldier Bonus")}:</p>
            <li>
              {t("HP")}: {soldierBonus.hp}% | {t("ATK")}: {soldierBonus.atk}% |{" "}
              {t("DEF")}: {soldierBonus.def}% | {t("MDEF")}: {soldierBonus.mdef}
              %
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

const STATSTEMP: HeroStats = {
  atk: "0",
  def: "0",
  hp: "0",
  int: "0",
  mdef: "0",
  skill: "0",
};
