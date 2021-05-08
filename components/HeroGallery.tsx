import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Factions, Hero } from "../types/hero";
import { HeroMap } from "../util/databaseSingleton";

export function HeroGallery({ heroMap }: { heroMap: HeroMap }) {
  const [filteredHeroes, setFilteredHeroes] = useState(Object.values(heroMap));
  const [filters, setFilters] = useState([] as Filter[]);

  function toggleFactionFilter(faction: Factions) {
    const index = filters.findIndex(
      (filter) => filter.type === "faction" && filter.value === faction
    );
    if (index === -1) filters.push({ type: "faction", value: faction });
    else filters.splice(index, 1);
    setFilters(filters);
    applyFilters();
  }

  function applyFilters() {
    if (filters.length === 0) return setFilteredHeroes(Object.values(heroMap));
    const validHeroes = Object.values(heroMap).filter((hero) => {
      const isHeroValidForEachFilter = filters.map((filter) => {
        if (filter.type === "faction")
          return hero.factions.includes(filter.value);
      });
      return isHeroValidForEachFilter.reduce(
        (value, accumulator) => value || accumulator,
        false
      );
    });
    setFilteredHeroes(validHeroes);
  }

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        Heroes
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <div className="flex" style={{ maxWidth: "1280px" }}>
          {Object.values(Factions).map((faction) => (
            <div key={faction} className="flex mr-1 cursor-pointer">
              <Image
                className={
                  filters.find(
                    (filter) =>
                      filter.type === "faction" && filter.value === faction
                  )
                    ? "bg-blue-100 rounded-xl"
                    : ""
                }
                onClick={() => toggleFactionFilter(faction)}
                src={"/factions/" + faction + ".png"}
                width={50}
                height={50}
              ></Image>
            </div>
          ))}
        </div>
      </div>
      <div className="flex font-sans font-normal justify-center">
        <div
          className="flex flex-row flex-wrap gap-5 justify-center"
          style={{ maxWidth: "1280px" }}
        >
          {filteredHeroes.map((hero) => {
            return (
              <div className="cursor-pointer" key={hero.name}>
                <Link href={"/heroes/" + hero.name}>
                  <Image
                    src={"/hero cards/Card_" + hero.prettyName + ".png"}
                    width={100}
                    height={100}
                  ></Image>
                </Link>
                <Link href={"/heroes/" + hero.name}>
                  <p className="text-center" style={{ width: "100px" }}>
                    {hero.prettyName}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface Filter {
  type: "faction";
  value: Factions;
}
