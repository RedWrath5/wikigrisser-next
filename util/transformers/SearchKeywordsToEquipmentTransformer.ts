import { Equipment } from "../../types/hero";
import { TranslateEquipmentLanguageMap } from "../../types/translate";

export class SearchKeywordsToEquipmentTransformer {
  constructor(
    private equipment: Equipment[],
    private translateEquipmentMap: TranslateEquipmentLanguageMap,
    private languages: string[]
  ) {}

  transform(): Equipment[] {
    return this.addSearchKeywordsIntoEquipment();
  }

  private addSearchKeywordsIntoEquipment(): Equipment[] {
    for (const item of this.equipment) {
      if (!item.searchKeywords) continue;
      item.searchKeywords.push(item.name.toLocaleLowerCase());

      for (const language of this.languages) {
        if (this.translateEquipmentMap[language][item.name]?.name)
          item.searchKeywords.push(
            this.translateEquipmentMap[language][
              item.name
            ]?.name.toLocaleLowerCase()
          );
      }
    }
    return this.equipment;
  }
}
