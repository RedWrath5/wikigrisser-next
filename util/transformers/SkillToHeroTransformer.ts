import { Class, Hero, Skill } from "../../types/hero";
import { HeroMap, SkillToHeroMap } from "../databaseSingleton";

export class SkillToHeroTransformer {
  constructor(private heroMap: HeroMap) {}

  transform() {
    return this.generateSkillToHeroMap();
  }

  private generateSkillToHeroMap(): SkillToHeroMap {
    return Object.values(this.heroMap)
      .map((hero) => this.getSkillsPerHero(hero))
      .reduce(this.reduceHeroSkillsTouplesToSkillMap, {} as SkillToHeroMap);
  }

  private getSkillsPerHero(hero: Hero): HeroSkillsTouple {
    return [
      hero.prettyName,
      [
        ...(hero.spClass?.skills || []),
        ...this.getSkillsPerClass(hero.startingClass),
      ],
    ];
  }

  private getSkillsPerClass(classVar: Class): Skill[] {
    return [
      ...classVar.skills,
      ...classVar.children.flatMap((child) => this.getSkillsPerClass(child)),
    ];
  }

  private reduceHeroSkillsTouplesToSkillMap(
    accumulator: SkillToHeroMap,
    [heroName, skills]: HeroSkillsTouple
  ) {
    skills.forEach((skill) => {
      if (skill) {
        accumulator[skill.name] = [
          ...(accumulator[skill.name] || []),
          heroName,
        ];
      }
    });
    return accumulator;
  }
}

export interface SkillsMap {
  [name: string]: Skill;
}

type HeroSkillsTouple = [string, Skill[]];
