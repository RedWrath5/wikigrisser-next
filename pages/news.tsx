import React, { PropsWithRef } from "react";
import { DBSingleton, PatchMap } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { NewsPage } from "../components/patch/NewsPage";
import { TranslateUILanguageMap } from "../types/translate";

const NewsPageBase = ({
  patches,
  translateUIMap,
}: PropsWithRef<{
  patches: PatchMap;
  translateUIMap: TranslateUILanguageMap;
}>) => (
  <Layout translateUIMap={translateUIMap}>
    <NewsPage patches={patches}></NewsPage>
  </Layout>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const patches = workbook.getPatchMap();
  const translateUIMap = workbook.getTranslateUIMap();

  return {
    props: {
      patches,
      translateUIMap,
    },
  };
};

export default NewsPageBase;
