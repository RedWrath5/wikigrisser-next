import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGalleryTranslateContext } from "../context/GalleryTranslateContext";
import { useTranslateContext } from "../context/TranslateContext";
import { Factions, Hero } from "../../types/hero";
import { HeroMap } from "../../util/databaseSingleton";
import { BoundedColumn } from "../layout/BoundedColumn";
import { HeroLink } from "./HeroLink";

export function HeroGallery({ heroMap }: { heroMap: HeroMap }) {
  const { t } = useTranslateContext();
  const SORTS: Sort[] = [
    { value: "rarity", prettyValue: t("Rarity") },
    { value: "alphabetically", prettyValue: t("Alphabetically") },
  ];

  const [filteredAndSortedHeroes, setFilteredAndSortedHeroes] = useState(
    Object.values(heroMap)
  );
  const [filters, setFilters] = useState([] as Filter[]);
  const [sort, setSort] = useState<Sort>(SORTS[1]);
  const [searchText, setSearchText] = useState("");
  const { getHeroInfo } = useGalleryTranslateContext();

  useEffect(() => {
    filterAndSort(filters, sort);
    setSearchText("");
  }, [filters, sort]);

  useEffect(() => {
    if (searchText.length > 0) search(searchText);
    else filterAndSort(filters, sort);
  }, [searchText]);

  function toggleFactionFilter(faction: Factions) {
    const index = filters.findIndex(
      (filter) => filter.type === "faction" && filter.value === faction
    );
    if (index === -1) filters.push({ type: "faction", value: faction });
    else filters.splice(index, 1);
    setFilters(filters.slice());
  }

  function filterAndSort(filters: Filter[], sort: Sort) {
    const heroArray = Object.values(heroMap);
    const filteredHeros = applyFilters(heroArray, filters);
    setFilteredAndSortedHeroes(applySort(filteredHeros, sort));
  }

  function applyFilters(heroMap: Hero[], filters: Filter[]): Hero[] {
    const heroArray = Object.values(heroMap);
    if (filters.length === 0) {
      return heroArray;
    }
    const validHeroes = heroArray.filter((hero) => {
      const isHeroValidForEachFilter = filters.map((filter) => {
        if (filter.type === "faction")
          return hero.factions.includes(filter.value);
      });
      return isHeroValidForEachFilter.reduce(
        (value, accumulator) => value && accumulator,
        true
      );
    });
    return validHeroes;
  }

  function applySort(heroArray: Hero[], sort: Sort): Hero[] {
    if (sort.value === "alphabetically") return heroArray.sort(compareByName);

    if (sort.value === "rarity") return heroArray.sort(compareByRarity);

    return heroArray;
  }

  function search(text: string) {
    let heroArray = Object.values(heroMap).filter((hero) => {
      for (const keyword of hero.searchKeywords) {
        if (keyword.includes(text.toLocaleLowerCase())) return true;
      }
      return false;
    });

    setFilteredAndSortedHeroes(heroArray);
  }

  const handleSortChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setSort(
      SORTS.find((sort) => sort.value === event.target.value) || SORTS[0]
    );
  };

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        {t("Heroes")}
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <div className="mr-4">
          <FormControl>
            <InputLabel>{t("Search")}</InputLabel>
            <Input
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
              }}
            />
          </FormControl>
        </div>

        <FormControl>
          <InputLabel>{t("Sort")}</InputLabel>
          <Select
            value={sort.value}
            onChange={(sortValue) => handleSortChange(sortValue)}
          >
            {SORTS.map((sort) => (
              <MenuItem key={sort.value} value={sort.value}>
                {sort.prettyValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-row justify-center">
        <BoundedColumn>
          <div className="flex flex-row flex-wrap justify-center text-center mb-5">
            {Object.values(Factions).map((faction) => (
              <div key={faction} className="flex mr-1 cursor-pointer">
                <img
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
                ></img>
              </div>
            ))}
          </div>
        </BoundedColumn>
      </div>

      <div className="flex font-sans font-normal justify-center">
        <BoundedColumn>
          <div className="flex flex-row flex-wrap gap-5 justify-center">
            {filteredAndSortedHeroes.map((hero) => (
              <HeroLink
                key={hero.name}
                name={hero.name}
                prettyName={hero.prettyName}
              />
            ))}
          </div>
        </BoundedColumn>
      </div>
    </div>
  );
}

interface Filter {
  type: "faction";
  value: Factions;
}

type Sort = {
  value: "alphabetically" | "rarity";
  prettyValue: string;
};

function compareByName(a: Hero, b: Hero) {
  if (a.prettyName < b.prettyName) {
    return -1;
  }
  if (a.prettyName > b.prettyName) {
    return 1;
  }
  return 0;
}

function compareByRarity(a: Hero, b: Hero) {
  const valueA = a.rarity;
  const valueB = b.rarity;
  let returnValue = 0;
  ["R", "SR", "N→SSR", "SR→SSR", "SSR"].some((possibleValue) => {
    if (valueA === possibleValue && valueB === possibleValue) {
      returnValue = 0;
      return true;
    }
    if (valueA === possibleValue) {
      returnValue = 1;
      return true;
    }
    if (valueB === possibleValue) {
      returnValue = -1;
      return true;
    }
  });
  return returnValue;
}
