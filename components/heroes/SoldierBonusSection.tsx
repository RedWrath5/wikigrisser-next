import React from "react";
import { SoldierBonus } from "../../types/hero";

export default function SoldierBonusSection({
  bonus: { atk, hp, def, mdef },
  name,
}: {
  bonus: SoldierBonus;
  name: string;
}) {
  return (
    <tr>
      <td>
        <li className="mr-2">{name}</li>
      </td>
      <td>
        HP: {hp}% | ATK: {atk}% | DEF: {def}% | MDEF: {mdef}%
      </td>
    </tr>
  );
}
