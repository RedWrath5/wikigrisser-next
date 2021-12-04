import {
  Collapse,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Equipment, EquipmentSlot, EquipmentType } from "../../types/hero";
import { EquipmentSection } from "./EquipmentSection";
import { BoundedColumn } from "../layout/BoundedColumn";
import { TransitionGroup } from "react-transition-group";
import { useTranslateContext } from "../context/TranslateContext";

export function EquipmentPage({ equipment }: { equipment: Equipment[] }) {
  const { t } = useTranslateContext();
  const [filteredAndGroupedEquipment, setFilteredAndGroupedEquipment] =
    useState({} as GroupedEquipment);

  const [slot, setSlot] = useState(EquipmentSlot.Weapon);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    filterAndGroup(slot);
    setSearchText("");
  }, [slot]);

  useEffect(() => {
    if (searchText.length > 0) search(searchText);
    else filterAndGroup(slot);
  }, [searchText]);

  function filterAndGroup(slot: EquipmentSlot) {
    const filteredAndGrouped = equipment
      .filter((equip) => equip.slot === slot)
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
          Staff: [],
          Sword: [],
          "": [],
        } as GroupedEquipment
      );

    setFilteredAndGroupedEquipment(filteredAndGrouped);
  }

  function search(text: string) {
    const filteredAndGrouped = equipment
      .filter((equip) => {
        if (!equip.searchKeywords) return false;

        for (const keyword of equip.searchKeywords) {
          if (keyword.includes(text.toLocaleLowerCase())) return true;
        }
        return false;
      })
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
        {t("Equipment")}
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
          <InputLabel>{t("Slot")}</InputLabel>
          <Select
            value={slot}
            onChange={(slotInner) => handleSlotChange(slotInner)}
          >
            {Object.values(EquipmentSlot).map((slotInner) => (
              <MenuItem key={slotInner} value={slotInner}>
                {t(slotInner)}
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
                    <div className="ml-2 text-2xl">
                      {(key && t(key)) || t("Accessories")}
                    </div>
                  </div>
                </BoundedColumn>
              </div>
              <div className="flex flex-row bg-white justify-center">
                <BoundedColumn>
                  {equips.map((equip) => (
                    <EquipmentSection
                      key={equip.name}
                      equipment={equip}
                      isExclusive={false}
                    ></EquipmentSection>
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
