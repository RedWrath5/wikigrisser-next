import { UnitType } from "../../types/hero";

export const IMAGE_TO_CLASS_MAP: { [image: string]: UnitType } = {
  "index(Images!$A$1:$K$1, 1, 1)": UnitType.Infantry,
  "index(Images!$A$1:$K$1, 1, 2)": UnitType.Lancer,
  "index(Images!$A$1:$K$1, 1, 3)": UnitType.Cavalry,
  "index(Images!$A$1:$K$1, 1, 4)": UnitType.Flier,
  "index(Images!$A$1:$K$1, 1, 5)": UnitType.Aquatic,
  "index(Images!$A$1:$K$1, 1, 6)": UnitType.Archer,
  "index(Images!$A$1:$K$1, 1, 7)": UnitType.Assassin,
  "index(Images!$A$1:$K$1, 1, 8)": UnitType.Holy,
  "index(Images!$A$1:$K$1, 1, 9)": UnitType.Mage,
  "index(Images!$A$1:$K$1, 1, 10)": UnitType.Demon,
  "index(Images!$A$1:$K$1, 1, 11)": UnitType.Dragon,
};
