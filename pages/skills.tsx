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
  const skillsMap = workbook.getSkillsMap();

  const skills: Skill[] = Object.values(skillsMap);


      // Debugging: Print the type of each skill.name
  // skills.forEach((skill, index) => {
  //   console.log(`Skill #${index} name type:`, typeof skill.name);
  //   // Additional debugging to log the value if it's not a string
  //   if (typeof skill.name !== 'string') {
  //     console.log(`Skill #${index} unexpected name value:`, skill.name);
  //   }
  // });
    
  return {
    props: {
      skills,
    },
  };
};

export default SkillGalleryPage;
