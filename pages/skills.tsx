import React, { PropsWithRef } from "react";
import { Skill } from "../types/hero";
import { SkillPage } from "../components/skill/SkillPage";
import { DBSingleton } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";

const SkillGalleryPage = ({
  skills,
}: PropsWithRef<{ skills: Skill[] }>) => (
  <Layout>
        <SkillPage skills={skills}></SkillPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  let skillsMap = workbook.getSkillsMap(); // Using let since we might modify skillsMap

  const heroesMap = workbook.getHeroesMap();

  // Iterate over each hero in the heroesMap
  Object.values(heroesMap).forEach((hero) => {
    // Check if the hero has a threeCostSkill and if it's not already in the skillsMap
    if (hero.threeCostSkill && !skillsMap[hero.threeCostSkill.name]) {
      // Add the threeCostSkill to the skillsMap
      skillsMap[hero.threeCostSkill.name] = hero.threeCostSkill;
    }
  });

  // Convert the skillsMap to an array of skills
  const skills: Skill[] = Object.values(skillsMap);

  // Return the skills, ensuring no duplicates by name
  return {
    props: {
      skills,
    },
  };
};

export default SkillGalleryPage;
