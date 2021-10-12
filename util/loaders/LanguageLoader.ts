import { Loader } from "./Loader";
import { Language, LanguageMap } from "../../types/hero";

export class LanguageLoader extends Loader<Language> {
  load(): Language {
    return {
      soldiers: {
        "Guardian Infantry": {
          name: "Guardian Infantry Имя",
          effect: "Guardian Infantry эффект",
        },
      },
    };
  }

  static getLangText = (
    language: string,
    type: string,
    key: string,
    field: string,
    langMap: LanguageMap
  ) => {
    try {
      // @ts-ignore
      return langMap[language][type][key][field];
    } catch (e) {
      return null;
    }
  };
}
