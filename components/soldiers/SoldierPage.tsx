import {
  Collapse,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Soldier, UnitType } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SoldiersGallerySection } from "./SoldierGallerySection";
import { TransitionGroup } from "react-transition-group";
import { SelectChangeEvent } from '@mui/material/Select';

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

  const handleTierChange = (event: SelectChangeEvent) => {
    setTier(parseInt(event.target.value, 10)); // Use parseInt with radix 10
  };

  const handleSlotChange = (event: SelectChangeEvent) => {
    setType(event.target.value as UnitType);
  };  

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mt-5 mb-10 font-thin text-gray-600">
        Soldiers
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <div className="mr-4">
          <FormControl>
            <InputLabel>Search</InputLabel>
            <Input
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
              }}
            />
          </FormControl>
        </div>

        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={handleSlotChange}
          >
            {Object.values(UnitType)
              .filter((type) => type !== UnitType.Dragon)
              .map((typeInner) => (
                <MenuItem key={typeInner} value={typeInner}>
                  {typeInner}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className="ml-4">
          <FormControl>
            <InputLabel>Tier</InputLabel>
            <Select value={tier.toString()} onChange={handleTierChange}>
              {tiers.map((v) => (
                <MenuItem key={v.name} value={v.value}>
                  {v.name}
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
