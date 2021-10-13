import { Loader } from "./Loader";
import { TranslateSoldiersMap } from "../../types/hero";

export class TranslateSoldiersLoader extends Loader<TranslateSoldiersMap> {
  load(): TranslateSoldiersMap {
    return {
      "Guardian Infantry": {
        name: "Guardian Infantry Имя",
        effect: "Guardian Infantry эффект",
      },
    };
  }
  /*
  static getLangText = (
    language: string,
    type: string,
    key: string,
    field: string,
    langMap: TranslateSoldiersMap
  ) => {
    try {
      // @ts-ignore
      return langMap[language][type][key][field];
    } catch (e) {
      return null;
    }
  };*/
}
