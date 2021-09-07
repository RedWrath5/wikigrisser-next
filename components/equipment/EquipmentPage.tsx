import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Equipment, EquipmentSlot, EquipmentType } from "../../types/hero";
import { EquipmentSection } from "../heroes/EquipmentSection";

export function EquipmentPage({ equipment }: { equipment: Equipment[] }) {
  const [filteredAndGroupedEquipment, setFilteredAndGroupedEquipment] =
    useState({} as GroupedEquipment);

  const [slot, setSlot] = useState(EquipmentSlot.Weapon);

  useEffect(() => {
    filterAndGroup(slot);
  }, [slot]);

  function filterAndGroup(slot: EquipmentSlot) {
    const filteredAndGrouped = equipment
      .filter((equip) => equip.slot === slot)
      .reduce(
        (accumlator, equip) => {
          console.log("accumlator", accumlator);
          console.log("type", equip.type);
          accumlator[equip.type ?? ""].push(equip);
          return accumlator;
        },
        {
          Axe: [],
          Bow: [],
          Cloth: [],
          Dagger: [],
          Hammer: [],
          Heavy: [],
          Lance: [],
          Leather: [],
          Staff: [],
          Sword: [],
          "": [],
        } as GroupedEquipment
      );

    setFilteredAndGroupedEquipment(filteredAndGrouped);
  }

  const handleSlotChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setSlot(event.target.value as EquipmentSlot);
  };

  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        Equipment
      </h1>
      <div className="flex flex-wrap justify-center text-center mb-5">
        <FormControl>
          <InputLabel>Slot</InputLabel>
          <Select
            value={slot}
            onChange={(slotInner) => handleSlotChange(slotInner)}
          >
            {Object.values(EquipmentSlot).map((slotInner) => (
              <MenuItem key={slotInner} value={slotInner}>
                {slotInner}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {Object.entries(filteredAndGroupedEquipment)
        .filter(([key, equips]) => equips.length > 0)
        .map(([key, equips]) => (
          <>
            <div className="flex flex-row bg-gray-200 justify-center">
              <div
                className="flex- flex-row w-full ml-2 mr-2"
                style={{ maxWidth: "1280px" }}
              >
                <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
                  <div className="ml-2 text-2xl">{key || "Accessories"}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row bg-white justify-center">
              <div
                className="flex- flex-row w-full ml-2 mr-2"
                style={{ maxWidth: "1280px" }}
              >
                {equips.map((equip) => (
                  <EquipmentSection
                    equipment={equip}
                    isExclusive={false}
                  ></EquipmentSection>
                ))}
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

type GroupedEquipment = {
  [type in EquipmentType]: Equipment[];
};
