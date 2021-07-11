import React from "react";
import { SkillToHeroMap } from "./databaseSingleton";

const skillToHeroContext = React.createContext<SkillToHeroMap | undefined>(
  undefined
);

export default skillToHeroContext;
