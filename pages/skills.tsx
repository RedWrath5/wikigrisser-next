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
    
  return {
    props: {
      skills,
    },
  };
};

export default SkillGalleryPage;
