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
}
