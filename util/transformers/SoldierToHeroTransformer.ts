import { Class, Hero, Soldier } from "../../types/hero";
import { HeroMap } from "../databaseSingleton";

export class SoldierToHeroTransformer {
  constructor(private soldier: Soldier[], private heroMap: HeroMap) {}

  transform() {
    const soldierToHeroMap = this.generateSoldierToHeroMap();

    return this.addRelatedHeroesToSoldier(soldierToHeroMap);
  }

  private generateSoldierToHeroMap(): SoldierToHeroMap {
    return Object.values(this.heroMap)
      .map((hero) => this.getSoldiersPerHero(hero))
      .reduce(this.reduceHeroSoldiersToupleToMap, {} as SoldierToHeroMap);
  }

  private getSoldiersPerHero(hero: Hero): HeroSoldiersTouple {
    return [
      hero.prettyName,
      [
        ...(hero.spClass?.soldiers || []),
        ...this.getSoldiersPerClass(hero.startingClass),
      ],
    ];
  }

  private getSoldiersPerClass(classVar: Class): string[] {
    return [
      ...classVar.soldiers,
      ...classVar.children.flatMap((child) => this.getSoldiersPerClass(child)),
    ].map((soldier) => soldier.toString().trim());
  }

  private reduceHeroSoldiersToupleToMap(
    accumulator: SoldierToHeroMap,
    [heroName, soldiers]: HeroSoldiersTouple
  ) {
    soldiers.forEach((soldier) => {
      if (soldier) {
        accumulator[soldier] = [...(accumulator[soldier] || []), heroName];
      }
    });
    return accumulator;
  }

  private addRelatedHeroesToSoldier(soldierToHeroMap: SoldierToHeroMap) {
    return this.soldier.map((soldier) => {
      if (soldierToHeroMap[soldier.name])
        soldier.relatedHeroes = soldierToHeroMap[soldier.name];

      return soldier;
    });
  }
}

type SoldierToHeroMap = {
  [key: string]: string[]; // soldier name, hero list
};
type HeroSoldiersTouple = [string, string[]]; //heroname, soldiers list
