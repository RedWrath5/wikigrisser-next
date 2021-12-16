import React, { useState } from "react";
import { Equipment } from "../../types/hero";

export function EquipmentSection({
  equipment,
  isExclusive,
}: {
  equipment: Equipment;
  isExclusive: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1 flex items-center justify-center mr-3">
          <img
            src={"/equipment/" + equipment.name + ".png"}
            className="inline"
          />
        </div>
        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          <p className="text-2xl mb-2">
            {isExclusive && "Exclusive Equipment: "}
            {equipment.name}
          </p>

          <EffectList equipment={equipment} />
        </div>
      </div>
    </>
  );
}

function EffectList({ equipment }: { equipment: Equipment }) {
  const [currentKey, setCurrentKey] = useState("lvl50");
  const [text, setText] = useState(equipment.effect.lvl50);
  const [stat1, setStat1] = useState(equipment.stat1?.lvl50);
  const [stat2, setStat2] = useState(equipment.stat2?.lvl50);

  const handleClick = (key: EffectKeys) => {
    setText(equipment.effect[key]);
    setCurrentKey(key);
    equipment.stat1 && setStat1(equipment.stat1[key]);
    equipment.stat2 && setStat2(equipment.stat2[key]);
  };

  return (
    <>
      <div className="flex text-xl mb-1 justify-center sm:justify-start">
        {equipment.stat1 && (
          <>
            <img
              src={`/stats/${equipment.stat1.type}.png`}
              className="inline mr-1"
              height={28}
              width={28}
            />
            {stat1}
          </>
        )}

        {equipment.stat2 && (
          <>
            <img
              src={`/stats/${equipment.stat2.type}.png`}
              className="inline ml-3 mr-1"
              height={28}
              width={28}
            />
            {stat2}
          </>
        )}
      </div>

      <p className="whitespace-pre-line">{text}</p>
      <p className="italic mb-1">{equipment.notes}</p>
      <ul className="flex justify-center sm:justify-start">
        {levelButtons.map((button) => (
          <li
            className={`mr-2 px-1 border-gray-600 border-2 rounded cursor-pointer ${
              button.key === currentKey ? "font-bold" : ""
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
