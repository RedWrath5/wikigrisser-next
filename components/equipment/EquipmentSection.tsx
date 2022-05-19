import React, { useState } from "react";
import { Equipment } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import { Img } from "../layout/Img";

export function EquipmentSection({ equipment }: { equipment: Equipment }) {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1 flex items-center justify-center mr-3">
          <Img
            src={"/equipment/" + equipment.name + ".png"}
            className="inline"
            onError={addDefaultSrc}
          />
        </div>
        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          <p className="text-2xl mb-2">{equipment.name}</p>
          <EffectList equipment={equipment} />
        </div>
      </div>
    </>
  );
}

function EffectList({ equipment }: { equipment: Equipment }) {
  const [equipmentText, setEquipmentText] = useState({
    key: "lvl50",
    effect: equipment.effect.lvl50,
    stat1: equipment.stat1?.lvl50,
    stat2: equipment.stat2?.lvl50,
  });

  const handleClick = (key: EffectKeys) => {
    setEquipmentText({
      key: key,
      effect: equipment.effect[key],
      stat1: equipment.stat1 ? equipment.stat1[key] : undefined,
      stat2: equipment.stat2 ? equipment.stat2[key] : undefined,
    });
  };

  return (
    <>
      <div className="flex text-xl mb-1 justify-center sm:justify-start">
        {equipment.stat1 && (
          <>
            <Img
              src={`/stats/${equipment.stat1.type}.png`}
              className="inline mr-1"
              height={28}
              width={28}
            />
            {equipmentText.stat1}
          </>
        )}

        {equipment.stat2 && (
          <>
            <Img
              src={`/stats/${equipment.stat2.type}.png`}
              className="inline ml-3 mr-1"
              height={28}
              width={28}
            />
            {equipmentText.stat2}
          </>
        )}
      </div>

      {equipment.exclusiveForHero && (
        <div className="mb-1">
          <b>[{equipment.exclusiveForHero}]</b>
        </div>
      )}
      <p className="whitespace-pre-line">{equipmentText.effect}</p>
      <p className="italic mb-1">{equipment.notes}</p>
      <ul className="flex justify-center sm:justify-start">
        {levelButtons.map((button) => (
          <li
            className={`mr-2 px-1 border-gray-600 border-2 rounded cursor-pointer ${
              button.key === equipmentText.key ? "font-bold" : ""
            }`}
            key={button.key}
            onClick={() => handleClick(button.key)}
          >
            {button.label}
          </li>
        ))}
      </ul>
    </>
  );
}

type EffectKeys = "lvl1" | "lvl10" | "lvl20" | "lvl30" | "lvl40" | "lvl50";
type LevelButton = {
  key: EffectKeys;
  label: string;
};
const levelButtons: LevelButton[] = [
  { key: "lvl1", label: "lvl. 1" },
  { key: "lvl10", label: "lvl. 10" },
  { key: "lvl20", label: "lvl. 20" },
  { key: "lvl30", label: "lvl. 30" },
  { key: "lvl40", label: "lvl. 40" },
  { key: "lvl50", label: "lvl. 50" },
];
