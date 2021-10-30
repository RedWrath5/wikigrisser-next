import {
  Collapse,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Soldier, UnitType } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SoldiersGallerySection } from "./SoldierGallerySection";
import { TransitionGroup } from "react-transition-group";
import {useTranslateContext} from "../context/TranslateContext";

const tiers = [
  {
    name: "Tier 1",
    value: 1,
  },
  {
    name: "Tier 2",
    value: 2,
  },
  {
    name: "Tier 3",
    value: 3,
  },
];

export function SoldierPage({ soldiers }: { soldiers: Soldier[] }) {
  const [filteredSoldiers, setFilteredSoldiers] = useState([] as Soldier[]);
  const [type, setType] = useState(UnitType.Infantry);
  const [tier, setTier] = useState(3);
  const [searchText, setSearchText] = useState("");
  const {t} = useTranslateContext()

  useEffect(() => {
    filterSoldiers(type, tier);
    setSearchText("");
  }, [type, tier]);

  useEffect(() => {
    if (searchText.length > 0) search(searchText);
    else filterSoldiers(type, tier);
  }, [searchText]);

  function search(text: string) {
    const filtered = soldiers.filter((soldier) =>
      soldier.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSoldiers(filtered);
  }

  function filterSoldiers(type: UnitType, tier: number) {
    const filtered = soldiers.filter(
      (soldier) => soldier.type === type && soldier.tier === tier
    );
    setFilteredSoldiers(filtered);
  }

  const handleTierChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTier(event.target.value as number);
  };

  const handleSlotChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setType(event.target.value as UnitType);
  };

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        {t('Soldiers')}
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <div className="mr-4">
          <FormControl>
            <InputLabel>{t('Search')}</InputLabel>
            <Input
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
              }}
            />
          </FormControl>
        </div>

        <FormControl>
          <InputLabel>{t('Type')}</InputLabel>
          <Select
            value={type}
            onChange={(slotInner) => handleSlotChange(slotInner)}
          >
            {Object.values(UnitType)
              .filter((type) => type !== UnitType.Dragon)
              .map((typeInner) => (
                <MenuItem key={typeInner} value={typeInner}>
                  {t(typeInner)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className="ml-4">
          <FormControl>
            <InputLabel>{t('Tier')}</InputLabel>
            <Select value={tier} onChange={handleTierChange}>
              {tiers.map((v) => (
                <MenuItem key={v.name} value={v.value}>
                  {t(v.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="flex flex-row justify-center w-full">
        <BoundedColumn>
          <TransitionGroup>
            {filteredSoldiers.map((soldier) => (
              <Collapse timeout={750} key={soldier.name}>
                <div
                  key={soldier.name}
                  className="flex flex-row w-full bg-white justify-center"
                >
                  <SoldiersGallerySection
                    soldier={soldier}
                  ></SoldiersGallerySection>
                </div>
              </Collapse>
            ))}
          </TransitionGroup>
        </BoundedColumn>
      </div>
    </div>
  );
}
