import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Soldier, UnitType } from "../../types/hero";
import { BoundedColumn } from "../layout/BoundedColumn";
import { SoldiersGallerySection } from "./SoldierGallerySection";

export function SoldierPage({ soldiers }: { soldiers: Soldier[] }) {
  const [filteredSoldiers, setFilteredSoldiers] = useState([] as Soldier[]);

  const [type, setType] = useState(UnitType.Infantry);

  useEffect(() => {
    filterSoldiers(type);
  }, [type]);

  function filterSoldiers(type: UnitType) {
    const filtered = soldiers.filter(
      (soldier) => soldier.type === type && soldier.tier === 3
    );

    setFilteredSoldiers(filtered);
  }

  const handleSlotChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setType(event.target.value as UnitType);
  };

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        Soldiers
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(slotInner) => handleSlotChange(slotInner)}
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
      </div>
      <div className="flex flex-row justify-center w-full">
        <BoundedColumn>
          {filteredSoldiers.map((soldier) => (
            <div
              key={soldier.name}
              className="flex flex-row w-full bg-white justify-center"
            >
              <SoldiersGallerySection
                soldier={soldier}
              ></SoldiersGallerySection>
            </div>
          ))}
        </BoundedColumn>
      </div>
    </div>
  );
}
