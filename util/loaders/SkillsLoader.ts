import { WorkBook } from "xlsx/types";
import { Skill } from "../../types/hero";
import { Loader } from "./Loader";

export class SkillsLoader extends Loader<SkillsMap> {
  constructor(workBook: WorkBook) {
    super(workBook);
  }

  load() {
    return this.generateSkillsMap();
  }

  private generateSkillsMap() {
    const skillsSheat = this.workBook.Sheets.Skills;
    const skillsMap: SkillsMap = {};
    let rowCounter = 6;
    let notDone = true;

    while (notDone) {
      const skill: Skill = {
        name: skillsSheat["A" + rowCounter]?.v || null,
        cost: skillsSheat["C" + rowCounter]?.v || null,
        cd: skillsSheat["D" + rowCounter]?.v || null,
        range: skillsSheat["E" + rowCounter]?.v || null,
        span: skillsSheat["F" + rowCounter]?.v || null,
        description: skillsSheat["G" + rowCounter]?.v || null,
      };

      skillsMap[skill.name] = skill;

      rowCounter++;
      if (!skillsSheat["A" + rowCounter]?.v) {
        notDone = false;
      }
    }

    return skillsMap;
  }
}

export interface SkillsMap {
  [name: string]: Skill;
}
