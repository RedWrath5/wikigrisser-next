import React from "react";
import { SkillToHeroMap } from "../../util/databaseSingleton";

const skillToHeroContext = React.createContext<SkillToHeroMap | undefined>(
  undefined
);

export default skillToHeroContext;
