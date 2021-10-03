import React, { PropsWithRef } from "react";
import { DBSingleton, PatchMap } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { NewsPage } from "../components/patch/NewsPage";

const NewsPageBase = ({ patches }: PropsWithRef<{ patches: PatchMap }>) => (
  <Layout>
    <NewsPage patches={patches}></NewsPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const patches = workbook.getPatchMap();

  return {
    props: {
      patches,
    },
  };
};

export default NewsPageBase;
