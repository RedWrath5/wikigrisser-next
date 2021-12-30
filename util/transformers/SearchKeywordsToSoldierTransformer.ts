import { Soldier } from "../../types/hero";
import { TranslateSoldiersLanguageMap } from "../../types/translate";

export class SearchKeywordsToSoldierTransformer {
  constructor(
    private soldiers: Soldier[],
    private translateSoldiersMap: TranslateSoldiersLanguageMap,
    private languages: string[]
  ) {}

  transform(): Soldier[] {
    return this.addSearchKeywordsIntoSoldier();
  }

  private addSearchKeywordsIntoSoldier(): Soldier[] {
    for (const soldier of this.soldiers) {
      soldier.searchKeywords.push(soldier.name.toLocaleLowerCase());

      for (const language of this.languages) {
        if (this.translateSoldiersMap[language][soldier.name]?.name)
          soldier.searchKeywords.push(
            this.translateSoldiersMap[language][
              soldier.name
            ]?.name.toLocaleLowerCase()
          );
      }
    }
    return this.soldiers;
  }
}
