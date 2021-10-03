import React from "react";
import { TrainingSkill, TrainingSkillLevel } from "../../types/hero";

export function TrainingSkillSection({
  trainingSkill,
}: {
  trainingSkill: TrainingSkill;
}) {
  const { levels } = trainingSkill;
  return (
    <ul>
      {levels.map((level) => (
        <TrainingSkillRow level={level} />
      ))}
    </ul>
  );
}

function TrainingSkillRow({ level }: { level: TrainingSkillLevel }) {
  return (
    <li className="flex flex-row w-full mt-2">
      <div className="w-16 flex justify-center items-center text-lg">
        <b>{level.level}</b>
      </div>

      <TrainingSkillItem img="item\Gold.png" count={level.gold} />
      {level.books.map((book) => (
        <TrainingSkillItem
          key={book.name + level.level + book.count}
          img={"soldier material\\" + book.name + ".png"}
          count={book.count}
        />
      ))}

      {level.materials.map((material) => (
        <TrainingSkillItem
          key={material.name + level.level + material.count}
          img={"soldier material\\" + material.name + ".png"}
          count={material.count}
        />
      ))}
    </li>
  );
}

function TrainingSkillItem({ img, count }: { img: string; count: string }) {
  return (
    <div className="w-20 ml-2">
      <div className="flex items-center h-24">
        <img src={img} className="block" alt="material icon" />
      </div>
      <div className="flex justify-center">
        <b>x {count}</b>
      </div>
    </div>
  );
}