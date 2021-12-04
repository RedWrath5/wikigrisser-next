import { HeroMap } from "../databaseSingleton";
import { TranslateHeroLanguageMap } from "../../types/translate";

export class SearchKeywordsToHeroTransformer {
  constructor(
    private heroMap: HeroMap,
    private translateHeroMap: TranslateHeroLanguageMap<HeroMap>,
    private languages: string[]
  ) {}

  transform() {
    return this.addSearchKeywordsIntoHero();
  }

  private addSearchKeywordsIntoHero() {
    for (const key of Object.keys(this.heroMap)) {
      this.heroMap[key].searchKeywords.push(key.toLocaleLowerCase());

      for (const language of this.languages) {
        if (this.translateHeroMap[language][key]?.name)
          this.heroMap[key].searchKeywords.push(
            this.translateHeroMap[language][key].name.toLocaleLowerCase()
          );
      }
    }
    return this.heroMap;
  }
}
