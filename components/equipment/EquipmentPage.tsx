import {
  Collapse,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentQuality,
  EquipmentSlot,
  EquipmentType,
} from "../../types/hero";
import { EquipmentSection } from "./EquipmentSection";
import { BoundedColumn } from "../layout/BoundedColumn";
import { TransitionGroup } from "react-transition-group";
import { SelectChangeEvent } from '@mui/material/Select';

export function EquipmentPage({ equipment }: { equipment: Equipment[] }) {
  const [filteredAndGroupedEquipment, setFilteredAndGroupedEquipment] =
    useState({} as GroupedEquipment);

  const [slot, setSlot] = useState(EquipmentSlot.Weapon);
  const [quality, setQuality] = useState(EquipmentQuality.SSR);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    filterAndGroup(slot);
    setSearchText("");
  }, [slot, quality]);

  useEffect(() => {
    if (searchText.length > 0) search(searchText);
    else filterAndGroup(slot);
  }, [searchText]);

  function filterAndGroup(slot: EquipmentSlot) {
    const filteredAndGrouped = equipment
      .filter((equip) => equip.slot === slot)
      .filter((equip) => equip.quality === quality)
      .reduce(
        (accumlator, equip) => {
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
          Special: [],
          Staff: [],
          Sword: [],
          "": [],
        } as GroupedEquipment
      );

    setFilteredAndGroupedEquipment(filteredAndGrouped);
  }

  function search(text: string) {
    const filteredAndGrouped = equipment
      .filter((equip) =>
        equip.name.toLowerCase().includes(text.toLocaleLowerCase())
      )
      .reduce(
        (accumlator, equip) => {
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
          Special: [],
          Staff: [],
          Sword: [],
          "": [],
        } as GroupedEquipment
      );
    setFilteredAndGroupedEquipment(filteredAndGrouped);
  }

  const handleSlotChange = (event: SelectChangeEvent) => {
    setSlot(event.target.value as EquipmentSlot);
  };

  const handleQualityChange = (event: SelectChangeEvent) => {
    setQuality(event.target.value as EquipmentQuality);
  };
  
  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mt-5 mb-10 font-thin text-gray-600">
        Equipment
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

        <div className="mr-4">
          <FormControl>
            <InputLabel>Slot</InputLabel>
            <Select
              value={slot}
              onChange={handleSlotChange}
            >
              {Object.values(EquipmentSlot).map((slotInner) => (
                <MenuItem key={slotInner} value={slotInner}>
                  {slotInner}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <FormControl>
          <InputLabel>Quality</InputLabel>
          <Select
            value={quality}
            onChange={handleSlotChange}
          >
            {Object.values(EquipmentQuality).map((qualityInner) => (
              <MenuItem key={qualityInner} value={qualityInner}>
                {qualityInner}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TransitionGroup>
        {Object.entries(filteredAndGroupedEquipment)
          .filter(([key, equips]) => equips.length > 0)
          .map(([key, equips]) => (
            <Collapse timeout={750} key={key}>
              <div className="flex flex-row bg-gray-200 justify-center">
                <BoundedColumn>
                  <div className="flex mt-2 mb-2 items-center justify-center sm:justify-start">
                    <div className="ml-2 text-2xl">{key || "Accessories"}</div>
                  </div>
                </BoundedColumn>
              </div>
              <div className="flex flex-row bg-white justify-center">
                <BoundedColumn>
                  {equips.map((equip) => (
                    <EquipmentSection key={equip.name} equipment={equip} />
                  ))}
                </BoundedColumn>
              </div>
            </Collapse>
          ))}
      </TransitionGroup>
    </div>
  );
}

type GroupedEquipment = {
  [type in EquipmentType]: Equipment[];
};
